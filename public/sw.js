const CACHE_LIST = [
  "/",
  "style.css",
  "chat.css",
  "manifest.json",
  "pwa.js",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js",
  "/socket.io/socket.io.js",
  "/modules/chat.js",
  "/modules/collision.js",
  "/modules/controls.js",
  "/modules/cutscenes.js",
  "/modules/draw.js",
  "/modules/images.js",
  "/modules/music.js",
  "/modules/offline.js",
  "/modules/player.js",
  "/modules/server.js",
  "/modules/transition.js",
  "/audio/pixelwood-forest.mp3",
  "/images/bean.jpg",
  "/images/bean.png",
  "/images/bed.png",
  "/images/blue-button.png",
  "/images/blue-flower.png",
  "/images/cave.png",
  "/images/chest-closed.png",
  "/images/chest-open.png",
  "/images/coal.png",
  "/images/diamond-axe.png",
  "/images/diamond-ingot.png",
  "/images/diamond-pickaxe.png",
  "/images/diamond-sword.png",
  "/images/diamond.png",
  "/images/dirt.png",
  "/images/emerald-axe.png",
  "/images/emerald-ingot.png",
  "/images/emerald-pickaxe.png",
  "/images/emerald-sword.png",
  "/images/emerald.png",
  "/images/fence-horizontal.png",
  "/images/fence-post.png",
  "/images/fence-vertical.png",
  "/images/fire.gif",
  "/images/flower.png",
  "/images/fountain.png",
  "/images/furnace.png",
  "/images/glass.png",
  "/images/gold-axe.png",
  "/images/gold-ingot.png",
  "/images/gold-pickaxe.png",
  "/images/gold-sword.png",
  "/images/gold.png",
  "/images/grass.png",
  "/images/gray-button.png",
  "/images/house.png",
  "/images/iron-axe.png",
  "/images/iron-ingot.png",
  "/images/iron-pickaxe.png",
  "/images/iron-sword.png",
  "/images/iron.png",
  "/images/ladder.png",
  "/images/path.png",
  "/images/pixelwood-logo_big.png",
  "/images/pixelwood-logo.png",
  "/images/plank.png",
  "/images/platinum-axe.png",
  "/images/platinum-ingot.png",
  "/images/platinum-pickaxe.png",
  "/images/platinum-sword.png",
  "/images/platinum.png",
  "/images/play-button.png",
  "/images/player.png",
  "/images/purple-flower.png",
  "/images/replit-logo.png",
  "/images/rocks.png",
  "/images/ruby-axe.png",
  "/images/ruby-ingot.png",
  "/images/ruby-pickaxe.png",
  "/images/ruby-sword.png",
  "/images/ruby.png",
  "/images/sign.png",
  "/images/small-tree.png",
  "/images/torch.png",
  "/images/tree.png",
  "/images/wooden-axe.png",
  "/images/wooden-pickaxe.png",
  "/images/wooden-sword.png",
  "/images/workbench.png",
];

const STATIC_CACHE_VERSION = `static-v1-${new Date().getTime()}`;

self.addEventListener("install", function (event) {
  const onSuccessCachesOpen = (cache) => {
    return cache.addAll(CACHE_LIST);
  }

  event.waitUntil(
    caches.open(STATIC_CACHE_VERSION).then(onSuccessCachesOpen)
  );
});

self.addEventListener("activate", (event) => {
  const onSuccessCachesKeys = (cacheNames) => {
    return Promise.all(
      cacheNames.map((cache) => {
          if (cache !== STATIC_CACHE_VERSION) {
            return caches.delete(cache)
          }
      })
    )
  }

  event.waitUntil(caches.keys().then(onSuccessCachesKeys));
});

self.addEventListener("fetch", (event) => {
  const FALLBACK_URL = CACHE_LIST[0];

  const onSuccessFetch = response => {
    if (CACHE_LIST.includes(new URL(event.request.url).pathname)) return response
      const onSuccessDynamicCacheOpen = cache => {
      cache.put(event.request.url, response.clone())
      return response
    }

    return caches
    .open(STATIC_CACHE_VERSION)
    .then(onSuccessDynamicCacheOpen)
    .catch(() => caches.match(FALLBACK_URL))
  }

  const onErrorFetch = () => {
    const onSuccessCacheMatch = response => {
      if (response) return response
      else return caches.match(FALLBACK_URL)
    }

    return caches.match(event.request).then(onSuccessCacheMatch)
  }

  event.respondWith(
    fetch(event.request)
    .then(onSuccessFetch)
    .catch(onErrorFetch)
  );
});