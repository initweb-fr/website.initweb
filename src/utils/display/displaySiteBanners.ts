export function manageNewsBanner() {
  const newsBanner = document.querySelector('.nav_banner') as HTMLElement;
  const closeButton = document.querySelector('.nav_banner_item_close') as HTMLElement;

  if (newsBanner) {
    // Fonction pour obtenir la date actuelle en millisecondes
    function getCurrentTime() {
      return new Date().getTime();
    }

    // Fonction pour obtenir la date d'expiration (7 jours à partir de maintenant)
    function getExpiryTime() {
      const days = 7;
      return getCurrentTime() + days * 24 * 60 * 60 * 1000;
    }

    // Vérifier si la bannière a déjà été fermée et si le délai de 7 jours est écoulé
    const bannerClosedTime = localStorage.getItem('newsBannerClosedTime');
    if (bannerClosedTime) {
      const closedTime = parseInt(bannerClosedTime, 10);
      if (!isNaN(closedTime) && getCurrentTime() < closedTime) {
        newsBanner.style.display = 'none';
      }
    }

    if (closeButton) {
      // Ajouter un événement de clic au bouton de fermeture
      closeButton.addEventListener('click', function () {
        newsBanner.style.display = 'none';
        localStorage.setItem('newsBannerClosedTime', getExpiryTime().toString());
      });
    }
  }
}
