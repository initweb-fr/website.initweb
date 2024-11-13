// Importation des fonctions nécessaires depuis différents modules
import { revealHeader, revealHomeHero, revealHubContent } from '$utils/animate/animateReveal';
import { getMemberstackMember } from '$utils/data/dataMember';
import {} from '$utils/data/dataMemberProgression';
import {
  saveModuleSeen,
  surveyProgression,
  updateModuleLecture,
} from '$utils/data/dataMemberProgression';
import { getFunnelTrackingData, sendFunnelTrackingData } from '$utils/data/dataMemberSource';
import {
  addUserData,
  manageUTM,
  saveCurrentPreviousPage,
  saveUserData,
} from '$utils/data/dataUser';
import { getUserDevice } from '$utils/data/dataUser';
import { displayJoinAccess } from '$utils/display/displayJoinAccess';
import { showProgression } from '$utils/display/displayMemberProgression';
import { manageNewsBanner } from '$utils/display/displaySiteBanners';
import { manageDropdowns } from '$utils/display/displaySiteDropdowns';
import { toggleFixedModal } from '$utils/display/displaySiteModales';
import { addCurrentPageToNav } from '$utils/display/displaySiteNav';
import {
  manageChapterTOC,
  manageGlobalTOC,
  manageGlobalTOC_mobile,
  manageSubChapterTOC,
} from '$utils/display/displaySiteTOC';
import { SplideFormaProgramA, SplideFormaSituationA } from '$utils/sliders/slidersFormation';
import { instaHideGoogleAuth } from '$utils/special/specialOnInstagram';

// Déclaration globale pour étendre l'objet Window avec des propriétés spécifiques
declare global {
  interface Window {
    $memberstackReady?: boolean; // Indicateur de disponibilité de Memberstack
    fsAttributes: any[]; // Attributs personnalisés pour le CMS
    $memberstackDom: any; // DOM spécifique à Memberstack
  }
}
import memberstackDOM from '@memberstack/dom';
const Memberstack = memberstackDOM.init({
  publicKey: 'pk_7bec2a466afe0ea73e61',
});

import { getMemberstackData } from '$utils/data/dataMember';
// Initialisation de Webflow si non déjà fait
window.Webflow ||= [];
window.Webflow.push(() => {
  // ------------------------------------------------------------------------------------------------------------------------
  // - Fonctions globales

  // Appel des fonctions globales pour initialiser l'état de la page
  getUserDevice(); // Récupère le type d'appareil de l'utilisateur
  addCurrentPageToNav(); // Ajoute la page actuelle à la navigation
  manageNewsBanner(); // Gère l'affichage de la bannière d'actualités
  saveCurrentPreviousPage(); // Sauvegarde la page actuelle et la précédente
  revealHeader(); // Affiche l'en-tête
  revealHubContent(); // Affiche le contenu du hub
  manageUTM(); // Gère les paramètres UTM
  saveUserData(); // Sauvegarde les données utilisateur
  addUserData(); // Ajoute des données utilisateur
  toggleFixedModal(); // Active/désactive la modal fixe
  instaHideGoogleAuth(); // Masque le bouton Google Auth sur Instagram
  revealHomeHero(); // Affiche le héros de la page d'accueil
  manageDropdowns(); // Gère les menus déroulants
  displayJoinAccess(); // Affiche l'accès à l'inscription

  // ------------------------------------------------------------------------------------------------------------------------
  // - Fonctions spécifiques selon la typologie page

  // Fonction pour charger les fonctionnalités spécifiques aux cours
  function loadCoursesFunctions() {
    getFunnelTrackingData(); // Récupère les données de suivi du tunnel
    SplideFormaSituationA(); // Initialise le slider pour la situation A
    SplideFormaProgramA(); // Initialise le slider pour le programme A
  }
  // Vérifie si l'URL contient '/formations' mais pas '/rejoindre'
  if (
    window.location.pathname.includes('/formations') &&
    !window.location.pathname.includes('/rejoindre')
  ) {
    loadCoursesFunctions(); // Charge les fonctions des cours
  }
  // Ajoutez cette fonction pour déclencher getMemberstackData lorsque Memberstack est chargé

  // Fonction asynchrone pour charger les données lorsque le membre est connecté
  async function loadWhenMemberLoggedIn() {
    const memberData = await getMemberstackMember(); // Récupère les données du membre
    if (memberData) {
      console.log(memberData); // Affiche les données du membre dans la console
      if (window.location.pathname.includes('/academie')) {
        await updateModuleLecture(); // Met à jour la lecture du module
        setTimeout(showProgression, 1000); // Affiche la progression après un délai
        surveyProgression(); // Enquête sur la progression
        await saveModuleSeen(); // Sauvegarde le module vu
        if (window.location.pathname.includes('/bienvenue')) {
          await sendFunnelTrackingData(); // Envoie les données de suivi du tunnel
        }
      }
    }
  }
  loadWhenMemberLoggedIn(); // Appelle la fonction pour charger les données du membre

  /**
  // Ancien code pour vérifier si l'URL contient '/academie'
  if (window.location.pathname.includes('/academie')) {
    if (window.$memberstackReady) {
      console.log('test');
      loadWhenMemberLoggedIn();
    } else {
      document.addEventListener('memberstack.ready', loadWhenMemberLoggedIn);
    }
  }
    */

  // ------------------------------------------------------------------------------------------------------------------------
  // - Chargement de l'attribut de CMS Nest

  // Initialisation et chargement des attributs CMS Nest
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsnest',
    () => {
      manageGlobalTOC(); // Gère le TOC global
      manageChapterTOC(); // Gère le TOC des chapitres
      manageSubChapterTOC(); // Gère le TOC des sous-chapitres
      manageGlobalTOC_mobile(); // Gère le TOC global pour mobile
    },
  ]);
});

// Remplacement de l'utilisation de await par une promesse
Memberstack.onReady().then(() => {
  getMemberstackData()
    .then((data) => {
      console.log('Données du membre récupérées :', data);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des données du membre :', error);
    });
});
