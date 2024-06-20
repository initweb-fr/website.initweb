export function saveUserData() {
  const webflowForms = Array.from(document.querySelectorAll('.w-form'));
  webflowForms.forEach((webflowForm) => {
    const emailField = document.querySelector('[field="email"]');
    const firstNameField = document.querySelector('[field="firstname"]');
    const lastNameField = document.querySelector('[field="lastname"]');

    webflowForm.addEventListener('submit', (e) => {
      localStorage.setItem('user_email', emailField.value);
      localStorage.setItem('user_firstname', firstNameField.value);
      localStorage.setItem('user_lastname', lastNameField.value);
    });
  });
}

export function formWebflow() {
  const webflowForms = Array.from(document.querySelectorAll('.w-form'));
  webflowForms.forEach((webflowForm) => {
    webflowForm.addEventListener('submit', (e) => {
      // Custom code ici
    });
  });
}

export function addUserEmail() {
  const emailFields = Array.from(document.querySelectorAll('[field="email"]'));
  emailFields.forEach((emailField) => {
    const email = localStorage.getItem('user_email');
    if (!!email) {
      emailField.value = email;
    }
  });
}

export function addUserFirstName() {
  const firstNameFields = Array.from(document.querySelectorAll('[field="firstname"]'));
  firstNameFields.forEach((firstNameField) => {
    const firstname = localStorage.getItem('user_firstname');
    if (!!firstname) {
      firstNameField.value = firstname;
    }
  });
}
export function addUserLastName() {
  const lastNameFields = Array.from(document.querySelectorAll('[field="lastname"]'));
  lastNameFields.forEach((lastNameField) => {
    const lastname = localStorage.getItem('user_lastname');
    if (!!lastname) {
      lastNameField.value = lastname;
    }
  });
}

export function getMemberEmailOnLoad() {
  window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
    if (member && member.auth.email) {
      const { email } = member.auth;
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.get('utm_email') !== email) {
        currentUrl.searchParams.set('utm_email', email);
        window.location.href = currentUrl;
      }
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
export async function updateModuleLecture() {
  const memberstack = window.$memberstackDom;
  let memberData;

  try {
    // Fetch member data once
    const member = await memberstack.getMemberJSON();
    memberData = member.data ? member.data : {};

    console.log(memberData);
  } catch (error) {
    console.error('Error fetching member data:', error);
    return; // Stop execution if member data cannot be fetched
  }

  // Function to mark module complete, now accepts memberData as a parameter
  async function markModuleComplete(moduleKey, memberData) {
    const [subject, approach, chapterNumber, moduleNumber] = moduleKey.split('-');
    console.log([subject, approach, chapterNumber, moduleNumber]);

    // Vérifier et initialiser chaque niveau de la hiérarchie si nécessaire
    if (!memberData[subject]) {
      memberData[subject] = {};
    }
    if (!memberData[subject][approach]) {
      memberData[subject][approach] = {};
    }
    if (!memberData[subject][approach][chapterNumber]) {
      memberData[subject][approach][chapterNumber] = {};
    }
    if (!memberData[subject][approach][chapterNumber][moduleNumber]) {
      memberData[subject][approach][chapterNumber][moduleNumber] = false;
    }

    // Marquer le module comme complété
    memberData[subject][approach][chapterNumber][moduleNumber] = true;

    // Mettre à jour les données du membre sur Memberstack
    await memberstack.updateMemberJSON({ json: memberData });
    console.log(`Module ${moduleKey} marked as completed`);

    // Mettre à jour le DOM pour indiquer le statut complété
    const moduleElements = document.querySelectorAll(`[ms-code-mark-complete="${moduleKey}"]`);
    moduleElements.forEach((moduleElement) => {
      moduleElement.classList.add('is-watched');
    });
  }

  async function markModuleIncomplete(moduleKey, memberData) {
    const [subject, approach, chapterNumber, moduleNumber] = moduleKey.split('-');
    if (
      memberData[subject] &&
      memberData[subject][approach] &&
      memberData[subject][approach][chapterNumber] &&
      memberData[subject][approach][chapterNumber][moduleNumber]
    ) {
      delete memberData[subject][approach][chapterNumber][moduleNumber];

      await memberstack.updateMemberJSON({ json: memberData });
      console.log(`Module ${moduleKey} marked as incomplete`);
    }

    const moduleElements = document.querySelectorAll(`[ms-code-mark-complete="${moduleKey}"]`);
    moduleElements.forEach((moduleElement) => {
      moduleElement.classList.remove('is-watched');
    });
  }
  async function updatePageFromMemberJSON(
    subject,
    approach,
    chapterNumber,
    memberData,
    moduleNumber
  ) {
    // Vérifier que chaque niveau de la hiérarchie est défini
    if (
      memberData[subject] &&
      memberData[subject][approach] &&
      memberData[subject][approach][chapterNumber]
    ) {
      console.log('Hiérarchie vérifiée');
      Object.keys(memberData[subject][approach][chapterNumber]).forEach((moduleNumber) => {
        const moduleKey = `${subject}-${approach}-${chapterNumber}-${moduleNumber}`;
        console.log(moduleKey);
        const moduleElements = document.querySelectorAll(`[ms-code-mark-complete="${moduleKey}"]`);
        moduleElements.forEach((moduleElement) => {
          moduleElement.classList.add('is-watched');
        });
      });
    }
  }

  document.addEventListener('click', async function (event) {
    const { target } = event;
    const completeElement = target.closest('[ms-code-mark-complete]');
    if (completeElement) {
      event.preventDefault();

      const moduleKey = completeElement.getAttribute('ms-code-mark-complete');

      if (completeElement.classList.contains('yes')) {
        await markModuleIncomplete(moduleKey, memberData);
      } else {
        completeElement.classList.add('yes'); // Optimistically add "yes" class
        await markModuleComplete(moduleKey, memberData);
      }

      // Navigate to the href link if it exists after updating JSON
      if (completeElement.tagName.toLowerCase() === 'a' && completeElement.href) {
        window.location.href = completeElement.href;
      }
    }
  });

  // Initialize page based on the fetched memberData
  document.querySelectorAll('[ms-code-mark-complete]').forEach((groupElement) => {
    const moduleKey = groupElement.getAttribute('ms-code-mark-complete');
    const [subject, approach, chapterNumber] = moduleKey.split('-');
    updatePageFromMemberJSON(subject, approach, chapterNumber, memberData);
  });
}
