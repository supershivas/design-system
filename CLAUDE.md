# design-system — notes pour Claude Code

Source de vérité partagée pour les design tokens et les conventions de toutes
les apps (liste complète dans le tableau du `README.md`) :

| App | Repo | URL de production |
|-----|------|-------------------|
| **Idée** | `supershivas/idee` | https://idee-neon.vercel.app/ |
| **Source** | `supershivas/source` | https://source-sigma-kohl.vercel.app/app |
| **ProjetV** | `supershivas/projetV` | https://supershivas.github.io/projetV/ |
| **Stockportfolio** | `supershivas/stockportfolio` | https://stockportfolio-five.vercel.app/ |
| **Studio Créa** | `supershivas/studio-crea` | — |
| **Elec AITI** | `supershivas/elec-aiti` | — |

Contenu : `design-tokens.json`, `mobile.css`, `phone-frame.js`, `CONVENTIONS.md`,
`templates/`.

## CONVENTIONS.md

`CONVENTIONS.md` s'applique **aux apps**, pas à ce repo. Ne l'utilise pas
comme règle de travail ici (pas de `version.json`, d'en-tête, etc. dans
design-system).

Quand je demande de modifier une convention : modifie `CONVENTIONS.md` ici,
puis rappelle-moi que les apps la récupéreront à leur prochaine session
(via le hook `SessionStart` et `scripts/sync-design-system.sh`).

## Règle d'or

Toute valeur de design partagée entre les apps (couleurs sidebar, radii,
fonts, dimensions sidebar/search/kbd/divider/header) **vit ici en premier**.

Processus à suivre pour tout changement de design partagé :
1. Modifier `design-tokens.json` ici.
2. Dans chaque app concernée, lancer `sh scripts/sync-design-system.sh`
   pour récupérer la nouvelle version (le script télécharge ce fichier
   depuis ce repo ; il tourne aussi automatiquement au début de chaque
   session). `scripts/sync-tokens.sh` est obsolète.
3. Reporter la valeur dans le CSS qui la consomme dans les repos
   consommateurs : par exemple `source/app/globals.css` et
   `idee/app/globals.css` + styles inline Tailwind (`App.tsx`,
   `SearchBar.tsx`, etc.).
4. Faire tous les changements dans la même session pour éviter toute
   redivergence — c'est la cause de la plupart des bugs de parité visuelle
   déjà rencontrés.
5. Vérifier visuellement les sidebars côte à côte avant de pousser.

## Workflow Git

Pousse directement sur `main`, sauf si je demande explicitement une branche
ou une pull request.
