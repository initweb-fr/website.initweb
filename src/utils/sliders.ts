import Splide from '@splidejs/splide';

export function SplideProgramA() {
  const chaptersSlides = document.querySelectorAll('.program-a_chapters_item.splide__slide');
  console.log(chaptersSlides);

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
