import { manageNewsBanner } from '$utils/manage-custom-element';
import { manageFixedModal } from '$utils/manage-fixed-modales';
import {
  addCurrentPageToNav,
  addUserEmail,
  addUserFirstName,
  addUserLastName,
  manageUTM,
  saveCurrentPreviousPage,
  saveUserData,
} from '$utils/manage-user-data';
import { revealHeader, revealHomeHero, revealHubContent } from '$utils/reveal';

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
  addUserEmail();
  addUserFirstName();
  addUserLastName();

  manageFixedModal();

  if (window.matchMedia('(min-width: 992px)').matches) {
    if (window.location.pathname === '/') {
      revealHomeHero();
    }
  }
});
