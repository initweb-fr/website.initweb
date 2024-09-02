export function setCookie(name: string | null, value: string | null, days: number) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export function getCookie(name: string | null): string | null {
  // Récupérer tous les cookies sous forme de chaîne de caractères
  const cookies = document.cookie;

  // Diviser la chaîne de cookies en un tableau de cookies individuels
  const cookiesArray = cookies.split(';');

  // Parcourir chaque cookie
  for (let cookie of cookiesArray) {
    // Supprimer les espaces en début et fin de chaîne
    cookie = cookie.trim();

    // Vérifier si le cookie commence par le nom recherché suivi d'un "="
    if (cookie.startsWith(name + '=')) {
      // Extraire et retourner la valeur du cookie
      return cookie.substring((name + '=').length);
    }
  }

  // Si le cookie n'est pas trouvé, retourner null ou une valeur par défaut
  return null;
}
