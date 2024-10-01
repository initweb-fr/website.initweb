export function displayJoinAccess() {
  const joinAccessTabs = document.querySelectorAll('[join-element="tab"]');

  const joinAccessDetails = document.querySelectorAll('[join-element="detail"]');
  const joinAccessButtons = document.querySelectorAll('[join-element="button"]');

  if (joinAccessTabs && joinAccessDetails && joinAccessButtons) {
    joinAccessTabs.forEach((tab) => {
      // Etat initial
      tab.classList.remove('is-current-selection');
      if (tab.getAttribute('join-access')?.includes('core')) {
        tab.classList.add('is-current-selection');
      }
      joinAccessDetails.forEach((detail) => {
        detail.classList.remove('is-current-selection');
        if (detail.getAttribute('join-access')?.includes('core')) {
          detail.classList.add('is-current-selection');
        }
      });
      joinAccessButtons.forEach((button) => {
        button.style.display = 'none';
        if (button.getAttribute('join-access')?.includes('core')) {
          button.style.display = 'flex';
        }
      });

      // Etat au clic
      tab.addEventListener('click', () => {
        // Affichage du sélecteur
        joinAccessTabs.forEach((t) => {
          t.classList.remove('is-current-selection');
        });
        joinAccessDetails.forEach((d) => {
          d.classList.remove('is-current-selection');
        });
        joinAccessButtons.forEach((b) => {
          b.style.display = 'none';
        });

        // Affichage de la sélection
        tab.classList.add('is-current-selection');
        const tabID = tab.getAttribute('join-access');

        if (tabID) {
          joinAccessDetails.forEach((detail) => {
            if (detail.getAttribute('join-access')?.includes(tabID)) {
              detail.classList.add('is-current-selection');
            }
          });
          joinAccessButtons.forEach((button) => {
            if (button.getAttribute('join-access')?.includes(tabID)) {
              button.style.display = 'flex';
            }
          });
        }
      });
    });
  }
}
