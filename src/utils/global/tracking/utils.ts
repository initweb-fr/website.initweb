/**
 * 👤 Gestion des données utilisateur
 *
 * Sauvegarde et récupération des données utilisateur dans les cookies.
 * Gère les formulaires, navigation et paramètres UTM.
 */

import { getCookie, setCookie } from '$utils/global/cookieUtilities';

type UTMParams = {
  utm_campaign: string | null;
  utm_content: string | null;
  utm_medium: string | null;
  utm_source: string | null;
  utm_term: string | null;
};

// --------- Fonctions gérant la sauvegarde des données
// ------------------------------------------------------

export function saveDeviceInfos() {
  const screenWidth = window.innerWidth;
  //console.log('screenWidth', screenWidth);

  if (screenWidth > 992) {
    setCookie('__iw-user_device_type', 'computer');
  }
  if (screenWidth > 768) {
    setCookie('__iw-user_device_type', 'tablet');
  }
  setCookie('__iw-user_device_type', 'phone');
}

export function saveUTMParamsInfos() {
  const urlParams = new URLSearchParams(window.location.search);

  setCookie('__iw-user_utm_source', urlParams.get('utm_source') || '');
  setCookie('__iw-user_utm_medium', urlParams.get('utm_medium') || '');
  setCookie('__iw-user_utm_campaign', urlParams.get('utm_campaign') || '');
  setCookie('__iw-user_utm_term', urlParams.get('utm_term') || '');
  setCookie('__iw-user_utm_content', urlParams.get('utm_content') || '');
}

export function saveBrowserInfos() {
  const browser_lang = navigator.language || (navigator as any).userLanguage || '';

  setCookie('__iw-user_browser_lang', browser_lang);
}

export function saveCurrentPageInfos() {
  const currentPagePath: string = decodeURIComponent(window.location.pathname);
  // Si l'URL contient "/log/", on arrête la fonction
  if (window.location.pathname.includes('/log/')) {
    return;
  }

  setCookie('__iw-user_currentpage_path', currentPagePath);
}

export function savePreviousPageInfos() {
  // Si l'URL contient "/log/", on arrête la fonction
  if (window.location.pathname.includes('/log/')) {
    return;
  }
  const currentPagePath = getCookie('__iw-user_currentpage_path');
  const previousPagePath = getCookie('__iw-user_previouspage_path');

  if (previousPagePath) {
    if (previousPagePath !== currentPagePath) {
      setCookie('__iw-user_previouspage_path', decodeURIComponent(previousPagePath) || '');
    }
  }
}

export function saveFunnelDatas() {
  saveDeviceInfos();
  saveUTMParamsInfos();
  saveBrowserInfos();
  saveCurrentPageInfos();
  savePreviousPageInfos();
}

// --------- Fonctions gérant la récupération des données
// ------------------------------------------------------

export function getDeviceInfos() {
  const device_type = getCookie('__iw-user_device_type');
  return { device_type };
}

export function getUTMParamsInfos() {
  const utm_campaign = getCookie('__iw-user_utm_campaign');
  const utm_content = getCookie('__iw-user_utm_content');
  const utm_medium = getCookie('__iw-user_utm_medium');
  const utm_source = getCookie('__iw-user_utm_source');
  const utm_term = getCookie('__iw-user_utm_term');
  return { utm_campaign, utm_content, utm_medium, utm_source, utm_term };
}

export function getBrowserInfos() {
  const browser_lang = getCookie('__iw-user_browser_lang');
  return { browser_lang };
}

export function getCurrentPageInfos() {
  const currentPagePath = getCookie('__iw-user_currentpage_path');
  return { currentPagePath };
}

export function getPreviousPageInfos() {
  const previousPagePath = getCookie('__iw-user_previouspage_path');
  return { previousPagePath };
}

export function getFunnelDatas() {
  const utmParams = getUTMParamsInfos();
  const deviceType = getDeviceInfos();
  const browser_lang = getBrowserInfos();

  const currentPagePath = getCurrentPageInfos();
  const previousPagePath = getPreviousPageInfos();

  return { utmParams, deviceType, browser_lang, currentPagePath, previousPagePath };
}

// --------- Fonctions gérant le tracking
// ------------------------------------------------------

export function hasFunnelDataBeenTransmitted(): boolean {
  const courseID = getCookie('__iw-coursefunnel_onboarding_iwid');
  const state = getCookie('__iw-coursefunnel_' + courseID + '_datas_transmitted');
  return state === 'true';
}

export function markFunnelDataAsTransmitted(): void {
  const courseID = getCookie('__iw-coursefunnel_onboarding_iwid');
  document.cookie = `__iw-coursefunnel_${courseID}_datas_transmitted=true`;
}

export function isFirstLesson(): boolean {
  const currentModuleID = getCookie('__iw_lesson_iwid');
  return currentModuleID?.includes('chapter01-module01-lesson01') || false;
}
