/* Service worker — offline support for o Guia do Japão.
   Estratégia: stale-while-revalidate. Mostra a versão em cache na hora
   e atualiza por baixo dos panos quando houver internet. */
const CACHE = "guia-japao-v4";
const ASSETS = [
  "./",
  "./index.html",
  "./content.json",
  "./manifest.webmanifest",
  "./icon.svg",
  "./img/plug-type-a.svg",
  "./img/plug-adapter.svg",
  "./img/suica.svg",
  "./img/pasmo.svg",
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
