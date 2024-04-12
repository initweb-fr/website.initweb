

import {
  addUserEmail,
  addUserFirstName,
  addUserLastName,
  saveUserData,
} from '$utils/manageuserdata';
import { manageutm } from '$utils/manageutm';
import { revealHeading, revealSubHeading, revealSupHeading, revealText } from '$utils/reveal';
import { SplideProgramA } from '$utils/sliders';


window.Webflow ||= [];
window.Webflow.push(() => {

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


  if (window.matchMedia('(min-width: 992px)').matches) {
    SplideProgramA();
  } else {
    
  }
});
