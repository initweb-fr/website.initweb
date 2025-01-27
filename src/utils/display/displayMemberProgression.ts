// Fonction pour afficher la progression des modules vus par l'utilisateur
export function showProgression() {
  // Sélectionne tous les éléments de module dans le chapitre du tableau de bord
  const modulesTotal = Array.from(document.querySelectorAll('[iw-p-progress-watched]'));

  // Sélectionne uniquement les modules qui ont été marqués comme "vus" (classe 'is-watched')
  const modulesSeen = Array.from(document.querySelectorAll('[iw-p-progress-watched="true]'));

  // Compte le nombre total de modules
  const countTotal = modulesTotal.length;
  // Compte le nombre de modules vus
  const countSeen = modulesSeen.length;

  // Calcule le pourcentage de modules vus
  const percentageSeen = (countSeen / countTotal) * 100;
  // Convertit le pourcentage en un entier pour l'affichage
  const pourcentagSeenEntier = Math.trunc(percentageSeen);

  // Modifie la largeur de la barre de progression pour refléter le pourcentage de modules vus
  const progressBar = document.querySelector(
    '.module-hero_gaming_progression_status_bar'
  ) as HTMLElement;
  if (progressBar) {
    progressBar.style.width = pourcentagSeenEntier + '%';
  }

  // Met à jour l'information de progression affichée à l'utilisateur
  const progressInfo = document.querySelector<HTMLElement>(
    '[iw-p-progress-watched-percent]'
  ) as HTMLElement;
  if (progressInfo) {
    progressInfo.textContent = pourcentagSeenEntier + '%';
  }

  // function to update completed modules count
}
