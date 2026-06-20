# design-system — notes pour Claude Code

Source de vérité partagée pour les design tokens utilisés par les 4 apps :

| App | Repo | URL de production |
|-----|------|-------------------|
| **Idée** | `supershivas/idee` | https://idee-neon.vercel.app/ |
| **Source** | `supershivas/source` | https://source-sigma-kohl.vercel.app/app |
| **ProjetV** | `supershivas/projetV` | https://supershivas.github.io/projetV/ |
| **Stockportfolio** | `supershivas/stockportfolio` | https://stockportfolio-five.vercel.app/ |

Contenu : `design-tokens.json`.

## Règle d'or

Toute valeur de design partagée entre les apps (couleurs sidebar, radii,
fonts, dimensions sidebar/search/kbd/divider/header) **vit ici en premier**.

Processus à suivre pour tout changement de design partagé :
1. Modifier `design-tokens.json` ici.
2. Lancer `./scripts/sync-tokens.sh` dans `source` et dans `idee` pour
   récupérer la nouvelle version (le script télécharge ce fichier depuis ce
   repo).
3. Reporter la valeur dans le CSS qui la consomme dans les repos
   consommateurs : `source/app/globals.css` et
   `idee/app/globals.css` + styles inline Tailwind (`App.tsx`,
   `SearchBar.tsx`, etc.).
4. Faire tous les changements dans la même session pour éviter toute
   redivergence — c'est la cause de la plupart des bugs de parité visuelle
   déjà rencontrés.
5. Vérifier visuellement les sidebars côte à côte avant de merger.

## Workflow Git

Ce repo n'a pas de PR systématique pour les petits changements de tokens
(historiquement pushé direct sur `main`), mais privilégier une branche + PR +
squash-merge dès que le changement touche plusieurs valeurs ou est non
trivial, pour garder un historique clair.
