// Fonction pour sauvegarder les données utilisateur dans le stockage local
export function saveUserData() {
  // Sélectionne tous les formulaires Webflow sur la page
  const webflowForms = Array.from(document.querySelectorAll('.w-form'));

  // Pour chaque formulaire, ajoute un écouteur d'événement pour la soumission
  webflowForms.forEach((webflowForm) => {
    // Sélectionne les champs d'email, prénom et nom de famille
    const emailField = document.querySelector<HTMLInputElement>('[field="email"]');
    const firstNameField = document.querySelector<HTMLInputElement>('[field="firstname"]');
    const lastNameField = document.querySelector<HTMLInputElement>('[field="lastname"]');

    // Lors de la soumission du formulaire, sauvegarde les valeurs des champs dans le stockage local
    webflowForm.addEventListener('submit', () => {
      if (emailField) {
        localStorage.setItem('user_email', emailField.value);
      }
      if (firstNameField) {
        localStorage.setItem('user_firstname', firstNameField.value);
      }
      if (lastNameField) {
        localStorage.setItem('user_lastname', lastNameField.value);
      }
    });
  });
}

// Fonction pour ajouter les données utilisateur depuis le stockage local aux champs de formulaire
export function addUserData() {
  // Sélectionne tous les champs d'email, prénom et nom de famille
  const emailFields = Array.from(document.querySelectorAll<HTMLInputElement>('[field="email"]'));
  const firstNameFields = Array.from(
    document.querySelectorAll<HTMLInputElement>('[field="firstname"]')
  );
  const lastNameFields = Array.from(
    document.querySelectorAll<HTMLInputElement>('[field="lastname"]')
  );

  // Remplit chaque champ d'email avec la valeur stockée
  emailFields.forEach((emailField) => {
    const email = localStorage.getItem('user_email');
    if (!!email) {
      emailField.value = email;
    }
  });

  // Remplit chaque champ de prénom avec la valeur stockée
  firstNameFields.forEach((firstNameField) => {
    const firstname = localStorage.getItem('user_firstname');
    if (!!firstname) {
      firstNameField.value = firstname;
    }
  });

  // Remplit chaque champ de nom de famille avec la valeur stockée
  lastNameFields.forEach((lastNameField) => {
    const lastname = localStorage.getItem('user_lastname');
    if (!!lastname) {
      lastNameField.value = lastname;
    }
  });
}

// Fonction pour déterminer le type d'appareil de l'utilisateur en fonction de la largeur de l'écran
export function getUserDevice() {
  const screenWidth = window.innerWidth;
  let deviceType;

  // Détermine le type d'appareil en fonction de la largeur de l'écran
  if (screenWidth > 992) {
    deviceType = 'computer';
  } else if (screenWidth > 768) {
    deviceType = 'tablet';
  } else {
    deviceType = 'phone';
  }

  // Retourne le type d'appareil
  return deviceType;
}

// Fonction pour sauvegarder le chemin de la page actuelle et précédente
export function saveCurrentPreviousPage() {
  // Récupère le chemin de l'URL de la page actuelle
  const currentPagePath: string = window.location.pathname;

  // Récupère le chemin de la page précédente depuis le stockage local (si existant)
  const previousPageToSave: string | null = localStorage.getItem('currentPagePath');

  // Si le chemin de la page précédente est différent de la page actuelle, le sauvegarde
  if (previousPageToSave) {
    if (previousPageToSave !== currentPagePath) {
      localStorage.setItem('previousPagePath', previousPageToSave);
    }
  }
  // Sauvegarde le chemin de la page actuelle
  localStorage.setItem('currentPagePath', currentPagePath);
}

// Fonction pour gérer les paramètres UTM de l'URL
export function manageUTM() {
  // Récupération de l'URL actuelle
  const url = new URL(location.href);

  // Extraction des paramètres UTM de l'URL
  const utm_campaign = url.searchParams.get('utm_campaign');
  const utm_source = url.searchParams.get('utm_source');
  const utm_medium = url.searchParams.get('utm_medium');
  const utm_term = url.searchParams.get('utm_term');

  // Remplit les champs de formulaire avec les valeurs UTM si elles existent
  const campaignFields = document.querySelectorAll<HTMLInputElement>('[field="utm_campaign"]');
  campaignFields.forEach((campaignField) => {
    if (utm_campaign) {
      campaignField.value = utm_campaign;
    }
  });
  const sourceFields = document.querySelectorAll<HTMLInputElement>('[field="utm_source"]');
  sourceFields.forEach((sourceField) => {
    if (utm_source) {
      sourceField.value = utm_source;
    }
  });
  const mediumFields = document.querySelectorAll<HTMLInputElement>('[field="utm_medium"]');
  mediumFields.forEach((mediumField) => {
    if (utm_medium) {
      mediumField.value = utm_medium;
    }
  });
  const termFields = document.querySelectorAll<HTMLInputElement>('[field="utm_term"]');
  termFields.forEach((termField) => {
    if (utm_term) {
      termField.value = utm_term;
    }
  });
}
