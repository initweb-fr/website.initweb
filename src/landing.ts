import { SplideProgramA } from '$utils/sliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  if (window.matchMedia('(min-width: 992px)').matches) {
    SplideProgramA();
  } else {
  }
});
