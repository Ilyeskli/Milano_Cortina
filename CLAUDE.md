# Milano Cortina 2026 — site statique

Site vitrine (fan/portail) des Jeux Olympiques d'hiver Milano Cortina 2026, construit page par page d'après une maquette **Figma**. Contenu et UI en **français**.

## Stack & contraintes

- **HTML/CSS/JS pur**, aucun build, aucun framework, aucune dépendance.
- Ouvert en **`file://` dans Safari** (pas de serveur local). Donc : pas de modules ES, pas de fetch cross-file, chemins **relatifs**.
- Une seule feuille de styles partagée : **`styles.css`** (~5700 lignes).
- Le user code surtout en français ; rédiger le contenu en **vrai copywriting français** (pas de lorem, pas de texte copié).

## ⚠️ Cache-busting (LE piège récurrent n°1)

Safari met en cache `styles.css` / les `.js` agressivement. Mettre `?v=` sur le **HTML ne suffit pas** — il faut versionner **chaque lien d'asset**.

- Convention : `href="styles.css?v=N"`, `src="site-header.js?v=N"`, etc.
- **Après TOUTE modif de `styles.css`** : incrémenter le numéro et le **propager sur les 20 pages** (la version doit être identique partout) :
  ```bash
  perl -0pi -e 's/styles\.css\?v=ANCIEN/styles.css?v=NOUVEAU/g' *.html
  ```
- Idem pour `site-header.js`, `site-footer.js`, ou un JS de page après édition.
- Si « la modif n'apparaît pas » → 99 % du temps c'est la version pas bumpée. Hard reload : **Cmd+Option+R**.
- Versions actuelles (référence, à incrémenter) : `styles.css?v=30`, `site-header.js?v=3`, `site-footer.js?v=1`, `script.js?v=13`, `profil.js?v=1`, `athletes.js?v=2`, `tous-les-athletes.js?v=2`, `billetterie.js?v=3`.

## Composants réutilisables (injection JS)

- **`site-header.js`** : injecté via `<div id="site-header"></div><script src="site-header.js?v=N"></script>`. Source unique du header sur **toutes** les pages.
  - Ajoute `document.body.classList.add("home-page")` partout — car **tout le style du header est gated sous `.home-page`** (les pages internes ne l'auraient pas sinon). `.home-page` ne style QUE le header + ses variables ; ne pas l'enlever.
  - **Logo → toujours `index.html`** (retour accueil depuis n'importe quelle page). « Épreuves » est une section de la home (`index.html#epreuves`), pas la route d'accueil.
  - Gère le menu mobile (toggle, Échap, fermeture au clic d'un lien), l'état actif de la nav, les icônes SVG (hamburger/close).
- **`site-footer.js`** : même principe via `<div id="site-footer"></div>`. Contient le footer complet + la logique newsletter.
- **`script.js`** : logique **home uniquement** (scroll-spy nav, onglets sites, vidéo hero hover/play, reveals). Le menu et la newsletter ont été déplacés dans les composants partagés.
- Les « composants » purement visuels (badges, cards) sont des **classes CSS canoniques partagées**, pas du JS.

## Système de design (à respecter pour la cohérence)

- **Style « frosted » olympique** = signature récurrente : `border: 2-3px solid rgba(255,255,255,.5)` + `box-shadow: 0 0 0 Npx rgba(255,255,255,.25)` (halo). Présent sur boutons, badges, cards, bannières. **Pas d'ombre portée** sur les boutons (le user n'en veut pas).
- **Badges** : `.home-news-tag` (pill sombre translucide `rgba(11,23,51,.1)` + `backdrop-filter: blur` + texte blanc majuscule) = le badge de référence des cards articles. `.home-ticket-card span` = équivalent sur la card magenta. Opacité des fonds de badge volontairement basse (~0.1).
- **Cards CTA** : composant **`home-ticket-card`** (fond magenta + ruban `ticket-card-ribbon.png` + badge + bouton verre). Pour une CTA bas-de-page, réutiliser `<article class="home-ticket-card cta-card">` (la classe `cta-card` regroupe les actions à droite sans étirer le lien). Utilisé sur billetterie, athletes, profil.
- **Cards articles** : `home-news-card` (fond image plein + overlay + ruban + texte blanc). La card « À la une » des athlètes (`.ath-featured`) suit ce modèle.
- **Bannière de page** : `.med-pageheader` (card rose dégradée + ruban `news-ribbon.png` + bordure 3px + halo) contenant `med-breadcrumb` + `<h1>`. Présente sur **athletes, classement, medailles, tous-les-athletes, profil**. Toute page « interne » avec un fil d'ariane doit l'utiliser. (`sites.html`/`profil` hero ont des intros spécifiques.)
- **Boutons** :
  - `.btn-cta` = bouton primaire magenta (dégradé + contour blanc + halo, **sans ombre portée**).
  - `.home-button` + `.home-button-dark` / `.home-button-glass` = boutons verre (contour blanc + halo) pour fonds sombres/images. Le hero home « Voir le programme » est la référence ; les boutons transparents doivent matcher sa taille/padding.
- **Couleurs** : `--magenta`, `--violet`, `--ink`, `--muted`, `--line` (voir `:root` dans styles.css). Dégradé signature : `linear-gradient(105deg, var(--magenta), var(--violet))`.

## Patterns de filtres

Deux comportements selon le contexte :
1. **Promote + dim** (billetterie sessions, athletes grille) : les éléments correspondants **remontent en tête** (`.is-match`, surlignés), les autres restent visibles **atténués** (`.is-dim`, opacité ~0.5) sous un séparateur (`.dim-start` / `.ath-sep` « Autres … »). Réordonnancement DOM via `insertBefore`/`appendChild`, ordre initial mémorisé pour restauration. État vide dédié si 0 correspondance.
2. **Hide/show** (annuaire `tous-les-athletes` qui a une **recherche**) : on masque les non-correspondants (`display:none`) — c'est le bon pattern quand on *réduit* une liste. Inclut un « Charger plus » (cap initial à 12, révèle le reste).
- **Recherche texte** : toujours **normaliser** accents/ligatures, sinon « klaebo » ne matche pas « Klæbo » :
  ```js
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"")
   .replace(/æ/g,"ae").replace(/œ/g,"oe").replace(/ø/g,"o").replace(/ß/g,"ss")
  ```
  Normaliser AUSSI la valeur du filtre actif (ex. pill « Saut à ski »).

## Images d'athlètes

- Photos dans `assets/athletes/<nom>.jpg` (portrait ~572×800).
- **Cadrage visage** : utiliser `background-position: center 20%` (et non `center top` qui montre le haut du crâne) sur `.ath-card`, `.prof-disc-card`, `.prof-hero-photo`. La card large `.ath-featured` utilise `center 38%`. Compromis générique ; surcharger une card précise si besoin.

## Page profil athlète (dynamique)

- `profil.html?athlete=<clé>` → `profil.js` remplit la page depuis un jeu de données.
- **Données complètes pour 3 athlètes seulement** : `shiffrin` (défaut), `odermatt`, `jeanmonnot`. Clé absente/inconnue → fallback Shiffrin. `POOL` contient les infos d'affichage (nom/discipline/drapeau/pays/photo) pour les cards « à découvrir ».
- Les cards d'athlètes passent `?athlete=` **uniquement pour ces 3** (athletes.html + tous-les-athletes.html) ; les autres pointent vers `profil.html` (défaut).
- Hooks DOM remplis par id : `prof-photo`, `prof-crumb`, `prof-kicker`, `prof-name`, `prof-tagline`, `prof-bio`, `prof-palmares`, `prof-prog`, `prof-disc-grid`, `prof-cta-title` + `document.title`. Dégradation gracieuse : le HTML statique contient déjà le contenu Shiffrin.

## Pages

`index.html` (home), `athletes.html`, `tous-les-athletes.html`, `profil.html`, `billetterie.html`, `sites.html`, `classement.html`, `medailles.html`, `news.html` + `news-article-01..06.html`, pages légales (`mentions`, `confidentialite`, `cookies`, `accessibilite`). `hero-concept.html` = brouillon.
JS de page : `athletes.js`, `tous-les-athletes.js`, `billetterie.js`, `classement.js`, `medailles.js`, `news.js`, `profil.js` (+ `script.js`, `site-header.js`, `site-footer.js`).

## Vérification visuelle via Safari (automation fragile)

Le user valide en regardant Safari. Outils d'automation (osascript/screencapture) **peu fiables** :
- La fenêtre **saute parfois sur le 2e écran** (coords hautes ~1919+) où `screencapture -R` rend du noir. **Astuce pour la ramener + l'élargir** : toggler `AXFullScreen` via System Events (true puis false) → la fenêtre revient sur l'écran principal en large (~1920px, utile pour voir la nav desktop / le responsive ≥1100px).
- La largeur se re-clampe souvent à ~593-943px (layout mobile/hamburger). Récupérer les bounds réels avant chaque `screencapture -x -R$L,$T,$W,$H`.
- `System Events click at {x,y}` rate souvent sa cible ; le **scroll clavier** (PageDown=121, PageUp=116, flèches 125/126, Home=115) est imprécis.
- **Navigation fiable** : `set URL of front document to "file://…"` (un dialogue « Confirmez le fichier » peut apparaître → `key code 36` pour valider).
- **Vérif fonctionnelle fiable** : exécuter du JS dans la page via `do JavaScript … in front document` (lire le DOM, cliquer des éléments). Nécessite d'**activer** Safari ▸ Réglages ▸ Développement ▸ « Allow JavaScript from Apple Events » :
  ```bash
  defaults write com.apple.Safari AllowJavaScriptFromAppleEvents -bool true
  defaults write com.apple.Safari.SandboxBroker AllowJavaScriptFromAppleEvents -bool true
  # quitter/relancer Safari pour appliquer
  ```
  **Toujours remettre sur `false`** après vérification (sécurité). En complément, valider la logique JS en pur Node (`node -c fichier.js` + petite simulation).
- Le proxy **`rtk`** réécrit `grep` et peut casser `grep --include`/pipes ; préférer `perl -ne`, `/usr/bin/grep`, ou `/bin/ls` quand l'output rtk gêne.

## Workflow attendu

- Avancer **page par page**, comparer au **Figma** (le user fournit l'URL avec `node-id` ; outils MCP Figma `get_design_context`/`get_screenshot` nécessitent `fileKey`+`nodeId`).
- Réutiliser les composants/classes existants plutôt que recréer (le user tient à la cohérence : header/footer/badges/cards/bannières/boutons identiques partout).
- Après chaque correctif : bumper la version d'asset concernée, recharger, **vérifier visuellement**, puis rapporter ce qui est confirmé vs supposé.
- Ne **pas commiter** sans demande explicite (le user décide quand).
