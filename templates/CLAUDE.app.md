@.claude/conventions.md

# <Nom de l'app>

<!-- Ce fichier décrit l'état RÉEL du dépôt : mets-le à jour dans le même
     commit que tout changement de structure, de données ou de règle.
     Au-delà de ~15 ko, découpe-le par domaine dans docs/ avec un index
     « Où lire quoi » ici. -->

## Description

<!-- À quoi sert l'app, pour qui, URL de production.
     Catégorie : primaire ou secondaire.
     Cible : mobile et bureau (défaut), uniquement mobile ou uniquement bureau. -->

## Stack

<!-- Framework, hébergement, stockage (projet Supabase et préfixe des tables,
     ou clés localStorage). Versions exactes des bibliothèques (jamais @2). -->

## Structure

<!-- Une ligne par dossier ou fichier clé, où vit quoi. Marquer « copie, ne pas
     éditer » : design-tokens.json, mobile.css, app-update.js, phone-frame.js,
     .claude/conventions.md (écrasés par scripts/sync-design-system.sh). -->

## Données

<!-- Schéma (entités, champs, clés), numéro schemaVersion, migrations des
     anciens formats, contenu de l'export JSON. -->

## Vérifications

<!-- Commandes à lancer avant de pousser (scripts/verifier.mjs, build, tests,
     Playwright en 375 et 1280 px). -->

## Exceptions aux conventions

<!-- Règles de .claude/conventions.md qui ne s'appliquent pas ici, pourquoi, et
     ce que ça coûte. -->

## Pièges connus

<!-- Bugs déjà rencontrés, comportements surprenants, choses à ne pas refaire.
     Une entrée par piège, avec la version où il est apparu. -->

## Ce qui a été retiré

<!-- | Quoi | Version | Pourquoi | — plutôt que de laisser un module mort
     décrit au présent. -->
