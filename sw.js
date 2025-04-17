const cacheName = "downstream-cache-v1";
const filesToCache = [
  "/index.html",       // Ensure relative paths or URLs are correct
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);  // Cache the important files
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);  // Serve from cache if available
    })
  );
});

// Optional: To manage updates to the service worker and cache versions
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [cacheName];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (!cacheWhitelist.includes(cache)) {
            return caches.delete(cache);  // Delete old cache versions
          }
        })
      );
    })
  );
});
