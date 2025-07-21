/**
 * 🎨 Interface utilisateur - Utilitaires
 *
 * Gère l'apparence des éléments de progression sur la page.
 * Marque les leçons complétées, calcule les statistiques et gère les interactions.
 */

// ===============================
// INTERFACE UTILISATEUR - utils.ts
// ===============================
//
// RÔLE : Change l'apparence des éléments sur la page
//
// COMMENT ÇA MARCHE :
// 1. Marque les leçons déjà faites (cochées)
// 2. Calcule et affiche les statistiques (ex: 5/10)
// 3. Gère les loaders (petits indicateurs de chargement)
// 4. Écoute les clics sur les boutons/checkboxes
//
// ÉLÉMENTS HTML UTILISÉS :
// - [iw-progress-target] : ID de la leçon
// - [iw-progress-watched] : true/false (faite ou pas)
// - [iw-progress-trigger] : bouton ou checkbox
// ===============================

// ===============================
// MARQUAGE DES LEÇONS
// ===============================

/**
 * Marque les leçons déjà faites comme cochées
 * @param lessonIds - Liste des IDs des leçons faites
 */
export function markCompletedLessons(lessonIds: string[]) {
  // On ne log plus chaque étape, juste l'action globale si besoin
  // console.log('🎯 Marquage des leçons:', lessonIds);

  lessonIds.forEach((id: string) => {
    // Trouver tous les éléments avec cet ID de leçon
    const elements = document.querySelectorAll(`[iw-progress-target="${id}"]`);
    elements.forEach((el) => {
      el.setAttribute('iw-progress-watched', 'true');
    });
  });
}

// ===============================
// CALCUL DES STATISTIQUES
// ===============================

/**
 * Compte combien de leçons sont faites
 * @returns {total, completed, percentage} - Les statistiques
 */

export function getProgressStats(completedCount: number) {
  const triggers = document.querySelectorAll('[iw-progress-trigger]');
  const total = triggers.length;

  return {
    total,
    completed: completedCount,
    percentage: total > 0 ? Math.round((completedCount / total) * 100) : 0,
  };
}

/**
 * Affiche les statistiques dans la console
 * @param stats - Les statistiques à afficher
 */
export function logProgress(stats: { completed: number; total: number; percentage: number }) {
  // On garde un seul log utile pour la progression globale
  console.log(`📊 Progression: ${stats.completed}/${stats.total} (${stats.percentage}%)`);
}

// ===============================
// GESTION DES LOADERS
// ===============================

/**
 * Affiche un loader sur un élément
 * @param element - L'élément à loader
 * @param lessonId - L'ID de la leçon
 */
export function showLoader(element: Element, lessonId: string) {
  // Marquer l'élément comme en cours de chargement
  element.setAttribute('iw-progress-trigger-loader', 'true');

  // Si c'est un bouton, loader aussi les checkboxes associées
  if (element.getAttribute('iw-progress-trigger') === 'button') {
    document
      .querySelectorAll(`[iw-progress-trigger="checkbox"][iw-progress-target="${lessonId}"]`)
      .forEach((el) => el.setAttribute('iw-progress-trigger-loader', 'true'));
  }
}

/**
 * Cache le loader sur un élément
 * @param element - L'élément à déloader
 * @param lessonId - L'ID de la leçon
 */
export function hideLoader(element: Element, lessonId: string) {
  // Marquer l'élément comme plus en cours de chargement
  element.setAttribute('iw-progress-trigger-loader', 'false');

  // Si c'est un bouton, déloader aussi les checkboxes associées
  if (element.getAttribute('iw-progress-trigger') === 'button') {
    document
      .querySelectorAll(`[iw-progress-trigger="checkbox"][iw-progress-target="${lessonId}"]`)
      .forEach((el) => el.setAttribute('iw-progress-trigger-loader', 'false'));
  }
}

// ===============================
// MISE À JOUR DE L'APPARENCE
// ===============================

/**
 * Change l'apparence d'une leçon (cochée/décochée)
 * @param lessonId - L'ID de la leçon
 * @param isCompleted - true = cochée, false = décochée
 */
export function updateLessonState(lessonId: string, isCompleted: boolean) {
  // Trouver tous les éléments avec cet ID et changer leur apparence
  document
    .querySelectorAll(`[iw-progress-target="${lessonId}"]`)
    .forEach((el) => el.setAttribute('iw-progress-watched', isCompleted ? 'true' : 'false'));
}

// ===============================
// ÉCOUTE DES CLICS
// ===============================

/**
 * Écoute les clics sur tous les éléments de progression
 * @param memberId - L'ID du membre connecté
 * @param onProgressClick - La fonction à appeler quand on clique
 */
export function setupClickListeners(
  memberId: string,
  onProgressClick: (element: Element, memberId: string) => Promise<void>
) {
  // Trouver tous les éléments cliquables
  document.querySelectorAll('[iw-progress-trigger]').forEach((element) => {
    // Ajouter un écouteur de clic
    element.addEventListener('click', async function (this: Element) {
      // Appeler la fonction de gestion du clic
      await onProgressClick(this, memberId);
    });
  });
}
