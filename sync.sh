#!/usr/bin/env bash
set -euo pipefail

echo "design-tokens.json, mobile.css, phone-frame.js, app-update.js et CONVENTIONS.md sont les sources de vérité de ce repo."
echo "Modifie-les directement ici, commit puis push sur main."
echo "Les apps les récupèrent au début de chaque session via scripts/sync-design-system.sh"
echo "(modèle dans templates/). scripts/sync-tokens.sh est obsolète."
