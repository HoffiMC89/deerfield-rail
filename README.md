# 🚂 Deerfield Rail Tracker

A live, mobile-optimized train tracker for the South Florida rail corridor — built for Deerfield Beach, FL.

**Live app:** https://HoffiMC89.github.io/deerfield-rail/

---

## Features

- 📡 **Live GPS** — real-time Amtrak & Brightline positions via Amtraker API
- 🗺️ **Satellite / OSM / Dark maps** — switchable tile layers
- 🚆 **All 5 operators** — Tri-Rail, Amtrak, Brightline, FEC Freight, CSX Freight
- ⚡ **Speed display** — live mph on every train marker
- 📦 **Cargo info** — what each freight train is hauling
- 🌧️ **Rain radar** — live precipitation overlay
- 🔕 **Quiet/noise zones** — FRA quiet zones and active crossings mapped
- 🕐 **Trip log** — auto-logs every train that passes your position
- 📍 **GPS locate** — centers map on your real-time position
- 📱 **PWA** — installable on iPhone home screen, works offline

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
| Tri-Rail schedule | [tri-rail.com](https://www.tri-rail.com) |
| FEC freight schedule | [botecomm.com](https://www.botecomm.com/bote/rail/fec_sked.html) |
| Rain radar | [RainViewer](https://rainviewer.com) |
| Satellite imagery | Esri World Imagery |
| Street map | © OpenStreetMap contributors |

---

## Tech Stack

Pure HTML/CSS/JS — zero frameworks, zero build tools.  
Leaflet.js for maps · Service Worker for offline · localStorage for trip log.
