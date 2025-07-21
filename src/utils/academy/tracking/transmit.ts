import { getMemberData } from '$utils/academy/members/data';
import { getCookie } from '$utils/global/cookieUtilities';

import { getFunnelDatas } from '../../global/tracking/utils';

/**
 * Envoie les données du funnel via webhook
 */
export async function sendFunnelDatasToWebhook(): Promise<void> {
  //Récupération des données du funnel
  const webhookUrl = 'https://hook.eu1.make.com/jwy2aodfw6bybp7gribq53rpqjwpfyuu';
  // Infos du Funnel
  const funnelDatas = getFunnelDatas();
  // Infos de l'utilisateur
  const userData = await getMemberData();
  const userDataMSID = userData?.memberstack?.data?.id;
  const userDataEmail = userData?.memberstack?.data?.auth?.email;
  const userDataFirstName = userData?.memberstack?.data?.auth?.firstName;
  // Infos du cours
  const courseID = getCookie('__iw-coursefunnel_onboarding_iwid');
  console.log('funnelDatas', funnelDatas);
  console.log('userData', userData);
  console.log('courseId', courseID);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CUSTOM_DeviceType: funnelDatas.deviceType.device_type,
        CUSTOM_LandingURL: funnelDatas.currentPagePath.currentPagePath,
        CUSTOM_UserID: userDataMSID,
        CUSTOM_UserEmail: userDataEmail,
        CUSTOM_UserFirstName: userDataFirstName,
        COOKIE_CourseID: courseID,
        COOKIE_UTM_Campaign: funnelDatas.utmParams.utm_campaign,
        COOKIE_UTM_Content: funnelDatas.utmParams.utm_content,
        COOKIE_UTM_Medium: funnelDatas.utmParams.utm_medium,
        COOKIE_UTM_Source: funnelDatas.utmParams.utm_source,
        COOKIE_UTM_Term: funnelDatas.utmParams.utm_term,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    console.log('Données du funnel envoyées avec succès');
  } catch (error) {
    console.error("Erreur lors de l'envoi des données du funnel:", error);
    throw error;
  }
}
