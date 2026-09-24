# design-system

Source de vérité partagée entre toutes les apps Supershivas. Ce dépôt contient
deux choses :

1. **Les design tokens** (`design-tokens.json`, `mobile.css`, `phone-frame.js`)
   — les valeurs et éléments de design partagés : couleurs, radii, polices,
   dimensions, CSS mobile, cadre téléphone.
2. **Les conventions** (`CONVENTIONS.md`) — les règles communes que Claude Code
   applique dans chaque app : Git, versioning, en-tête, mise à jour
   automatique, données, interface, code.

## Applications

| App | Repo | Production |
|-----|------|------------|
| **Idée** | [supershivas/idee](https://github.com/supershivas/idee) | https://idee-neon.vercel.app/ |
| **Source** | [supershivas/source](https://github.com/supershivas/source) | https://source-sigma-kohl.vercel.app/app |
| **ProjetV** | [supershivas/projetV](https://github.com/supershivas/projetV) | https://supershivas.github.io/projetV/ |
| **Stockportfolio** | [supershivas/stockportfolio](https://github.com/supershivas/stockportfolio) | https://stockportfolio-five.vercel.app/ |
| **Studio Créa** | [supershivas/studio-crea](https://github.com/supershivas/studio-crea) | https://supershivas.github.io/studio-crea/ |
| **Elec AITI** | [supershivas/elec-aiti](https://github.com/supershivas/elec-aiti) | https://supershivas.github.io/elec-aiti/ |

## Contenu

- `design-tokens.json` — couleurs, radii, polices, dimensions
  sidebar/search/kbd/header/modal partagées entre les applications.
- `mobile.css` — CSS PWA/mobile partagé.
- `phone-frame.js` — cadre style iPhone affiché sur ordinateur par les apps
  uniquement mobiles (mode d'emploi en tête du fichier).
- `CONVENTIONS.md` — conventions communes à toutes les apps.
- `templates/` — fichiers à copier dans une app (script de synchronisation,
  réglages Claude Code, modèle de `CLAUDE.md`).

## Utilisation

Chaque app récupère la dernière version via `scripts/sync-design-system.sh`
(copié depuis `templates/`). Il télécharge depuis la branche `main` de ce
dépôt :

- `design-tokens.json` → à la racine de l'app ;
- `CONVENTIONS.md` → `.claude/conventions.md` ;
- `mobile.css` et `phone-frame.js` → uniquement là où l'app en a déjà une
  copie (racine, `app/`, `css/`, `js/`, `public/` ou `src/`). Pour adopter
  l'un d'eux, copie-le une fois à l'endroit voulu ; il suivra ensuite.

Le script est lancé automatiquement au début de chaque session Claude Code
(hook `SessionStart`), et peut aussi l'être à la main :

```bash
sh scripts/sync-design-system.sh
```

Il ne bloque jamais : si le réseau échoue, l'app garde sa copie précédente.

Toute modification d'une valeur partagée doit être faite ici en premier,
puis reportée dans le CSS des apps qui la consomment.

> **Obsolète :** `scripts/sync-tokens.sh`, présent dans les apps plus
> anciennes, est remplacé par `scripts/sync-design-system.sh`. Remplace-le
> au prochain passage dans l'app.

## Conventions

- **Où** : `CONVENTIONS.md`, à la racine de ce dépôt. C'est la source de
  vérité ; la copie `.claude/conventions.md` d'une app est écrasée à chaque
  synchronisation et ne doit jamais être modifiée.
- **Comment la modifier** : directement sur GitHub, en éditant
  `CONVENTIONS.md` sur la branche `main`.
- **Comment les apps la récupèrent** :
  1. le hook `SessionStart` de `.claude/settings.json` lance
     `scripts/sync-design-system.sh` au début de chaque session, qui copie
     `CONVENTIONS.md` dans `.claude/conventions.md` ;
  2. la première ligne du `CLAUDE.md` de l'app, `@.claude/conventions.md`,
     importe ce fichier dans le contexte de Claude.

  Une modification est donc prise en compte à la session suivante de chaque
  app, sans autre action.

Le `CLAUDE.md` d'une app prévaut sur les conventions ; ses exceptions sont
listées dans sa section « Exceptions aux conventions ».

## Ajouter une nouvelle app

Tout est dans `templates/` :

| Fichier | Destination dans l'app |
|---------|------------------------|
| `templates/sync-design-system.sh` | `scripts/sync-design-system.sh` |
| `templates/claude-settings.json` | `.claude/settings.json` |
| `templates/CLAUDE.app.md` | `CLAUDE.md` (sections à remplir) |

Puis lancer `sh scripts/sync-design-system.sh`, suivre la section 11
(« Nouvelle app ») de `CONVENTIONS.md`, et ajouter l'app au tableau
ci-dessus.

## Publication manuelle

Le script `sync.sh` de ce repo rappelle la marche à suivre pour publier une
modification (voir le script).
