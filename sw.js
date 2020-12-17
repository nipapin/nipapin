const staticCacheName = "static-name-v1";

const staticAssets = [
  "./",
  "./icon/apple-icon-144x144-dunplab-manifest-26017.png",
  "./icon/android-icon-192x192-dunplab-manifest-26017.png",
  "./style.css",
  "./core.js",
  "./app.js",
  "./lib/p5.js",
  "./lib/Chart.min.js",
];

self.addEventListener("install", async (event) => {
  const cache = await caches.open(staticCacheName);
  await cache.addAll(staticAssets);
});

self.addEventListener("activate", async (event) => {
  const cachesKeys = await caches.keys();
  const checkKeys = cachesKeys.map(async (key) => {
    if (staticCacheName !== key) {
      await caches.delete(key);
    }
  });
  await Promise.all(checkKeys);
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
