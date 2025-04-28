// Name of the cache
const CACHE_NAME = "lpu-shopping-cache-v1";

// Function to add resources to cache
const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(resources);
};

// Function to match cache first, then network
const cacheMatch = async (request) => {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (error) {
    // If fetch fails (e.g., offline), show offline page for navigation requests
    if (request.mode === "navigate") {
      return caches.match("/offline.html");
    }
    return new Response("Resource not available", {
      status: 404,
      statusText: "Not Found",
    });
  }
};

// Install event
self.addEventListener("install", (event) => {
  event.waitUntil(
    addResourcesToCache([
      "/index.html",
      "/login.html",
      "/cart.html",
      "/checkout.html",
      "/shoes.html",
      "/figma1.html",
      "/figma2.html",
      "/figma3.html",
      "/game.html",
      "/game1.css",
      "/game2.js",
      "/todo.html",
      "/todo2.js",
      "/todo1.css",
      "/movie.html",
      "/movie2.css",
      "/movie3.js",
      "/pass.html",
      "/pass2.css",
      "/pass3.js",
      "/logout.html",
      "/offline.html",
      "/joke.html",
      "/joke2.css",
      "/joke3.js",
      "/shoes2.css",
      "/style.css",
      "/script.js",
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
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js",
    ])
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  event.respondWith(cacheMatch(event.request));
});

// Activate event (optional: clean up old caches)
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
