# 🌐 Utilitaires globaux

Fonctions utilisées dans toute l'application, indépendantes du contexte.

## 📁 Fichiers

### `cookieUtilities.ts`

Gestion des cookies navigateur :

- `getCookie(name)` - Récupère la valeur d'un cookie
- `setCookie(name, value, days)` - Définit un cookie avec expiration
- `deleteCookie(name)` - Supprime un cookie

### `dateUtilities.ts`

Utilitaires pour la manipulation des dates :

- `formatDate(date, format)` - Formate une date selon un pattern
- `getRelativeTime(date)` - Retourne le temps relatif (ex: "il y a 2 heures")

### `manageUserDatas.ts`

Gestion des données utilisateur :

- `saveFormData()` - Sauvegarde les données de formulaire
- `fillFormData()` - Remplit les formulaires avec les données sauvegardées
- `saveNavigationData()` - Sauvegarde les données de navigation

## 🔧 Utilisation

```typescript
import { getCookie, setCookie } from '$utils/global/cookieUtilities';
import { formatDate } from '$utils/global/dateUtilities';
import { saveFormData } from '$utils/global/manageUserDatas';

// Exemple d'utilisation
setCookie('user_preference', 'dark_mode', 30);
const preference = getCookie('user_preference');
const formattedDate = formatDate(new Date(), 'DD/MM/YYYY');
saveFormData();
```

## 📝 Notes

- Ces fonctions sont utilisées dans `index-site.ts` et `index-academy.ts`
- Compatibles avec tous les navigateurs modernes
- Gestion d'erreurs intégrée
