import Splide from '@splidejs/splide';

export function animateTargetsSlider() {
  const slidersTargets = document.querySelectorAll('.splide.targets-slider');
  slidersTargets.forEach((slider) => {
    new Splide(slider as HTMLElement, {}).mount();
  });
}
