/* Service worker — Font'Art Devis (PWA)
 * · quote-page.html : réseau d'abord (toujours à jour, revalidation ETag), cache en secours (hors ligne)
 * · runtime ONNX (jsDelivr), modèle U²-Net-p, icônes, vidéos : cache d'abord (gros fichiers immuables)
 * · Firebase / Firestore / cours de l'or / Hugging Face : réseau uniquement (transformers.js a son propre cache)
 * Changer VERSION à chaque déploiement qui doit purger les anciens caches. */
const VERSION = 'fontart-devis-v1';
const STATIC  = `${VERSION}-static`;
const RUNTIME = `${VERSION}-runtime`;

const PRECACHE = [
  './quote-page.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC)
      .then((c) => c.addAll(PRECACHE.map((u) => new Request(u, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const NETWORK_ONLY = [
  'firestore.googleapis.com', 'identitytoolkit.googleapis.com', 'securetoken.googleapis.com',
  'www.gstatic.com', 'firebaseapp.com', 'huggingface.co', 'hf.co',
  'allorigins.win', 'r.jina.ai',
];
const CACHE_FIRST = ['cdn.jsdelivr.net', 'fonts.gstatic.com'];

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (NETWORK_ONLY.some((h) => url.hostname.endsWith(h))) return;

  // Page principale : réseau d'abord (revalidée), secours cache
  if (url.origin === self.location.origin && url.pathname.endsWith('/quote-page.html')) {
    event.respondWith(
      fetch(new Request(req, { cache: 'no-cache' }))
        .then((res) => { if (res.ok) caches.open(STATIC).then((c) => c.put(req, res.clone())); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true }))
    );
    return;
  }

  // Gros fichiers immuables : cache d'abord
  const sameOriginAsset = url.origin === self.location.origin &&
    (/\/(models|icons|assets)\//.test(url.pathname) || url.pathname.endsWith('/manifest.json'));
  if (sameOriginAsset || CACHE_FIRST.some((h) => url.hostname.endsWith(h))) {
    event.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res.ok || res.type === 'opaque') caches.open(RUNTIME).then((c) => c.put(req, res.clone()));
        return res;
      }))
    );
  }
});
