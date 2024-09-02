export function addCurrentPageToNav() {
  // Récupère le code depuis le LocalStorage
  const CurrentPageNameUTM = localStorage.getItem('page_current_name');
  const NavPage = document.querySelector('[pageinfo="current-page"]') as HTMLElement;

  //Intègre le Nom de la page.
  //console.log(NavPage);
  //console.log(CurrentPageNameUTM);
  //console.log(CurrentPageUrlUTM);
  if (NavPage) {
    if(CurrentPageNameUTM){
    NavPage.innerHTML = CurrentPageNameUTM;
    }
  }
}
