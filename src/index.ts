import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { revealHeading, revealSubHeading, revealSupHeading, revealText } from '$utils/reveal';
import { verifyLoad } from '$utils/verify';

window.Webflow ||= [];
window.Webflow.push(() => {
  verifyLoad();

  revealHeading();
  revealSubHeading();
  revealSupHeading();
  revealText();
});
