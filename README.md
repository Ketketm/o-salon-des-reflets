# Ô Salon des Reflets

Site vitrine du salon de coiffure **Ô Salon des Reflets**, tenu par Gaëlle à Montauban.

- Adresse : 200 Bd Vincent Auriol, 82000 Montauban
- Téléphone : 06 03 50 29 73
- Réservation : [Planity](https://www.planity.com/o-salon-des-reflets-82000-montauban) (5,0 / 5 · 135 avis)
- Instagram : [@osalondesreflets](https://www.instagram.com/osalondesreflets/)

## Stack

Site statique sans framework. HTML5 sémantique, CSS pur (variables), JavaScript vanilla. Zero build step, zero dépendance externe à l'exception des Google Fonts (Cormorant Garamond + Inter).

## Structure

```
.
├── index.html          # Page unique, ~1370 lignes
├── styles.css          # Design system + V2/V3 effets (~2900 lignes)
├── script.js           # Sliders avant/après, widget contact, scroll progress, etc.
├── assets/photos/      # 25+ photos pro compressées
├── robots.txt          # Indexation Google
├── sitemap.xml         # Sitemap avec image schema
├── site.webmanifest    # PWA manifest
├── brief.md            # Brief stratégique complet (interne)
├── PHOTO-PROMPTS.md    # Briefing photo (interne)
└── email-presentation.md  # Email de présentation à Gaëlle (interne)
```

## Caractéristiques

- 11 sections numérotées (I à XI)
- 7 avant/après interactifs avec curseur draggable + 1 triple mariage
- Widget contact flottant (Planity + Téléphone)
- Map preview au survol de l'adresse (Infos + Footer)
- SEO local poussé : 3 blocs JSON-LD (HairSalon, FAQPage, Person), géo tags, microdata
- Responsive mobile-first
- Accessibilité : skip link, focus visible, prefers-reduced-motion respecté

## Déploiement

Site hébergé sur Vercel, déploiement continu via GitHub.

```bash
# Local preview
open index.html

# Production
vercel --prod
```

## Crédits

Conception, intégration et copy : Arthur Souleil — arthursouleil@gmail.com
