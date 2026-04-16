# 🚂 Deerfield Rail Tracker

A live, mobile-optimized train tracker for the South Florida rail corridor — built for Deerfield Beach, FL.

**Live app:** https://HoffiMC89.github.io/deerfield-rail/

---

## What's New — April 2026

### v2.1 — Search, Alerts & Power User Features

| Feature | Description |
|---------|-------------|
| 🔍 **Train Search** | Instant search/filter — find any train by name, number, or operator type. Clear button and keyboard shortcut (`/`) for quick access. |
| 🔔 **Arrival Notifications** | Toast notifications + browser push alerts when a train is within 5 minutes of your selected station. Never miss a train again. |
| 📏 **Distance Display** | Active trains now show distance in miles from your selected station directly in the train list. |
| ⌨ **Keyboard Shortcuts** | Full keyboard control for power users — `L` live, `F` fullscreen, `W` weather, `C` cameras, `H` log, `1-5` filters, `?` help overlay. |
| 📊 **Live Statistics** | Real-time train count in the panel footer — total active, live GPS, and schedule-based trains at a glance. |
| 🔄 **Refresh Countdown** | Visual progress bar showing time until the next API data refresh (30s cycle). Turns green on refresh. |

---

## Features

### Live Tracking
- 📡 **Live GPS** — real-time Amtrak & Brightline positions via Amtraker API
- 🚆 **Tri-Rail Live GPS** — real-time vehicle positions via SFRTA GTFS-RT feed (protobuf decoded in-browser)
- 🚂 **All 5 operators** — Tri-Rail, Amtrak, Brightline, FEC Freight, CSX Freight
- ⚡ **Speed display** — live mph on every train marker
- 🎯 **Follow mode** — tap a train to lock the camera and follow it across the map
- 🔔 **Arrival alerts** — toast and browser notifications when trains approach your station

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
- 🔍 **Train search** — instantly filter the train list by name, number, or operator
- 📏 **Distance display** — see how far active trains are from your station in miles
- 📦 **Cargo info** — what each freight train is hauling
- 🕐 **Trip log** — auto-logs every train that passes near your position with CSV export

### App
- 📱 **PWA** — installable on iPhone/Android home screen, works offline
- 🔒 **Password protected** — session-based access control
- 👋 **Welcome overlay** — feature tour for first-time users
- ⌨ **Keyboard shortcuts** — full keyboard control for desktop power users (press `?` for help)
- 📊 **Live statistics** — real-time train counts in the panel footer
- 🔄 **Refresh countdown** — visual indicator for API polling cycle

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
