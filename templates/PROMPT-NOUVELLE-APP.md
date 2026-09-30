# Prompt de base — nouvelle app

À coller au début de la première session Claude Code d'une nouvelle app, dans
son repo (vide ou presque). Remplir les champs entre crochets ; laisser
« à décider » quand on ne sait pas, Claude posera la question.

---

Nouvelle app : **[Nom de l'app]** (repo `supershivas/[repo]`).

- **À quoi elle sert** : [une ou deux phrases, pour qui, quel usage].
- **Catégorie** : [primaire | secondaire].
- **Cible** : [mobile et bureau | uniquement mobile | uniquement bureau].
- **Stack** : [vanilla JS statique | React + Vite | Next.js | à décider].
- **Hébergement** : [GitHub Pages | Vercel | à décider].
- **Données** : [aucune | locales + export JSON | Supabase (projet existant, tables préfixées `[prefixe]_`) | à décider].
- **Première version** : [les 3 à 5 fonctionnalités de la v1.0.0].

Avant d'écrire du code :

1. Lis les conventions communes :
   https://raw.githubusercontent.com/supershivas/design-system/main/CONVENTIONS.md
   Elles s'appliquent à cette app ; suis leur section 11 (« Nouvelle app »).
2. Copie depuis `supershivas/design-system/templates/` :
   `sync-design-system.sh` → `scripts/`, `claude-settings.json` →
   `.claude/settings.json`, `CLAUDE.app.md` → `CLAUDE.md` (remplis ses
   sections avec ce qui précède). Lance `sh scripts/sync-design-system.sh`.
3. Pose-moi les questions restantes (champs « à décider », points flous)
   en une seule fois, puis attends ma réponse.

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
