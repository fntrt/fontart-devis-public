# Devis autonome pour Squarespace

Fichier principal: `quote-page.html`

## Ce que fait la page
- Import d'une photo de la pièce.
- Saisie de la description, référence, poids.
- Calibration via 2 points sur une règle + distance réelle en mm.
- Détection de contours (avec paramètres d'ajustement).
- Calcul de:
  - `S` (surface en mm2)
  - `h = 0.0073 / S`
  - `Stotale = S + h * p`
- Tableau de prix:
  - Flash + Vernis: `Stotale x 0.001`
  - D1: `Stotale x 0.002 x cours or`
  - D2: `Stotale x 0.003 x cours or`
  - D3: `Stotale x 0.004 x cours or`
  - Argent 15: `Stotale x 0.002 x cours argent`
  - Argent 20: `Stotale x 0.003 x cours argent`
  - Argent 30: `Stotale x 0.004 x cours argent`

## Bloc Code Squarespace en service (fontart.fr/service-dorure-bijoux)

Le bloc n'est pas déployé depuis ce dépôt : le coller à la main dans Squarespace
(page « Service dorure bijoux » → bloc Code), puis vérifier la page déconnecté
(les scripts intégrés sont désactivés tant qu'on est connecté à Squarespace).

- **Ordinateur** : l'outil dans l'iframe, comme avant (hauteur ajustée par
  `iframeHeight`, remontée par `scrollToIframe`, nettoyage d'URL par `cleanUrl`).
- **Téléphone et tablette** : pas d'iframe (modales, appareil photo et défilement y
  sont à l'étroit) mais une carte « Commencer mon devis » qui ouvre
  `devis.fontart.fr` en plein écran. Même site que fontart.fr : la connexion est
  conservée. La page seule affiche « ← fontart.fr » pour revenir.
- Lien d'e-mail sur téléphone (vérification, mot de passe : `?mode=…&oobCode=…`) :
  redirection directe vers l'outil, sans la carte. Les autres paramètres (`?v=…`)
  sont transmis par le bouton.
- Détection mobile identique à `FA.isMobile` dans `quote-page.html` (garder les deux alignées).

```html
<div id="devis-mobile" style="display:none; max-width:520px; margin:0 auto; padding:22px 20px; background:#f2ece3; border:1px solid #e3dcd2; border-radius:14px; color:#1f1b17; text-align:center;">
  <p style="margin:0 0 6px; font-size:1.3rem; font-weight:600;">Votre devis de dorure en ligne</p>
  <p style="margin:0 0 16px; font-size:.98rem; line-height:1.5; color:#5b4f44;">Photographiez votre bijou à côté d'une règle graduée : le prix s'affiche automatiquement, selon la surface réelle et le cours de l'or du jour.</p>
  <a id="devis-mobile-btn" href="https://devis.fontart.fr/quote-page.html" style="display:block; padding:16px; background:#1f1b17; color:#fff; border-radius:10px; font-size:1.1rem; font-weight:600; text-decoration:none;">📷 Commencer mon devis</a>
  <p style="margin:12px 0 0; font-size:.85rem; color:#8a7a6a;">L'outil s'ouvre en plein écran. Vous pourrez l'ajouter à votre écran d'accueil.</p>
</div>
<iframe id="devis-iframe"
  src="https://devis.fontart.fr/quote-page.html"
  width="100%" height="1800" style="border:0;"
  allow="camera; serial"></iframe>
<script>
(function () {
  var ORIGIN = 'https://devis.fontart.fr';
  var BASE   = ORIGIN + '/quote-page.html';
  var iframe = document.getElementById('devis-iframe');
  var search = window.location.search.length > 1 ? window.location.search : '';

  // Téléphone / tablette : outil en plein écran plutôt que dans l'iframe
  var mobile = window.matchMedia('(pointer: coarse)').matches && navigator.maxTouchPoints > 0
            && Math.min(screen.width, screen.height) < 900;
  if (mobile) {
    iframe.parentNode.removeChild(iframe);
    // Lien d'e-mail (vérification, mot de passe) : directement dans l'outil
    if (/[?&]oobCode=/.test(search)) { window.location.replace(BASE + search); return; }
    document.getElementById('devis-mobile-btn').href = BASE + search; // ?v=… (cache), etc.
    document.getElementById('devis-mobile').style.display = 'block';
    return;
  }

  if (search) iframe.src = BASE + search;
  window.addEventListener('message', function (e) {
    if (e.origin !== ORIGIN) return;
    var d = e.data;
    if (d === 'cleanUrl') {
      window.history.replaceState({}, '', window.location.pathname);
    } else if (d && d.type === 'iframeHeight') {
      iframe.style.height = d.height + 'px';
    } else if (d && d.type === 'scrollToIframe') {
      var top = iframe.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
})();
</script>
```

## Déploiement simple

## Option 1 (recommandée): héberger la page, puis intégrer dans Squarespace
1. Dépose `quote-page.html` sur GitHub.
2. Active GitHub Pages pour ce repo.
3. Récupère l'URL publiée (exemple: `https://<user>.github.io/<repo>/quote-page.html`).
4. Dans Squarespace, ajoute un bloc `Code` dans une page et colle:

```html
<iframe
  src="https://<user>.github.io/<repo>/quote-page.html"
  width="100%"
  height="1700"
  style="border:0;"
  loading="lazy"
  allow="serial"
></iframe>
```

## Option 2: copier/coller dans un bloc Code Squarespace
Possible mais moins pratique à maintenir car le fichier est long.

## Notes importantes
- La page utilise OpenCV.js via CDN `jsdelivr`.
- Les champs "cours de l'or" et "cours de l'argent" sont actuellement saisis manuellement.
- Si tu veux un cours automatique, il faudra ajouter une API (et souvent une clé API).
