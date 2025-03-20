export function animateAcaPanels() {
  const menuPanel = document.querySelector('[iw-aca-element="panel"][iw-aca-panel-type="menu"]');
  const subMenuPanel = document.querySelector(
    '[iw-aca-element="panel"][iw-aca-panel-type="submenu"]'
  );
  //console.log(menuPanel);
  // Ouverture des panneaux
  const openers = document.querySelectorAll('[iw-aca-element="panel-opener"]');
  openers.forEach((opener) => {
    opener.addEventListener('click', function (this: HTMLElement) {
      //
      const parentPanel = this.closest('[iw-aca-element="panel"]');
      const parentPanelStatus = parentPanel?.getAttribute('iw-aca-panel-status');
      const parentPanelType = parentPanel?.getAttribute('iw-aca-panel-type');
      //
      // Si ouverture d'un panneau alors on change le statut
      if (parentPanel && parentPanelStatus === 'close') {
        parentPanel.setAttribute('iw-aca-panel-status', 'open');
      }
      //
      // Si ouverture du sous-menu, alors fermeture du menu
      if (parentPanel && parentPanelType === 'submenu') {
        //console.log('test');
        menuPanel?.setAttribute('iw-aca-panel-status', 'close');
      }
      // si ouverture du menu, alors fermture du sous-menu
      if (parentPanel && parentPanelType === 'menu') {
        //console.log('test');
        subMenuPanel?.setAttribute('iw-aca-panel-status', 'close');
      }
    });
  });

  // Fermeture des panneaux
  const resizers = document.querySelectorAll('[iw-aca-element="panel-resizer"]');
  resizers.forEach((resizer) => {
    resizer.addEventListener('click', function (this: HTMLElement) {
      //
      const parentPanel = this.closest('[iw-aca-element="panel"]');
      //console.log(parentPanel);
      const parentPanelStatus = parentPanel?.getAttribute('iw-aca-panel-status');
      //console.log(parentPanelStatus);
      //
      if (parentPanel && parentPanelStatus === 'open') {
        parentPanel.setAttribute('iw-aca-panel-status', 'close');
      }
    });
  });
}

export function scrollToCurrentLink() {
  // Sélectionner le lien actif (avec la classe w--current)
  const currentLink = document.querySelector('.aca_toc_module_link.w--current');
  console.log(currentLink);

  // Vérifier si un lien actif existe
  if (currentLink) {
    // Faire défiler le conteneur parent pour que le lien soit visible
    currentLink.scrollIntoView({
      behavior: 'smooth', // Animation fluide
      block: 'center', // Centrer l'élément dans la vue
    });
  }
}
