export function openFixedOverlay() {
  // Sélectionner tous les éléments qui ont l'attribut "fixed-overlay"
  const btnOpenModals = document.querySelectorAll('[fixed-overlay]');
  if (btnOpenOverlays !== null) {
    // Afficher chaque élément trouvé dans la console
    btnOpenOverlays.forEach((btnOpenOverlay) => {
      console.log(btnOpenOverlay);

      btnOpenOverlay.addEventListener('click', (event) => {
        console.log('test');
        // Cast de l'objet Event en HTMLElement pour accéder aux attributs
        const target = event.target as HTMLElement;

        // Récupération de la valeur de l'attribut spécifique
        const attributeValue = target.getAttribute('fixed-overlay');

        const fixedComponent = document.querySelector(
          '.fixed_component[fixed-overlay=' + attributeValue + ']'
        ) as HTMLElement | null;

        const bodyElement = document.body as HTMLElement | null;

        // Vérifiez si un parent avec la classe .fixed-wrapper existe
        if (fixedComponent) {
          console.log('test2');
          // Modifiez le style de l'élément parent pour le masquer
          fixedComponent.style.display = 'flex';
          bodyElement.style.overflow = 'hidden';
        }
      });
    });
  }
}

export function closeFixedOverlay() {
  // Sélectionnez le bouton enfant
  // Sélectionnez le bouton enfant
  const btnCloseOverlay = document.querySelector('.fixed_btn-close') as HTMLElement;
  if (btnCloseOverlay !== null) {
    // Ajoutez un gestionnaire d'événements de clic au bouton enfant
    btnCloseOverlay.addEventListener('click', () => {
      // Sélectionnez l'élément parent avec la classe .fixed-wrapper
      const parentComponent = btnCloseOverlay.closest('.fixed_component') as HTMLElement | null;
      const bodyElement = document.body as HTMLElement | null;

      // Vérifiez si un parent avec la classe .fixed-wrapper existe
      if (parentComponent) {
        // Modifiez le style de l'élément parent pour le masquer
        parentComponent.style.display = 'none';
        bodyElement.style.overflow = 'visible';
        // Mise en pause des vidéos
        const iframes = document.querySelectorAll('.fixed_component .video-vimeo');
        iframes.forEach(function (iframe) {
          const player = new Vimeo.Player(iframe);
          player.pause();
        });
      }
    });
  }
}

export function manageFixedModal() {
  const modalOpenBtns = document.querySelectorAll('[iw-modal-element=open-modal]');
  const modalCloseBtns = document.querySelectorAll('[iw-modal-element=close-modal]');
  const modalOverlays = document.querySelectorAll('[iw-modal-element=modal-overlay]');

  modalOpenBtns.forEach(function (modalOpenBtn) {
    console.log(modalOpenBtn);
    const modalID = modalOpenBtn.getAttribute('iw-modal-id');

    if (modalOpenBtn !== null) {
      // Ajoutez un gestionnaire d'événements de clic au bouton enfant
      modalOpenBtn.addEventListener('click', () => {
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'flex';
      });
    }
  });

  modalCloseBtns.forEach(function (modalCloseBtn) {
    console.log(modalCloseBtn);
    const modalID = modalCloseBtn.getAttribute('iw-modal-id');

    if (modalCloseBtn !== null) {
      // Ajoutez un gestionnaire d'événements de clic au bouton enfant
      modalCloseBtn.addEventListener('click', () => {
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'none';
      });
    }
  });

  modalOverlays.forEach(function (modalOverlay) {
    console.log(modalOverlay);
    const modalID = modalOverlay.getAttribute('iw-modal-id');

    if (modalOverlay !== null) {
      // Ajoutez un gestionnaire d'événements de clic au bouton enfant
      modalOverlay.addEventListener('click', () => {
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'none';
      });
    }
  });
}
