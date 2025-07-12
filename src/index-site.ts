// Importation des fonctions d'animation
import { animateNavOnResponsive } from '$utils/_archives/animate/animateNav';
import { animateSliderC1OnResponsive } from '$utils/_archives/animate/animatePossibilities';
import { revealElements } from '$utils/_archives/animate/animateReveal';
import { animateScrollIndicator } from '$utils/_archives/animate/animateScrollIndicator';
import { animateMarqueeReviews } from '$utils/_archives/animate/animateSlider';
// Importation des fonctions d'affichage
import { displayJoinAccess } from '$utils/_archives/display/displayJoinAccess';
import { setupScrollBehavior } from '$utils/_archives/display/displayPage';
import { manageNewsBanner } from '$utils/_archives/display/displaySiteBanners';
import { manageDropdowns } from '$utils/_archives/display/displaySiteDropdowns';
import { addCurrentPageToNav } from '$utils/_archives/display/displaySiteNav';
import { initializeDates } from '$utils/_archives/display/displayTimeline';
// Importation des fonctions de gestion des données
import {
  getFunnelTrackingData,
  sendFunnelTrackingData,
} from '$utils/academy/data/dataMemberSource';
import { animateFormLabels } from '$utils/site/animate/animateForm';
import { animateNav } from '$utils/site/animate/animateNav';
import { fillFormData, saveFormData, saveNavigationData } from '$utils/site/data/manageUserDatas';
// Importation des fonctions V3
import { toggleDropdownV3 } from '$utils/site/display/displaySiteDropdowns';
import { toggleModalV3 } from '$utils/site/display/displaySiteModales';
import { displaySiteTab } from '$utils/site/display/displaySiteTab';
import { checkLinks } from '$utils/site/internal/checkLinks';
import { animateReviewsSlider } from '$utils/site/sliders/slidersReviews';
import { animateTargetsSlider } from '$utils/site/sliders/slidersTargets';

// Déclaration des types globaux
declare global {
  interface Window {
    fsAttributes: Array<unknown>; // Attributs personnalisés pour le CMS
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
    animateTargetsSlider();

    if (window.location.href.includes('site-initweb-v3')) {
      checkLinks();
      animateNav();
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
