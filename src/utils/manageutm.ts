export function manageutm() {
  // Récupération de l'URL
  const url = new URL(location.href);

  // Récupération des UTMs
  const utm_campaign = url.searchParams.get('utm_campaign');
  const utm_source = url.searchParams.get('utm_source');
  const utm_medium = url.searchParams.get('utm_medium');
  const utm_term = url.searchParams.get('utm_term');

  // Insertion des UTMs dans les champs du formulaire
  ///// UTM Campaign
  const campaignFields = document.querySelectorAll('[field="utm_campaign"]');
  campaignFields.forEach((campaignField) => {
    //console.log('[FORM] - Param "Campaign" trouvé et ajouté.');
    campaignField.value = utm_campaign;
  });
  ///// UTM Source
  const sourceFields = document.querySelectorAll('[field="utm_source"]');
  sourceFields.forEach((sourceField) => {
    //console.log('[FORM] - Param "Source" trouvé et ajouté.');
    sourceField.value = utm_source;
  });
  ///// UTM Medium
  const mediumFields = document.querySelectorAll('[field="utm_medium"]');
  mediumFields.forEach((mediumField) => {
    //console.log('[FORM] - Param "Medium" trouvé et ajouté.');
    mediumField.value = utm_medium;
  });
  ///// UTM Term
  const termFields = document.querySelectorAll('[field="utm_term"]');
  termFields.forEach((termField) => {
    //console.log('[FORM] - Param "Term" trouvé et ajouté.');
    termField.value = utm_term;
  });
}
