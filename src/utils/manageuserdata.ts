export function saveUserData() {
  const webflowForms = Array.from(document.querySelectorAll('.w-form'));
  webflowForms.forEach((webflowForm) => {
    const emailField = document.querySelector('[name="email"]');
    const firstNameField = document.querySelector('[name="firstname"]');
    const lastNameField = document.querySelector('[name="lastname"]');

    webflowForm.addEventListener('submit', (e) => {
      localStorage.setItem('user_email', emailField.value);
      localStorage.setItem('user_firstname', firstNameField.value);
      localStorage.setItem('user_lastname', lastNameField.value);
    });
  });
}

export function addUserEmail() {
  const emailFields = Array.from(document.querySelectorAll('[name="email"]'));
  emailFields.forEach((emailField) => {
    const email = localStorage.getItem('user_email');
    if (!!email) {
      emailField.value = email;
    }
  });
}

export function addUserFirstName() {
  const firstNameFields = Array.from(document.querySelectorAll('[name="firstname"]'));
  firstNameFields.forEach((firstNameField) => {
    const firstname = localStorage.getItem('user_firstname');
    if (!!firstname) {
      firstNameField.value = firstname;
    }
  });
}
export function addUserLastName() {
  const lastNameFields = Array.from(document.querySelectorAll('[name="lastname"]'));
  lastNameFields.forEach((lastNameField) => {
    const lastname = localStorage.getItem('user_lastname');
    if (!!lastname) {
      lastNameField.value = lastname;
    }
  });
}
/**
export function saveUserFavoriteOffer() {
  const btnTarifs = document.querySelectorAll('.tarif_btn a');
  btnTarifs.forEach((item) => {
    const offre = item.getAttribute('offre');
    const href = item.getAttribute('href');
    item.href = item.href + '&offre=' + offre;
    console.log('Le nouveau lien est ' + item.href);
  });
}

export function addUserFavoriteOffer() {
  const url_string = window.location.href;
  const url = new URL(url_string);
  const offre = url.searchParams.get('offre');

  const inputOffre = document.querySelector('.input-offre');
  if (inputOffre) {
    console.log(inputOffre);
    localStorage.setItem('user-favoriteoffer', offre);
    inputOffre.value = offre;
  }
}

export function getPreviousPage() {
  const demoLinks = document.querySelectorAll('[href*="/demo"]');
  demoLinks.forEach((demoLink) => {
    const previousPage = sessionStorage.getItem('IDPage');
    demoLink.href = demoLink.href + '?previouspage=' + previousPage;
    console.log('Le lien est ' + demoLink.href);
  });
}
*/
