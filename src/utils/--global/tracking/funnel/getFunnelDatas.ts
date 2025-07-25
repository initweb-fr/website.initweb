// --------- Fonctions gérant la récupération des données

import { getCookie } from '../../cookieUtilities';

export function getFunnelDeviceInfos() {
  const deviceSupport = getCookie('__iw-funnel_device_support');
  const deviceLang = getCookie('__iw-funnel_device_lang');
  return { deviceSupport, deviceLang };
}

export function getFunnelUTMInfos() {
  const utmSource = getCookie('__iw-funnel_utm_source');
  const utmMedium = getCookie('__iw-funnel_utm_medium');
  const utmCampaign = getCookie('__iw-funnel_utm_campaign');
  const utmTerm = getCookie('__iw-funnel_utm_term');
  const utmContent = getCookie('__iw-funnel_utm_content');
  return { utmSource, utmMedium, utmCampaign, utmTerm, utmContent };
}

export function getFunnelNavInfos() {
  const currentPage = getCookie('__iw-funnel_page_current');
  const previousPage = getCookie('__iw-funnel_page_previous');

  return { currentPage, previousPage };
}

export function getFunnelDatas() {
  const userUTM = getFunnelUTMInfos();
  const userDevice = getFunnelDeviceInfos();
  const userNavigation = getFunnelNavInfos();

  return { userUTM, userDevice, userNavigation };
}
