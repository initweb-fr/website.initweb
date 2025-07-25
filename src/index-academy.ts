import { saveFunnelDatas } from '$utils/--global/tracking/funnel/saveFunnelDatas';
import { fillUserLocalDatas } from '$utils/--global/tracking/user/fillUserLocalDatas';
import { saveUserLocalDatas } from '$utils/--global/tracking/user/saveUserLocalDatas';
import { animateAcaPanels } from '$utils/academy/animate/animatePanels';
import { animateSchemes } from '$utils/academy/animate/animateSchemes';
import { scrollToCurrentLink } from '$utils/academy/animate/animateTOC';
import { initProgressTracking } from '$utils/academy/progress/tracker';
import { sendFunnelDatasToWebhook } from '$utils/academy/tracking/transmit';

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
  saveFunnelDatas();

  // Fonctionnalités de gestion des données utilisateur
  saveUserLocalDatas();
  fillUserLocalDatas();

  // Fonctions d'animation
  animateSchemes();
  animateAcaPanels();
  initProgressTracking();

  // Fonctions d'interface utilisateur
  if (window.location.pathname.includes('/formations/modules')) {
    scrollToCurrentLink();
  }
  if (window.location.pathname.includes('/bienvenue')) {
    sendFunnelDatasToWebhook();
  }
});
