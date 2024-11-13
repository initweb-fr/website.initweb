export function addCurrentPageToNav() {
  // Récupère le nom de la page actuelle depuis le LocalStorage
  const CurrentPageNameUTM = localStorage.getItem('page_current_name');
  // Sélectionne l'élément du DOM qui affichera le nom de la page actuelle
  const NavPage = document.querySelector('[pageinfo="current-page"]') as HTMLElement;

  // Vérifie si l'élément NavPage existe
  if (NavPage) {
    // Vérifie si le nom de la page actuelle est disponible
    if (CurrentPageNameUTM) {
      // Met à jour le contenu HTML de l'élément NavPage avec le nom de la page actuelle
      NavPage.innerHTML = CurrentPageNameUTM;
    }
  }
}
