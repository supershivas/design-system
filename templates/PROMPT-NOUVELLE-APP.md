# Prompt de base — nouvelle app

À coller au début de la première session Claude Code d'une nouvelle app, dans
son repo (vide ou presque). Seuls le nom, le repo et la description sont à
remplir : Claude Code pose tout le reste en questions à choix multiples.

---

Nouvelle app : **[Nom de l'app]** (repo `supershivas/[repo]`).

À quoi elle sert : [une ou deux phrases : pour qui, quel usage].

Avant d'écrire du code :

1. Lis les conventions communes :
   https://raw.githubusercontent.com/supershivas/design-system/main/CONVENTIONS.md
   Elles s'appliquent à cette app ; suis leur section 11 (« Nouvelle app »).

2. Pose-moi les décisions à trancher avec l'outil `AskUserQuestion`, en
   questions à choix multiples (2 à 4 options, jamais de question ouverte
   quand un choix suffit). Fais deux tours de 4 questions maximum :

   Tour 1 — cadrage :
   - **Catégorie** : primaire ou secondaire (voir les conventions).
   - **Cible** : mobile et bureau, uniquement mobile, uniquement bureau.
   - **Stack** : vanilla JS statique, React + Vite, Next.js.
   - **Hébergement** : GitHub Pages, Vercel.

   Tour 2 — contenu (adapte les options à ma description) :
   - **Données** : aucune, locales + export JSON, Supabase (projet existant,
     tables préfixées par le nom de l'app ; jamais de nouveau projet sans me
     demander).
   - **Fonctionnalités de la v1.0.0** : propose 3 à 4 fonctionnalités
     plausibles déduites de ma description, en sélection multiple.
   - **Priorité visuelle** : si l'app a une barre latérale ou un tableau de
     bord, laquelle des apps existantes sert de modèle (Idée, Source, aucune).
   - tout autre point flou de ma description.

   Mets en premier l'option que tu recommandes, suffixée « (Recommandé) », et
   explique-la en une phrase dans sa description. Si je réponds « Other »,
   prends ma réponse telle quelle. Résume mes choix en quelques lignes avant
   de commencer.

3. Copie depuis `supershivas/design-system/templates/` :
   `sync-design-system.sh` → `scripts/`, `claude-settings.json` →
   `.claude/settings.json`, `CLAUDE.app.md` → `CLAUDE.md` (remplis ses
   sections avec mes réponses, catégorie et cible comprises). Lance
   `sh scripts/sync-design-system.sh`.

Ensuite, construis la v1.0.0 avec tout le socle des conventions :
`version.json` et `CHANGELOG.md`, en-tête (nom cliquable à gauche, roue
crantée « Réglages » à droite), réglages avec version, 5 dernières versions et
export JSON, mise à jour automatique (`app-update.js` du design system, à
copier une fois pour qu'il suive), tokens et `mobile.css`, `favicon.svg`,
`favicon.ico` et `apple-touch-icon.png`, icônes au trait. Pour une app
primaire, ajoute aussi les fonctionnalités avancées listées dans les
conventions ; pour une app uniquement mobile, `phone-frame.js`.

Pousse sur `main`, donne-moi l'URL de production, et propose-moi la ligne à
ajouter au tableau du README de `design-system`.
