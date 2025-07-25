// Fonction utilitaire pour créer un cookie (sans gestion spécifique de domaine)

export function setCookie(name: string, value: string) {
  const date = new Date();
  date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;

  const cookieString = `${name}=${value};${expires};path=/`;
  document.cookie = cookieString;
  console.log('🍪 Cookie créé:', { name, value, cookieString });
}

export function getCookie(name: string) {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const value = c.substring(nameEQ.length, c.length);
      console.log('✅ Cookie trouvé:', name, '=', value);
      return value;
    }
  }
  return null;
}
