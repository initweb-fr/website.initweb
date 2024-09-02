import { getFunnelTrackingData } from '$utils/data/dataMemberSource';
import { SplideFormaProgramA, SplideFormaSituationA } from '$utils/sliders/slidersFormation';

// -- Déclenchement du code au chargement de la page
window.Webflow ||= [];
window.Webflow.push(() => {
  loadOnlyOnDesktop();
  getFunnelTrackingData();
});

// -- Déclenchement du code au redimensionnement
window.addEventListener('resize', loadOnlyOnDesktop);

// Fonctions spéciales
function loadOnlyOnDesktop() {
  if (window.matchMedia('(min-width: 992px)').matches) {
    SplideFormaSituationA();
    SplideFormaProgramA();
  }
}
