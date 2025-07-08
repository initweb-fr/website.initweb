import Splide from '@splidejs/splide';

export function animateReviewsSlider() {
  const slidersReviewsSlider = document.querySelectorAll('.splide.reviews-slider');
  slidersReviewsSlider.forEach((slider) => {
    new Splide(slider as HTMLElement, {}).mount();
  });
}
