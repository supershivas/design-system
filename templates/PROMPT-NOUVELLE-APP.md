# Prompt de base — nouvelle app

À coller au début de la première session Claude Code d'une nouvelle app, dans
son repo (vide ou presque). Seuls le nom, le repo et la description sont à
remplir : Claude Code pose tout le reste en questions à choix multiples.
Le hub (https://supershivas.github.io/hub/#/creer/app) lit ce fichier et le
remplit avec un formulaire : garder les lignes « Nouvelle app : », « À quoi
elle sert : [ … ] » et « Avant d'écrire du code : » telles quelles.

---

Nouvelle app : **[Nom de l'app]** (repo `supershivas/[repo]`).

À quoi elle sert : [une ou deux phrases : pour qui, quel usage, à quel moment de la journée.]

Avant d'écrire du code :

1. **Récupère le design system** et lis ce qu'il faut :
   ```
   git clone --depth 1 https://github.com/supershivas/design-system /tmp/design-system
   ```
   Lis `/tmp/design-system/CONVENTIONS.md` en entier : elles s'appliquent à
   cette app, suis leur section 11 (« Nouvelle app »). Lis aussi
   `/tmp/design-system/README.md` (le tableau des apps existantes) et le
   `CLAUDE.md` des apps citées plus haut comme modèles, ou de celle choisie
   comme modèle visuel
   (`https://raw.githubusercontent.com/supershivas/<repo>/main/CLAUDE.md`) :
   reprends leurs choix et leurs pièges connus au lieu d'en inventer.

2. **Pose-moi les décisions à trancher** avec l'outil `AskUserQuestion`, en
   questions à choix multiples (2 à 4 options, jamais de question ouverte
   quand un choix suffit). Déduis les options de ma description : ne me
   propose pas une option absurde pour cette app, mets en premier celle que
   tu recommandes, suffixée « (Recommandé) », avec sa raison en une phrase
   dans la description. Si je réponds « Other », prends ma réponse telle
   quelle. Trois tours au plus, de 4 questions au plus :

   **Tour 1 — cadrage**
   - **Catégorie** : primaire (usage quotidien : le socle et toutes les
     fonctionnalités avancées) ou secondaire (usage ponctuel : le socle
     seulement).
   - **Cible** : mobile et bureau, uniquement mobile (cadre de téléphone sur
     ordinateur), uniquement bureau (bandeau discret sur téléphone).
   - **Stack** : vanilla JS statique (modules ES, sans build), React + Vite,
     Next.js. Recommande la plus légère qui suffit.
   - **Hébergement** : GitHub Pages (statique), Vercel (Next.js, fonctions
     serveur).

   **Tour 2 — contenu** (adapte les options à ma description)
   - **Données** : aucune, locales + export et import JSON, Supabase (projet
     existant, tables préfixées par le nom de l'app ; jamais de nouveau
     projet sans me demander). Une app primaire passe par Supabase.
   - **Fonctionnalités de la v1.0.0** (sélection multiple) : 3 à 4
     fonctionnalités plausibles déduites de ma description, qui suffisent à
     ce que je m'en serve dès demain.
   - **Modèle visuel** : si l'app a une barre latérale ou un tableau de
     bord, laquelle des apps existantes sert de modèle (Idée, Source, aucune).
   - tout autre point flou de ma description (écran d'accueil, unité de
     contenu, partage…).

   **Tour 3 — périmètre** (seulement s'il reste des questions)
   - **Labo** et **Atelier** (sélection multiple) : obligatoires ou non selon
     la catégorie (sections 8 ter et 8 quater des conventions).
   - **Ce que l'app refuse** (sélection multiple) : 3 à 4 refus plausibles
     (pas de compte, pas de notifications, pas de collaboration, pas de
     tableau de bord chiffré…), pour garder la v1.0.0 petite.
   - **Critère de validation** : 2 ou 3 critères concrets (« je saisis une
     entrée en moins de 10 secondes sur téléphone », « l'export JSON se
     réimporte sans perte »).

   Résume mes choix en quelques lignes, puis propose-moi en une liste
   courte le **modèle de données** (entités, champs, clés, numéro de
   schéma) et les **écrans** de la v1.0.0, avec les cas limites que tu
   vois. Attends mon accord s'il reste une ambiguïté.

3. **Installe le socle** : copie depuis `/tmp/design-system/templates/` :
   `sync-design-system.sh` → `scripts/`, `claude-settings.json` →
   `.claude/settings.json`, `CLAUDE.app.md` → `CLAUDE.md`. Lance
   `sh scripts/sync-design-system.sh`. Crée le `.gitignore` **avant le
   premier commit** (`node_modules/`, `dist/`, `.next/`, `.vercel/`,
   `.env*`, `.DS_Store`).

## Le CLAUDE.md, dès le premier commit

C'est lui que liront toutes les sessions suivantes : une doc fausse est
pire qu'une doc absente. Remplis chaque section du modèle avec l'état réel :

- **Description** : usage, URL de production, catégorie, cible.
- **Stack** : framework, hébergement, stockage (projet Supabase et préfixe
  des tables, ou clés `localStorage`), versions épinglées des bibliothèques.
- **Structure** : une ligne par fichier ou dossier clé. Marque les copies du
  design system (`design-tokens.json`, `mobile.css`, `app-update.js`,
  `phone-frame.js`, `.claude/conventions.md`) « copie, ne pas éditer ».
- **Données** : le schéma, son numéro de version et où il vit.
- **Vérifications** : les commandes à lancer avant de pousser.
- **Exceptions aux conventions** : chacune avec sa raison (et son coût).
- **Pièges connus** : vide au départ ; chaque piège rencontré s'y écrit,
  avec la version où il est apparu.
- **Ce qui a été retiré** : un tableau (quoi, version, pourquoi), au lieu
  de laisser un module mort décrit au présent.

Mets `CLAUDE.md` à jour **dans le même commit** que tout changement de
structure, de données ou de règle. S'il dépasse ~15 ko, découpe-le par
domaine dans `docs/` avec, en tête, un index « Où lire quoi ».

## Prévenir la dette (pièges déjà payés dans les autres apps)

- **Données** : tout ce qui est stocké ou exporté porte `schemaVersion` ;
  la lecture migre les anciens formats au lieu de casser. L'export se
  réimporte sans perte. Accès à `localStorage` toujours dans un `try/catch`
  (navigation privée, stockage plein).
- **Supabase** (si retenu) : RLS activée sur chaque table, `user_id` avec
  `default auth.uid()` (le client ne l'envoie jamais), client confiné à un
  seul module (`js/db/` ou `lib/db/`), migrations SQL commitées dans
  `supabase/migrations/` et signalées si elles ne sont pas exécutées.
  N'écris jamais dans les tables d'une autre app.
- **Dépendances** : aucune sans mon accord ; jamais de version flottante
  (`@2`, `latest`) sur un CDN, toujours une version exacte. Ce dont l'app
  ne peut pas se passer va dans `vendor/` plutôt que sur un CDN.
- **Fichiers suivis** : aucun fichier construit (`dist/`, `.next/`), aucune
  dépendance (`node_modules/`), aucun script de test jetable (scratchpad).
  Vérifie avec `git ls-files` avant le premier push.
- **Cache de GitHub Pages** (~10 min) : le navigateur peut mêler anciens et
  nouveaux modules après une mise à jour. Pour une app statique à plusieurs
  modules ES, estampille les imports et le script principal avec
  `?v=X.Y.Z`, réécrit à chaque changement de version par
  `scripts/stamp-version.mjs`. Pour une PWA, le nom des caches du service
  worker suit la version.
- **HTML et CSS** :
  - jamais d'`innerHTML` avec un contenu venu de l'utilisateur, d'une API
    ou de la base sans échappement : construis des nœuds DOM ;
  - `[hidden] { display: none !important; }` avant toute règle `display` ;
  - toute règle `display` d'une `<dialog>` ou d'un tiroir porte `[open]`,
    sinon il reste affiché fermé ;
  - le toast est un `popover` (couche supérieure), sinon il passe sous les
    `<dialog>` ouvertes ;
  - grilles de mise en page en `minmax(0, 1fr)` ; jamais
    d'`overflow-x: hidden` pour cacher un débordement : corrige-le ;
  - texte français dans le JS : apostrophe typographique (’) ou gabarit
    `` ` ``, jamais une apostrophe droite dans une chaîne entre `'…'`.
- **Une app qui commite elle-même** sur `main` (données publiées par l'API
  GitHub) : récupère `main` avant chaque push.
- **Un script de vérification** `scripts/verifier.mjs` (ou `npm run
  verifier`), court, qui imprime « OK » ou les écarts : les fichiers de la
  Structure de `CLAUDE.md` existent, `version.json` et la tête de
  `CHANGELOG.md` concordent, pas d'`innerHTML` hors des endroits permis,
  pas de version flottante. Chaque fois qu'une règle de `CLAUDE.md` devient
  vérifiable mécaniquement, ajoute-la : une règle qu'aucun outil ne
  contrôle finit par mentir.
- **Sessions économes** : ajoute à `.claude/settings.json` un
  `permissions.deny` sur la lecture de `node_modules/**`, `dist/**`,
  `.next/**` et `vendor/**`.

## La v1.0.0

Construis la **v1.0.0**, et seulement elle, avec tout le socle des
conventions :

- `version.json` (`1.0.0`) et `CHANGELOG.md` ;
- en-tête : nom cliquable à gauche (vrai lien vers l'accueil, qui referme
  les modales), roue crantée à droite (`aria-label="Réglages"`, sans texte) ;
- réglages avec, en bas et dans cet ordre, la version, les 5 dernières
  versions et l'export JSON ;
- mise à jour automatique avec `app-update.js` du design system (copié une
  fois, il suit ensuite par le sync) et le toast « Mis à jour en vX.Y.Z » ;
- tokens (`design-tokens.json`) et `mobile.css`, jamais de couleur, rayon ou
  police en dur ; icônes au trait Tabler (`ti ti-*`, version épinglée),
  jamais d'emoji ;
- `favicon.svg`, `favicon.ico` (16, 32, 48) et `apple-touch-icon.png` (180),
  un motif simple lisible à 16 px ;
- zones tactiles de 44 px, champs de 16 px sur mobile, `:hover` dans
  `@media (hover: hover)`, confirmations dans une modale (jamais
  `window.confirm`) ;
- aucun secret commité (une clé personnelle se saisit dans les réglages,
  reste dans ce navigateur et ne s'affiche plus en entier).

Pour une app primaire, ajoute les fonctionnalités avancées listées dans les
conventions (Supabase et authentification, mode sombre, PWA, import, temps
réel, corbeille, parité visuelle, Labo, Atelier si le contenu se modifie).
Pour une app uniquement mobile, `phone-frame.js`.

**Vérifie avant de pousser** :

- `node --input-type=module --check < fichier.js` pour chaque module ES
  (`node --check` seul ne les vérifie pas), ou le build de la stack ;
- `scripts/verifier.mjs` ;
- l'app ouverte avec Playwright (Chromium est déjà installé, ne lance pas
  `playwright install`) en 375 px et en 1280 px : aucune erreur dans la
  console, pas de défilement horizontal (`scrollWidth` = largeur), captures
  regardées ; l'export JSON se télécharge et se réimporte ; le nom ramène à
  l'accueil depuis chaque vue.

Pousse sur `main`. Pour GitHub Pages, ajoute le workflow de déploiement et
rappelle-moi de régler Settings → Pages → Source sur « GitHub Actions » au
premier push. Donne au dépôt une description GitHub (le hub l'ajoutera tout
seul). Donne-moi l'URL de production cliquable et propose-moi la ligne à
ajouter au tableau du README de `design-system`.
