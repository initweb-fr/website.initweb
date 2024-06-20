export function addCurrentPageToNav() {
  // Récupère le code depuis le LocalStorage
  const CurrentPageNameUTM = localStorage.getItem('page_current_name');
  const NavPage = document.querySelector('[pageinfo="current-page"]') as HTMLElement;

  //Intègre le Nom de la page.
  //console.log(NavPage);
  //console.log(CurrentPageNameUTM);
  //console.log(CurrentPageUrlUTM);
  if (NavPage) {
    NavPage.innerHTML = CurrentPageNameUTM;
  }
}

export function saveCurrentPreviousPage() {
  // Get the URL path of the current page
  const currentPagePath: string = window.location.pathname;

  // Get the URL path of the previous page from the cookie (if exists)

  const previousPageToSave: string | null = localStorage.getItem('currentPagePath');

  // Move the current page path to previousPagePath and set currentPagePath on page load
  if (previousPageToSave) {
    if (previousPageToSave !== currentPagePath) {
      console.log('set');
      localStorage.setItem('previousPagePath', previousPageToSave);
    }
  }
  localStorage.setItem('currentPagePath', currentPagePath);

  console.log('previousPagePath : ' + localStorage.getItem('previousPagePath'));
  console.log('currentPagePath : ' + localStorage.getItem('currentPagePath'));
}
