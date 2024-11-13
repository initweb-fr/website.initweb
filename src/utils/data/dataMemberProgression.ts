import { showProgression } from '$utils/display/displayMemberProgression';

import { getMemberstackUserInfo } from './dataMember';

// Déclaration globale pour ajouter une propriété à l'objet Window
declare global {
  interface Window {
    $memberstackDom: any; // Utilisation de 'any' pour éviter les erreurs de typage
  }
}

// Fonction pour surveiller les changements de progression
export function surveyProgression() {
  // Création d'un observateur de mutations pour surveiller les changements d'attributs
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      // Vérifier si le changement concerne l'attribut 'class'
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        // Vérifier si l'élément a la classe 'is-watched' ou si l'ancienne valeur de la classe contenait 'is-watched'
        if (
          (mutation.target instanceof Element &&
            mutation.target.classList.contains('is-watched')) ||
          (mutation.oldValue && mutation.oldValue.includes('is-watched'))
        ) {
          showProgression(); // Afficher la progression
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

// Fonction pour mettre à jour la progression des modules
export async function updateModuleLecture() {
  // Récupération de l'objet memberstack depuis l'objet Window
  const memberstack = window.$memberstackDom;
  let memberData;

  try {
    // Récupérer les données du membre une fois
    const member = await memberstack.getMemberJSON();
    memberData = member.data ? member.data : {};
  } catch (error) {
    console.error('Error fetching member data:', error);
    return; // Arrêter l'exécution si les données du membre ne peuvent pas être récupérées
  }

  // Fonction pour marquer un module comme complété, accepte maintenant memberData comme paramètre
  async function markModuleComplete(moduleKey: string, memberData: any) {
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

    // Mettre à jour le JSON du membre avec les données modifiées
    await memberstack.updateMemberJSON({ json: memberData });
    console.log(`Module ${moduleKey} marked as completed`);

    // Mettre à jour le DOM comme avant
    const moduleElements = document.querySelectorAll(`[ms-code-mark-complete="${moduleKey}"]`);
    moduleElements.forEach((moduleElement) => {
      moduleElement.classList.add('is-watched');
    });
  }

  // Fonction pour marquer un module comme incomplet
  async function markModuleIncomplete(moduleKey: string, memberData: any) {
    const [subject, format, approach, chapterNumber, subchapterNumber, moduleNumber] =
      moduleKey.split('-');

    // Vérifier si le module est marqué comme complété et le supprimer
    if (
      memberData[subject] &&
      memberData[subject][format] &&
      memberData[subject][format][approach] &&
      memberData[subject][format][approach][chapterNumber] &&
      memberData[subject][format][approach][chapterNumber][subchapterNumber] &&
      memberData[subject][format][approach][chapterNumber][subchapterNumber][moduleNumber]
    ) {
      delete memberData[subject][format][approach][chapterNumber][subchapterNumber][moduleNumber];

      // Mettre à jour le JSON du membre avec les données modifiées
      await memberstack.updateMemberJSON({ json: memberData });
      console.log(`Module ${moduleKey} marked as uncompleted`);
    }

    // Mettre à jour le DOM pour refléter le changement
    const moduleElements = document.querySelectorAll(`[ms-code-mark-complete="${moduleKey}"]`);
    moduleElements.forEach((moduleElement) => {
      moduleElement.classList.remove('is-watched');
    });
  }

  // Fonction pour mettre à jour la page à partir des données du membre
  async function updatePageFromMemberJSON(
    subject: string,
    format: string,
    approach: string,
    chapterNumber: string,
    subchapterNumber: string,
    memberData: any
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

  // Écouteur d'événements pour gérer les clics sur les éléments marqués comme complets
  document.addEventListener('click', async function (event) {
    const { target } = event;
    const completeElement = (target as HTMLElement).closest('[ms-code-mark-complete]');
    if (completeElement) {
      event.preventDefault();

      const moduleKey = completeElement.getAttribute('ms-code-mark-complete');

      if (completeElement.classList.contains('is-watched')) {
        await markModuleIncomplete(moduleKey, memberData);
      } else {
        completeElement.classList.add('is-watched'); // Ajouter de manière optimiste la classe "is-watched"
        await markModuleComplete(moduleKey, memberData);
      }

      // Naviguer vers le lien href s'il existe après la mise à jour du JSON
      if (completeElement.tagName.toLowerCase() === 'a' && completeElement.href) {
        window.location.href = completeElement.href;
      }
    }
  });

  // Initialiser la page en fonction des données récupérées du membre
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

// Fonction pour sauvegarder la progression d'un module vu
export async function saveModuleSeen() {
  //const value = localStorage.getItem('valueCurrentModule');
  //console.log(value);

  // Récupération des infos du membre sur Memberstack
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

    // Déclenchement de la fonction lors du clic sur les boutons marqués comme vus
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
