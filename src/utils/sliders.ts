import Splide from '@splidejs/splide';

export function SplideFormaProgramA() {
  const chaptersSlides = document.querySelectorAll(
    '[iw-slider-id="program-chapters"] .splide__slide'
  );
  // console.log(chaptersSlides);

  // Initialize Spliders
  const main = new Splide('[iw-slider-id="program-content"]', {
    loop: true,
    speed: 400,
    type: 'loop',
    /** mediaQuery: 'max',
    breakpoints: {
      991: {
        destroy: true,
      },
    },**/
  }).mount();

  const chapters = new Splide('[iw-slider-id="program-chapters"]', {
    perPage: 1,
    autoWidth: true,
    speed: 400,
    /** mediaQuery: 'max',
    breakpoints: {
      991: {
        destroy: true,
      },
    },**/
  });

  chapters.sync(main).mount();

  chaptersSlides.forEach((slide, i) => {
    slide.addEventListener('click', function () {
      chapters.go(i);
    });
  });
}

export function SplideFormaSituationA() {
  const themesSlides = document.querySelectorAll(
    '[iw-slider-id="situation-themes"] .splide__slide'
  );
  // console.log(chaptersSlides);

  // Initialize Spliders
  const main = new Splide('[iw-slider-id="situation-content"]', {
    loop: true,
    speed: 400,
    type: 'loop',
    /** mediaQuery: 'max',
    breakpoints: {
      991: {
        destroy: true,
      },
    },**/
  }).mount();

  const theme = new Splide('[iw-slider-id="situation-themes"]', {
    perPage: 1,
    autoWidth: true,
    speed: 400,
    /** mediaQuery: 'max',
    breakpoints: {
      991: {
        destroy: true,
      },
    },**/
  });

  theme.sync(main).mount();

  themesSlides.forEach((slide, i) => {
    slide.addEventListener('click', function () {
      theme.go(i);
    });
  });
}
