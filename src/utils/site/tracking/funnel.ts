import { getFunnelDatas, saveFunnelDatas } from '$utils/global/tracking/utils';

import { sendFunnelDatasToAcademy } from './transmit';

export function saveFunnelDatasSite() {
  saveFunnelDatas();
}

export async function initFunnelDatasTransmission() {
  const funnelDatas = getFunnelDatas();
  console.log('funnelDatas', funnelDatas);

  //Envoi des données du Funnel à l'académie
  sendFunnelDatasToAcademy();
}
