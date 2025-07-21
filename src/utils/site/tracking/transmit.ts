import { getFunnelDatas } from '$utils/global/tracking/utils';

export function sendFunnelDatasToAcademy() {
  const funnelDatas = getFunnelDatas();

  const links = document.querySelectorAll('a[href*="/log/"]');

  links.forEach((link) => {
    const url = new URL(link.getAttribute('href') || '');
    Object.entries(funnelDatas).forEach(([key, value]) => {
      if (value && typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (subValue) url.searchParams.set(subKey, String(subValue));
        });
      } else if (value) {
        url.searchParams.set(key, String(value));
      }
    });
    //console.log('url', url);
    link.setAttribute('href', url.toString());
  });
}
