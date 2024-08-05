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

export async function updateModuleLecture() {
  const memberstack = window.$memberstackDom;
  let memberData;

  try {
    // Fetch member data once
    const member = await memberstack.getMemberJSON();
    memberData = member.data ? member.data : {};
  } catch (error) {
    console.error('Error fetching member data:', error);
    return; // Stop execution if member data cannot be fetched
  }

  // Function to mark module complete, now accepts memberData as a parameter
  async function markModuleComplete(moduleKey, memberData) {
    const [subject, format, approach, chapterNumber, subchapterNumber, moduleNumber] =
      moduleKey.split('-');

    // Vérifier et initialiser chaque niveau de la hiérarchie si nécessaire
    if (!memberData[subject]) {
      memberData[subject] = {};
    }
    if (!memberData[subject][format]) {
      memberData[subject][format] = {};
    }
    if (!memberData[subject][format][approach]) {
      memberData[subject][format][approach] = {};
    }
    if (!memberData[subject][format][approach][chapterNumber]) {
      memberData[subject][format][approach][chapterNumber] = {};
    }
    if (!memberData[subject][format][approach][chapterNumber][subchapterNumber]) {
      memberData[subject][format][approach][chapterNumber][subchapterNumber] = {};
    }

    // Marquer le module comme complété
    memberData[subject][format][approach][chapterNumber][subchapterNumber][moduleNumber] = true;

    // Update member JSON with modified memberData
    await memberstack.updateMemberJSON({ json: memberData });
    console.log(`Module ${moduleKey} marked as completed`);

    // Update the DOM as before
    const moduleElements = document.querySelectorAll(`[ms-code-mark-complete="${moduleKey}"]`);
    moduleElements.forEach((moduleElement) => {
      moduleElement.classList.add('is-watched');
    });
  }

  async function markModuleIncomplete(moduleKey, memberData) {
    const [subject, format, approach, chapterNumber, subchapterNumber, moduleNumber] =
      moduleKey.split('-');

    if (
      memberData[subject] &&
      memberData[subject][format] &&
      memberData[subject][format][approach] &&
      memberData[subject][format][approach][chapterNumber] &&
      memberData[subject][format][approach][chapterNumber][subchapterNumber] &&
      memberData[subject][format][approach][chapterNumber][subchapterNumber][moduleNumber]
    ) {
      delete memberData[subject][format][approach][chapterNumber][subchapterNumber][moduleNumber];

      // Update member JSON with modified memberData
      await memberstack.updateMemberJSON({ json: memberData });
      console.log(`Module ${moduleKey} marked as uncompleted`);
    }

    const moduleElements = document.querySelectorAll(`[ms-code-mark-complete="${moduleKey}"]`);
    moduleElements.forEach((moduleElement) => {
      moduleElement.classList.remove('is-watched');
    });
  }

  async function updatePageFromMemberJSON(
    subject,
    format,
    approach,
    chapterNumber,
    subchapterNumber,
    memberData
  ) {
    if (
      memberData[subject] &&
      memberData[subject][format] &&
      memberData[subject][format][approach] &&
      memberData[subject][format][approach][chapterNumber] &&
      memberData[subject][format][approach][chapterNumber][subchapterNumber]
    ) {
      Object.keys(memberData[subject][format][approach][chapterNumber][subchapterNumber]).forEach(
        (moduleNumber) => {
          const moduleKey = `${subject}-${format}-${approach}-${chapterNumber}-${subchapterNumber}-${moduleNumber}`;
          const moduleElements = document.querySelectorAll(
            `[ms-code-mark-complete="${moduleKey}"]`
          );
          moduleElements.forEach((moduleElement) => {
            moduleElement.classList.add('is-watched');
          });
        }
      );
    }
  }

  document.addEventListener('click', async function (event) {
    const { target } = event;
    const completeElement = target.closest('[ms-code-mark-complete]');
    if (completeElement) {
      event.preventDefault();

      const moduleKey = completeElement.getAttribute('ms-code-mark-complete');

      if (completeElement.classList.contains('is-watched')) {
        await markModuleIncomplete(moduleKey, memberData);
      } else {
        completeElement.classList.add('is-watched'); // Optimistically add "yes" class
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
    const [subject, format, approach, chapterNumber, subchapterNumber, moduleNumber] =
      moduleKey.split('-');
    updatePageFromMemberJSON(
      subject,
      format,
      approach,
      chapterNumber,
      subchapterNumber,
      memberData
    );
  });
}

export function manageFUPEWWTrackingData() {
  //
  // INITIALISATION --  Récupération de l'ensemble des Cookies
  const cookieString = document.cookie;
  const cookieList = cookieString.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
    console.log(acc);
  }, {});

  //
  // IDENTIFICATION -- Statut de l'envoi des datas
  const cookieFUPEWWDatasState = cookieList.__initweb_fupeww_datas_state;

  if (cookieFUPEWWDatasState !== 'send') {
    //
    // VERIFICATION -- Si les datas n'ont jamais été envoyé…
    console.log("Le cookie n'existe pas : envoi des données");

    //
    // INITIALISATION -- Récupération du Device
    const screenWidth = window.innerWidth;
    let deviceType;

    if (screenWidth > 992) {
      deviceType = 'computer';
    } else if (screenWidth > 768) {
      deviceType = 'tablet';
    } else {
      deviceType = 'phone';
    }

    //
    // INITIALISATION -- Récupération de l'URL
    const windowURL = window.location.href;

    //
    // RECUPERATION -- UTMS depuis URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmUserID = urlParams.get('user_id');
    const utmCourseID = urlParams.get('purchased_course_id');

    //
    // RECUPERATION -- UTMS depuis Cookies

    let cookieCampaign = cookieList.__gtm_utm_campaign;
    if (cookieCampaign === 'deleted') {
      cookieCampaign = '';
    }
    let cookieContent = cookieList.__gtm_utm_content;
    if (cookieContent === 'deleted') {
      cookieContent = '';
    }
    let cookieMedium = cookieList.__gtm_utm_medium;
    if (cookieMedium === 'deleted') {
      cookieMedium = '';
    }
    let cookieSource = cookieList.__gtm_utm_source;
    if (cookieSource === 'deleted') {
      cookieSource = '';
    }
    let cookieTerm = cookieList.__gtm_utm_term;
    if (cookieTerm === 'deleted') {
      cookieTerm = '';
    }
    console.log({
      CUSTOM_DeviceType: deviceType,
      CUSTOM_URL: windowURL,
      UTM_UserID: utmUserID,
      UTM_CourseID: utmCourseID,
      COOKIE_Campaign: cookieCampaign,
      COOKIE_Content: cookieContent,
      COOKIE_Medium: cookieMedium,
      COOKIE_Source: cookieSource,
      COOKIE_Term: cookieTerm,
    });
    //
    // ENVOI -- Déclenchement du Webhook
    fetch('https://hook.eu1.make.com/o0o4flkk9fm8opzyms8fvjtn6diuic31', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CUSTOM_DeviceType: deviceType,
        CUSTOM_URL: windowURL,

        COOKIE_Campaign: cookieCampaign,
        COOKIE_Content: cookieContent,
        COOKIE_Medium: cookieMedium,
        COOKIE_Source: cookieSource,
        COOKIE_Term: cookieTerm,

        UTM_UserID: utmUserID,
        UTM_CourseID: utmCourseID,
      }),
    });
    //
    // VALIDATION -- Création d'un Cookie
    document.cookie = '__initweb_fupeww_datas_state=send';
    console.log('Données envoyées & Cookie créé.');
  } else {
    //
    // VERIFICATION -- Si les datas ont déjà été envoyé…
    console.log("Le cookie existe : pas d'envoi des données.");
  }
}

export async function saveModuleSeen() {
  //const value = localStorage.getItem('valueCurrentModule');
  //console.log(value);

  // Récupération des infos du membr sur Memberstack
  const memberstack = window.$memberstackDom;
  const member = await memberstack.getCurrentMember();
  const memberDatas = member.data ? member.data : {};
  const {
    auth: { email },
    id,
  } = memberDatas;

  // Fonction envoyant des informations à Pipedrive
  function handleDatas(event) {
    const thisModuleID = event.target.getAttribute('ms-code-mark-complete');
    //console.log(thisModuleID);
    console.log('Progression sauvegardée.');

    fetch('https://hook.eu1.make.com/ytpl7bntjxsiyg1wm7nfbjojemfwopvv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MODULE_id: thisModuleID,
        MEMBERSTACK_id: id,
        MEMBERSTACK_email: email,
      }),
    });
  }

  // Déclenchement de la fonction
  const markAsSeenButtons = document.querySelectorAll(
    '[ms-code-mark-complete]:not(.w-condition-invisible'
  );
  //console.log(markAsSeenButtons);

  markAsSeenButtons.forEach((markAsSeenButton) => {
    if (!markAsSeenButton.classList.contains('is-watched')) {
      markAsSeenButton.addEventListener('click', handleDatas);
    }
  });
}

export function addCurrentPageToNav() {
  // Récupère le code depuis le LocalStorage
  const CurrentPageNameUTM = localStorage.getItem('page_current_name');
  const NavPage = document.querySelector('[pageinfo="current-page"]') as HTMLElement;

  //Intègre le Nom de la page.
  //console.log(NavPage);
  //console.log(CurrentPageNameUTM);
  //console.log(CurrentPageUrlUTM);
  if (NavPage) {
    NavPage.innerHTML = CurrentPageNameUTM;
  }
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
export function getDeviceType() {
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
export function manageUTM() {
  // Récupération de l'URL
  const url = new URL(location.href);

  // Récupération des UTMs
  const utm_campaign = url.searchParams.get('utm_campaign');
  const utm_source = url.searchParams.get('utm_source');
  const utm_medium = url.searchParams.get('utm_medium');
  const utm_term = url.searchParams.get('utm_term');

  // Insertion des UTMs dans les champs du formulaire
  ///// UTM Campaign
  const campaignFields = document.querySelectorAll('[field="utm_campaign"]');
  campaignFields.forEach((campaignField) => {
    //console.log('[FORM] - Param "Campaign" trouvé et ajouté.');
    campaignField.value = utm_campaign;
  });
  ///// UTM Source
  const sourceFields = document.querySelectorAll('[field="utm_source"]');
  sourceFields.forEach((sourceField) => {
    //console.log('[FORM] - Param "Source" trouvé et ajouté.');
    sourceField.value = utm_source;
  });
  ///// UTM Medium
  const mediumFields = document.querySelectorAll('[field="utm_medium"]');
  mediumFields.forEach((mediumField) => {
    //console.log('[FORM] - Param "Medium" trouvé et ajouté.');
    mediumField.value = utm_medium;
  });
  ///// UTM Term
  const termFields = document.querySelectorAll('[field="utm_term"]');
  termFields.forEach((termField) => {
    //console.log('[FORM] - Param "Term" trouvé et ajouté.');
    termField.value = utm_term;
  });
}
