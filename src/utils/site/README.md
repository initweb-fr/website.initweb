# 🌐 Fonctionnalités site web

Modules pour le site principal InitWeb.

## 📁 Structure

### `animate/` - Animations du site

Animations et interactions utilisateur :

- `animateNav.ts` - Animation de la navigation responsive
- `animateForm.ts` - Animations des formulaires
- `animateReveal.ts` - Animations de révélation d'éléments
- `animatePossibilities.ts` - Animations des possibilités
- `animateScrollIndicator.ts` - Indicateur de scroll
- `animateSlider.ts` - Animations des sliders

### `display/` - Fonctions d'affichage

Gestion de l'affichage et de l'interface :

- `displayJoinAccess.ts` - Affichage de l'accès membre
- `displayPage.ts` - Comportement général des pages
- `displaySiteBanners.ts` - Gestion des bannières
- `displaySiteDropdowns.ts` - Gestion des dropdowns
- `displaySiteNav.ts` - Navigation du site
- `displaySiteTOC.ts` - Table des matières
- `displaySiteVideo.ts` - Gestion des vidéos
- `displayTimeline.ts` - Affichage des timelines
- `displaySiteModales.ts` - Gestion des modales
- `displaySiteTab.ts` - Gestion des onglets

### `sliders/` - Gestion des sliders

Composants de slider interactifs :

- `slidersReviews.ts` - Slider des avis clients
- `slidersTargets.ts` - Slider des objectifs

### `internal/` - Fonctions internes

Fonctions utilitaires internes :

- `checkLinks.ts` - Vérification des liens

## 🔧 Utilisation

### Animations

```typescript
import { animateNavOnResponsive } from '$utils/site/animate/animateNav';
import { revealElements } from '$utils/site/animate/animateReveal';

// Initialise les animations
animateNavOnResponsive();
revealElements();
```

### Affichage

```typescript
import { manageDropdowns } from '$utils/site/display/displaySiteDropdowns';
import { manageNewsBanner } from '$utils/site/display/displaySiteBanners';

// Gère les éléments d'interface
manageDropdowns();
manageNewsBanner();
```

### Sliders

```typescript
import { animateReviewsSlider } from '$utils/site/sliders/slidersReviews';
import { animateTargetsSlider } from '$utils/site/sliders/slidersTargets';

// Initialise les sliders
animateReviewsSlider();
animateTargetsSlider();
```

## 🎨 Interface utilisateur

### Responsive Design

- Breakpoints définis pour mobile/desktop
- Animations adaptées selon la taille d'écran
- Navigation mobile avec overlay

### Interactions

- Dropdowns avec gestion d'état
- Modales avec animations
- Sliders avec contrôles tactiles
- Formulaires avec validation

## 📱 Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Support mobile et tablette
- Accessibilité WCAG 2.1
- Performance optimisée
