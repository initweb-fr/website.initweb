import { revealFormaHero } from '$utils/reveal';
import { SplideFormaProgramA, SplideFormaSituationA } from '$utils/sliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('Landing.ts loaded');
  SplideFormaProgramA();
  SplideFormaSituationA();
  revealFormaHero();
});
