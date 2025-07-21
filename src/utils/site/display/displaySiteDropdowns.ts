/**
 * 🔽 Gestion des dropdowns du site
 *
 * Gère l'ouverture/fermeture des menus déroulants.
 * Un seul dropdown peut être ouvert à la fois.
 */

// Fonction pour gérer les dropdowns sur la page
export function manageDropdowns() {
  // Sélectionne tous les éléments ayant l'attribut 'element="dropdown_list"'
  const dropdownsLists = document.querySelectorAll('[element="dropdown_list"]');

  // Parcourt chaque liste de dropdowns
  dropdownsLists.forEach((dropdownsList) => {
    // Sélectionne tous les éléments dropdown dans la liste actuelle
    const dropdowns = dropdownsList.querySelectorAll('[element="dropdown"]');

    // Parcourt chaque dropdown
    dropdowns.forEach((dropdown) => {
      // Sélectionne l'élément toggle du dropdown actuel
      const dropdownToggle = dropdown.querySelector('[element="dropdown_toggle"]');

      // Vérifie si l'élément toggle existe
      if (dropdownToggle) {
        // Ajoute un écouteur d'événement de clic sur l'élément toggle
        dropdownToggle.addEventListener('click', () => {
          // Supprime l'attribut status="open" de tous les dropdowns
          dropdowns.forEach((d) => d.removeAttribute('status'));

          // Ajoute l'attribut status="open" uniquement sur le dropdown cliqué
          dropdown.setAttribute('status', 'open');
        });
      }
    });
  });
}
