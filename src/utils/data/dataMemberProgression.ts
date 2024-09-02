import { showProgression } from '$utils/display/displayMemberProgression';

import { getMemberstackUserInfo } from './dataMember';

declare global {
  interface Window {
    $memberstackDom: any;
  }
}

//-------

export function surveyProgression() {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (
          (mutation.target instanceof Element && mutation.target.classList.contains('is-watched')) ||
          (mutation.oldValue && mutation.oldValue.includes('is-watched'))
        ) {
          showProgression();
        }
      }
    }
  });

  // Sélectionner l'élément à observer (par exemple, le conteneur des vidéos)
  const modulesContainer = document.querySelector('.page-wrapper');

  // Options de l'observateur (observer les attributs des nœuds enfants)
  const config = { attributes: true, subtree: true, attributeOldValue: true };

  // Commencer à observer le conteneur des vidéos
  if (modulesContainer) {
    observer.observe(modulesContainer, config);
  }
}
export async function updateModuleLecture() {
  // Usage

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
export async function saveModuleSeen() {
  //const value = localStorage.getItem('valueCurrentModule');
  //console.log(value);

  // Récupération des infos du membr sur Memberstack
  const userInfo = getMemberstackUserInfo();
  if (userInfo) {
    const userID = userInfo.id;
    const userEmail = userInfo.email;
    // Fonction envoyant des informations à Pipedrive
    function handleDatas(event: MouseEvent) {
      const thisModuleID = (event.target as HTMLElement).getAttribute('ms-code-mark-complete');
      //console.log(thisModuleID);
      console.log('Progression sauvegardée.');

      fetch('https://hook.eu1.make.com/ytpl7bntjxsiyg1wm7nfbjojemfwopvv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          MODULE_id: thisModuleID,
          MEMBERSTACK_id: userID,
          MEMBERSTACK_email: userEmail,
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
}
