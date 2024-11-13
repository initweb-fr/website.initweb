import Splide from '@splidejs/splide';

// Fonction pour initialiser le slider pour le programme A
export function SplideFormaProgramA() {
  // Définition du point de rupture pour le mode bureau
  const breakpointDesktop = window.matchMedia('(min-width: 992px)');

  // Fonction pour gérer le redimensionnement de la fenêtre
  const handleResize = () => {
    if (breakpointDesktop.matches) {
      initSplideFormaProgramA(); // Initialiser le slider si en mode bureau
    } else {
      // Gérer le cas mobile si nécessaire
    }
  };

  handleResize(); // Appel initial pour configurer l'état correct au chargement
  window.addEventListener('resize', handleResize); // Écouter l'événement de redimensionnement

  // Fonction pour initialiser le slider du programme A
  function initSplideFormaProgramA() {
    const sliderFormaProgramA = document.querySelector('[iw-slider-id="program-content"]');
    // Vérifier si l'élément du slider existe

    if (sliderFormaProgramA !== null) {
      // Sélectionner tous les slides des chapitres
      const chaptersSlides = document.querySelectorAll(
        '[iw-slider-id="program-chapters"] .splide__slide'
      );

      // Initialiser le slider principal
      const main = new Splide('[iw-slider-id="program-content"]', {
        loop: true, // Activer la boucle
        speed: 600, // Vitesse de transition
        drag: true, // Activer le glissement
        snap: true, // Activer l'alignement
        breakpoints: {
          991: {}, // Configuration pour les écrans inférieurs à 991px
        },
      }).mount();

      // Initialiser le slider des chapitres
      const chapters = new Splide('[iw-slider-id="program-chapters"]', {
        perPage: 1, // Nombre de slides par page
        autoWidth: true, // Largeur automatique
        speed: 600, // Vitesse de transition
        breakpoints: {
          991: {
            destroy: true, // Détruire le slider en dessous de 991px
          },
        },
      });

      // Synchroniser le slider des chapitres avec le principal
      chapters.sync(main).mount();

      // Ajouter un événement de clic pour chaque slide de chapitre
      chaptersSlides.forEach((slide, i) => {
        slide.addEventListener('click', function () {
          chapters.go(i); // Aller au slide correspondant
        });
      });
    }
  }
}

// Fonction pour initialiser le slider pour la situation A
export function SplideFormaSituationA() {
  // Définition du point de rupture pour le mode bureau
  const breakpointDesktop = window.matchMedia('(min-width: 992px)');

  // Fonction pour gérer le redimensionnement de la fenêtre
  const handleResize = () => {
    if (breakpointDesktop.matches) {
      initSplideFormaSituationA(); // Initialiser le slider si en mode bureau
    } else {
      // Gérer le cas mobile si nécessaire
    }
  };

  handleResize(); // Appel initial pour configurer l'état correct au chargement
  window.addEventListener('resize', handleResize); // Écouter l'événement de redimensionnement

  // Fonction pour initialiser le slider de la situation A
  function initSplideFormaSituationA() {
    const sliderFormaSituationA = document.querySelector('[iw-slider-id="situation-content"]');
    // Vérifier si l'élément du slider existe

    if (sliderFormaSituationA !== null) {
      // Sélectionner tous les slides des thèmes et du contenu
      const themesSlides = document.querySelectorAll(
        '[iw-slider-id="situation-themes"] .splide__slide'
      );
      const contentSlides = document.querySelectorAll(
        '[iw-slider-id="situation-content"] .splide__slide'
      );

      // Initialiser le slider principal
      const main = new Splide('[iw-slider-id="situation-content"]', {
        loop: true, // Activer la boucle
        speed: 400, // Vitesse de transition
        drag: true, // Activer le glissement
        snap: true, // Activer l'alignement
      }).mount();

      // Initialiser le slider des thèmes
      const theme = new Splide('[iw-slider-id="situation-themes"]', {
        autoWidth: true, // Largeur automatique
        speed: 600, // Vitesse de transition
      });

      // Synchroniser le slider des thèmes avec le principal
      theme.sync(main).mount();

      // Ajouter un événement de clic pour chaque slide de thème
      themesSlides.forEach((slide, i) => {
        slide.addEventListener('click', function () {
          theme.go(i); // Aller au slide correspondant
        });
      });

      // Ajouter un événement de clic pour chaque slide de contenu
      contentSlides.forEach((slide, i) => {
        slide.addEventListener('click', function () {
          theme.go(i); // Aller au slide correspondant
        });
      });
    }
  }
}
