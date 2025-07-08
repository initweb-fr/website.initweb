// Importation des fonctions d'animation
import { animateAcaPanels, scrollToCurrentLink } from '$utils/animate/animateAcademy';
import { animateNavOnResponsive } from '$utils/animate/animateNav';
import { animateSliderC1OnResponsive } from '$utils/animate/animatePossibilities';
import { revealElements } from '$utils/animate/animateReveal';
import { animateScrollIndicator } from '$utils/animate/animateScrollIndicator';
import { animateMarqueeReviews } from '$utils/animate/animateSlider';
// Importation des fonctions de gestion des données
import { trackProgress } from '$utils/data/dataMemberProgression';
import { getFunnelTrackingData, sendFunnelTrackingData } from '$utils/data/dataMemberSource';
import {
  addUserData,
  getUserDevice,
  manageUTM,
  saveCurrentPreviousPage,
  saveUserData,
} from '$utils/data/dataUser';
// Importation des fonctions d'affichage
import { displayJoinAccess } from '$utils/display/displayJoinAccess';
import { setupScrollBehavior } from '$utils/display/displayPage';
import { manageNewsBanner } from '$utils/display/displaySiteBanners';
import { manageDropdowns } from '$utils/display/displaySiteDropdowns';
import { addCurrentPageToNav } from '$utils/display/displaySiteNav';
import { initializeDates } from '$utils/display/displayTimeline';
import { animateFormLabels } from '$utils/v3/animate/animateForm';
import { fillFormData, saveFormData, saveNavigationData } from '$utils/v3/data/manageUserDatas';
// Importation des fonctions V3
import { toggleDropdownV3 } from '$utils/v3/display/displaySiteDropdowns';
import { toggleModalV3 } from '$utils/v3/display/displaySiteModales';
import { displaySiteTab } from '$utils/v3/display/displaySiteTab';
import { checkLinks } from '$utils/v3/internal/checkLinks';
import { animateReviewsSlider } from '$utils/v3/sliders/slidersReviews';
import { animateUtilitiesSlider } from '$utils/v3/sliders/slidersUtilities';

// Déclaration des types globaux
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
  // ------------------------------------------------------------
  // Fonctionnalités pour l'ACADÉMIE V3
  // ------------------------------------------------------------
  if (
    window.location.href.includes('academie-initweb-v3') ||
    window.location.href.includes('aca.initweb.fr')
  ) {
    saveNavigationData();
    saveFormData();
    fillFormData();
  }
  // ------------------------------------------------------------
  // Fonctionnalités pour le SITE V3
  // ------------------------------------------------------------
  else if (
    window.location.href.includes('site-initweb-v3') ||
    window.location.href.includes('www.initweb.fr')
  ) {
    // Fonctionnalités pour le site
    toggleDropdownV3();
    toggleModalV3();
    displaySiteTab();
    saveNavigationData();
    saveFormData();
    fillFormData();
    animateFormLabels();
    animateReviewsSlider();
    animateUtilitiesSlider();

    if (window.location.href.includes('site-initweb-v3')) {
      checkLinks();
    }
  }

  // Fonctions d'initialisation générales
  setupScrollBehavior();
  initializeDates();
  revealElements();

  // Fonctions de gestion des données utilisateur

  // Fonctions d'interface utilisateur
  addCurrentPageToNav();
  manageNewsBanner();
  manageDropdowns();
  displayJoinAccess();

  // Fonctions d'animation
  animateNavOnResponsive();
  animateSliderC1OnResponsive();
  animateScrollIndicator();
  animateMarqueeReviews();

  // Fonctions spécifiques aux pages de formation
  function landingFonctions() {
    getFunnelTrackingData();
  }

  // Gestion des routes spécifiques
  if (window.location.pathname.includes('/formations')) {
    landingFonctions();
  }

  if (window.location.pathname.includes('/academie')) {
    animateAcaPanels();
    scrollToCurrentLink();
    if (window.location.pathname.includes('/modules')) {
      sendFunnelTrackingData();
    }
  }

  /** 
  // Code commenté pour la gestion future de Memberstack
  if (window.$memberstackDom) {
    const memberstack = window.$memberstackDom;

    memberstack.getCurrentMember().then(function (result) {
      const member = result.data;
      if (member) {
        console.log('Membre identifié:', member.id);
      } else {
        console.log('Aucun membre connecté');
      }
    });
  }
  */
});
