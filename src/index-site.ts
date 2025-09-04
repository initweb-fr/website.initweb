// Importation des fonctions d'animation
// Importation des fonctions de gestion des données
import Lenis from 'lenis';

import { fillUserLocalDatas } from '$utils/--global/tracking/user/fillUserLocalDatas';
import { saveUserLocalDatas } from '$utils/--global/tracking/user/saveUserLocalDatas';
import { animateFormLabels } from '$utils/site/animate/animateForm';
import {
  animateNavDropDownOnResponsive,
  animateNavOnResponsive,
} from '$utils/site/animate/animateNav';
import { animateSliderC1OnResponsive } from '$utils/site/animate/animatePossibilities';
import { revealElements } from '$utils/site/animate/animateReveal';
import { animateMarqueeReviews } from '$utils/site/animate/animateSlider';
// Importation des fonctions d'affichage
import { displayJoinAccess } from '$utils/site/display/displayJoinAccess';
import { setupScrollBehavior } from '$utils/site/display/displayPage';
import { manageNewsBanner } from '$utils/site/display/displaySiteBanners';
import { manageDropdowns } from '$utils/site/display/displaySiteDropdowns';
import { toggleModalV3 } from '$utils/site/display/displaySiteModales';
import { addCurrentPageToNav } from '$utils/site/display/displaySiteNav';
import { displaySiteTab } from '$utils/site/display/displaySiteTab';
import { initializeDates } from '$utils/site/display/displayTimeline';
// Importation des fonctions V3
import { checkLinks } from '$utils/site/internal/checkLinks';
import { sliderReviewsCards, sliderReviewsMarquee } from '$utils/site/sliders/slidersReviews';
import { sliderTargetsCards } from '$utils/site/sliders/slidersTargets';
import { initFunnelDatas, initTransmitFunnelDatas } from '$utils/site/tracking/funnel';

// Déclaration des types globaux
declare global {
  interface Window {
    fsAttributes: Array<unknown>; // Attributs personnalisés pour le CMS
  }
}
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialisation de Webflow
window.Webflow ||= [];
window.Webflow.push(() => {
  if (
    window.location.href.includes('site-initweb-v3') ||
    window.location.href.includes('www.initweb.fr')
  ) {
    // Fonctionnalités pour le site
    toggleModalV3();
    displaySiteTab();

    // Fonctionnalités de tracking
    initFunnelDatas();
    initTransmitFunnelDatas();

    // Fonctionnalités de gestion des données utilisateur
    saveUserLocalDatas();
    fillUserLocalDatas();

    // Fonctions d'animation
    animateFormLabels();
    sliderReviewsCards();
    sliderReviewsMarquee();
    sliderTargetsCards();

    // Fonctions d'interface utilisateur
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
  animateNavDropDownOnResponsive();
  animateSliderC1OnResponsive();
  animateMarqueeReviews();

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
