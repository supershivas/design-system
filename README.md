# design-system

Source de vérité partagée pour les design tokens utilisés par
[Source](https://github.com/supershivas/source) et
[Idée](https://github.com/supershivas/idee).

## Contenu

- `design-tokens.json` — couleurs, radii, fonts, dimensions sidebar/search/kbd
  partagés entre les deux applications.

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
