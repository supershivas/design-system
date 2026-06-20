# design-system

Source de vérité partagée pour les design tokens utilisés par les 4 apps.

## Applications

| App | Repo | Production |
|-----|------|------------|
| **Idée** | [supershivas/idee](https://github.com/supershivas/idee) | https://idee-neon.vercel.app/ |
| **Source** | [supershivas/source](https://github.com/supershivas/source) | https://source-sigma-kohl.vercel.app/app |
| **ProjetV** | [supershivas/projetV](https://github.com/supershivas/projetV) | https://supershivas.github.io/projetV/ |
| **Stockportfolio** | [supershivas/stockportfolio](https://github.com/supershivas/stockportfolio) | https://stockportfolio-five.vercel.app/ |

## Contenu

- `design-tokens.json` — couleurs, radii, fonts, dimensions sidebar/search/kbd
  partagés entre les applications.

## Utilisation

Chaque repo consommateur récupère la dernière version des tokens via le
script `scripts/sync-tokens.sh` (présent dans chaque repo), qui télécharge
`design-tokens.json` depuis ce dépôt :

```bash
./scripts/sync-tokens.sh
```

Toute modification d'une valeur partagée doit être faite ici en premier,
puis synchronisée dans les repos consommateurs via ce script.

## Publication manuelle

Le script `sync.sh` de ce repo permet de republier `design-tokens.json`
si besoin (voir le script pour le détail des étapes).
