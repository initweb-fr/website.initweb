import { manageFixedModal } from '$utils/manageFixedModales';
import { addCurrentPageToNav } from '$utils/managePageData';
import { saveCurrentPreviousPage } from '$utils/managePageData';
import {
  addUserEmail,
  addUserFirstName,
  addUserLastName,
  saveUserData,
} from '$utils/manageUserData';
import { manageutm } from '$utils/manageUTM';
import { revealHeading, revealSubHeading, revealSupHeading, revealText } from '$utils/reveal';
window.Webflow ||= [];
window.Webflow.push(() => {
  // Handle NavBar
  addCurrentPageToNav();

  // Handle Previous/Current Page
  saveCurrentPreviousPage();

  // Animate Elements
  revealHeading();
  revealSubHeading();
  revealSupHeading();
  revealText();

  // Get & Insert UTMs in Elements
  manageutm();

  // Save & Use UserData in Elements
  saveUserData();
  addUserEmail();
  addUserFirstName();
  addUserLastName();

  manageFixedModal();
});
