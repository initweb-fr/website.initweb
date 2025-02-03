export function animateSliderC1OnResponsive() {
  const breakpointDesktop = window.matchMedia('(min-width: 992px)'); // Définition du breakpoint pour les écrans de bureau

  const handleResize = () => {
    if (breakpointDesktop.matches) {
      if (!window.location.pathname.includes('/academie')) {
        animateSliderC1(); // Initialisation des animations pour les écrans de bureau
      }
    }
  };

  handleResize(); // Appel initial de la fonction de redimensionnement
  window.addEventListener('resize', handleResize); // Ajout d'un écouteur d'événement pour le redimensionnement de la fenêtre
}

function animateSliderC1() {
  const selectors = document.querySelectorAll('[iw-slider-c1-element="selector"]');
  const slides = document.querySelectorAll('[iw-slider-c1-element="visual"]');
  const timeframes = document.querySelectorAll('[iw-slider-c1-element="timeframe"]');
  const slideDuration = 10000; // Durée en millisecondes

  if (selectors && slides && timeframes) {
    let currentSlide = 1;
    let interval;

    // Fonction pour réinitialiser toutes les barres de progression
    function resetAllTimeframes() {
      timeframes.forEach((timeframe) => {
        timeframe.style.transition = 'none';
        timeframe.style.width = '0%';
      });
    }

    // Fonction pour gérer la barre de progression
    // Fonction pour démarrer la progression
    function startProgress(index) {
      resetAllTimeframes();
      const timeframe = timeframes[index];

      // Force un reflow pour assurer que la transition sera appliquée
      timeframe.offsetHeight;

      // Applique la transition et démarre la progression
      timeframe.style.transition = `width ${slideDuration}ms linear`;
      timeframe.style.width = '100%';
    }

    // Fonction pour afficher une slide spécifique
    function showSlide(index: number) {
      // Retirer la classe active de toutes les slides et boutons
      slides.forEach((slide) => slide.setAttribute('iw-slider-c1-status', 'hidden'));
      selectors.forEach((selector) => selector.setAttribute('iw-slider-c1-status', 'clear'));

      // Ajouter la classe active à la slide et au bouton courant
      slides[index].setAttribute('iw-slider-c1-status', 'visible');
      selectors[index].setAttribute('iw-slider-c1-status', 'selected');
      currentSlide = index;

      // Démarrer la progression pour cette slide
      startProgress(index);
    }

    // Fonction pour passer à la slide suivante
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    // Ajouter les écouteurs d'événements aux boutons
    selectors.forEach((selector, index) => {
      selector.addEventListener('click', () => {
        clearInterval(interval);
        showSlide(index);
        interval = setInterval(nextSlide, slideDuration);
      });
    });

    // Afficher la première slide au chargement
    showSlide(0);

    // Démarrer le défilement automatique
    interval = setInterval(nextSlide, slideDuration);
  }
}
