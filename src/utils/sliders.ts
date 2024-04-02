import Splide from '@splidejs/splide';

export function SplideProgramA() {
  const chaptersSlides = document.querySelectorAll('.program-a_chapters_item.splide__slide');
  console.log(chaptersSlides);

  // Initialize Spliders
  const main = new Splide('.program-a_content.splide', {
    loop: true,
    speed: 400,
    type: 'loop',
    breakpoints: {
      992: {
        destroy: true,
      },
    },
  }).mount();

  const chapters = new Splide('.program-a_chapters_content.splide', {
    perPage: 1,
    autoWidth: true,
    speed: 400,
    breakpoints: {
      992: {
        destroy: true,
      },
    },
  });

  chapters.sync(main).mount();

  chaptersSlides.forEach((slide, i) => {
    slide.addEventListener('click', function () {
      chapters.go(i);
    });
  });
}
