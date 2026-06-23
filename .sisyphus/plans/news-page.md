# Plan: Page News Dédiée - Milano Cortina 2026

## TL;DR
> **Summary**: Analyser le design Figma (pages Assets et Website Final) puis créer une page `news.html` autonome avec grille d'articles filtrable et pages de détail, en réutilisant les patterns existants du site.
> **Deliverables**: `news.html`, `news-article.html` (ou plusieurs), styles CSS complémentaires, assets extraits de Figma si nécessaire
> **Effort**: Medium
> **Parallel**: YES - 3 waves
> **Critical Path**: Analyse Figma (T1) → Structure news.html (T2-T4) → Pages détail (T5) → Liens & QA (T6-T8)

## Context
### Original Request
L'utilisateur demande d'analyser le design Figma (pages "Assets" et "Website Final") via le MCP Figma Cloud, puis de créer une page News dédiée pour le site Milano Cortina 2026.

### Interview Summary
- **Page type**: Page autonome `news.html` (pattern identique à `billetterie.html`)
- **Contenu**: Grille de cartes d'articles + pages de détail individuelles
- **Source design**: Figma pages "Assets" (design system) et "Website Final"
- **URL Figma**: https://www.figma.com/design/tOzUfvuLcZLn618ZxoNaLe/Milano-Cortina
- **MCP Figma**: https://mcp.figma.com/mcp

### Metis Review (gaps addressed)
- **Gaps identifiés**: Pas de test infra existante, site statique pur → pas de backend nécessaire
- **Guardrails**: Ne pas modifier la page d'accueil existante (sauf liens nav), réutiliser les patterns CSS existants, maintenir l'accessibilité (ARIA)
- **Scope creep**: Risque de vouloir ajouter un CMS/backend → exclu explicitement (site statique)
- **Edge cases**: Responsive mobile, état vide (aucun article), navigation depuis page détail vers news

## Work Objectives
### Core Objective
Créer une page News autonome, fidèle au design Figma, avec grille d'articles et pages de détail, en réutilisant les patterns et styles existants du site.

### Deliverables
1. `news.html` — Page liste des articles avec hero, filtres, grille
2. `news-article.html` — Template de page détail d'article (ou plusieurs pages statiques)
3. Styles CSS complémentaires dans `styles.css`
4. Assets manquants extraits de Figma (si nécessaire)
5. Mise à jour des liens de navigation (`index.html`, `billetterie.html`)

### Definition of Done (verifiable conditions with commands)
- [ ] `news.html` s'affiche correctement avec grille d'articles et filtres
- [ ] La navigation depuis le header fonctionne vers `news.html`
- [ ] Les pages détail d'article sont accessibles depuis la grille
- [ ] Le design est responsive (desktop + mobile)
- [ ] Pas de régression sur `index.html` ni `billetterie.html`

### Must Have
- Page `news.html` autonome avec header/footer identiques aux autres pages
- Section hero "News" avec titre et description
- Grille de cartes d'articles (image, catégorie, titre, extrait, date)
- Filtres par catégorie (Athlètes, Territoires, Backstages, Organisation...)
- Au moins 3 pages de détail d'article
- Liens de navigation mis à jour sur toutes les pages

### Must NOT Have (guardrails, AI slop patterns, scope boundaries)
- PAS de backend/CMS (site statique)
- PAS de modification de la section news existante sur `index.html` (sauf liens)
- PAS de JavaScript complexe (pas de framework JS)
- PAS de changement de design system (couleurs, typos, spacing)
- PAS de pagination complexe (site statique, filtrage client-side simple acceptable)

## Verification Strategy
> ZERO HUMAN INTERVENTION — all verification is agent-executed.
- **Test decision**: Pas de test infra existante. Agent QA via screenshots Playwright et validation HTML.
- **QA policy**: Chaque tâche a des scénarios de validation agent-exécutés
- **Evidence**: `.sisyphus/evidence/task-{N}-{slug}.{ext}`

## Execution Strategy
### Parallel Execution Waves

**Wave 1**: Analyse Figma & Préparation
- T1: Analyse Figma Assets (design system)
- T2: Analyse Figma Website Final (page news)
- T3: Inventaire assets et extraction manquants

**Wave 2**: Structure & Styles
- T4: Création de `news.html` (structure complète)
- T5: Styles CSS complémentaires pour la page news

**Wave 3**: Détail & Intégration
- T6: Pages détail d'article
- T7: Interactivité (filtrage client-side)
- T8: Mise à jour liens navigation + QA finale

### Dependency Matrix
| Task | Depends On | Blocks |
|------|-----------|--------|
| T1 | — | T2, T3, T4 |
| T2 | T1 | T3, T4 |
| T3 | T1, T2 | T4 |
| T4 | T3 | T5, T6 |
| T5 | T4 | T6, T7 |
| T6 | T4, T5 | T7 |
| T7 | T5, T6 | T8 |
| T8 | T7 | — |

### Agent Dispatch Summary
| Wave | Tasks | Categories |
|------|-------|------------|
| Wave 1 | T1-T3 | deep (analyse) + visual-engineering (extraction) |
| Wave 2 | T4-T5 | visual-engineering (HTML/CSS) |
| Wave 3 | T6-T8 | quick (liens) + unspecified-low (QA) |

## TODOs

- [ ] T1. Analyse Figma — Page Assets (Design System)

  **What to do**: Se connecter au MCP Figma Cloud et analyser la page "Assets" pour extraire le design system applicable à la page News (couleurs, typographies, spacing, composants réutilisables).
  **Must NOT do**: Ne pas extraire des assets qui existent déjà localement.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: Analyse approfondie du design system via MCP
  - Skills: `explore` — Pour cartographier les composants Figma
  - Omitted: `visual-engineering` — Pas encore de code à écrire

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: T2, T3, T4 | Blocked By: —

  **References**:
  - Figma URL: `https://www.figma.com/design/tOzUfvuLcZLn618ZxoNaLe/Milano-Cortina` — Design source
  - MCP: `https://mcp.figma.com/mcp` — Point d'accès MCP
  - CSS existant: `styles.css:1-50` — Variables CSS déjà définies

  **Acceptance Criteria**:
  - [ ] Liste des couleurs, typos, spacing du design system
  - [ ] Inventaire des composants réutilisables (boutons, cartes, badges)
  - [ ] Document `.sisyphus/evidence/figma-assets-analysis.md` produit

  **QA Scenarios**:
  ```
  Scenario: Analyse complète
    Tool: skill_mcp
    Steps: Connexion MCP Figma → Lecture page Assets → Extraction propriétés
    Expected: Document structuré avec ≥10 éléments de design system identifiés
    Evidence: .sisyphus/evidence/task-1-figma-assets.md
  ```

  **Commit**: NO

- [ ] T2. Analyse Figma — Page Website Final (Layout News)

  **What to do**: Analyser la page "Website Final" dans Figma pour identifier le layout exact de la section/page News (structure, grille, composants, responsive).
  **Must NOT do**: Ne pas créer de code, uniquement de l'analyse et de la documentation.

  **Recommended Agent Profile**:
  - Category: `deep` — Reason: Analyse détaillée du layout
  - Skills: `explore` — Pour explorer la structure du design

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: T3, T4 | Blocked By: T1

  **References**:
  - Figma URL: `https://www.figma.com/design/tOzUfvuLcZLn618ZxoNaLe/Milano-Cortina?node-id=756-16` — Website Final
  - Page existante: `index.html:196-224` — Section news actuelle sur la home
  - Page modèle: `billetterie.html:38-100` — Pattern de page secondaire

  **Acceptance Criteria**:
  - [ ] Structure de la page News documentée (hero, filtres, grille, pagination)
  - [ ] Spécifications de la grille (nombre de colonnes, gaps, responsive)
  - [ ] Spécifications des cartes d'articles (dimensions, contenu, états)
  - [ ] Spécifications de la page détail (layout, contenu, navigation)
  - [ ] Document `.sisyphus/evidence/figma-website-final-analysis.md` produit

  **QA Scenarios**:
  ```
  Scenario: Layout identifié
    Tool: skill_mcp
    Steps: Connexion MCP → Exploration frames page Website Final → Identification frame News
    Expected: ≥1 frame spécifique à la page News identifié et documenté
    Evidence: .sisyphus/evidence/task-2-figma-website.md

  Scenario: Comparaison section existante
    Tool: Read
    Steps: Lecture index.html:196-224 vs specs Figma
    Expected: Document de gap entre la section home actuelle et le design Figma
    Evidence: .sisyphus/evidence/task-2-gap-analysis.md
  ```

  **Commit**: NO

- [ ] T3. Inventaire Assets & Extraction

  **What to do**: Comparer les assets nécessaires pour la page News avec ceux déjà disponibles localement. Extraire depuis Figma les assets manquants (images d'articles, icônes spécifiques).
  **Must NOT do**: Ne pas extraire des assets déjà présents dans `assets/home-final/`.

  **Recommended Agent Profile**:
  - Category: `unspecified-low` — Reason: Tâche d'extraction et d'organisation
  - Skills: `explore` — Pour vérifier les assets existants

  **Parallelization**: Can Parallel: YES | Wave 1 | Blocks: T4 | Blocked By: T1, T2

  **References**:
  - Assets existants: `assets/home-final/` — news-main.png, news-small-a.png, news-small-b.png
  - Dossier assets: `assets/` — Structure existante
  - Figma: Page Assets pour les ressources manquantes

  **Acceptance Criteria**:
  - [ ] Inventaire complet des assets nécessaires (≥6 images d'articles)
  - [ ] Liste des assets manquants vs existants
  - [ ] Assets manquants extraits et placés dans `assets/news/`
  - [ ] Noms de fichiers normalisés (news-article-01.png, news-article-02.png...)

  **QA Scenarios**:
  ```
  Scenario: Assets complets
    Tool: Bash
    Steps: ls assets/news/ → compter fichiers
    Expected: ≥6 images d'articles disponibles dans assets/news/
    Evidence: .sisyphus/evidence/task-3-assets.txt
  ```

  **Commit**: YES | Message: `assets(news): extract article images from Figma` | Files: `assets/news/*`

- [x] T4. Création de `news.html` — Structure Complète

  **What to do**: Créer la page `news.html` avec header, hero News, filtres par catégorie, grille de cartes d'articles, et footer. Réutiliser la structure de `billetterie.html` comme modèle de page secondaire.
  **Must NOT do**: Ne pas inclure de JavaScript inline (utiliser `script.js` ou créer `news.js`).

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: Création de HTML/CSS fidèle au design
  - Skills: `frontend-ui-ux` — Pour le respect du design system

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: T5, T6 | Blocked By: T3

  **References**:
  - Modèle header/footer: `billetterie.html:10-36` et `billetterie.html:300-348`
  - Section news existante: `index.html:196-224` — Structure de carte à réutiliser
  - Hero billetterie: `billetterie.html:40-48` — Pattern de hero de page
  - Filtres billetterie: `billetterie.html:63-99` — Pattern de filtres

  **Acceptance Criteria**:
  - [ ] `news.html` créé avec DOCTYPE, viewport, title "News - Milano Cortina 2026"
  - [ ] Header identique à `billetterie.html` avec lien "News" actif (`aria-current="page"`)
  - [ ] Hero section avec kicker "News", titre "Les dernières actualités", description
  - [ ] Filtres par catégorie (Tous, Athlètes, Territoires, Backstages, Organisation)
  - [ ] Grille de ≥6 cartes d'articles avec image, catégorie, titre, extrait, date
  - [ ] Footer identique aux autres pages
  - [ ] Liens vers pages détail sur chaque carte

  **QA Scenarios**:
  ```
  Scenario: Page structure valid
    Tool: Bash
    Steps: grep -c "news.html" news.html && grep "mc-header" news.html
    Expected: Page existe avec header/footer complets
    Evidence: .sisyphus/evidence/task-4-structure.html

  Scenario: Responsive check
    Tool: Playwright
    Steps: Ouvrir news.html à 1440px et 375px → screenshot
    Expected: Grille passe de multi-colonnes à single-colonne sur mobile
    Evidence: .sisyphus/evidence/task-4-responsive.png
  ```

  **Commit**: YES | Message: `feat(news): add news.html page with hero, filters and grid` | Files: `news.html`

- [x] T5. Styles CSS Complémentaires pour Page News

  **What to do**: Ajouter dans `styles.css` les styles spécifiques à la page News (hero news, grille de cartes enrichie, filtres, responsive). Réutiliser les classes existantes `.section-news`, `.news-card` etc. si applicable.
  **Must NOT do**: Ne pas modifier les styles des autres pages (vérif via diff).

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: CSS responsive et fidélité design
  - Skills: `frontend-ui-ux` — Pour la qualité visuelle

  **Parallelization**: Can Parallel: NO | Wave 2 | Blocks: T6, T7 | Blocked By: T4

  **References**:
  - Styles existants: `styles.css:341-725` — `.section-news`, `.news-card`, `.news-layout`
  - Styles filtres: `styles.css` (rechercher `.filter-pill`, `.dropdown`)
  - Variables CSS: `styles.css:1-13` — Couleurs et spacing

  **Acceptance Criteria**:
  - [ ] Styles `.page-news` (container spécifique) ajoutés
  - [ ] Styles grille news améliorés (≥3 colonnes desktop, 1 colonne mobile)
  - [ ] Styles filtres news (boutons actifs/inactifs)
  - [ ] Styles cartes enrichies (hover states, ombres)
  - [ ] Pas de régression visuelle sur `index.html` et `billetterie.html`

  **QA Scenarios**:
  ```
  Scenario: Styles appliqués
    Tool: Playwright
    Steps: Ouvrir news.html → screenshot → vérifier grille et filtres
    Expected: Grille alignée, filtres visibles, cartes stylisées
    Evidence: .sisyphus/evidence/task-5-styles.png

  Scenario: Pas de régression
    Tool: Playwright
    Steps: Ouvrir index.html et billetterie.html → screenshots
    Expected: Visuel identique à avant modification
    Evidence: .sisyphus/evidence/task-5-regression.png
  ```

  **Commit**: YES | Message: `style(news): add CSS for news grid, filters and responsive` | Files: `styles.css`

- [x] T6. Pages Détail d'Article

  **What to do**: Créer au moins 3 pages de détail d'article (`news-article-01.html`, `news-article-02.html`, `news-article-03.html`) avec header, contenu complet (image, titre, catégorie, date, texte), et navigation retour vers `news.html`.
  **Must NOT do**: Ne pas utiliser de paramètres URL ou de JS pour le contenu (site statique).

  **Recommended Agent Profile**:
  - Category: `visual-engineering` — Reason: Création de pages statiques HTML
  - Skills: `frontend-ui-ux` — Pour la lisibilité du contenu

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: T7 | Blocked By: T4, T5

  **References**:
  - Modèle: `billetterie.html` — Structure de page secondaire
  - Section news: `index.html:196-224` — Exemples de contenu article
  - CSS article: à créer dans `styles.css` (classes `.article-header`, `.article-content`, `.article-image`)

  **Acceptance Criteria**:
  - [ ] 3 pages `news-article-01.html`, `news-article-02.html`, `news-article-03.html` créées
  - [ ] Chaque page a header/footer identiques, article complet avec image hero
  - [ ] Navigation retour "← Toutes les actualités" vers `news.html`
  - [ ] Contenu réaliste (titres, textes, catégories) basé sur le design Figma
  - [ ] Liens depuis `news.html` pointent vers les bonnes pages

  **QA Scenarios**:
  ```
  Scenario: Article page display
    Tool: Playwright
    Steps: Ouvrir news-article-01.html → screenshot
    Expected: Image hero, titre, contenu texte, lien retour visibles
    Evidence: .sisyphus/evidence/task-6-article.png

  Scenario: Navigation retour
    Tool: Playwright
    Steps: Cliquer lien retour sur news-article-01.html
    Expected: Redirection vers news.html
    Evidence: .sisyphus/evidence/task-6-nav.txt
  ```

  **Commit**: YES | Message: `feat(news): add 3 article detail pages` | Files: `news-article-01.html`, `news-article-02.html`, `news-article-03.html`

- [x] T7. Interactivité — Filtrage Client-Side

  **What to do**: Ajouter dans `news.js` (ou `script.js`) le filtrage des articles par catégorie. Utiliser des data-attributes sur les cartes et écouteurs d'événements sur les boutons de filtre.
  **Must NOT do**: Pas de requête serveur, tout est client-side.

  **Recommended Agent Profile**:
  - Category: `quick` — Reason: JavaScript simple, pas de framework
  - Skills: `explore` — Pour vérifier le pattern JS existant dans `billetterie.js`

  **Parallelization**: Can Parallel: YES | Wave 3 | Blocks: T8 | Blocked By: T5, T6

  **References**:
  - JS existant: `billetterie.js` — Pattern d'interactivité existant
  - Script global: `script.js` — Voir si déjà utilisé
  - Filtres CSS: `styles.css` — Classes `.filter-pill.is-active`

  **Acceptance Criteria**:
  - [ ] Fichier `news.js` créé (ou ajout à `script.js`) avec logique de filtrage
  - [ ] Cliquer sur un filtre masque les cartes non concernées (via class CSS `hidden`)
  - [ ] Filtre "Tous" réaffiche toutes les cartes
  - [ ] Plusieurs filtres possibles (si prévu dans le design)
  - [ ] Animation fluide (transition CSS) lors du filtrage

  **QA Scenarios**:
  ```
  Scenario: Filtrage par catégorie
    Tool: Playwright
    Steps: Ouvrir news.html → cliquer "Athlètes" → compter cartes visibles
    Expected: Seules les cartes avec data-category="athletes" restent visibles
    Evidence: .sisyphus/evidence/task-7-filter.png

  Scenario: Filtre "Tous"
    Tool: Playwright
    Steps: Cliquer "Tous" après filtrage
    Expected: Toutes les cartes réapparaissent
    Evidence: .sisyphus/evidence/task-7-reset.png
  ```

  **Commit**: YES | Message: `feat(news): add client-side category filtering` | Files: `news.js` (ou `script.js`)

- [x] T8. Mise à Jour Liens Navigation & QA Finale

  **What to do**: Mettre à jour tous les liens "News" dans le header de `index.html`, `billetterie.html`, et les pages article pour pointer vers `news.html` au lieu des ancres `#news`. Effectuer la QA finale complète.
  **Must NOT do**: Ne pas modifier le contenu des pages existantes, seulement les liens de navigation.

  **Recommended Agent Profile**:
  - Category: `quick` — Reason: Modifications de liens simples
  - Skills: `explore` — Pour vérifier tous les liens

  **Parallelization**: Can Parallel: NO | Wave 3 | Blocks: — | Blocked By: T7

  **References**:
  - Liens index: `index.html:33-39` — Nav principale
  - Liens billetterie: `billetterie.html:21-27` — Nav billetterie
  - Footer: `index.html:236-241` — Liens footer

  **Acceptance Criteria**:
  - [ ] `index.html`: lien "News" pointe vers `news.html` (pas `#news`)
  - [ ] `billetterie.html`: lien "News" pointe vers `news.html`
  - [ ] Pages article: lien "News" dans header pointe vers `news.html`
  - [ ] Footer sur toutes les pages: lien "News" pointe vers `news.html`
  - [ ] Toutes les pages s'ouvrent sans erreur console
  - [ ] Responsive testé sur 375px, 768px, 1440px

  **QA Scenarios**:
  ```
  Scenario: Navigation complète
    Tool: Playwright
    Steps: Ouvrir index.html → cliquer News → vérifier URL news.html → cliquer Billetterie → vérifier billetterie.html → cliquer News → vérifier news.html
    Expected: Navigation fluide entre toutes les pages, lien News toujours correct
    Evidence: .sisyphus/evidence/task-8-nav-flow.txt

  Scenario: Validation HTML
    Tool: Bash
    Steps: html-validate news.html news-article-*.html (ou équivalent)
    Expected: Aucune erreur structurelle
    Evidence: .sisyphus/evidence/task-8-validation.txt
  ```

  **Commit**: YES | Message: `fix(nav): update all News links to point to news.html` | Files: `index.html`, `billetterie.html`, `news.html`, `news-article-*.html`

## Final Verification Wave (4 parallel agents, ALL must APPROVE)
- [ ] F1. Plan Compliance Audit — `oracle`
- [ ] F2. Code Quality Review — `unspecified-high`
- [ ] F3. Real Manual QA — `unspecified-high` (+ `playwright` si UI)
- [ ] F4. Scope Fidelity Check — `deep`

## Commit Strategy
1. **T3**: `assets(news): extract article images from Figma`
2. **T4**: `feat(news): add news.html page with hero, filters and grid`
3. **T5**: `style(news): add CSS for news grid, filters and responsive`
4. **T6**: `feat(news): add 3 article detail pages`
5. **T7**: `feat(news): add client-side category filtering`
6. **T8**: `fix(nav): update all News links to point to news.html`

## Success Criteria
- [ ] La page `news.html` est accessible et affiche une grille d'articles fidèle au design Figma
- [ ] Les filtres par catégorie fonctionnent en JavaScript client-side
- [ ] Les 3 pages de détail d'article sont accessibles et bien formatées
- [ ] La navigation depuis n'importe quelle page vers "News" fonctionne correctement
- [ ] Le site reste responsive sur mobile, tablette et desktop
- [ ] Aucune régression sur les pages existantes (`index.html`, `billetterie.html`)
