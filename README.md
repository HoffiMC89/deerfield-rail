# 🚂 Deerfield Rail Tracker

A live, mobile-optimized train tracker for the South Florida rail corridor — built for Deerfield Beach, FL.

**Live app:** https://HoffiMC89.github.io/deerfield-rail/

---

## What's New

### April 2026

- 🌙 **Night mode auto-switch** — automatically switches to dark map tiles after sunset and back to satellite at sunrise, using solar position calculation for South Florida. Manual layer picks override it.
- 🔔 **Train proximity alerts** — browser notifications + in-app toasts when a train is within 5 minutes of your selected station. Supports native push notifications on desktop/mobile.
- 🌧 **Live RainViewer radar** — rain overlay now fetches the latest radar frame timestamp from the RainViewer API instead of using a static URL. Auto-refreshes every 5 minutes while active.
- 📅 **Weekend schedule indicator** — detects Saturday/Sunday and shows a badge in the header, plus a toast warning about reduced Tri-Rail weekend service.
- 🎞 **Smooth marker animation** — train markers now glide smoothly between positions instead of jumping, using eased interpolation over 800ms.
- 🔔 **Toast notification system** — in-app notification toasts for night mode switches, approaching trains, and schedule alerts.

---

## Features

### Live Tracking
- 📡 **Live GPS** — real-time Amtrak & Brightline positions via Amtraker API
- 🚆 **Tri-Rail Live GPS** — real-time vehicle positions via SFRTA GTFS-RT feed (protobuf decoded in-browser)
- 🚂 **All 5 operators** — Tri-Rail, Amtrak, Brightline, FEC Freight, CSX Freight
- ⚡ **Speed display** — live mph on every train marker
- 🎯 **Follow mode** — tap a train to lock the camera and follow it across the map
- 🎞 **Smooth animation** — train markers glide between updates instead of jumping

### Map & Layers
- 🛰 **Satellite / ORM / OSM / Dark maps** — switchable tile layers (satellite default)
- 🛤 **Real track geometry** — OSM-sourced rail lines snapped to actual railroad positions (SFRC + FEC)
- 🌧 **Rain radar** — live precipitation overlay from RainViewer with auto-refreshing timestamps
- ⛶ **Fullscreen map** — toggle for distraction-free viewing
- 🌙 **Night mode** — auto-switches to dark tiles after sunset, satellite at sunrise

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
- 📅 **Weekend schedule** — detects weekends and shows reduced service indicator

### Notifications & Alerts
- 🔔 **Train proximity alerts** — notifies you when a train is 5 minutes from your station
- 🔔 **Toast notifications** — in-app notification system for approaching trains, night mode, and schedule changes
- 📲 **Browser push notifications** — native notifications on desktop and mobile (requires permission)

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
