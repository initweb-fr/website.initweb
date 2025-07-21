import { saveFunnelDatas } from '$utils/global/tracking/utils';
import {
  hasFunnelDataBeenTransmitted,
  markFunnelDataAsTransmitted,
} from '$utils/global/tracking/utils';

import { sendFunnelDatasToWebhook } from './transmit';

export function saveFunnelDatasAcademy() {
  // Si l'URL ne contient pas /bienvenue, on ne fait rien et on sort de la fonction
  if (!window.location.pathname.includes('/bienvenue')) {
    saveFunnelDatas();
  }
}

export async function initFunnelDatasTransmission() {
  // Si l'URL contient /bienvenue, on exécute la fonction
  if (window.location.pathname.includes('/bienvenue')) {
    // Vérification si les données ont déjà été envoyées
    if (hasFunnelDataBeenTransmitted()) {
      console.log('Statut du Tracking -Source- : Préalablement envoyé. ---> Fin.');
      return;
    }
    console.log('Statut du Tracking -Source- : Inexistant ---> Envoi des données');

    // Envoi des données
    await sendFunnelDatasToWebhook();

    // Marquage comme envoyé
    markFunnelDataAsTransmitted();
    console.log('Données envoyées & Cookie créé.');
  }
}
