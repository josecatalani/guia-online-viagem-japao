/* Service worker — offline support for o Guia do Japão.
   Estratégia: stale-while-revalidate. Mostra a versão em cache na hora
   e atualiza por baixo dos panos quando houver internet. */
const CACHE = "guia-japao-v7";
const ASSETS = [
  "./",
  "./index.html",
  "./content.json",
  "./location-extras.json",
  "./manifest.webmanifest",
  "./icon.svg",
  "./img/plug-type-a.svg",
  "./img/plug-adapter.svg",
  "./img/suica.svg",
  "./img/pasmo.svg",
  "./img/locations/01.jpg",
  "./img/locations/02.jpg",
  "./img/locations/03.jpg",
  "./img/locations/04.jpg",
  "./img/locations/05.jpg",
  "./img/locations/06.jpg",
  "./img/locations/07.jpg",
  "./img/locations/08.jpg",
  "./img/locations/09.jpg",
  "./img/locations/10.jpg",
  "./img/locations/11.jpg",
  "./img/locations/12.jpg",
  "./img/locations/13.jpg",
  "./img/locations/14.jpg",
  "./img/locations/15.jpg",
  "./img/locations/16.jpg",
  "./img/locations/17.jpg",
  "./img/locations/18.jpg",
  "./img/locations/19.jpg",
  "./img/locations/20.jpg",
  "./img/locations/21.jpg",
  "./img/locations/22.jpg",
  "./img/locations/23.jpg",
  "./img/locations/24.jpg",
  "./img/locations/25.jpg",
  "./img/locations/26.jpg",
  "./img/locations/27.jpg",
  "./img/locations/28.jpg",
  "./img/locations/29.jpg",
  "./img/locations/30.jpg",
  "./img/locations/31.jpg",
  "./img/locations/32.jpg",
  "./img/locations/33.jpg",
  "./img/locations/34.jpg",
  "./img/locations/35.jpg",
  "./img/locations/36.jpg",
  "./img/locations/37.jpg",
  "./img/locations/38.jpg",
  "./img/locations/39.jpg",
  "./img/locations/40.jpg",
  "./img/locations/41.jpg",
  "./img/locations/42.jpg",
  "./img/locations/43.jpg",
  "https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
];

self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(ASSETS.map(async (url) => {
      try {
        const res = await fetch(new Request(url, { cache: "reload" }));
        if (res && (res.ok || res.type === "opaque")) await cache.put(url, res);
      } catch (_) { /* ignora recursos que não baixaram */ }
    }));
    self.skipWaiting();
  })());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(req, { ignoreSearch: false });
    const network = fetch(req).then((res) => {
      if (res && (res.ok || res.type === "opaque")) cache.put(req, res.clone());
      return res;
    }).catch(() => null);

    return cached || (await network) || Response.error();
  })());
});
