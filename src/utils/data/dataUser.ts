export function saveUserData() {
  const webflowForms = Array.from(document.querySelectorAll('.w-form'));
  webflowForms.forEach((webflowForm) => {
    const emailField = document.querySelector<HTMLInputElement>('[field="email"]');
    const firstNameField = document.querySelector<HTMLInputElement>('[field="firstname"]');
    const lastNameField = document.querySelector<HTMLInputElement>('[field="lastname"]');

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
export function addUserData() {
  const emailFields = Array.from(document.querySelectorAll<HTMLInputElement>('[field="email"]'));
  const firstNameFields = Array.from(
    document.querySelectorAll<HTMLInputElement>('[field="firstname"]')
  );
  const lastNameFields = Array.from(
    document.querySelectorAll<HTMLInputElement>('[field="lastname"]')
  );

  emailFields.forEach((emailField) => {
    const email = localStorage.getItem('user_email');
    if (!!email) {
      emailField.value = email;
    }
  });
  firstNameFields.forEach((firstNameField) => {
    const firstname = localStorage.getItem('user_firstname');
    if (!!firstname) {
      firstNameField.value = firstname;
    }
  });
  lastNameFields.forEach((lastNameField) => {
    const lastname = localStorage.getItem('user_lastname');
    if (!!lastname) {
      lastNameField.value = lastname;
    }
  });
}

export function getUserDevice() {
  const screenWidth = window.innerWidth;
  let deviceType;

  if (screenWidth > 992) {
    deviceType = 'computer';
  } else if (screenWidth > 768) {
    deviceType = 'tablet';
  } else {
    deviceType = 'phone';
  }

  // Store the device type in a variable for future use
  return deviceType;
}
export function saveCurrentPreviousPage() {
  // Get the URL path of the current page
  const currentPagePath: string = window.location.pathname;

  // Get the URL path of the previous page from the cookie (if exists)

  const previousPageToSave: string | null = localStorage.getItem('currentPagePath');

  // Move the current page path to previousPagePath and set currentPagePath on page load
  if (previousPageToSave) {
    if (previousPageToSave !== currentPagePath) {
      localStorage.setItem('previousPagePath', previousPageToSave);
    }
  }
  localStorage.setItem('currentPagePath', currentPagePath);

  //console.log('previousPagePath : ' + localStorage.getItem('previousPagePath'));
  //console.log('currentPagePath : ' + localStorage.getItem('currentPagePath'));
}
export function manageUTM() {
  // Récupération de l'URL
  const url = new URL(location.href);

  const utm_campaign = url.searchParams.get('utm_campaign');
  const utm_source = url.searchParams.get('utm_source');
  const utm_medium = url.searchParams.get('utm_medium');
  const utm_term = url.searchParams.get('utm_term');

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
