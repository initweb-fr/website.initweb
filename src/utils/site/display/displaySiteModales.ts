// Gère l'ouverture et la fermeture des modales fixes
export function toggleModalV3() {
  const globalFixedWrapper = document.querySelector(
    '[iw-global-element=fixed-wrapper]'
  ) as HTMLElement;
  if (!globalFixedWrapper) return;

  // 1. Sélectionner tous les parents d'éléments modaux
  const itemParents = document.querySelectorAll('[iw-modal-element=item-parent]');
  if (!itemParents) return;

  // 2. Parcourir chaque parent pour initialiser la gestion de la modale
  itemParents.forEach((itemParent) => {
    // 2.1. Récupérer les éléments nécessaires à la gestion de la modale
    const modalOpenBtn = itemParent.querySelector('[iw-modal-element=modal-open]') as HTMLElement;
    const modalCloseBtn = itemParent.querySelector('[iw-modal-element=modal-close]') as HTMLElement;
    const modalItem = itemParent.querySelector('[iw-modal-element=modal-item]') as HTMLElement;
    const modalOverlay = itemParent.querySelector(
      '[iw-modal-element=modal-overlay]'
    ) as HTMLElement;
    const modalContent = itemParent.querySelector(
      '[iw-modal-element=modal-content]'
    ) as HTMLElement;

    // 2.2. Vérifier la présence de tous les éléments requis
    if (!modalOpenBtn || !modalCloseBtn || !modalItem || !modalOverlay || !modalContent) return;

    // 3. Définir la fonction d'ouverture de la modale
    function openModal() {
      globalFixedWrapper.appendChild(modalItem);

      // Forcer un reflow avant de déclencher la transition
      requestAnimationFrame(() => {
        modalItem.classList.add('iw-modal-active');
      });

      console.log('openModal');
      document.body.style.overflow = 'hidden';
    }

    // 4. Définir la fonction de fermeture de la modale
    function closeModal() {
      globalFixedWrapper.removeChild(modalItem);
      modalItem.classList.remove('iw-modal-active');
      document.body.style.overflow = 'visible';
    }

    // 5. Ajouter les écouteurs d'événements pour ouvrir et fermer la modale
    modalOpenBtn.addEventListener('click', () => {
      openModal();
    });

    modalCloseBtn.addEventListener('click', () => {
      closeModal();
    });

    // 6. Permettre la fermeture de la modale en cliquant sur l'overlay
    modalOverlay?.addEventListener('click', () => {
      closeModal();
    });
  });
}
