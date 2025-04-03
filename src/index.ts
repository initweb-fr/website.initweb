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
import { toggleFixedModal } from '$utils/display/displaySiteModales';
import { addCurrentPageToNav } from '$utils/display/displaySiteNav';
import { initializeDates } from '$utils/display/displayTimeline';

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
  console.log('Hello tout le monde');
  // Ajout du CSS personnalisé
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'utils/style/site.css';
  document.head.appendChild(link);

  // Fonctions d'initialisation générales
  setupScrollBehavior();
  initializeDates();
  revealElements();

  // Fonctions de gestion des données utilisateur
  trackProgress();
  getUserDevice();
  saveCurrentPreviousPage();
  manageUTM();
  saveUserData();
  addUserData();

  // Fonctions d'interface utilisateur
  addCurrentPageToNav();
  manageNewsBanner();
  toggleFixedModal();
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
