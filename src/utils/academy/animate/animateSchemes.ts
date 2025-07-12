export function animateSchemes() {
  const schemes = document.querySelector('[iw-schemes-element=schemes-switcher]') as HTMLElement;
  if (schemes) {
    schemes.addEventListener('click', () => {
      if (document.body.classList.contains('v-darkmode')) {
        document.body.classList.remove('v-darkmode');
        document.body.classList.add('v-lightmode');

        console.log('Mode clair activé');
      } else {
        document.body.classList.remove('v-lightmode');
        document.body.classList.add('v-darkmode');
        console.log('Mode sombre activé');
      }
    });
  }
}
