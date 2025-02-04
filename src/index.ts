// Importation des fonctions nécessaires depuis différents modules

import { animateAcaPanels } from '$utils/animate/animateAcademy';
import { animateNavOnResponsive } from '$utils/animate/animateNav';
import { animateSliderC1OnResponsive } from '$utils/animate/animatePossibilities';
import { revealHeader, revealHubContent, revealTestiExergue } from '$utils/animate/animateReveal';
import { animateScrollIndicator } from '$utils/animate/animateScrollIndicator';
import { trackProgress } from '$utils/data/dataMemberProgression';
import { getFunnelTrackingData, sendFunnelTrackingData } from '$utils/data/dataMemberSource';
import {
  addUserData,
  manageUTM,
  saveCurrentPreviousPage,
  saveUserData,
} from '$utils/data/dataUser';
import { getUserDevice } from '$utils/data/dataUser';
import { displayJoinAccess } from '$utils/display/displayJoinAccess';
import {} from '$utils/display/displayMemberProgression';
import { manageNewsBanner } from '$utils/display/displaySiteBanners';
import { manageDropdowns } from '$utils/display/displaySiteDropdowns';
import { toggleFixedModal } from '$utils/display/displaySiteModales';
import { addCurrentPageToNav } from '$utils/display/displaySiteNav';
import { SplideFormaProgramA, SplideFormaSituationA } from '$utils/sliders/slidersFormation';
import { instaHideGoogleAuth } from '$utils/special/specialOnInstagram';
// Déclaration globale pour étendre l'objet Window avec des propriétés spécifiques
declare global {
  interface Window {
    $memberstackReady?: boolean; // Indicateur de disponibilité de Memberstack
    fsAttributes: any[]; // Attributs personnalisés pour le CMS
    $memberstackDom: any; // DOM spécifique à Memberstack
  }
}

// Initialisation de Webflow si non déjà fait

window.Webflow ||= [];
window.Webflow.push(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'utils/style/site.css';
  document.head.appendChild(link);

  //
  revealTestiExergue();
  //
  trackProgress();
  getUserDevice(); // Récupère le type d'appareil de l'utilisateur
  addCurrentPageToNav(); // Ajoute la page actuelle à la navigation
  manageNewsBanner(); // Gère l'affichage de la bannière d'actualités
  saveCurrentPreviousPage(); // Sauvegarde la page actuelle et la précédente
  revealHeader(); // Affiche l'en-tête
  revealHubContent(); // Affiche le contenu du hub
  manageUTM(); // Gère les paramètres UTM
  saveUserData(); // Sauvegarde les données utilisateur
  addUserData(); // Ajoute des données utilisateur
  toggleFixedModal(); // Active/désactive la modal fixe
  instaHideGoogleAuth(); // Masque le bouton Google Auth sur Instagram
  manageDropdowns(); // Gère les menus déroulants
  displayJoinAccess(); // Affiche l'accès à l'inscription
  animateNavOnResponsive();
  animateSliderC1OnResponsive();
  animateScrollIndicator();

  function landingFonctions() {
    getFunnelTrackingData(); // Récupère les données de suivi du tunnel
    SplideFormaSituationA(); // Initialise le slider pour la situation A
    SplideFormaProgramA(); // Initialise le slider pour le programme A
  }

  //trackProgress();

  // ---- AFFICHAGE SELON LA PAGE -------------------------------------------------------------------------------------------------------------------

  if (window.location.pathname.includes('/formations')) {
    landingFonctions(); // Charge les fonctions des cours
  }
  if (window.location.pathname.includes('/academie')) {
    animateAcaPanels();
    // Met à jour la lecture du module
    if (window.location.pathname.includes('/modules')) {
      sendFunnelTrackingData(); // Envoie les données de suivi du tunnel
    }
  }
  /** 
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
