const CACHE_NAME = "lpu-shopping-cache-v1";
const urlsToCache = [
  "/index.html",
  "/style.css",
  "/login.html",
  "/index2.html",
  "/cart.html",
  "/shoes.html",
  "/figma1.html",
  "/figma2.html",
  "/game.html",
  "/todo.html",
  "/movie.html",
  "/joke.html",
  "/pass.html",
  "/logout.html",
  "/offline.html", // <-- add offline.html to cache!
  "/images/a.webp",
  "/images/b.webp",
  "/images/c.webp",
  "/images/d.webp",
  "/images/e.webp",
  "/images/f.webp",
  "/images/g.webp",
  "/images/h.webp",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
  "https://code.jquery.com/jquery-3.5.1.slim.min.js",
  "https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js",
  "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"
];

// Install event - cache all assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache).catch((error) => {
        console.error('Failed to cache files during install', error);
      });
    })
  );
});

// Fetch event - serve from cache or network, fallback to offline page
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Cache hit
      }
      return fetch(event.request).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/offline.html'); // <-- fallback to offline.html
        }
      });
    })
  );
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => 
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
