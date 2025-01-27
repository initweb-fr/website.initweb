/**
 * Initializes click event listeners on progress trigger elements to track progress via webhook.
 */

// Export de la fonction trackProgress
export const trackProgress = (): void => {
  // Sélection de tous les éléments déclencheurs de progression
  const triggers = document.querySelectorAll<HTMLElement>('[iw-p-progress-trigger]');

  // Fonction pour mettre à jour le compteur
  const updateCount = function (value: number) {
    // Sélection des éléments de compteur, de barre de progression et d'information de progression
    const progressCounter = document.querySelectorAll<HTMLElement>('[iw-p-progress-watched-count]');
    const progressBar = document.querySelectorAll<HTMLElement>('[iw-p-progress-watched-bar]');
    const progressInfo = document.querySelectorAll<HTMLElement>('[iw-p-progress-watched-percent]');

    // Calcul du pourcentage vu
    const modulesTotal = Array.from(document.querySelectorAll('[iw-p-progress-watched]'));
    const modulesTotalCount = modulesTotal.length;
    const percentageSeen = Math.trunc((value / modulesTotalCount) * 100);

    // Mise à jour des éléments
    progressCounter.forEach((item) => {
      item.innerText = `${value} modules`;
    });
    progressBar.forEach((item) => {
      item.style.width = percentageSeen + '%';
    });
    progressInfo.forEach((item) => {
      item.innerText = percentageSeen + '%';
    });
  };

  // Récupération du membre actuel
  window.$memberstackDom
    .getCurrentMember()
    .then(({ data: member }) => {
      if (member) {
        // Récupération de l'ID du membre et des modules complétés
        const memberATID = member.customFields['member-atid'];
        const modulesCompleted = member.customFields['modules-completes-atids'];
        let modulesCompletedCount = modulesCompleted.length;

        // Partie 1: Vérification des modules déjà complétés
        // Définition de l'état complété
        modulesCompleted.forEach((moduleId: string) => {
          const elements = document.querySelectorAll(`[iw-p-progress-target="${moduleId}"]`);
          if (elements) {
            elements.forEach((element) => {
              element.setAttribute('iw-p-progress-watched', 'true');
            });
          }
        });

        // Mise à jour du compteur
        updateCount(modulesCompletedCount);

        // Partie 2: Enregistrement des nouveaux modules vérifiés
        triggers.forEach((trigger) => {
          trigger.addEventListener('click', async function (this: HTMLElement) {
            const targetValue = this.getAttribute('iw-p-progress-target');
            const targetState = this.getAttribute('iw-p-progress-watched');
            const triggerType = this.getAttribute('iw-p-progress-trigger');

            if (!targetValue) {
              console.error('No target value found');
              return;
            }

            // Affichage du loader si clic depuis une case à cocher
            if (triggerType === 'checkbox') {
              trigger.setAttribute('iw-p-progress-trigger-loader', 'true');
            }

            // Affichage du loader de la case à cocher correspondante si clic depuis un bouton
            if (triggerType === 'button') {
              // Récupération de la case à cocher correspondante
              const matchingCheckboxes = document.querySelectorAll<HTMLElement>(
                `[iw-p-progress-trigger="checkbox"][iw-p-progress-target="${targetValue}"]`
              );
              matchingCheckboxes.forEach((match) => {
                match.setAttribute('iw-p-progress-trigger-loader', 'true');
              });
            }

            // Construction de l'URL du webhook
            const webhookUrl = `https://hook.eu1.make.com/ddr72exe2luw83coyqsu2n51kigeb26b?moduleATID=${encodeURIComponent(
              targetValue
            )}&memberATID=${memberATID}&targetState=${targetState}`;

            try {
              // Envoi de la requête au webhook
              const response = await fetch(webhookUrl);
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              if (targetState !== 'true') {
                trigger.setAttribute('iw-p-progress-watched', 'true');
                modulesCompletedCount += 1;
                updateCount(modulesCompletedCount);
                // Vérification de la case à cocher correspondante si clic depuis un bouton
                if (triggerType === 'button') {
                  // Récupération de la case à cocher correspondante
                  const matchingCheckboxes = document.querySelectorAll<HTMLElement>(
                    `[iw-p-progress-trigger="checkbox"][iw-p-progress-target="${targetValue}"]`
                  );
                  matchingCheckboxes.forEach((match) => {
                    match.setAttribute('iw-p-progress-watched', 'true');
                    match.setAttribute('iw-p-progress-trigger-loader', 'false');
                  });
                }
              } else if (targetState === 'true') {
                trigger.setAttribute('iw-p-progress-watched', 'false');
                modulesCompletedCount -= 1;
                updateCount(modulesCompletedCount);
                // Vérification de la case à cocher correspondante si clic depuis un bouton
                if (triggerType === 'button') {
                  // Récupération de la case à cocher correspondante
                  const matchingCheckboxes = document.querySelectorAll<HTMLElement>(
                    `[iw-p-progress-trigger="checkbox"][iw-p-progress-target="${targetValue}"]`
                  );
                  matchingCheckboxes.forEach((match) => {
                    match.setAttribute('iw-p-progress-watched', 'false');
                    match.setAttribute('iw-p-progress-trigger-loader', 'false');
                  });
                }
              }

              trigger.setAttribute('iw-p-progress-trigger-loader', 'false');
              console.log('Progress updated successfully');
            } catch (error) {
              console.error(
                'Error updating progress:',
                error instanceof Error ? error.message : String(error)
              );
            }
          });
        });
      } else {
        console.log('No member is currently logged in');
      }
    })
    .catch((error: unknown) => {
      console.error('Error fetching member data:', error);
    });
};

/*
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
*/
/*
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
*/
/*
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
  */
