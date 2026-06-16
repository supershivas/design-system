# design-system — notes pour Claude Code

Source de vérité partagée pour les design tokens utilisés par
`supershivas/La-fabrique` (HTML/CSS/JS vanilla) et `supershivas/idee`
(Next.js/React/Tailwind). Contenu : `design-tokens.json`.

## Règle d'or

Toute valeur de design partagée entre les deux apps (couleurs sidebar, radii,
fonts, dimensions sidebar/search/kbd/divider/header) **vit ici en premier**.

Processus à suivre pour tout changement de design partagé :
1. Modifier `design-tokens.json` ici.
2. Lancer `./scripts/sync-tokens.sh` dans `La-fabrique` et dans `idee` pour
   récupérer la nouvelle version (le script télécharge ce fichier depuis ce
   repo).
3. Reporter la valeur dans le CSS qui la consomme dans **les deux** repos
   consommateurs : `La-fabrique/style.css` (valeurs CSS brutes) et
   `idee/app/globals.css` + styles inline Tailwind (`App.tsx`,
   `SearchBar.tsx`, etc.).
4. Faire les 3 changements (ici + les deux repos) dans la même session pour
   éviter toute redivergence — c'est la cause de la plupart des bugs de
   parité visuelle déjà rencontrés.
5. Vérifier visuellement les deux sidebars côte à côte avant de merger.

## Workflow Git

Ce repo n'a pas de PR systématique pour les petits changements de tokens
(historiquement pushé direct sur `main`), mais privilégier une branche + PR +
squash-merge dès que le changement touche plusieurs valeurs ou est non
trivial, pour garder un historique clair.
