import Splide from '@splidejs/splide';

export function SplideFormaProgramA() {
  const breakpointDesktop = window.matchMedia('(min-width: 992px)');

  const handleResize = () => {
    if (breakpointDesktop.matches) {
      initSplideFormaProgramA();
    } else {
      // Gérer le cas mobile si nécessaire
    }
  };

  handleResize(); // Appel initial pour configurer l'état correct au chargement
  window.addEventListener('resize', handleResize); // Écouter l'événement de redimensionnement

  function initSplideFormaProgramA() {
    const sliderFormaProgramA = document.querySelector('[iw-slider-id="program-content"]');
    //console.log(sliderFormaProgramA);

    if (sliderFormaProgramA !== null) {
      const chaptersSlides = document.querySelectorAll(
        '[iw-slider-id="program-chapters"] .splide__slide'
      );
      // console.log(chaptersSlides);

      const main = new Splide('[iw-slider-id="program-content"]', {
        loop: true,
        speed: 600,
        drag: true,
        snap: true,
        breakpoints: {
          991: {},
        },
      }).mount();

      const chapters = new Splide('[iw-slider-id="program-chapters"]', {
        perPage: 1,
        autoWidth: true,
        speed: 600,
        breakpoints: {
          991: {
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
  }
}

export function SplideFormaSituationA() {
  const breakpointDesktop = window.matchMedia('(min-width: 992px)');

  const handleResize = () => {
    if (breakpointDesktop.matches) {
      initSplideFormaSituationA();
    } else {
      // Gérer le cas mobile si nécessaire
    }
  };

  handleResize(); // Appel initial pour configurer l'état correct au chargement
  window.addEventListener('resize', handleResize); // Écouter l'événement de redimensionnement

  function initSplideFormaSituationA() {
    const sliderFormaSituationA = document.querySelector('[iw-slider-id="situation-content"]');
    //console.log(sliderFormaSituationA);

    if (sliderFormaSituationA !== null) {
      const themesSlides = document.querySelectorAll(
        '[iw-slider-id="situation-themes"] .splide__slide'
      );
      const contentSlides = document.querySelectorAll(
        '[iw-slider-id="situation-content"] .splide__slide'
      );
      //console.log(themesSlides);
      //console.log(contentSlides);

      // Initialize Spliders
      const main = new Splide('[iw-slider-id="situation-content"]', {
        loop: true,
        speed: 400,
        drag: true,
        snap: true,
        /** mediaQuery: 'max',
    breakpoints: {
      991: {
        destroy: true,
      },
    },**/
      }).mount();

      const theme = new Splide('[iw-slider-id="situation-themes"]', {
        autoWidth: true,
        speed: 600,
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

      contentSlides.forEach((slide, i) => {
        slide.addEventListener('click', function () {
          theme.go(i);
        });
      });
    }
  }
}
