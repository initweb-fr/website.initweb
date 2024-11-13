// Fonction pour obtenir les informations de l'utilisateur de Memberstack
export function getMemberstackUserInfo() {
  // Récupérer le token Memberstack depuis le localStorage
  const memberstackToken = localStorage.getItem('_ms-mem');

  // Vérifier si le token n'existe pas
  if (!memberstackToken) {
    // Afficher un message dans la console si aucun token n'est trouvé
    console.log('No Memberstack token found. User might not be logged in.');
    return null; // Retourner null si l'utilisateur n'est pas connecté
  }

  try {
    // Convertir la chaîne JSON en objet JavaScript
    const userData = JSON.parse(memberstackToken);

    // Extraire les informations souhaitées de l'objet userData
    const { id } = userData; // Extraire l'identifiant de l'utilisateur
    const { email } = userData.auth; // Extraire l'email de l'utilisateur
    const firstName = userData.customFields['first-name']; // Extraire le prénom de l'utilisateur

    // Retourner un objet contenant les informations extraites
    return { id, email, firstName };
  } catch (error) {
    // Afficher une erreur dans la console si la conversion JSON échoue
    console.error("Erreur lors de l'analyse du JSON :", error);
    return null; // Retourner null en cas d'erreur
  }
}

// Fonction asynchrone pour obtenir le membre actuel de Memberstack
export async function getMemberstackMember() {
  // Initialiser Memberstack à partir de l'objet global window
  const memberstack = window.$memberstackDom;

  // Vérifier si l'utilisateur est connecté
  return memberstack
    .getCurrentMember()
    .then(({ data: member }) => {
      // Si un membre est trouvé, le retourner
      if (member) {
        return { member };
      }
      // Retourner null si aucun membre n'est trouvé
      return null;
    })
    .catch((error) => {
      // Afficher une erreur dans la console si la récupération échoue
      console.error('Error getting current member:', error);
      return null; // Retourner null en cas d'erreur
    });
}

// Fonction asynchrone pour essayer d'obtenir les données du membre
export async function tryGetMemberData() {
  // Appeler la fonction pour obtenir les informations du membre
  const memberInfo = await getMemberstackMember();
  // Retourner les informations du membre
  return memberInfo;
}

export function getMemberstackData() {
  return new Promise((resolve, reject) => {
    // Vérifiez si Memberstack est chargé
    if (typeof Memberstack !== 'undefined') {
      Memberstack.onReady().then(() => {
        const memberData = Memberstack.getCurrentMember();
        if (memberData) {
          resolve(memberData);
        } else {
          reject('Aucun membre trouvé');
        }
      });
    } else {
      reject("Memberstack n'est pas chargé");
    }
  });
}
