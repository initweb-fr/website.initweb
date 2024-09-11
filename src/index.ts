import { revealHeader, revealHomeHero, revealHubContent } from '$utils/animate/animateReveal';
import {} from '$utils/data/dataMemberProgression';
import {
  saveModuleSeen,
  surveyProgression,
  updateModuleLecture,
} from '$utils/data/dataMemberProgression';
import { getFunnelTrackingData, sendFunnelTrackingData } from '$utils/data/dataMemberSource';
import {
  addUserData,
  manageUTM,
  saveCurrentPreviousPage,
  saveUserData,
} from '$utils/data/dataUser';
import { getUserDevice } from '$utils/data/dataUser';
import { showProgression } from '$utils/display/displayMemberProgression';
import { manageNewsBanner } from '$utils/display/displaySiteBanners';
import { manageDropdowns } from '$utils/display/displaySiteDropdowns';
import { toggleFixedModal } from '$utils/display/displaySiteModales';
import { addCurrentPageToNav } from '$utils/display/displaySiteNav';
import {
  manageChapterTOC,
  manageGlobalTOC,
  manageGlobalTOC_mobile,
  manageSubChapterTOC,
} from '$utils/display/displaySiteTOC';
import { SplideFormaProgramA, SplideFormaSituationA } from '$utils/sliders/slidersFormation';
import { instaHideGoogleAuth } from '$utils/special/specialOnInstagram';

// Déclaration initiale de l'objet Window
declare global {
  interface Window {
    $memberstackReady?: boolean;
    fsAttributes: any[];
    $memberstackDom: any;
  }
}

window.Webflow ||= [];
window.Webflow.push(() => {
  // ------------------------------------------------------------------------------------------------------------------------
  // - Fonctions globales

  getUserDevice(); // Get user device
  addCurrentPageToNav(); // Add current page to nav
  manageNewsBanner(); // Manage news banner
  saveCurrentPreviousPage(); // Save current previous page
  revealHeader(); // Reveal header
  revealHubContent(); // Reveal hub content
  manageUTM(); // Manage UTM
  saveUserData(); // Save user data
  addUserData(); // Add user data
  toggleFixedModal(); // Toggle fixed modal
  instaHideGoogleAuth(); // Hide Google Auth on Instagram
  revealHomeHero();
  manageDropdowns();

  // ------------------------------------------------------------------------------------------------------------------------
  // - Fonctions spécifiques selon la typologie page

  function loadLandingFunctions() {
    getFunnelTrackingData();
    SplideFormaSituationA();
    SplideFormaProgramA();
  }

  async function loadAcademyFunctions() {
    await updateModuleLecture();
    setTimeout(showProgression, 1000);
    surveyProgression();
    await saveModuleSeen();
    if (window.location.pathname.includes('/bienvenue')) {
      await sendFunnelTrackingData();
    }
  }

  // ------------------------------------------------------------------------------------------------------------------------
  // - Affichage des fonctions en fonction de l'URL

  // Vérifier si l'URL contient '/formations'
  if (window.location.pathname.includes('/formations')) {
    loadLandingFunctions();
  }

  // Vérifier si l'URL contient '/academie'
  if (window.location.pathname.includes('/academie')) {
    if (window.$memberstackReady) {
      loadAcademyFunctions();
    } else {
      document.addEventListener('memberstack.ready', loadAcademyFunctions);
    }
  }

  // ------------------------------------------------------------------------------------------------------------------------
  // - Chargement de l'attribut de CMS Nest

  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsnest',
    () => {
      manageGlobalTOC();
      manageChapterTOC();
      manageSubChapterTOC();
      manageGlobalTOC_mobile();
    },
  ]);
});
