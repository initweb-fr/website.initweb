import { getCookie, setCookie } from '$utils/cookie/cookieUtility';

// --------- Fonctions gérant la sauvegarde des données
// ------------------------------------------------------

export function saveFormData() {
  document.querySelectorAll('input[iw-formdata]').forEach((input) => {
    input.addEventListener('blur', () => {
      const attr = input.getAttribute('iw-formdata');
      if (!attr) return;
      setCookie('iw-user-' + attr, input.value);

      if (attr === 'firstName' || attr === 'lastName') {
        const firstName = attr === 'firstName' ? input.value : getCookie('iw-user-firstName') || '';
        const lastName = attr === 'lastName' ? input.value : getCookie('iw-user-lastName') || '';
        setCookie('iw-user-fullName', (firstName + ' ' + lastName).trim());
      }
    });
  });
}
/*
export function saveActionData() {
  document.querySelectorAll('[iw-priceoffer]').forEach((element) => {
    element.addEventListener('click', () => {
      const offre = element.getAttribute('iw-priceoffer');
      if (offre) setCookie('iw-user-interestOffer', offre);
    });
  });
}
*/

export function saveNavigationData() {
  // Sauvegarde de l'URL de la page courante et de la page précédente
  const currentPagePath: string = decodeURIComponent(window.location.href);
  const previousPageToSave: string | null = getCookie('iw-user-currentPageURL');

  if (previousPageToSave) {
    if (previousPageToSave !== currentPagePath) {
      setCookie('iw-user-previousPageURL', decodeURIComponent(previousPageToSave));
    }
  }
  setCookie('iw-user-currentPageURL', currentPagePath);

  console.log('previousPageURL : ' + getCookie('iw-user-previousPageURL'));
  console.log('currentPageURL : ' + getCookie('iw-user-currentPageURL'));

  // Sauvegarde des paramètres UTM dans les cookies
  const urlParams = new URLSearchParams(window.location.search);
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  utmParams.forEach((param) => {
    const value = urlParams.get(param);
    // Passe le param en camelCase
    const camelCaseParam = param.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
    if (value) {
      setCookie('iw-user-' + camelCaseParam, value);
    }
  });
}

// --------- Fonctions gérant l'import des données
// ------------------------------------------------------
export function fillFormData() {
  document.querySelectorAll('input[iw-formdata]').forEach((input) => {
    const attr = input.getAttribute('iw-formdata');
    if (!attr) return;
    const val = getCookie('iw-user-' + attr);
    if (val) input.value = val;
    // Si l'attribut contient "URL", on décode la valeur pour avoir l'URL en clair
    if (attr.includes('URL') && val) {
      input.value = decodeURIComponent(val);
    }
  });
}
/* 
// --------- Fonctions gérant la vérification de l'email professionnel
// ------------------------------------------------------
export function verifyProEmail() {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    if (!form) return;

    const emailInput = document.querySelector('input[iw-formdata="email"]');
    const errorDiv = document.querySelector('.form_field-alert');
    // Arrêt si absence de besoin
    if (!emailInput || !errorDiv) return;

    const freeEmailProviders = [
      'gmail.com',
      'yahoo.com',
      'hotmail.com',
      'outlook.com',
      'live.com',
      'aol.com',
      'icloud.com',
      'msn.com',
      'protonmail.com',
      'orange.fr',
      'free.fr',
      'laposte.net',
    ];

    function isFreeEmail(email) {
      const domain = email.trim().toLowerCase().split('@')[1];
      return freeEmailProviders.includes(domain);
    }

    // Affiche l’erreur au blur si besoin
    emailInput.addEventListener('blur', function () {
      const email = emailInput.value;
      if (email && isFreeEmail(email)) {
        if (window.location.pathname.includes('/nl')) {
          errorDiv.textContent = 'Gelieve een professioneel e-mailadres te gebruiken.';
        }
        if (window.location.pathname.includes('/de')) {
          errorDiv.textContent = 'Bitte verwenden Sie eine geschäftliche E-Mail-Adresse.';
        }
        if (window.location.pathname.includes('/es')) {
          errorDiv.textContent =
            'Por favor, utilice una dirección de correo electrónico profesional.';
        }
        if (window.location.pathname.includes('/fr')) {
          errorDiv.textContent = 'Merci d’utiliser une adresse email professionnelle.';
        }
        if (window.location.pathname.includes('/pt')) {
          errorDiv.textContent = 'Por favor, utilize um endereço de email profissional.';
        }
        if (window.location.pathname.includes('/en')) {
          errorDiv.textContent = 'Please use a professional email address.';
        }
        if (window.location.pathname.includes('/it')) {
          errorDiv.textContent = 'Per favore, utilizza un indirizzo email professionale.';
        }
        errorDiv.style.display = 'block';
        emailInput.classList.add('w-input-error');
      }
    });

    // Supprime l’erreur dès que l’utilisateur modifie l’email
    emailInput.addEventListener('input', function () {
      errorDiv.textContent = '';
      errorDiv.style.display = 'none';
      emailInput.classList.remove('w-input-error');
    });

    // Bloque l’envoi si email non pro
    form.addEventListener('submit', function (e) {
      const email = emailInput.value;
      if (isFreeEmail(email)) {
        e.preventDefault();
        e.stopPropagation();
        if (window.location.pathname.includes('/nl')) {
          errorDiv.textContent = 'Gelieve een professioneel e-mailadres te gebruiken.';
        }
        if (window.location.pathname.includes('/de')) {
          errorDiv.textContent = 'Bitte verwenden Sie eine geschäftliche E-Mail-Adresse.';
        }
        if (window.location.pathname.includes('/es')) {
          errorDiv.textContent =
            'Por favor, utilice una dirección de correo electrónico profesional.';
        }
        if (window.location.pathname.includes('/fr')) {
          errorDiv.textContent = 'Merci d’utiliser une adresse email professionnelle.';
        }
        if (window.location.pathname.includes('/pt')) {
          errorDiv.textContent = 'Por favor, utilize um endereço de email profissional.';
        }
        if (window.location.pathname.includes('/en')) {
          errorDiv.textContent = 'Please use a professional email address.';
        }
        if (window.location.pathname.includes('/it')) {
          errorDiv.textContent = 'Per favore, utilizza un indirizzo email professionale.';
        }
        errorDiv.style.display = 'block';
        emailInput.classList.add('w-input-error');
        return false;
      }
    });
  });
}
*/
