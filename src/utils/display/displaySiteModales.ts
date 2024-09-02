export function toggleFixedModal() {
  const modalOpenBtns = document.querySelectorAll('[iw-modal-element=modal-open]');
  const modalCloseBtns = document.querySelectorAll('[iw-modal-element=modal-close]');
  const modalOverlays = document.querySelectorAll('[iw-modal-element=modal-overlay]');

  modalOpenBtns.forEach(function (modalOpenBtn) {
    //console.log(modalOpenBtn);
    const modalID = modalOpenBtn.getAttribute('iw-modal-id');

    if (modalOpenBtn !== null) {
      // Ajoutez un gestionnaire d'événements de clic au bouton enfant
      modalOpenBtn.addEventListener('click', () => {
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    }
  });

  modalCloseBtns.forEach(function (modalCloseBtn) {
    //console.log(modalCloseBtn);
    const modalID = modalCloseBtn.getAttribute('iw-modal-id');

    if (modalCloseBtn !== null) {
      // Ajoutez un gestionnaire d'événements de clic au bouton enfant
      modalCloseBtn.addEventListener('click', () => {
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  });

  modalOverlays.forEach(function (modalOverlay) {
    //console.log(modalOverlay);
    const modalID = modalOverlay.getAttribute('iw-modal-id');

    if (modalOverlay !== null) {
      // Ajoutez un gestionnaire d'événements de clic au bouton enfant
      modalOverlay.addEventListener('click', () => {
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
  });
}
