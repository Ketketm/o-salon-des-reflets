# Photos — O Salon des Reflets

> **État au 14 mai 2026 — Photos V1 LIVRÉES.**
> Gaëlle a fourni 7 photos (smartphone, 3072×4096), redimensionnées et compressées (~500 KB chacune) et installées dans `assets/photos/`. Le site est désormais visuellement complet.
>
> Le briefing ci-dessous reste valable pour une **session photo pro** ultérieure si Gaëlle souhaite monter la gamme visuelle (lumière contrôlée, cadrages éditoriaux, formats portrait optimisés). En attendant, les photos actuelles font le job.
>
> ### Mapping des photos livrées
>
> | Slot dans le site | Source | Sujet |
> |---|---|---|
> | `hero.jpg` | **photo pro 11_13_49** | **Vue panoramique 16:9 de l'intérieur** : sage à gauche, bacs au centre, bordeaux + arbre de vie + accueil à droite. La photo qui montre tout le salon en un coup d'œil. |
> | `salon-1.jpg` | 1000013903 | Coin shampoing, mur vert sauge, plantes |
> | `salon-2.jpg` | 1000013902 (square crop) | Détail postes de coupe, miroir sculpté |
> | `gaelle.jpg` | 1000013906 | Gaëlle au travail (coupe en cours) |
> | `galerie-1.jpg` | 1000013902 (alt crop) | Postes, vue large |
> | `galerie-2.jpg` | 1000013904 | Présentoir produits |
> | `galerie-3.jpg` | 1000013906 (alt crop) | Gaëlle, geste rapproché |
> | `galerie-4.jpg` | 1000013901 (alt crop) | Accueil, détail rapproché complémentaire au hero |
> | `galerie-5.jpg` | 1000013903 (alt crop) | Bac shampoing |
> | `galerie-6.jpg` | **photo pro 11_13_55** | **Devanture nette en plan large** : enseigne bordeaux script, téléphone 06 03 50 29 73, vitrines |
>
> Anciennes photos smartphone `1000013900` (devanture mouillée) et `1000013899` non utilisées : remplacées par les photos pro 2026-05-15.

---

## Photos AVANT / APRÈS — Section Résultats (à générer)

La section **Résultats** affiche 4 transformations en grille 2×2. Chaque ligne = 2 photos côte à côte (`before-N.jpg` + `after-N.jpg`). Pour l'instant, des placeholders élégants champagne avec labels "AVANT" / "APRÈS" sont en place.

### Principes de génération

- **Pas de visage** (RGPD + cohérence avec le brief). Vues 3/4 dos, nuque, profil flou.
- **Lumière constante** entre avant et après d'une même paire : même angle, même intensité, même backdrop.
- **Backdrop neutre** : crème chaud / beige rosé / mur de pierre claire (l'esthétique du salon).
- **Style photographique** : éditorial documentaire, pas Instagram. Évite "ultra HD", "8K", "hyperrealistic" (génère du plastique).
- **Privilégier Midjourney --style raw, Imagen 3, ou Flux.1-pro** pour le photoréalisme. DALL-E 3 marche aussi mais a tendance à styliser.

### Prompts (8 images, 4 paires)

---

#### Paire 1 — Balayage caramel sur brun

**`before-1.jpg`**
```
Editorial documentary photograph of a woman's long brunette hair seen from behind,
shoulder-length, dark uniform brown color, slightly dull and flat, natural texture,
soft window light from left, warm cream background, professional hair salon
documentation, no face visible, only nape and upper shoulders, 3:4 vertical,
shot on Fujifilm X-T5
```

**`after-1.jpg`**
```
Same editorial framing: long brunette hair from behind, shoulder-length, now with
warm caramel balayage highlights, hand-painted color, soft natural transitions
from root to tip, glossy healthy finish, freshly styled, same soft window light
from left, same warm cream background, no face visible, only nape and shoulders,
3:4 vertical, Fujifilm X-T5 style
```

---

#### Paire 2 — Reprise de racines blondes

**`before-2.jpg`**
```
Top-down view of a parting in long blonde hair, 4 cm of dark brown root regrowth
clearly visible against the platinum blonde lengths, dry texture, soft overhead
natural lighting, cream beige background, documentary hair salon photograph,
3:4 vertical, no face
```

**`after-2.jpg`**
```
Same top-down view of the same parting: now seamless platinum blonde from root
to tip, freshly colored, soft glossy finish, no visible regrowth, same overhead
natural lighting, same cream beige background, documentary salon photograph,
3:4 vertical, no face
```

---

#### Paire 3 — Coupe longue vers mi-long avec mouvement

**`before-3.jpg`**
```
Brunette woman seen from behind, very long hair reaching mid-back, flat without
shape or movement, brown natural color, neutral cream background, soft natural
lighting from left, editorial salon documentation, 3:4 vertical, no face visible,
back of head and upper torso only
```

**`after-3.jpg`**
```
Same brunette seen from behind, same shoulders position, hair freshly cut to
collarbone length, soft layers and gentle face-framing movement, same natural
brown color, same neutral cream background, same lighting from left, editorial
salon documentation, 3:4 vertical, no face visible
```

---

#### Paire 4 — Coiffure homme + barbe

**`before-4.jpg`**
```
Side profile silhouette of a man with overgrown brown hair, approx 6 cm grown
out around the ears and neck, stubble of irregular length on the jaw, soft
window light from right, plain warm beige studio backdrop, documentary barber
photography, 3:4 vertical, face features kept in shadow or out of frame, hair
shape clearly visible from the side
```

**`after-4.jpg`**
```
Same side profile of the same man: hair freshly cut with a clean low fade,
sharp neckline, well-styled top, beard precisely trimmed with crisp edges,
same warm window light from right, same beige studio backdrop, documentary
barber photography, 3:4 vertical, face in shadow, hair and beard shape
clearly visible
```

---

### Outils recommandés

| Outil | Force | Note |
|---|---|---|
| **Midjourney v6** | Photoréalisme, éclairage | Ajoute `--style raw --ar 3:4 --v 6` |
| **Flux.1-pro (fal.ai, Replicate)** | Cheveux ultra-réalistes | Le meilleur pour le détail capillaire |
| **Google Imagen 3** | Documentaire / éditorial | Très bon sur les portraits sans visage |
| **DALL-E 3** | Compositions précises | Tend à styliser un peu trop |

### Workflow suggéré

1. Générer les 4 paires (8 images au total).
2. Sélectionner les meilleurs résultats — viser une **cohérence visuelle** entre les paires (même teinte de fond, même intensité de lumière).
3. Compresser à JPEG 75-85 (cible 400-700 KB max chacune).
4. Déposer dans `assets/photos/` aux noms `before-1.jpg` ... `after-4.jpg`.
5. Le site les détecte automatiquement, les placeholders disparaissent.

### Alternative à la génération

Si tu préfères des **photos réelles** : la prochaine fois que Gaëlle accepte des avant/après avec une cliente (avec son accord écrit), prendre 4 paires de photos en respectant les principes ci-dessus (lumière constante, pas de visage, fond neutre). Plus authentique, plus convaincant qu'une génération IA.

---

## Briefing photo pro (à conserver pour une future session)

Liste des **10 à 12 photos** nécessaires pour le site, avec pour chacune : emplacement, sujet, cadrage, lumière, ambiance, fichier attendu.

**Règles générales**

- Lumière naturelle d'après-midi de préférence, ou tungstène chaude (3000–3200 K). **Pas de flash direct**, pas de néon.
- **Aucun visage client identifiable** (RGPD + cliché). Si une cliente apparaît : de dos, ou flou volontaire, ou cadrage qui exclut le visage.
- Gaëlle peut apparaître si elle le souhaite — en geste (mains, profil de 3/4 dos) ou en portrait pro frontal selon son choix.
- **Pas de logos de produits** identifiables au premier plan (sauf si Gaëlle veut mettre en avant une marque qu'elle utilise et que c'est négocié).
- JPEG haute qualité, ≥ 2400 px côté long.
- **Pas de filtre Instagram**, pas de virage colorimétrique violet/turquoise, pas de saturation poussée.
- Si possible, format `.webp` exporté en plus du `.jpg` (le site les sert automatiquement avec fallback).

---

## 1. Hero pleine fenêtre — `hero.jpg`

**Emplacement** : section 1, fond du hero plein écran.
**Sujet recommandé** : un **fauteuil de coiffure vu de 3/4**, miroir en arrière-plan reflétant la lumière douce d'une fenêtre, plan de travail visible (peignes alignés, un sèche-cheveux posé, une bouteille de produit). Ambiance fin d'après-midi.

**Variante de secours 1** : **détail brushing fini** — vue en plongée sur des cheveux longs aux reflets caramel/blond, lumière naturelle qui glisse, cadrage rapproché qui ne montre pas le visage.

**Variante de secours 2** : vue large du salon, un fauteuil au premier plan, l'enfilade jusqu'à la fenêtre.

**Cadrage** : 16:9 paysage très large (la photo sera affichée 100vw × 100vh avec un crop intelligent).
**Lumière** : naturelle, dorée, fin d'après-midi. Ombres douces.
**Ambiance** : calme, élégance discrète, donne envie d'entrer.
**Résolution** : 3840×2160 minimum.
**À éviter** : visages clients, pose figée, mèches colorées extrêmes, fond vide blanc clinique.

---

## 2. Le salon, photo 1 (grande verticale) — `salon-1.jpg`

**Emplacement** : section « Le salon », image dominante à droite.
**Sujet** : **vue d'ensemble du salon** depuis l'entrée ou un angle bas, fauteuil principal au centre du cadre, miroir, lumière naturelle.

**Cadrage** : 4:5 vertical (480×640 px affichés).
**Lumière** : naturelle d'après-midi, douce, dorée.
**Ambiance** : cosy, calme, soigné.
**Résolution** : 1920×2400 minimum.
**À éviter** : flash, surexposition, désordre visible.

---

## 3. Le salon, photo 2 (petit carré détail) — `salon-2.jpg`

**Emplacement** : section « Le salon », image secondaire en dessous décalée.
**Sujet** : **détail du plan de travail** — peignes en ligne, paire de ciseaux posée, un flacon de produit, légère ombre portée. Composition épurée, matière mise en avant.

**Cadrage** : 1:1 carré (320×320 px affichés).
**Lumière** : naturelle de fenêtre, ou lampe d'appoint tungstène chaude.
**Ambiance** : minutie, attention au détail, métier.
**Résolution** : 1600×1600 minimum.

---

## 4. Gaëlle — `gaelle.jpg`

**Emplacement** : section « Gaëlle, à votre écoute », photo à gauche.
**Sujet** : **Gaëlle au travail**, plusieurs options selon sa préférence :

- Option A — **mains en geste** : gros plan sur les mains de Gaëlle en train de peigner une cliente (sans visage de cliente dans le cadre), ciseaux posés à proximité.
- Option B — **portrait pro de 3/4 dos** : Gaëlle vue de dos, légèrement de profil, en train de regarder un travail dans le miroir, lumière douce.
- Option C — **portrait pro frontal classique** : Gaëlle face caméra, sourire naturel, tablier ou tenue de travail, fond doux du salon flouté en arrière-plan.

**Cadrage** : 3:4 vertical (540×720 px affichés).
**Lumière** : naturelle de fenêtre privilégiée.
**Ambiance** : professionnelle, chaleureuse, humaine.
**Résolution** : 2000×2700 minimum.
**À éviter** : pose figée studio, fond blanc, retouche peau excessive.

---

## 5. Galerie — `galerie-1.jpg`

**Sujet** : **détail d'une coupe femme finie**, lumière qui fait ressortir les reflets (caramel, miel, châtain doré), cadrage rapproché sur une mèche ou la nuque, pas de visage.
**Cadrage** : 4:3 paysage (affiché en 7 colonnes sur 12 desktop).
**Lumière** : naturelle, contre-jour doux qui fait briller le cheveu.
**Légende du site** : *« La lumière sur une mèche. »*

---

## 6. Galerie — `galerie-2.jpg`

**Sujet** : **brushing en cours ou tout juste fini**, brosse ronde posée à proximité ou lisseur encore tiède, cheveux longs ou mi-longs, mouvement de la main de Gaëlle visible en arrière-plan flou.
**Cadrage** : 4:5 vertical (affiché en 5 colonnes sur 12 desktop).
**Lumière** : tungstène chaude ou lumière de fenêtre douce.
**Légende du site** : *« Un brushing qui tient. »*

---

## 7. Galerie — `galerie-3.jpg`

**Sujet** : **plan de travail organisé** — peignes, brosses, flacons en ligne, tablette de coloration éventuelle posée sur le côté, composition épurée.
**Cadrage** : 4:3 paysage (affiché en 4 colonnes sur 12 desktop).
**Lumière** : naturelle, douce, depuis le côté.
**Composition** : ordonnée, presque graphique, matière visible.
**Légende du site** : *« Le poste de travail. »*

---

## 8. Galerie — `galerie-4.jpg`

**Sujet** : **reflets d'un balayage** sur cheveux longs, prise de vue 3/4 dos, mèches contrastées entre racine et longueur, lumière qui glisse.
**Cadrage** : 1:1 carré (affiché en 4 colonnes sur 12 desktop).
**Lumière** : naturelle de fenêtre.
**Légende du site** : *« Les reflets, sur-mesure. »*

---

## 9. Galerie — `galerie-5.jpg`

**Sujet** : **fauteuil du salon** vu de côté ou face, vide, lumière de fin d'après-midi qui découpe l'objet, ambiance « invitation à s'asseoir ».
**Cadrage** : 4:3 paysage (affiché en 4 colonnes sur 12 desktop).
**Lumière** : dorée, fin d'après-midi.
**Légende du site** : *« Le fauteuil, en silence. »*

---

## 10. Galerie — `galerie-6.jpg`

**Sujet** : **espace d'accueil du salon** — comptoir, plante verte, présentoir produits, un café posé éventuellement, lumière de fenêtre.
**Cadrage** : 3:2 paysage (affiché en 6 colonnes sur 12 desktop).
**Lumière** : naturelle, douce.
**Ambiance** : « entrez, vous êtes attendu·e ».
**Légende du site** : *« L'accueil, au calme. »*

---

## 11. Open Graph (partage réseaux) — `og-image.jpg`

**Emplacement** : image qui apparaît quand le site est partagé sur Facebook, WhatsApp, etc.
**Sujet** : la **hero image** recadrée au format Open Graph (1200×630), avec éventuellement le nom du salon en filigrane Cormorant Garamond crème en bas à gauche, et l'adresse `200 Bd Vincent Auriol — Montauban` en petit dessous.

**Cadrage** : 1200×630 strict.
**Composition** : utiliser une partie de l'image hero (fauteuil + miroir + lumière), recadrée avec un léger overlay brun chocolat pour le texte.
**Résolution** : 1200×630 exactement, < 200 ko.

---

## 12. Favicon et icônes d'app (optionnel — peut attendre)

- `favicon.svg` (16×16, 32×32) — monogramme « **O** » en Cormorant 700 sur fond crème ou champagne.
- `apple-touch-icon.png` (180×180) — même monogramme, fond plein champagne.

---

## Récapitulatif des fichiers à fournir

| # | Fichier | Format | Résolution mini | Priorité |
|---|---------|--------|-----------------|----------|
| 1 | `hero.jpg` | JPEG | 3840×2160 | **Critique** |
| 2 | `salon-1.jpg` | JPEG | 1920×2400 | **Critique** |
| 3 | `salon-2.jpg` | JPEG | 1600×1600 | Important |
| 4 | `gaelle.jpg` | JPEG | 2000×2700 | **Critique** |
| 5 | `galerie-1.jpg` | JPEG | 2400×1800 | **Critique** |
| 6 | `galerie-2.jpg` | JPEG | 1920×2400 | **Critique** |
| 7 | `galerie-3.jpg` | JPEG | 2400×1800 | Important |
| 8 | `galerie-4.jpg` | JPEG | 2400×2400 | Important |
| 9 | `galerie-5.jpg` | JPEG | 2400×1800 | Important |
| 10 | `galerie-6.jpg` | JPEG | 2400×1600 | Souhaité |
| 11 | `og-image.jpg` | JPEG | 1200×630 | Important |
| 12 | `favicon.svg` + `apple-touch-icon.png` | SVG + PNG | — | Optionnel |

**Total** : **6 critiques** + **4 importantes** + **2 optionnelles**.

Une fois les photos déposées dans `assets/photos/`, le site les détecte automatiquement (les chemins sont déjà câblés dans `index.html`). En attendant, des **placeholders rayés crème** s'affichent automatiquement à la place de chaque image manquante.
