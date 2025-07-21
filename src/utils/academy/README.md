# 🎓 Fonctionnalités académie

Modules spécifiques à la plateforme d'apprentissage InitWeb Academy.

## 📁 Structure

### `progress/` - Suivi de progression

Gestion du suivi des leçons et de la progression des membres :

- `tracker.ts` - Orchestrateur principal du suivi
- `supabase.ts` - Sauvegarde dans Supabase (source de vérité)
- `utils.ts` - Utilitaires pour la progression

### `members/` - Gestion des membres

Données et gestion des membres :

- `data.ts` - Récupération et gestion des données membres

### `tracking/` - Analytics et tracking

Suivi des interactions utilisateur :

- `funnel.ts` - Tracking du funnel de conversion

### `animate/` - Animations académie

Animations spécifiques à l'interface d'apprentissage :

- `animateTOC.ts` - Animation de la table des matières
- `animateSchemes.ts` - Animations des schémas
- `animatePanels.ts` - Animations des panneaux

### `supabase/` - Base de données

Configuration et connexion Supabase :

- `config.ts` - Configuration de la connexion Supabase

## 🔧 Utilisation

### Initialisation du suivi de progression

```typescript
import { initProgressTracking } from '$utils/academy/progress/tracker';

// Initialise le suivi de progression
initProgressTracking();
```

### Récupération des données membre

```typescript
import { getMemberData } from '$utils/academy/members/data';

const memberData = await getMemberData();
```

### Tracking funnel

```typescript
import { getFunnelTrackingData, sendFunnelTrackingData } from '$utils/academy/tracking/funnel';

// Récupère les données de tracking
getFunnelTrackingData();

// Envoie les données de tracking
sendFunnelTrackingData();
```

## 📊 Architecture

### Progression

- **Supabase** : Source de vérité pour la progression
- **Memberstack** : Backup et synchronisation
- **Cookies** : Stockage temporaire local

### Données membre

- **Memberstack** : Données principales du membre
- **Supabase** : Progression et données d'apprentissage

## 🔐 Sécurité

- Authentification via Memberstack
- Politiques RLS dans Supabase
- Validation des données côté client et serveur
