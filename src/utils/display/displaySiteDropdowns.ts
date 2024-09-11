export function manageDropdowns() {
  const dropdownsLists = document.querySelectorAll('[element="dropdown_list"]');

  dropdownsLists.forEach((dropdownsList) => {
    const dropdowns = dropdownsList.querySelectorAll('[element="dropdown"]');

    console.log(dropdowns);

    dropdowns.forEach((dropdown) => {
      const dropdownToggle = dropdown.querySelector('[element="dropdown_toggle"]');

      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', () => {
          // Supprimer l'attribut status="open" de tous les dropdowns
          dropdowns.forEach((d) => d.removeAttribute('status'));

          // Ajouter l'attribut status="open" uniquement sur le dropdown cliqué
          dropdown.setAttribute('status', 'open');
        });
      }
    });
  });
}
