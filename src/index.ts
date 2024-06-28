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
import { revealHeaderHeading, revealHeaderText } from '$utils/reveal';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Index.ts loaded');
  // Handle NavBar
  addCurrentPageToNav();

  // Handle Previous/Current Page
  saveCurrentPreviousPage();

  // Animate Elements
  revealHeaderHeading();
  revealHeaderText();

  // Get & Insert UTMs in Elements
  manageUTM();

  // Save & Use UserData in Elements
  saveUserData();
  addUserEmail();
  addUserFirstName();
  addUserLastName();

  manageFixedModal();
});
