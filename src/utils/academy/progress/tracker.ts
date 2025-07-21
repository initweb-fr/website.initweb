/**
 * 🎯 Tracker de progression - Orchestrateur principal
 *
 * Gère les clics sur les leçons et coordonne la sauvegarde.
 * Orchestre l'interaction entre l'interface et la base de données.
 */

// ===============================
// TRACKER DE PROGRESSION - tracker.ts
// ===============================
//
// RÔLE : Gère les clics sur les leçons et sauvegarde la progression
//
// COMMENT ÇA MARCHE :
// 1. Quand l'utilisateur clique sur une leçon
// 2. On change l'apparence (cochée/décochée)
// 3. On sauvegarde dans la base de données
//
// FICHIERS UTILISÉS :
// - supabase.ts : Pour sauvegarder les données
// - utils.ts : Pour changer l'apparence des éléments
// ===============================

import { getMemberData } from '../members/data';
import { updateMemberstackProgression } from './memberstack';
import { getCompletedLessonsBySBID, saveProgress } from './supabase';
import {
  getProgressStats,
  hideLoader,
  logProgress,
  markCompletedLessons,
  setupClickListeners,
  showLoader,
  updateLessonState,
} from './utils';

// ===============================
// FONCTIONS UTILITAIRES
// ===============================

function trackLastLessons(courseIWID: string) {
  const currentLessonURL = window.location.pathname;
  const currentLessonIWID = localStorage.getItem(`__iw_currentlesson_iwid`);
  localStorage.setItem(`__iw_${courseIWID}_lastlessonurl`, currentLessonURL || '');
  localStorage.setItem(`__iw_${courseIWID}_lastlessoniwid`, currentLessonIWID || '');
  return;
}

/**
 * Génère le JSON de progression à partir des leçons complétées
 * @param completedLessons - Liste des leçons complétées
 * @param courseIWID - ID de la formation
 * @returns Le JSON de progression
 */
function generateProgressionJSON(completedLessons: any[], courseIWID: string, stats: any) {
  // On tente de retrouver l'URL de la leçon dans le DOM (si présent)
  const lastLessonIWID = localStorage.getItem(`__iw_${courseIWID}_lastlessoniwid`);
  const lastLessonURL = localStorage.getItem(`__iw_${courseIWID}_lastlessonurl`);
  const courseStats = stats;

  const lessonCompleted: Record<string, any> = {};
  completedLessons.forEach((completion) => {
    const lessonIWID = completion.lesson['xx-item-iwid'];
    const lessonTitle = completion.lesson.title;
    const lessonCompletedAt = completion.completed_at;
    if (lessonIWID && lessonCompletedAt) {
      lessonCompleted[lessonIWID] = {
        title: lessonTitle,
        completedAt: lessonCompletedAt,
      };
    }
  });

  return {
    [courseIWID || 'unknown']: {
      lastLessonURL: lastLessonURL,
      lastLessonIWID: lastLessonIWID,
      courseStats: courseStats,
      lessonCompleted: lessonCompleted,
    },
  };
}

// ===============================
// DÉMARRAGE DU SYSTÈME
// ===============================

/**
 * Démarre le système de progression
 * Appelé au chargement de la page
 */
export async function initProgressTracking() {
  try {
    // 1. Récupérer les infos du membre connecté
    const member = await getMemberData();
    const memberMSID = member?.memberstack?.data?.id;
    const memberSBID = member?.supabase?.id;

    if (!memberMSID) {
      console.log('❌ Aucun membre MS connecté');
      return;
    }

    // Vérifier qu'on a un memberSBID pour la sauvegarde
    if (!memberSBID) {
      return;
    }

    const courseIWID = localStorage.getItem('__iw_currentlesson_course-iwid');
    trackLastLessons(courseIWID || '');

    // Récupérer le contenu du champ "progression" dans Memberstack
    const memberMS = member?.memberstack;
    const memberMSCustomFields = (memberMS?.data as { customFields?: { progression?: unknown } })
      ?.customFields;

    // 2. Utiliser memberSBID pour récupérer les leçons complétées
    const completedLessonsData = await getCompletedLessonsBySBID(memberSBID);

    // Extraire les leçons et le count depuis la structure retournée
    const completedLessons = completedLessonsData.lessons || [];
    const completedCount = completedLessonsData.count || 0;

    // Calcul du pourcentage de complétion
    const stats = getProgressStats(completedCount);

    // 3. Générer le JSON de progression
    const progressionJSON = generateProgressionJSON(
      completedLessons,
      courseIWID || 'unknown',
      stats
    );

    // 4. Marquer les leçons déjà faites (depuis la base de données)
    // Utiliser lesson_id pour marquer les éléments dans le DOM
    const lessonIWIDs = completedLessons
      .filter((lesson) => lesson.lesson_id)
      .map((lesson) => lesson.lesson_id);

    markCompletedLessons(lessonIWIDs);

    // 5. Afficher les statistiques (ex: 5/10 leçons faites)
    logProgress(stats);

    // 6. Écouter les clics sur les leçons (utiliser memberSBID)
    setupClickListeners(memberSBID, handleClick);

    // Log final pour indiquer que le système est prêt
    console.log('✅ Système de progression démarré');
  } catch (error) {
    console.error('❌ Erreur au démarrage:', error);
  }
}

// ===============================
// GESTION DES CLICS
// ===============================

/**
 * Appelé quand l'utilisateur clique sur une leçon
 * @param element - L'élément cliqué (bouton ou checkbox)
 * @param memberId - L'ID du membre connecté
 */
async function handleClick(element: Element, memberId: string) {
  // Récupérer l'ID de la leçon depuis l'élément cliqué
  const lessonId = element.getAttribute('iw-progress-target');
  const isWatched = element.getAttribute('iw-progress-watched') === 'true';

  if (!lessonId) return;

  // Afficher un loader (petit indicateur de chargement)
  showLoader(element, lessonId);

  try {
    // Inverser l'état : si c'était fait, maintenant c'est pas fait, et vice versa
    const isCompleted = !isWatched;

    // 1. Changer l'apparence immédiatement (pour que l'utilisateur voie le changement)
    updateLessonState(lessonId, isCompleted);

    // 2. Sauvegarder dans la base de données
    const success = await saveProgress(memberId, lessonId, isCompleted);

    if (success) {
      // 3. Mettre à jour Memberstack avec la nouvelle progression
      const courseIWID = localStorage.getItem('__iw_currentlesson_course-iwid');
      const updatedLessonsData = await getCompletedLessonsBySBID(memberId);
      const updatedLessons = updatedLessonsData.lessons || [];
      const updatedStats = getProgressStats(updatedLessons.length);
      const newProgressionJSON = generateProgressionJSON(
        updatedLessons,
        courseIWID || 'unknown',
        updatedStats
      );

      const memberstackSuccess = await updateMemberstackProgression(newProgressionJSON);
      if (!memberstackSuccess) {
        console.warn('⚠️ Échec synchronisation Memberstack');
      }
    } else {
      // Si la sauvegarde échoue, on remet l'apparence comme avant
      updateLessonState(lessonId, !isCompleted);
      console.error('❌ Erreur de sauvegarde');
    }
  } finally {
    // Cacher le loader
    hideLoader(element, lessonId);
  }
}
