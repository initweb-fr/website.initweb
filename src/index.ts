import { manageFixedModal } from '$utils/manageFixedModales';
import {
  addCurrentPageToNav,
  addUserEmail,
  addUserFirstName,
  addUserLastName,
  saveCurrentPreviousPage,
  saveUserData,
} from '$utils/manageuserdata';
import { manageUTM } from '$utils/manageuserdata';
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
