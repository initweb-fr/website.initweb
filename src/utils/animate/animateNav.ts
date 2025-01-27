export function animateNavOnResponsive() {
  const breakpointDesktop = window.matchMedia('(min-width: 992px)'); // Définition du breakpoint pour les écrans de bureau

  const handleResize = () => {
    if (breakpointDesktop.matches) {
      animateNav(); // Initialisation des animations pour les écrans de bureau
    } else {
      animateNav();
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
  const navOverlay = document.querySelector(`[iw-nav-element="overlay"]`);

  // Initialisation
  navMobileOpen?.classList.add('v-visible');
  navMobileClose?.classList.remove('v-visible');

  // Ouverture du Menu
  navMobileOpen?.addEventListener('click', () => {
    navWrapper?.classList.add('v-menu-open');
    navWrapper?.classList.remove('v-submenu1-open');
    navWrapper?.classList.remove('v-submenu2-open');

    navMobileClose?.classList.add('v-visible');
    navMobileOpen?.classList.remove('v-visible');

    navOverlay?.classList.add('v-visible');
  });

  // Fermeture du Menu
  navMobileClose?.addEventListener('click', () => {
    console.log('close');
    navWrapper?.classList.remove('v-menu-open');
    navWrapper?.classList.remove('v-submenu1-open');
    navWrapper?.classList.remove('v-submenu2-open');
    navMobileClose?.classList.remove('v-visible');
    navMobileOpen?.classList.add('v-visible');

    navOverlay?.classList.remove('v-visible');
  });
}

function animateNav() {
  const navWrapper = document.querySelector('[iw-nav-element="nav"]');
  const navButtons = document.querySelectorAll('[iw-nav-element="button"]');
  const navSubMenus1 = document.querySelectorAll(`[iw-nav-element="submenu1"]`);
  const navSubMenus2 = document.querySelectorAll(`[iw-nav-element="submenu2"]`);
  const navOverlay = document.querySelector(`[iw-nav-element="overlay"]`);

  if (navWrapper && navButtons && navSubMenus1 && navSubMenus2 && navOverlay) {
    navButtons.forEach((navButton) => {
      navButton.addEventListener('click', () => {
        //
        // Récupération de l'ID
        //
        const menuID = navButton.getAttribute('iw-nav-id');
        //
        // Réinitialisation de l'état général
        //
        navButtons.forEach((navButton) => {
          navButton.classList.remove('v-selected');
        });
        navSubMenus2.forEach((navSubMenu2) => {
          navSubMenu2.classList.remove('v-visible');
        });
        navSubMenus1.forEach((navSubMenu1) => {
          navSubMenu1.classList.remove('v-visible');
        });
        navOverlay?.classList.add('v-visible');
        //
        // Récupération du SubMenu correspondant au bouton cliqué
        //
        const thisNavSubMenu1 = document.querySelector(
          `[iw-nav-element="submenu1"][iw-nav-id="${menuID}"]`
        );
        const thisNavSubMenu2 = document.querySelector(
          `[iw-nav-element="submenu2"][iw-nav-id="${menuID}"]`
        );
        //
        // SI Bouton ouvre SUBMENU 1
        //
        if (thisNavSubMenu1) {
          navButton.classList.add('v-selected');
          thisNavSubMenu1?.classList.add('v-visible');

          navWrapper?.classList.remove('v-menu-open');
          navWrapper?.classList.add('v-submenu1-open');
          navWrapper?.classList.remove('v-submenu2-open');
        }
        //
        // SI Bouton ouvre SUBMENU 2
        //
        if (thisNavSubMenu2) {
          navButton.classList.add('v-selected');
          thisNavSubMenu2?.classList.add('v-visible');

          navWrapper?.classList.remove('v-menu-open');
          navWrapper?.classList.remove('v-submenu1-open');
          navWrapper?.classList.add('v-submenu2-open');

          const buttonSubMenu1Parent = navButton.closest('[iw-nav-element="submenu1"]');
          buttonSubMenu1Parent?.classList.add('v-visible');
          console.log(buttonSubMenu1Parent);
          // Si le bouton a la classe 'v-submenu1'
          if (buttonSubMenu1Parent) {
            const buttonSubMenu1ParentID = buttonSubMenu1Parent.getAttribute('iw-nav-id');
            console.log(buttonSubMenu1ParentID);
            const buttonMenuButtonParent = document.querySelector(
              `[iw-nav-element="button"][iw-nav-id="${buttonSubMenu1ParentID}"]`
            );
            buttonMenuButtonParent?.classList.add('v-selected');
          }
        }
      });
    });

    navOverlay.addEventListener('click', () => {
      // Réinitialisation de l'état général
      navButtons.forEach((navButton) => {
        navButton.classList.remove('v-selected');
      });
      navSubMenus2.forEach((navSubMenu2) => {
        navSubMenu2.classList.remove('v-visible');
      });
      navSubMenus1.forEach((navSubMenu1) => {
        navSubMenu1.classList.remove('v-visible');
      });
      navOverlay.classList.remove('v-visible');
      navWrapper?.classList.remove('v-menu-open');
      navWrapper?.classList.remove('v-submenu1-open');
      navWrapper?.classList.remove('v-submenu2-open');
    });
  }
}
