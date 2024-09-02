export function showProgression() {
  const modulesTotal = Array.from(
    document.querySelectorAll('.mod-cont_toc_chapter_component .mod-cont_toc_module_item')
  );
  const modulesSeen = Array.from(
    document.querySelectorAll(
      '.mod-cont_toc_chapter_component .mod-cont_toc_module_item:has(.is-watched)'
    )
  );

  // Compter le nombre d'éléments dans le tableau
  const countTotal = modulesTotal.length;
  const countSeen = modulesSeen.length;

  // Calcul du pourcentage de vidéos vues
  const percentageSeen = (countSeen / countTotal) * 100;
  const pourcentagSeenEntier = Math.trunc(percentageSeen);

  // Modification de la largeur de l'élément .progression-status-bar
  const progressBar = document.querySelector(
    '.module-hero_gaming_progression_status_bar'
  ) as HTMLElement;
  if (progressBar) {
    progressBar.style.width = pourcentagSeenEntier + '%';
  }

  const progressInfo = document.querySelector(
    '.module-hero_gaming_progression_status_info'
  ) as HTMLElement;
  if (progressInfo) {
    progressInfo.textContent = pourcentagSeenEntier + '%';
  }
}
