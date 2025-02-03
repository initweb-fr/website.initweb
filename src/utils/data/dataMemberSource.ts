import { getCookie, setCookie } from '$utils/cookie/cookieUtility';

// ---------- TRACKING SOURCE ----------
// Fonction pour obtenir les données de suivi du funnel
export function getFunnelTrackingData() {
  // Récupération de l'URL actuelle
  const windowURL = new URL(window.location.href);
  const currentURL = windowURL.href;
  const courseLandingID = localStorage.getItem('__initweb_funnel_id');

  // Récupération des paramètres UTM de l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const utmCampaign = urlParams.get('utm_campaign');
  const utmContent = urlParams.get('utm_content');
  const utmMedium = urlParams.get('utm_medium');
  const utmSource = urlParams.get('utm_source');
  const utmTerm = urlParams.get('utm_term');

  // Détermination du type de dispositif en fonction de la largeur de l'écran
  const screenWidth = window.innerWidth;
  let deviceType;
  if (screenWidth > 992) {
    deviceType = 'computer';
  } else if (screenWidth > 768) {
    deviceType = 'tablet';
  } else {
    deviceType = 'phone';
  }

  // ?utm_content=testContent&utm_campaign=testCampaign&utm_term=testTerm&utm_source=testSource&utm_medium=testMedium

  // Enregistrement des informations dans les cookies
  setCookie('__initweb_' + courseLandingID + '_funnel_landing', currentURL, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_device', deviceType, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_campaign', utmCampaign, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_content', utmContent, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_medium', utmMedium, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_source', utmSource, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_term', utmTerm, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_id', courseLandingID, 7);
}

// Fonction pour envoyer les données de suivi du funnel
export function sendFunnelTrackingData() {
  const currentModuleID = getCookie('__initweb_currentmodule_id');
  console.log(currentModuleID);
  if (currentModuleID && currentModuleID.includes('chapitre01-souschapitre01-module01')) {
    window.$memberstackDom.getCurrentMember().then(({ data: member }) => {
      if (member) {
        // Récupération des informations relatives à la landing liée à la formation
        const currentFunnelID = getCookie('__initweb_currentcourse_landing');
        // Récupération du statut d'envoi des informations liées à la source du membre
        const currentFunnelDatasState = getCookie(
          '__initweb_' + currentFunnelID + '_funnel_datas_state'
        );
        console.log(currentFunnelDatasState);

        // Vérification si les données n'ont jamais été envoyées
        if (currentFunnelDatasState !== 'send') {
          console.log('Statut du Tracking -Source- : Inexistant ---> Envoi des données');

          // Récupération des informations de l'utilisateur
          const userID = member.id;
          const userEmail = member.auth.email;
          const userFirstName = member.customFields['first-name'];

          // Récupération des informations du funnel depuis les cookies
          const cookieThisFunnelCourseID = getCookie('__initweb_' + currentFunnelID + '_funnel_id');
          let cookieThisFunnelDevice = getCookie('__initweb_' + currentFunnelID + '_funnel_device');
          let cookieThisFunnelLanding = getCookie(
            '__initweb_' + currentFunnelID + '_funnel_landing'
          );
          let cookieThisFunnelCampaign = getCookie(
            '__initweb_' + currentFunnelID + '_funnel_campaign'
          );
          let cookieThisFunnelContent = getCookie(
            '__initweb_' + currentFunnelID + '_funnel_content'
          );
          let cookieThisFunnelMedium = getCookie('__initweb_' + currentFunnelID + '_funnel_medium');
          let cookieThisFunnelSource = getCookie('__initweb_' + currentFunnelID + '_funnel_source');
          let cookieThisFunnelTerm = getCookie('__initweb_' + currentFunnelID + '_funnel_term');

          // Vérification des valeurs des cookies et remplacement des valeurs 'deleted' par des chaînes vides
          if (cookieThisFunnelCampaign === 'deleted') {
            cookieThisFunnelCampaign = '';
          }
          if (cookieThisFunnelContent === 'deleted') {
            cookieThisFunnelContent = '';
          }
          if (cookieThisFunnelMedium === 'deleted') {
            cookieThisFunnelMedium = '';
          }
          if (cookieThisFunnelSource === 'deleted') {
            cookieThisFunnelSource = '';
          }
          if (cookieThisFunnelTerm === 'deleted') {
            cookieThisFunnelTerm = '';
          }
          if (cookieThisFunnelDevice === 'deleted') {
            cookieThisFunnelDevice = '';
          }
          if (cookieThisFunnelLanding === 'deleted') {
            cookieThisFunnelLanding = '';
          }

          // Envoi des données via un webhook
          fetch('https://hook.eu1.make.com/jwy2aodfw6bybp7gribq53rpqjwpfyuu', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              CUSTOM_DeviceType: cookieThisFunnelDevice,
              CUSTOM_LandingURL: cookieThisFunnelLanding,
              CUSTOM_UserID: userID,
              CUSTOM_UserEmail: userEmail,
              CUSTOM_UserFirstName: userFirstName,
              COOKIE_CourseID: cookieThisFunnelCourseID,
              COOKIE_Campaign: cookieThisFunnelCampaign,
              COOKIE_Content: cookieThisFunnelContent,
              COOKIE_Medium: cookieThisFunnelMedium,
              COOKIE_Source: cookieThisFunnelSource,
              COOKIE_Term: cookieThisFunnelTerm,
            }),
          });

          // Création d'un cookie pour indiquer que les données ont été envoyées
          document.cookie = '__initweb_' + currentFunnelID + '_funnel_datas_state=send';
          console.log('Données envoyées & Cookie créé.');
        } else {
          // Si les données ont déjà été envoyées
          console.log('Statut du Tracking -Source- : Préalablement envoyé. --->  Fin.');
        }
      }
    });
  }
}
