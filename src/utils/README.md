# 📁 Utilitaires - Documentation

Ce dossier contient tous les utilitaires JavaScript/TypeScript organisés par fonctionnalité.

## 🗂️ Structure des dossiers

### `global/` - Utilitaires globaux

Fonctions utilisées dans toute l'application :

- `cookieUtilities.ts` - Gestion des cookies
- `dateUtilities.ts` - Utilitaires de dates
- `manageUserDatas.ts` - Gestion des données utilisateur

### `academy/` - Fonctionnalités académie

Modules spécifiques à la plateforme d'apprentissage :

- `progress/` - Suivi de progression des leçons
- `members/` - Gestion des données membres
- `tracking/` - Tracking funnel et analytics
- `animate/` - Animations spécifiques à l'académie
- `supabase/` - Configuration et connexion Supabase

### `site/` - Fonctionnalités site web

Modules pour le site principal :

- `animate/` - Animations du site
- `display/` - Fonctions d'affichage
- `sliders/` - Gestion des sliders
- `internal/` - Fonctions internes

## 🔧 Utilisation

### Import des utilitaires

```typescript
// Utilitaires globaux
import { getCookie, setCookie } from '$utils/global/cookieUtilities';

// Fonctionnalités académie
import { initProgressTracking } from '$utils/academy/progress/tracker';

// Fonctionnalités site
import { animateNavOnResponsive } from '$utils/site/animate/animateNav';
```

### Conventions de nommage

- **Fichiers** : `camelCase.ts` (ex: `cookieUtilities.ts`)
- **Fonctions** : `camelCase` (ex: `getCookie`)
- **Dossiers** : `kebab-case` (ex: `progress/`)

## 📝 Maintenance

- Chaque dossier a son propre README avec documentation détaillée
- Les fonctions sont documentées avec JSDoc
- Tests unitaires dans le dossier `tests/`
