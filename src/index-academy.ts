import { getCurrentPlan } from '$utils/academy/access/plans';
import { animateAcaPanels } from '$utils/academy/animate/animatePanels';
import { animateSchemes } from '$utils/academy/animate/animateSchemes';
import { scrollToCurrentLink } from '$utils/academy/animate/animateTOC';
import { initProgressTracking } from '$utils/academy/progress/tracker';
import {
  initFunnelDatasTransmission,
  saveFunnelDatasAcademy,
} from '$utils/academy/tracking/funnel';
import { createInputsFromCookies, fillFormDatas } from '$utils/global/forms/fill';
import { saveFormDatas } from '$utils/global/forms/save';

declare global {
  interface Window {
    $memberstackReady?: boolean; // Indicateur de disponibilité de Memberstack
    fsAttributes: Array<unknown>; // Attributs personnalisés pour le CMS
    $memberstackDom: {
      getCurrentMember: () => Promise<{
        data: {
          id: string;
        } | null;
      }>;
    }; // DOM spécifique à Memberstack
  }
}
// On encapsule l'initialisation dans une fonction asynchrone pour attendre animateSchemes

// Initialisation de Webflow et du reste des fonctions après animateSchemes
window.Webflow ||= [];
window.Webflow.push(() => {
  // Fonctionnalités de tracking
  saveFunnelDatasAcademy();

  // Fonctionnalités de gestion des données utilisateur
  fillFormDatas();
  createInputsFromCookies();
  saveFormDatas();

  // Fonctionnalités de gestion des plans
  getCurrentPlan();

  // Fonctions d'animation
  animateSchemes();
  animateAcaPanels();
  initProgressTracking();

  // Fonctions d'interface utilisateur
  if (window.location.pathname.includes('/formations/modules')) {
    scrollToCurrentLink();
  }

  if (window.location.pathname.includes('/bienvenue')) {
    initFunnelDatasTransmission();
  }
});
