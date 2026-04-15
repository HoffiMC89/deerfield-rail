// Deerfield Rail Tracker — Service Worker
// Cache-first for app shell, network-first for live data,
// stale-while-revalidate for map tiles (fast + always fresh).

const CACHE_VERSION = "v2";
const APP_CACHE  = "deerfield-rail-app-"  + CACHE_VERSION;
const TILE_CACHE = "deerfield-rail-tiles-" + CACHE_VERSION;
const TILE_CACHE_MAX = 300; // approximate cap to keep disk usage bounded

const ASSETS = [
  "/deerfield-rail/",
  "/deerfield-rail/index.html",
  "/deerfield-rail/manifest.json",
  "/deerfield-rail/icon-192.png",
  "/deerfield-rail/icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",
  "https://cdn.jsdelivr.net/npm/protobufjs@7/dist/protobuf.min.js",
];

// Hosts that serve live / volatile data — always network-first.
const LIVE_HOSTS = [
  "api-v3.amtraker.com",
  "gtfsr.tri-rail.com",
  "tri-rail.com",
  "corsproxy.io",
  "api.allorigins.win",
  "api.rainviewer.com",
  "tilecache.rainviewer.com",
  "api.weather.gov",
  "overpass-api.de",
  "overpass.kumi.systems",
  "services.arcgis.com",
  "fl511.com",
];

// Hosts whose tiles benefit from stale-while-revalidate caching
const TILE_HOSTS = [
  "tile.openstreetmap.org",
  "a.tile.openstreetmap.org",
  "b.tile.openstreetmap.org",
  "c.tile.openstreetmap.org",
  "basemaps.cartocdn.com",
  "a.basemaps.cartocdn.com",
  "b.basemaps.cartocdn.com",
  "c.basemaps.cartocdn.com",
  "d.basemaps.cartocdn.com",
  "tiles.openrailwaymap.org",
  "a.tiles.openrailwaymap.org",
  "b.tiles.openrailwaymap.org",
  "c.tiles.openrailwaymap.org",
  "server.arcgisonline.com",
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(APP_CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys
        .filter(k => k !== APP_CACHE && k !== TILE_CACHE)
        .map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Keep the tile cache from growing unbounded
async function trimTileCache() {
  try {
    const c = await caches.open(TILE_CACHE);
    const keys = await c.keys();
    if (keys.length <= TILE_CACHE_MAX) return;
    // Remove the oldest ~20% of entries
    const drop = Math.ceil(keys.length * 0.2);
    for (let i = 0; i < drop; i++) await c.delete(keys[i]);
  } catch (e) { /* ignore */ }
}

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  let url;
  try { url = new URL(e.request.url); } catch { return; }
  const host = url.hostname;

  // 1. Live / volatile APIs — network only, fall back to empty response
  if (LIVE_HOSTS.some(h => host === h || host.endsWith("." + h) || host.includes(h))) {
    e.respondWith(
      fetch(e.request).catch(() => new Response("", { status: 503 }))
    );
    return;
  }

  // 2. Map tiles — stale-while-revalidate (fast + fresh)
  if (TILE_HOSTS.some(h => host === h || host.endsWith("." + h))) {
    e.respondWith(
      caches.open(TILE_CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          const fresh = fetch(e.request).then(resp => {
            if (resp && resp.status === 200) {
              cache.put(e.request, resp.clone());
              // Opportunistic trim (don't await)
              trimTileCache();
            }
            return resp;
          }).catch(() => cached);
          return cached || fresh;
        })
      )
    );
    return;
  }

  // 3. Default — cache-first for app shell, fall back to network, then to index
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200 && resp.type !== "opaqueredirect") {
          const copy = resp.clone();
          caches.open(APP_CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return resp;
      }).catch(() => caches.match("/deerfield-rail/index.html"));
    })
  );
});
