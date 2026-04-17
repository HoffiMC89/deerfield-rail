# 🚂 Deerfield Rail Tracker

A live, mobile-optimized train tracker for the South Florida rail corridor — built for Deerfield Beach, FL.

**Live app:** https://HoffiMC89.github.io/deerfield-rail/

---

## Features

### Live Tracking
- 📡 **Live GPS** — real-time Amtrak & Brightline positions via Amtraker API
- 🚆 **Tri-Rail Live GPS** — real-time vehicle positions via SFRTA GTFS-RT feed (protobuf decoded in-browser)
- 🚂 **All 5 operators** — Tri-Rail, Amtrak, Brightline, FEC Freight, CSX Freight
- ⚡ **Speed display** — live mph on every train marker
- 🎯 **Follow mode** — tap a train to lock the camera and follow it across the map

### Map & Layers
- 🛰 **Satellite / ORM / OSM / Dark maps** — switchable tile layers (satellite default)
- 🛤 **Real track geometry** — OSM-sourced rail lines snapped to actual railroad positions (SFRC + FEC)
- 🌧 **Rain radar** — live precipitation overlay from RainViewer
- ⛶ **Fullscreen map** — toggle for distraction-free viewing

### Safety & Infrastructure
- ⚠️ **FRA Crossing Inventory** — federal crossing data with safety equipment, traffic counts, quiet zone status, and links to FRA accident reports
- 🔕 **Quiet zones** — FRA quiet zones and active horn crossings mapped
- ⛈ **NWS Weather Alerts** — severe/extreme weather warnings from the National Weather Service for Broward, Palm Beach, and Miami-Dade counties
- 📹 **FDOT Traffic Cameras** — live JPEG snapshots from FL511 cameras near the rail corridor

### Schedule & Station
- 📍 **Station picker** — set any station from Mangonia Park to Miami Airport as your home station
- ⏱ **Adjusted arrival times** — schedule times recalculated based on your selected station
- 📦 **Cargo info** — what each freight train is hauling
- 🕐 **Trip log** — auto-logs every train that passes near your position with CSV export

### App
- 📱 **PWA** — installable on iPhone/Android home screen, works offline
- 🔒 **Password protected** — session-based access control
- 👋 **Welcome overlay** — feature tour for first-time users

---

## Install on iPhone

1. Open **https://HoffiMC89.github.io/deerfield-rail/** in Safari
2. Tap the **Share** button (box with arrow)
3. Tap **"Add to Home Screen"**
4. Tap **Add**

The app will appear on your home screen like a native app — fullscreen, no browser bar, works offline.

---

## Data Sources

| Data | Source |
|------|--------|
| Amtrak + Brightline live GPS | [Amtraker API](https://api-v3.amtraker.com) |
| Tri-Rail live GPS | [SFRTA GTFS-RT](https://gtfsr.tri-rail.com/) |
| Tri-Rail / FEC / CSX schedules | [tri-rail.com](https://www.tri-rail.com) · [botecomm.com](https://www.botecomm.com/bote/rail/fec_sked.html) |
| Rail track geometry | [OpenStreetMap](https://www.openstreetmap.org) via Overpass API |
| Railroad crossings | [FRA/BTS ArcGIS](https://geodata.bts.gov/) |
| Weather alerts | [NWS api.weather.gov](https://api.weather.gov) |
| Traffic cameras | [FDOT FL511](https://fl511.com) |
| Rain radar | [RainViewer](https://rainviewer.com) |
| Satellite imagery | Esri World Imagery |
| Railway map | [OpenRailwayMap](https://openrailwaymap.org) |
| Street / dark map | © OpenStreetMap · © CARTO |

---

## Tech Stack

Pure HTML/CSS/JS — zero frameworks, zero build tools.
Leaflet.js for maps · protobuf.js for GTFS-RT decoding · Service Worker for offline · localStorage for settings & trip log.

---

## Changelog

### v2.1.0 — April 2026

**New Features**
- **Train Search** — search bar to instantly find trains by name, number, or operator. Press `/` to focus.
- **Auto Night Mode** — map automatically switches to dark theme at sunset and back to satellite at sunrise (based on Deerfield Beach coordinates).
- **Toast Notifications** — non-intrusive status alerts when APIs connect/disconnect or errors occur.
- **Keyboard Shortcuts** — `ESC` closes any open panel/overlay/fullscreen mode; `/` jumps to search.
- **What's New Panel** — in-app changelog accessible via version badge in the header. Auto-shows on first visit after update.
- **Version Badge** — app version displayed in header, tap to view full changelog.

**Improvements**
- **Throttled List Rendering** — train list only re-renders when content actually changes, reducing unnecessary DOM writes from 60fps to on-demand.
- **Better API Error Handling** — toast notifications when Amtraker API is unreachable (with reconnection success message).
- **Updated Welcome Overlay** — now includes Train Search and Auto Night Mode in the feature tour.
- **Service Worker v2** — cache version bumped to ensure new assets are loaded on update.

### v2.0.0 — March 2026

**Features**
- Live GPS tracking for Amtrak, Brightline, and Tri-Rail (GTFS-RT)
- 5 rail operators: Tri-Rail, Amtrak, Brightline, FEC Freight, CSX Freight
- 4 switchable map layers (Satellite, ORM, OSM, Dark)
- Real OSM track geometry with fallback coordinates
- FRA crossing inventory with safety data and quiet zones
- FDOT traffic cameras with fullscreen viewer
- NWS severe weather alerts
- Rain radar overlay
- Station picker with 14 stations
- Follow mode for camera-locked train tracking
- Trip log with auto-detection and CSV export
- Cargo descriptions for all freight trains
- PWA with offline support
- Password-protected access
