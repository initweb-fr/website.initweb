import { SplideFormaProgramA, SplideFormaSituationA } from '$utils/sliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  if (window.matchMedia('(min-width: 992px)').matches) {
    SplideFormaProgramA();
    SplideFormaSituationA();
  } else {
  }
});
