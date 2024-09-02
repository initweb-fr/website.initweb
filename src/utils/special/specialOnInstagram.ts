export function isInstagramWebview() {
  // Détecte si c'est une webview Instagram
  return /Instagram/.test(navigator.userAgent);
}

export function instaHideGoogleAuth() {
  if (isInstagramWebview()) {
    document.body.classList.add('instagram-webview');

    const googleButton = document.querySelector('[data-ms-auth-provider="google"]');
    if (googleButton) {
      googleButton.classList.add('hide-in-instagram');
    }
  }
}
