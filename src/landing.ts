import { revealFormaHero } from '$utils/reveal';
import { SplideFormaProgramA, SplideFormaSituationA } from '$utils/sliders';

// Déclenchement du code au chargement de la page
window.Webflow ||= [];
window.Webflow.push(() => {
  function loadOnlyOnDesktop() {
    console.log('Landing.ts loaded');
    if (window.matchMedia('(min-width: 992px)').matches) {
      SplideFormaProgramA();
      SplideFormaSituationA();
    }
  }

  loadOnlyOnDesktop();
  revealFormaHero();
});

// Déclenchement du code au redimensionnement
window.addEventListener('resize', loadOnlyOnDesktop);
