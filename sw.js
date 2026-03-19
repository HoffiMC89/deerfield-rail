// Deerfield Rail Tracker — Service Worker
// Caches all assets for offline use

const CACHE = "deerfield-rail-v1";
const ASSETS = [
  "/deerfield-rail/",
  "/deerfield-rail/index.html",
  "/deerfield-rail/manifest.json",
  "/deerfield-rail/icon-192.png",
  "/deerfield-rail/icon-512.png",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js",
];

// Install: cache all core assets
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

// Activate: remove old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: cache-first for assets, network-first for API calls
self.addEventListener("fetch", e => {
  const url = e.request.url;

  // Always go live for train APIs and weather/map tiles
  if (
    url.includes("amtraker.com") ||
    url.includes("rainviewer.com") ||
    url.includes("arcgisonline.com") ||
    url.includes("openstreetmap.org") ||
    url.includes("carto.com")
  ) {
    e.respondWith(
      fetch(e.request).catch(() => new Response("", { status: 503 }))
    );
    return;
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const copy = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy));
        }
        return resp;
      }).catch(() => caches.match("/deerfield-rail/index.html"));
    })
  );
});
