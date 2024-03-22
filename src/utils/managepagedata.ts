export function saveCurrentPage() {
  localStorage.setItem('page_current_url', window.location.href);
  localStorage.setItem('page_current_name', 'P.Explorer');
}

export function addCurrentPageToNav() {
  // Récupère le code depuis le LocalStorage
  const CurrentPageNameUTM = localStorage.getItem('page_current_name');
  const CurrentPageUrlUTM = localStorage.getItem('page_current_url');
  // Récupère l'élément dans la Nav'
  const NavPage = document.querySelector('[pageinfo="current-page"]');
  //Intègre le Nom de la page dans la Nav
  NavPage.innerHTML = CurrentPageNameUTM;
}
