// Fonctions utilitaires pour gérer les cookies
export function setCookie(nom: string, valeur: string, jours = 365) {
  const d = new Date();
  d.setTime(d.getTime() + jours * 86400000);
  document.cookie = `${nom}=${encodeURIComponent(valeur)};expires=${d.toUTCString()};path=/`;
}

export function getCookie(nom: string): string | null {
  const nomEQ = nom + '=';
  return document.cookie
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(nomEQ))
    ?.substring(nomEQ.length)
    ? decodeURIComponent(
        document.cookie
          .split(';')
          .map((c) => c.trim())
          .find((c) => c.startsWith(nomEQ))!
          .substring(nomEQ.length)
      )
    : null;
}
