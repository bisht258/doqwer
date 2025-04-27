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
  "/offline.html",  // <-- Add offline.html to the cache
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

// Cache the necessary files during the install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache and caching files");
      return cache.addAll(urlsToCache);
    })
  );
});

// Handle fetch events and return cached assets or fallback to offline.html
self.addEventListener("fetch", (event) => {
  console.log("Intercepting request for:", event.request.url); // Log the requested URL
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return the cached response
      if (response) {
        console.log("Returning cached response for:", event.request.url); // Log cache hit
        return response;
      }

      // If not in cache, make a network request and return it
      return fetch(event.request).catch(() => {
        // If the network request fails, return the offline page
        console.log("Network failed, returning offline.html");
        return caches.match("/offline.html");
      });
    })
  );
});

// Clean up old caches during activation
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName); // Delete old cache versions
          }
        })
      )
    )
  );
});
