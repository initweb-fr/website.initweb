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

  const mediaQuery = window.matchMedia('(min-width: 992px)');
  if (mediaQuery.matches) {
    // Si la media query est vraie (la fenêtre est de 992px ou plus)
    console.log('La fenêtre est de 992px ou plus');
    SplideProgramA();
  }
});
