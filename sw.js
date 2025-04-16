const cacheName = "downstream-cache-v1";
const filesToCache = [
  "/Pwa/",
  "/Pwa/index.html",
  "/Pwa/manifest.json",
  "/Pwa/icon-192.png",
  "/Pwa/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
