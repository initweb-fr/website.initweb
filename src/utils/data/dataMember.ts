export function getMemberstackUserInfo() {
  // Get the Memberstack token from localStorage

  const memberstackToken = localStorage.getItem('_ms-mem');

  if (!memberstackToken) {
    // eslint-disable-next-line no-console
    console.log('No Memberstack token found. User might not be logged in.');
    return null;
  }

  try {
    // Convertir la chaîne JSON en objet JavaScript
    const userData = JSON.parse(memberstackToken);
    //console.log(userData);

    // Extraire les informations souhaitées
    const { id } = userData; // Changement ici
    const { email } = userData.auth; // Changement ici
    const firstName = userData.customFields['first-name'];

    // Retourner un objet avec les informations extraites
    return { id, email, firstName };
  } catch (error) {
    console.error("Erreur lors de l'analyse du JSON :", error);
    return null;
  }
}

export async function getMemberstackMember() {
  // Initialize Memberstack
  const memberstack = window.$memberstackDom;

  // Check if the user is logged in
  return memberstack
    .getCurrentMember()
    .then(({ data: member }) => {
      if (member) {
        return { member };
      }
      return null;
    })
    .catch((error) => {
      console.error('Error getting current member:', error);
      return null;
    });
}

export async function tryGetMemberData() {
  const memberInfo = await getMemberstackMember();
  //console.log(memberInfo.member);
  return memberInfo;
}
