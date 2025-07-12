export function animateNav() {
  const nav = document.querySelector('[iw-global-element="nav-wrapper"]') as HTMLElement;

  // Gestion du padding de la navigation selon le scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 1) {
      nav.style.padding = '0.5rem';
      nav.style.borderBlockEndWidth = '1px';
    } else {
      nav.style.padding = '1rem';
      nav.style.borderBlockEndWidth = '0px';
    }
  });
}
