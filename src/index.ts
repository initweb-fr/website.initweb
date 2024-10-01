import { revealHeader, revealHomeHero, revealHubContent } from '$utils/animate/animateReveal';
import { getMemberstackMember } from '$utils/data/dataMember';
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
import { displayJoinAccess } from '$utils/display/displayJoinAccess';
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
import { createVideoOnLoad } from '$utils/display/displaySiteVideo';
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

  createVideoOnLoad();
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
  displayJoinAccess();

  // ------------------------------------------------------------------------------------------------------------------------
  // - Fonctions spécifiques selon la typologie page

  function loadCoursesFunctions() {
    getFunnelTrackingData();
    SplideFormaSituationA();
    SplideFormaProgramA();
  }
  // Vérifier si l'URL contient '/formations'
  if (
    window.location.pathname.includes('/formations') &&
    !window.location.pathname.includes('/rejoindre')
  ) {
    loadCoursesFunctions();
  }

  // Vérifier que memberstack est chargé
  // Vérifier que le membre est chargé

  // Déclencher les fonctions nécessitant le script

  async function loadWhenMemberLoggedIn() {
    const memberData = await getMemberstackMember();
    if (memberData) {
      console.log(memberData);
      if (window.location.pathname.includes('/academie')) {
        await updateModuleLecture();
        setTimeout(showProgression, 1000);
        surveyProgression();
        await saveModuleSeen();
        if (window.location.pathname.includes('/bienvenue')) {
          await sendFunnelTrackingData();
        }
      }
    }
  }
  loadWhenMemberLoggedIn();

  /**
  // Vérifier si l'URL contient '/academie'
  if (window.location.pathname.includes('/academie')) {
    if (window.$memberstackReady) {
      console.log('test');
      loadWhenMemberLoggedIn();
    } else {
      document.addEventListener('memberstack.ready', loadWhenMemberLoggedIn);
    }
  }
    */

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
