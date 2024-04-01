import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { addCurrentPageToNav, saveCurrentPage } from '$utils/managepagedata';
import {
  addUserEmail,
  addUserFirstName,
  addUserLastName,
  saveUserData,
} from '$utils/manageuserdata';
import { manageutm } from '$utils/manageutm';
import { revealHeading, revealSubHeading, revealSupHeading, revealText } from '$utils/reveal';
import { SplideProgramA } from '$utils/sliders';
// import { verifyLoad } from '$utils/verify';

window.Webflow ||= [];
window.Webflow.push(() => {
  revealHeading();
  revealSubHeading();
  revealSupHeading();
  revealText();
  manageutm();

  saveUserData();
  addUserEmail();
  addUserFirstName();
  addUserLastName();

  saveCurrentPage();
  addCurrentPageToNav();

  SplideProgramA();
});
