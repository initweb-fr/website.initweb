// Fonction pour gérer l'ouverture et la fermeture des modales fixes
export function toggleFixedModal() {
  // Sélectionne tous les boutons qui ouvrent une modale
  const modalOpenBtns = document.querySelectorAll('[iw-modal-element=modal-open]');
  // Sélectionne tous les boutons qui ferment une modale
  const modalCloseBtns = document.querySelectorAll('[iw-modal-element=modal-close]');
  // Sélectionne tous les overlays des modales
  const modalOverlays = document.querySelectorAll('[iw-modal-element=modal-overlay]');

  // Ajoute un gestionnaire d'événements de clic à chaque bouton d'ouverture de modale
  modalOpenBtns.forEach(function (modalOpenBtn) {
    // Récupère l'identifiant de la modale à partir de l'attribut 'iw-modal-id'
    const modalID = modalOpenBtn.getAttribute('iw-modal-id');

    if (modalOpenBtn !== null) {
      // Ajoute un gestionnaire d'événements de clic au bouton pour afficher la modale
      modalOpenBtn.addEventListener('click', () => {
        // Sélectionne la modale correspondante à l'identifiant et l'affiche
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'flex'; // Affiche la modale
        document.body.style.overflow = 'hidden'; // Empêche le défilement de la page
      });
    }
  });

  // Ajoute un gestionnaire d'événements de clic à chaque bouton de fermeture de modale
  modalCloseBtns.forEach(function (modalCloseBtn) {
    // Récupère l'identifiant de la modale à partir de l'attribut 'iw-modal-id'
    const modalID = modalCloseBtn.getAttribute('iw-modal-id');

    if (modalCloseBtn !== null) {
      // Ajoute un gestionnaire d'événements de clic au bouton pour cacher la modale
      modalCloseBtn.addEventListener('click', () => {
        // Sélectionne la modale correspondante à l'identifiant et la cache
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'none'; // Cache la modale
        document.body.style.overflow = 'auto'; // Réactive le défilement de la page
      });
    }
  });

  // Ajoute un gestionnaire d'événements de clic à chaque overlay de modale
  modalOverlays.forEach(function (modalOverlay) {
    // Récupère l'identifiant de la modale à partir de l'attribut 'iw-modal-id'
    const modalID = modalOverlay.getAttribute('iw-modal-id');

    if (modalOverlay !== null) {
      // Ajoute un gestionnaire d'événements de clic à l'overlay pour cacher la modale
      modalOverlay.addEventListener('click', () => {
        // Sélectionne la modale correspondante à l'identifiant et la cache
        const modalComponent = document.querySelector(
          '[iw-modal-element=modal-container][iw-modal-id=' + modalID + ']'
        ) as HTMLElement;
        modalComponent.style.display = 'none'; // Cache la modale
        document.body.style.overflow = 'auto'; // Réactive le défilement de la page
      });
    }
  });
}
