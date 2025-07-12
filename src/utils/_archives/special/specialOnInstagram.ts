// Fonction pour vérifier si l'utilisateur utilise une webview Instagram
export function isInstagramWebview() {
  // Utilise l'agent utilisateur pour détecter si c'est une webview Instagram
  return /Instagram/.test(navigator.userAgent);
}

// Fonction pour masquer le bouton Google Auth dans une webview Instagram
export function instaHideGoogleAuth() {
  // Vérifie si l'utilisateur utilise une webview Instagram
  if (isInstagramWebview()) {
    // Ajoute une classe au corps du document pour indiquer qu'il s'agit d'une webview Instagram
    document.body.classList.add('instagram-webview');

    // Sélectionne le bouton Google Auth
    const googleButton = document.querySelector('[data-ms-auth-provider="google"]');
    // Si le bouton Google Auth existe, ajoute une classe pour le masquer
    if (googleButton) {
      googleButton.classList.add('hide-in-instagram');
    }
  }
}
