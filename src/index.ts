import { manageFixedModal } from '$utils/manageFixedModales';
import { addCurrentPageToNav } from '$utils/managepagedata';
import { saveCurrentPreviousPage } from '$utils/managepagedata';
import {
  addUserEmail,
  addUserFirstName,
  addUserLastName,
  saveUserData,
} from '$utils/manageuserdata';
import { manageutm } from '$utils/manageutm';
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
