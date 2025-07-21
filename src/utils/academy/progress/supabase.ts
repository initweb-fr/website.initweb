/**
 * 🗄️ Sauvegarde des données - Supabase
 *
 * Gère la sauvegarde et récupération des données de progression.
 * Source de vérité pour les leçons complétées par les membres.
 */

import { getMemberData } from '../members/data';

/**
 * Récupère les infos du membre connecté
 * @returns Les données du membre ou null si pas connecté
 */
export async function getMember() {
  return await getMemberData();
}

/**
 * Sauvegarde ou supprime une progression
 * @param memberId - L'ID du membre
 * @param lessonId - L'ID de la leçon
 * @param isCompleted - true = marquer comme faite, false = marquer comme pas faite
 * @returns true si succès, false sinon
 */
export async function saveProgress(memberId: string, lessonId: string, isCompleted = true) {
  try {
    const { supabase } = await import('$utils/academy/supabase/config');

    if (isCompleted) {
      const { error } = await supabase.from('course_progress').upsert(
        {
          member_sbid: memberId,
          lesson_id: lessonId,
          completed_at: new Date().toISOString(),
        },
        {
          onConflict: 'member_sbid,lesson_id',
        }
      );
      if (error) {
        console.error('❌ Erreur sauvegarde:', error);
        return false;
      }
    } else {
      const { error } = await supabase
        .from('course_progress')
        .delete()
        .eq('member_sbid', memberId)
        .eq('lesson_id', lessonId);

      if (error) {
        console.error('❌ Erreur suppression:', error);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('❌ Erreur générale:', error);
    return false;
  }
}

/**
 * Récupère la liste des leçons déjà faites par memberSBID
 * @param memberSBID - L'ID Supabase du membre (UUID)
 * @returns {lessons, count}
 */
export async function getCompletedLessonsBySBID(memberSBID: string) {
  const { supabase } = await import('$utils/academy/supabase/config');

  const { data, error } = await supabase
    .from('course_progress')
    .select('lesson_id, completed_at, lesson:lesson_id(*)')
    .eq('member_sbid', memberSBID);

  if (error) {
    console.error('❌ Erreur lors de la récupération des leçons complétées:', error);
    return { lessons: [], count: 0 };
  }

  return {
    lessons: data || [],
    count: data ? data.length : 0,
  };
}
