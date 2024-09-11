import { getCookie, setCookie } from '$utils/cookie/cookieUtility';

import { getMemberstackUserInfo } from './dataMember';

// ---------- TRACKING SOURCE ----------
export function getFunnelTrackingData() {
  const windowURL = new URL(window.location.href);
  const currentURL = windowURL.href;
  const fullPath = windowURL.pathname;
  const prefix = '/formations/';
  const courseLandingID = fullPath.slice(prefix.length).replace(/\//g, '_');
  //console.log(courseLandingID);

  const urlParams = new URLSearchParams(window.location.search);
  const utmCampaign = urlParams.get('utm_campaign');
  const utmContent = urlParams.get('utm_content');
  const utmMedium = urlParams.get('utm_medium');
  const utmSource = urlParams.get('utm_source');
  const utmTerm = urlParams.get('utm_term');

  const screenWidth = window.innerWidth;
  let deviceType;
  if (screenWidth > 992) {
    deviceType = 'computer';
  } else if (screenWidth > 768) {
    deviceType = 'tablet';
  } else {
    deviceType = 'phone';
  }

  setCookie('__initweb_' + courseLandingID + '_funnel_id', courseLandingID, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_landing', currentURL, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_device', deviceType, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_campaign', utmCampaign, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_content', utmContent, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_medium', utmMedium, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_source', utmSource, 7);
  setCookie('__initweb_' + courseLandingID + '_funnel_term', utmTerm, 7);
}
export function sendFunnelTrackingData() {
  // Récupération des informations relatives à la landing liée à la formation
  const currentFunnelID = getCookie('__initweb_currentcourse_landing');
  // Récupération du statut d'envoi des informations liés à la source du membre
  const currentFunnelDatasState = getCookie('__initweb_' + currentFunnelID + '_funnel_datas_state');
  console.log(currentFunnelDatasState);

  if (currentFunnelDatasState !== 'send') {
    //
    // VERIFICATION -- Si les datas n'ont jamais été envoyé
    console.log('Statut du Tracking -Source- : Inexistant ---> Envoi des données');

    //
    // RECUPERATION --
    const userInfo = getMemberstackUserInfo();
    if (userInfo) {
      const userID = userInfo.id;
      const userEmail = userInfo.email;
      const userFirstName = userInfo?.firstName;

      const cookieThisFunnelCourseID = getCookie('__initweb_' + currentFunnelID + '_funnel_id');

      let cookieThisFunnelDevice = getCookie('__initweb_' + currentFunnelID + '_funnel_device');
      let cookieThisFunnelLanding = getCookie('__initweb_' + currentFunnelID + '_funnel_landing');

      let cookieThisFunnelCampaign = getCookie('__initweb_' + currentFunnelID + '_funnel_campaign');
      let cookieThisFunnelContent = getCookie('__initweb_' + currentFunnelID + '_funnel_content');
      let cookieThisFunnelMedium = getCookie('__initweb_' + currentFunnelID + '_funnel_medium');
      let cookieThisFunnelSource = getCookie('__initweb_' + currentFunnelID + '_funnel_source');
      let cookieThisFunnelTerm = getCookie('__initweb_' + currentFunnelID + '_funnel_term');

      //
      // RECUPERATION -- UTMS depuis Cookies

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
      /**console.log({
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
          });*/

      //
      // ENVOI -- Déclenchement du Webhook
      fetch('https://hook.eu1.make.com/o0o4flkk9fm8opzyms8fvjtn6diuic31', {
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
      //
      // VALIDATION -- Création d'un Cookie
      document.cookie = '__initweb_' + currentFunnelID + '_funnel_datas_state=send';
      console.log('Données envoyées & Cookie créé.');
    } else {
      //
      // VERIFICATION -- Si les datas ont déjà été envoyé…
      console.log('Statut du Tracking -Source- : Préalablement envoyé. --->  Fin.');
    }
  }
}
