export function animateNavOnResponsive() {
  const breakpointDesktop = window.matchMedia('(min-width: 992px)'); // Définition du breakpoint pour les écrans de bureau

  const handleResize = () => {
    if (breakpointDesktop.matches) {
    } else {
      animateNavOnMobile();
      // Pas d'animation pour les écrans plus petits
    }
  };

  handleResize(); // Appel initial de la fonction de redimensionnement
  window.addEventListener('resize', handleResize); // Ajout d'un écouteur d'événement pour le redimensionnement de la fenêtre
}
function animateNavOnMobile() {
  const navWrapper = document.querySelector('[iw-nav-element="nav"]');
  const navMobileOpen = document.querySelector('[iw-nav-element="button-open"]');
  const navMobileClose = document.querySelector(
    '[iw-nav-element="button-close"], [iw-nav-element="overlay"]'
  );

  // Initialisation
  navMobileOpen?.classList.add('v-visible');
  navMobileClose?.classList.remove('v-visible');

  // Ouverture du Menu
  navMobileOpen?.addEventListener('click', () => {
    console.log('test');
    navWrapper?.classList.add('v-menu-open');
  });

  // Fermeture du Menu
  navMobileClose?.addEventListener('click', () => {
    console.log('close');
    navWrapper?.classList.remove('v-menu-open');
  });
}
