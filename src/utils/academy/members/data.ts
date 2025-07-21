import { supabase } from '$utils/academy/supabase/config';

// ===============================
// Fonctions Memberstack
// ===============================

/**
 * Récupère le membre connecté depuis Memberstack
 * @returns Données membre Memberstack ou null
 */
export async function getCurrentMemberMS() {
  const memberstack = window.$memberstackDom;
  if (!memberstack) return null;
  const member = await memberstack.getCurrentMember();
  if (!member || !member.data) return null;
  return member;
}

// ===============================
// Fonctions Supabase
// ===============================

/**
 * Récupère les données du membre dans Supabase via son Memberstack ID
 * @param memberMSID - ID du membre dans Memberstack
 * @returns Données membre Supabase ou null
 */
export async function getCurrentMemberSB(memberMSID: string) {
  if (typeof window === 'undefined') return null;

  if (memberMSID) {
    // Récupérer les infos du membre dans Supabase
    const { data: member, error } = await supabase
      .from('members')
      .select('*')
      .eq('member_msid', memberMSID)
      .single();

    if (error) {
      console.error('❌ Erreur lors de la récupération du membre Supabase:', error);
      return null;
    }
    if (member) {
      return member;
    }
    return null;
  }
  return null;
}

// ===============================
// Fonction combinée
// ===============================

/**
 * Récupère les données complètes du membre (Memberstack + Supabase)
 * @returns Données membre combinées ou null
 */
export async function getMemberData() {
  try {
    const memberMS = await getCurrentMemberMS();
    if (!memberMS?.data?.id) {
      console.log('❌ Aucun membre connecté');
      return null;
    }

    const memberSB = await getCurrentMemberSB(memberMS.data.id);

    return {
      memberstack: memberMS,
      supabase: memberSB,
    };
  } catch (error) {
    console.error('❌ Erreur récupération membre:', error);
    return null;
  }
}
