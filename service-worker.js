const CACHE_NAME = "muras-v1";

const FILES_TO_CACHE = [

  "./",

  "./index.html",

  "./style.css",

  "./app.js",

  "./manifest.json",

  "./images/achik-tash.jpg"

];


self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(FILES_TO_CACHE);

      })

  );

});


self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

      .then(cachedResponse => {

        if (cachedResponse) {

          return cachedResponse;

        }

        return fetch(event.request);

      })

  );

});
