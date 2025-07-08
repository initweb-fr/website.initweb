import Splide from '@splidejs/splide';

export function animateUtilitiesSlider() {
  const slidersUtilities = document.querySelectorAll('.splide.targets-slider');
  slidersUtilities.forEach((slider) => {
    new Splide(slider as HTMLElement, {
      type: 'loop',
    }).mount();
  });
}
