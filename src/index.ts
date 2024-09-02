import { revealHeader, revealHomeHero, revealHubContent } from '$utils/animate/animateReveal';
import {
  addUserData,
  manageUTM,
  saveCurrentPreviousPage,
  saveUserData,
} from '$utils/data/dataUser';
import { manageNewsBanner } from '$utils/display/displaySiteBanners';
import { toggleFixedModal } from '$utils/display/displaySiteModales';
import { addCurrentPageToNav } from '$utils/display/displaySiteNav';
import { instaHideGoogleAuth } from '$utils/special/specialOnInstagram';

window.Webflow ||= [];
window.Webflow.push(() => {
  // console.log('Index.ts loaded');
  // Handle NavBar
  addCurrentPageToNav();
  manageNewsBanner();

  // Handle Previous/Current Page
  saveCurrentPreviousPage();

  // Animate Elements
  //revealSupHeading();
  //revealHeaderHeading();
  //revealHeaderText();
  revealHeader();
  revealHubContent();

  // Get & Insert UTMs in Elements
  manageUTM();

  // Save & Use UserData in Elements
  saveUserData();
  addUserData();

  toggleFixedModal();

  if (window.matchMedia('(min-width: 992px)').matches) {
    if (window.location.pathname === '/') {
      revealHomeHero();
    }
  }

  // AFFICHAGE - Instagram Web View
  instaHideGoogleAuth();
});
