# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Deerfield Rail Tracker is a live, mobile-optimized train tracker PWA for the South Florida rail corridor, centered on Deerfield Beach, FL. It tracks 5 rail operators: Tri-Rail, Amtrak, Brightline, FEC Freight, and CSX Freight.

**Live app:** https://HoffiMC89.github.io/deerfield-rail/

## Architecture

This is a zero-framework, zero-build-tool project. Everything is pure HTML/CSS/JS in a single `index.html` file (~1700 lines).

### Key Components (all in index.html)

- **Password gate** (top of `<script>`) — client-side session lock using `sessionStorage`, password is `train123`
- **Map system** — Leaflet.js with 4 switchable tile layers (OpenRailwayMap default, Satellite, OSM, Dark/CARTO)
- **Track system** — hardcoded fallback GPS coordinates for SFRC (CSX/Tri-Rail) and FEC (Brightline) corridors, with Overpass API fetching real OSM geometry when available
- **Live data** — Amtrak/Brightline positions from Amtraker API (`api-v3.amtraker.com`), Tri-Rail and FEC freight on schedule-based simulation
- **Simulation engine** — schedule-driven train positioning using `schedPos()` and `onTrack()` functions that interpolate positions along track geometry
- **Weather overlay** — RainViewer API precipitation radar tiles
- **Crossing system** — Overpass API queries for railroad crossings with FRA quiet zone markers
- **Trip log** — auto-logs passing trains to `localStorage`, with export capability
- **Cargo system** — `getCargo()` maps freight train names to cargo descriptions

### Layout

- Mobile (<900px): stacked layout, 220px fixed map height, scrollable panel below
- Desktop (>=900px): side-by-side, map 65% left, panel 35% right

### Other Files

- `sw.js` — Service Worker: cache-first for static assets, network-first for API/tile requests
- `manifest.json` — PWA manifest for home screen install
- `deploy.sh` — GitHub Pages deployment script

## Development

No build step. Open `index.html` in a browser or serve with any static server:

```
python3 -m http.server 8000
```

Note: The service worker paths are prefixed with `/deerfield-rail/` for GitHub Pages hosting. When developing locally, API calls to Amtraker and Overpass will work but the SW caching paths won't match.

## Deployment

Hosted on GitHub Pages at `HoffiMC89.github.io/deerfield-rail/`. Push to `main` branch to deploy.

## External APIs

| API | Usage | Rate Limits |
|-----|-------|-------------|
| Amtraker v3 (`api-v3.amtraker.com`) | Live Amtrak + Brightline GPS positions | Polled on configurable interval (60s/300s) |
| Overpass API (`overpass-api.de`) | OSM rail track geometry + railroad crossings | Fetched on load + viewport changes |
| RainViewer (`api.rainviewer.com`) | Precipitation radar tiles | Fetched when weather toggle is on |

## Security Note

`deploy.sh` contains a hardcoded GitHub personal access token that should be revoked and removed.
