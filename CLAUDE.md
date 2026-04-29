# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deerfield Rail Tracker is a live, mobile-optimized train tracker PWA for the South Florida rail corridor, centered on Deerfield Beach, FL. It tracks 5 rail operators: Tri-Rail, Amtrak, Brightline, FEC Freight, and CSX Freight.

**Live app:** https://HoffiMC89.github.io/deerfield-rail/
**Default password:** `train123` (client-side session lock; see Security Note)

## Architecture

This is a zero-framework, zero-build-tool project. Everything is pure HTML/CSS/JS in a single `index.html` file (~2470 lines). External libraries (Leaflet, protobuf.js) are loaded from CDNs and cached by the service worker.

### File layout

| File | Purpose |
|------|---------|
| `index.html` | Entire app — HTML, inline CSS, inline JS, schedules, geometry, all features |
| `sw.js` | Service Worker — cache-first for static, network-first for live APIs/tiles |
| `manifest.json` | PWA manifest (`/deerfield-rail/` scope, standalone display) |
| `icon-192.png`, `icon-512.png` | PWA icons (maskable) |
| `deploy.sh` | One-shot GitHub Pages deploy script (contains a hardcoded token — see Security Note) |
| `README.md` | User-facing feature list and install instructions |

### Sections inside `index.html`

The script is divided into clearly marked banner-comment sections (`// ════…`). When editing, find the right section first rather than searching globally:

| Approx. lines | Section | Notes |
|---------------|---------|-------|
| 17–54 | Password gate | Runs before DOM; uses `sessionStorage["rail_auth"]`, password constant `PASS = "train123"` |
| 56–550 | Inline CSS | Mobile-first (<900px), `.desktop` class flips to side-by-side at ≥900px |
| 555–584 | HTML body | `#app` → `#hdr`, `#mapwrap`, `#body` (panel + list); plus overlays (`#lockscreen`, `#welcomeOverlay`, `#camFullscreen`, `#historyPanel`, `#toastContainer`) |
| 593–613 | `STATIONS` constant + `YOU_LAT/YOU_LNG` | 14 stations from Mangonia Park → Miami Airport; persisted via `localStorage["rail_station"]` |
| 621–687 | `ALL` schedule array | Static schedules for Tri-Rail, Amtrak, Brightline, FEC freight, CSX freight; sorted by minutes |
| 692–709 | `PAL`, `EMOJI`, `tCol()`, `tEmoji()` | Per-operator colors and icons |
| 717–777 | Map + tile layers | Leaflet `map`, 4 tile layers (orm/sat/osm/dark), `setLayer()` |
| 786–870 | `FALLBACK_CSX`, `FALLBACK_FEC` | Hardcoded GPS polylines, used until OSM fetch upgrades them |
| 902–1018 | OSM track fetch | Overpass API stitching (`stitchWaysIntoLine`), 60-day cache in `localStorage["osmTrackData_v11"]` |
| 1020–1164 | Track engine | `buildTrack()`, `posOnTrack()`, `stationFraction()`, `schedPos()`, `onTrack()`, `snapToTrack()` — interpolates positions along polylines |
| 1171–1238 | Markers | `trainIcon()`, `putMarker()`, `cullMarkers()`, row highlight |
| 1241–1347 | Live data fetchers | `fetchLive()` (Amtraker), `fetchTriRail()` (GTFS-RT protobuf via CORS proxy), `fetchAllLive()` polled every 30s |
| 1350–1389 | `CARGO` map + `getCargo()` | Maps freight train numbers → cargo descriptions |
| 1396–1425 | `NOISE_ZONES` | Hardcoded FRA quiet-zone + horn-zone circles |
| 1427–1537 | FRA Crossing Inventory | ArcGIS query, viewport-debounced fetch, draws ⚠️/🔕 markers with FRA accident report links |
| 1543–1659 | FDOT FL511 cameras | One-shot fetch + filter to corridor; live JPEG popups; fullscreen viewer auto-refreshes every 10s |
| 1662–1733 | NWS alerts | `api.weather.gov` polled every 5min; filters Broward / Palm Beach / Miami-Dade zones |
| 1740–1810 | Trip log | Auto-logs trains within ~0.8km of `YOU_LAT/YOU_LNG`; `localStorage["railLog"]` (cap 200); CSV export |
| 1815–1995 | UI state + button wiring | `goLive`, `setSim`, `setFilter`, `toggleMode`, station picker, history panel, locate button |
| 2008–2170 | `render()` loop | Main `requestAnimationFrame` loop — markers, on-track bar, next train, schedule list |
| 2176–2206 | Train selection / follow | `selectTrain`, `startFollow`, `stopFollow`; camera locks onto a train marker |
| 2211–2252 | Map sizing + SW registration | `fixMapSize`, `autoDetectAndFix`; SW only registers on real https origin |
| 2257–2267 | Toast system | `showToast(icon, title, msg, duration)` |
| 2273–2319 | Night mode | Solar-position calc for ~26.3°N; auto-switches `dark` ↔ `sat` tiles; manual layer pick disables it |
| 2326–2370 | Proximity notifications | Browser `Notification` API + toast when train ≤5min from selected station |
| 2377–2398 | Weekend schedule badge | `isWeekend()`, banner toast for Saturday/Sunday Tri-Rail reduced service |
| 2404–2428 | Smooth marker animation | `animateMarker()` — eased lerp over 800ms, skips if jump > 0.05° |
| 2434–2470 | Camera fullscreen viewer + welcome overlay | Welcome shown once via `localStorage["rail_welcome_v2"]` |

### Key data flow

1. `fetchAllLive()` polls Amtraker (Amtrak + Brightline GPS) and Tri-Rail GTFS-RT every 30s, populating `liveData`.
2. `render()` runs every animation frame: advances `simTime`, computes minutes-of-day `sM`, draws live markers (snapped to track), then schedule-interpolated markers for trains where `onTrack(t, sM)` is true.
3. Live GPS always wins over schedule for the same train number; otherwise both can render side-by-side.
4. `checkPassingTrains(sM)` auto-logs scheduled trains within `PASS_THRESH = 0.008°` of the user's station.
5. `checkProximityAlerts(sM)` fires toasts + browser notifications when a train is 0.5–5min from the selected station.

### Layout

- Mobile (<900px): stacked layout, fixed map height (~220px), scrollable panel below.
- Desktop (≥900px or `.desktop` class): side-by-side, map ~65% left, panel ~35% right.
- `autoDetectAndFix()` applies `.desktop` automatically based on user agent on load.

## Development

No build step. Open `index.html` in a browser or serve with any static server:

```
python3 -m http.server 8000
```

Notes when developing locally:
- The service worker only registers on `https:` origins that aren't `localhost` or `claudeusercontent` — so locally it's effectively a no-op.
- Cache asset paths in `sw.js` are absolute (`/deerfield-rail/...`) for GitHub Pages; they won't match a local server at `/`.
- Tri-Rail GTFS-RT goes through public CORS proxies (`corsproxy.io`, `allorigins.win`); both can fail intermittently.
- FRA crossing fetch is intentionally disabled on `claudeusercontent` hosts (see `fetchCrossingsForView`).
- Notifications and geolocation require `https:` (or `localhost`).

### Testing changes

There is no automated test suite. Verify changes by:
1. Opening `index.html` and confirming the password gate, map, and schedule list render.
2. Watching the browser console for fetch errors (Amtraker, Overpass, FRA, NWS, FL511, RainViewer).
3. Resizing across the 900px breakpoint to confirm both layouts.
4. Toggling buttons in the header (live/sim/layer/weather/cameras/crossings/filters/history).

## Conventions

- **Single file, big sections.** Don't split `index.html` into separate JS/CSS files unless explicitly asked — the project's design goal is "open one file, see everything." Add new features as a new banner-commented section at the bottom of the script.
- **No frameworks, no transpilation.** Plain ES2020+ that modern browsers run directly. No JSX, TypeScript, bundlers, or npm.
- **Inline styles for one-offs**, CSS class only when reused. Popup HTML strings live next to the code that creates the marker.
- **Persistent state lives in `localStorage`** with prefixed keys: `rail_auth` (session), `rail_station`, `rail_welcome_v2`, `railLog`, `osmTrackData_v11`. When invalidating cached structure, bump the version suffix.
- **Track upgrades are non-blocking.** `FALLBACK_CSX/FEC` always renders first; OSM fetch replaces them later via `applyTrackData()`.
- **Don't break the password gate.** It runs synchronously at the top of `<head>` and toggles `#app` / `#lockscreen` — anything that runs before `__checkPass()` succeeds must not assume the map exists.
- **Keep the SW asset list in sync.** When adding a new top-level static file, also add it to `ASSETS` in `sw.js`. When adding a new external API, add its host to the network-first list so it isn't served stale from cache.

## Deployment

Hosted on GitHub Pages at `HoffiMC89.github.io/deerfield-rail/`. Push to `main` to deploy; GitHub Pages serves `/` from the repo root.

`deploy.sh` is a one-shot bootstrap script (clones, copies, commits, pushes). It is not part of the normal update flow — for routine changes just commit and push.

## External APIs

| API | Usage | Cadence |
|-----|-------|---------|
| Amtraker v3 (`api-v3.amtraker.com/v3/trains`) | Live Amtrak + Brightline GPS positions | Every 30s |
| Tri-Rail GTFS-RT (`gtfsr.tri-rail.com/.../position_updates.pb`) via `corsproxy.io` / `allorigins.win` | Live Tri-Rail vehicle positions, decoded with protobuf.js | Every 30s |
| Overpass API (`overpass-api.de`) | OSM rail track geometry | On load + 60-day cache |
| FRA Crossing Inventory (ArcGIS, `services.arcgis.com/.../NTAD_Railroad_Grade_Crossings`) | Crossings + safety/quiet-zone data | On zoom/pan ≥13, debounced 600ms |
| NWS (`api.weather.gov/alerts/active`) | Severe/extreme alerts for FL corridor counties | Every 5min |
| FDOT FL511 (ArcGIS `FL511_Traffic_Cameras`) | Static camera list + live JPEGs from `fl511.com/map/Cctv/{ID}` | Once on enable; image refresh every 10s in fullscreen |
| RainViewer (`api.rainviewer.com`) | Precipitation radar tiles | Every 5min when weather toggle is on |

When introducing a new external host, add it to the network-first allowlist in `sw.js` so the user always gets fresh data.

## Security Note

`deploy.sh` historically contained a hardcoded GitHub personal access token (see line 9). The token should be revoked on GitHub and removed from this file; deployment can be done with the user's normal git credentials or `gh auth`.

The `train123` password gate is **client-side only** and trivially bypassed by editing JS or `sessionStorage` — treat it as a soft "are you sure" rather than real access control. Don't add anything sensitive that depends on it.
