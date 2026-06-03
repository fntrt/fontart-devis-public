# SEO — Page Squarespace « service-dorure-bijoux »

> Le SEO doit vivre sur la **page Squarespace** (celle que Google classe), **pas**
> dans l'iframe `quote-page.html` (URL GitHub Pages que personne ne cherche).
> Ce fichier rassemble le contenu prêt à coller. Remplace les `⟨PLACEHOLDERS⟩`.

---

## ① Panneau SEO de la page (titre + description)

**Squarespace → Pages → (la page) → ⚙️ Réglages → onglet SEO**

**Titre SEO** (≤ 60 caractères) :
```
Dorure de bijoux : devis en ligne instantané | Fontart
```

**Description de recherche** (≤ 160 caractères) :
```
Calculez le prix de dorure de vos bijoux à partir d'une photo : flash or, dorure 1 à 3 µm, vernis. Devis instantané et commande en ligne. Atelier Fontart.
```

---

## ② Injection de code — En-tête de la page

**Squarespace → Pages → (la page) → ⚙️ Réglages → Avancé → Injection de code (en-tête de page)**

> ⚠️ Mets bien ça dans l'injection **de la page** (pas du site entier), pour que
> l'Open Graph et le JSON-LD décrivent cette page précise.

```html
<!-- Open Graph (aperçu lors d'un partage Facebook, LinkedIn, WhatsApp…) -->
<meta property="og:type" content="website" />
<meta property="og:locale" content="fr_FR" />
<meta property="og:site_name" content="Fontart" />
<meta property="og:title" content="Dorure de bijoux : devis en ligne instantané — Fontart" />
<meta property="og:description" content="Calculez le prix de dorure de vos bijoux à partir d'une photo : flash or, dorure 1 à 3 µm, vernis. Devis instantané et commande en ligne." />
<meta property="og:url" content="https://www.fontart.fr/service-dorure-bijoux" />
<meta property="og:image" content="⟨URL_IMAGE_1200x630⟩" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Dorure de bijoux : devis en ligne instantané — Fontart" />
<meta name="twitter:description" content="Devis de dorure de bijoux à partir d'une photo : flash or, dorure 1 à 3 µm, vernis." />
<meta name="twitter:image" content="⟨URL_IMAGE_1200x630⟩" />

<!-- Données structurées : le service de dorure -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Dorure de bijoux sur mesure",
  "serviceType": "Dorure, placage or et argenture de bijoux",
  "description": "Service de dorure de bijoux (flash or, dorure 1 à 3 µm, vernis cataphorèse) avec devis en ligne instantané calculé à partir d'une photo de la pièce.",
  "url": "https://www.fontart.fr/service-dorure-bijoux",
  "areaServed": { "@type": "Country", "name": "France" },
  "provider": {
    "@type": "Organization",
    "name": "Fontart",
    "url": "https://www.fontart.fr/"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "description": "Tarif calculé selon la surface du bijou et le cours de l'or (flash + vernis, dorure 1 / 2 / 3 µm)."
  }
}
</script>
```

---

## ③ (Optionnel mais fort impact local) — En-tête du SITE

**Squarespace → Réglages → Avancé → Injection de code → En-tête**

Si Fontart est un atelier physique, ce bloc aide le **référencement local**
(« dorure bijoux + ville », pack local Google Maps). À placer **une fois** au
niveau du site, sur la page d'accueil idéalement.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Fontart",
  "image": "⟨URL_LOGO_OU_PHOTO⟩",
  "url": "https://www.fontart.fr/",
  "telephone": "+33 4 75 30 54 34",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "400 Rue du Garail",
    "postalCode": "07310",
    "addressLocality": "Saint-Martin-de-Valamas",
    "addressCountry": "FR"
  },
  "priceRange": "€€",
  "description": "Atelier de dorure et placage or de bijoux. Devis de dorure en ligne à partir d'une photo."
}
</script>
```

---

## Notes importantes

- **Pas de fausses étoiles d'avis.** Google ignore/pénalise les `AggregateRating`
  auto-déclarés sur les pages de service, et la page Squarespace statique ne peut
  pas lire la vraie note (Firestore) en temps réel. Le système de notation reste
  utile comme signal de confiance **dans l'app** et pour collecter du feedback —
  mais ne comptons pas dessus pour des étoiles dans Google.
- **Image OG** : prépare une image 1200×630 px (logo + bijou doré + mention
  « Devis de dorure en ligne »). Héberge-la (Squarespace ou ailleurs) et mets son
  URL dans `og:image` / `twitter:image`.
- **Le JSON-LD dans `quote-page.html`** (iframe) devient redondant ; on peut le
  laisser (inoffensif) ou le retirer plus tard.
- **Vérification** : après publication, teste l'URL de la page dans le
  [Test des résultats enrichis Google](https://search.google.com/test/rich-results)
  et le [Partage LinkedIn/Facebook Debugger](https://developers.facebook.com/tools/debug/).
```
