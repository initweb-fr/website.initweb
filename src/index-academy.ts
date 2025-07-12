import { animateAcaPanels } from '$utils/academy/animate/animatePanels';
import { animateSchemes } from '$utils/academy/animate/animateSchemes';
import { scrollToCurrentLink } from '$utils/academy/animate/animateTOC';
import { sendFunnelTrackingData } from '$utils/academy/data/dataMemberSource';
import { fillFormData, saveFormData, saveNavigationData } from '$utils/site/data/manageUserDatas';

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

// Initialisation de Webflow
window.Webflow ||= [];
window.Webflow.push(() => {
  fillFormData();
  saveFormData();
  saveNavigationData();
  animateSchemes();

  animateAcaPanels();
  if (window.location.pathname.includes('/formations/modules')) {
    scrollToCurrentLink();
  }

  if (window.location.pathname.includes('/bienvenue')) {
    sendFunnelTrackingData();
  }
});
