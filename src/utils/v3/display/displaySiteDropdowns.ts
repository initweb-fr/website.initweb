export function toggleDropdownV3() {
  const ddParents = document.querySelectorAll(
    '[iw-dd-element=dd-parent]'
  ) as NodeListOf<HTMLElement>;
  ddParents.forEach((ddParent) => {
    const ddItems = ddParent.querySelectorAll('[iw-dd-element=dd-item]');

    const openFirst = ddParent.getAttribute('iw-dd-openfirst') === 'true';
    if (openFirst) {
      ddItems[0]?.classList.add('iw-dd-active');
    }

    ddItems.forEach((ddItem) => {
      const ddToggle = ddItem.querySelector('[iw-dd-element=dd-toggle]') as HTMLElement;

      if (!ddToggle) return;

      ddToggle.addEventListener('click', () => {
        // Vérifier si le dropdown cliqué est déjà actif
        const isCurrentlyActive = ddItem.classList.contains('iw-dd-active');

        // Désactiver tous les dropdowns
        ddItems.forEach((el) => el.classList.remove('iw-dd-active'));

        // Activer le dropdown cliqué seulement s'il n'était pas déjà actif
        if (!isCurrentlyActive) {
          ddItem.classList.add('iw-dd-active');
        }
      });
    });
  });
}
