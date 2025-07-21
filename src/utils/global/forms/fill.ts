// --------- Fonctions gérant l'import des données

import { getCookie } from '../cookieUtilities';

// ------------------------------------------------------
export function fillFormDatas() {
  document.querySelectorAll('input[iw-formdata]').forEach((input) => {
    const attr = input.getAttribute('iw-formdata');
    if (!attr) return;
    const val = getCookie('__iw-user-' + attr);
    const inputElement = input as HTMLInputElement;
    if (val) inputElement.value = val;
    // Si l'attribut contient "URL", on décode la valeur pour avoir l'URL en clair
    if (attr.includes('URL') && val) {
      inputElement.value = decodeURIComponent(val);
    }
  });
}

/**
 * Remplit dynamiquement le formulaire en créant autant d'inputs qu'il existe de cookies iw-user-.
 * Les inputs sont ajoutés à la fin du body, ou vous pouvez adapter pour cibler un formulaire spécifique.
 */
export function createInputsFromCookies() {
  // On récupère l'élément ayant l'attribut "iw-form-element=form"
  const formElement = document.querySelector('[iw-form-element="form-layout"]');
  if (!formElement) return; // Si aucun formulaire cible, on arrête

  // On récupère tous les cookies
  const cookies = document.cookie.split(';');
  cookies.forEach((cookie) => {
    const [rawKey, ...rest] = cookie.split('=');
    const key = rawKey.trim();
    const value = rest.join('=').trim();
    // On ne traite que les cookies commençant par "__iw-user-"
    if (key.startsWith('__iw-user-')) {
      const input = document.createElement('input');
      input.type = 'hidden';
      // On retire le préfixe "iw-user-" pour l'attribut name
      input.name = key.replace('__iw-user-', '');
      input.value = value;
      // Si le nom contient "URL", on décode la valeur
      if (input.name.includes('URL')) {
        input.value = decodeURIComponent(value);
      }
      // Ajout en tant qu'enfant de l'élément formulaire cible
      formElement.appendChild(input);
    }
  });
}
