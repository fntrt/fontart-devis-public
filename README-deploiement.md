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
></iframe>
```

## Option 2: copier/coller dans un bloc Code Squarespace
Possible mais moins pratique à maintenir car le fichier est long.

## Notes importantes
- La page utilise OpenCV.js via CDN `jsdelivr`.
- Les champs "cours de l'or" et "cours de l'argent" sont actuellement saisis manuellement.
- Si tu veux un cours automatique, il faudra ajouter une API (et souvent une clé API).
