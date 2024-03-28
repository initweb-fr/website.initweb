import Splide from '@splidejs/splide';

export function SplideProgramA() {
  const chaptersSlides = document.querySelectorAll('.program-a_chapters_item.splide__slide');

  // Initialize Spliders
  const main = new Splide('#splide-program-a-contents', {
    loop: true,
    speed: 400,
    type: 'loop',
  }).mount();

  const chapters = new Splide('#splide-program-a-chapters', {
    perPage: 1,
    autoWidth: true,
    speed: 400,
  });

  chapters.sync(main).mount();

  chaptersSlides.forEach((slide, i) => {
    slide.addEventListener('click', function () {
      chapters.go(i);
    });
  });
}

export function SplideReviewsA() {
  new Splide('#splide-reviews-a', {
    loop: true,
    speed: 800,
    autoplay: true,
    interval: 4000,
    pauseOnHover: false,
  }).mount();
}
