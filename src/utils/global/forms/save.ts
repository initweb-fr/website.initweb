/**
 * 👤 Gestion des données utilisateur
 *
 * Sauvegarde et récupération des données utilisateur dans les cookies.
 * Gère les formulaires, navigation et paramètres UTM.
 */

import { getCookie, setCookie } from '$utils/global/cookieUtilities';

export function saveFormDatas() {
  document.querySelectorAll('input[iw-formdata]').forEach((input) => {
    input.addEventListener('blur', () => {
      const attr = input.getAttribute('iw-formdata');
      if (!attr) return;
      const inputElement = input as HTMLInputElement;
      setCookie('iw-user-' + attr, inputElement.value);

      if (attr === 'firstName' || attr === 'lastName') {
        const firstName =
          attr === 'firstName' ? inputElement.value : getCookie('iw-user-firstName') || '';
        const lastName =
          attr === 'lastName' ? inputElement.value : getCookie('iw-user-lastName') || '';
        setCookie('iw-user-fullName', (firstName + ' ' + lastName).trim());
      }
    });
  });
}
