export function setPendingPlan() {
  // Trouver tous les éléments avec l'attribut data-ms-price:add
  const elements = document.querySelectorAll('[data-ms-price\\:add]');
  if (elements.length > 0) {
    elements.forEach((el) => {
      // Récupérer la valeur de l'attribut
      const planID = el.getAttribute('data-ms-price:add');
      // Trouver le bouton enfant (supposé être un <a>)
      const bouton = el.querySelector('a');
      if (bouton && planID) {
        // Ajouter le paramètre ?add-plan= à l'URL du bouton
        const url = new URL(bouton.href, window.location.origin);
        url.searchParams.set('add-plan', planID);
        bouton.href = url.toString();
      }
    });
  }
}
