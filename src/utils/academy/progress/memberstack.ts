/**
 * 🔄 Synchronisation Memberstack
 *
 * Gère la mise à jour du champ progression dans Memberstack.
 * Synchronise les données de progression avec le système Memberstack.
 */

// ===============================
// SYNCHRONISATION MEMBERSTACK - memberstack.ts
// ===============================
//
// RÔLE : Met à jour le champ progression dans Memberstack
//
// COMMENT ÇA MARCHE :
// 1. Récupère le membre connecté
// 2. Met à jour le champ customFields.progression
// 3. Gère les erreurs de synchronisation
// ===============================

/**
 * Met à jour le champ progression dans Memberstack
 * @param progressionJSON - Le JSON de progression à sauvegarder
 * @returns true si ça a marché, false sinon
 */
export async function updateMemberstackProgression(progressionJSON: any) {
  try {
    const memberstack = window.$memberstackDom;
    if (!memberstack) {
      console.error('❌ Memberstack non disponible');
      return false;
    }

    const currentMember = await memberstack.getCurrentMember();
    if (!currentMember?.data?.id) {
      console.error('❌ Aucun membre connecté');
      return false;
    }

    // On ne log plus la progression à chaque mise à jour

    // Mettre à jour le champ customFields.progression
    const { error } = await (memberstack as any).updateMember({
      customFields: {
        progression: progressionJSON,
      },
    });

    if (error) {
      console.error('❌ Erreur mise à jour Memberstack:', error);
      return false;
    }

    // Succès silencieux (pas de console.log)
    return true;
  } catch (error) {
    console.error('❌ Erreur générale mise à jour Memberstack:', error);
    return false;
  }
}
