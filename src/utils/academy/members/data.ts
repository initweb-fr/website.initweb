// ===============================
// Fonctions Memberstack
// ===============================

/**
 * Récupère le membre connecté depuis Memberstack
 * @returns Données membre Memberstack ou null
 */
export async function getMemberDatas() {
  const memberstack = window.$memberstackDom as any;
  if (!memberstack) return null;
  const member = await memberstack.getCurrentMember();
  const memberJSONRaw = await memberstack.getMemberJSON();
  const memberJSONData = memberJSONRaw.data;
  if (!member || !member.data) return null;
  return { memberDATAS: member.data, memberJSON: memberJSONData };
}
