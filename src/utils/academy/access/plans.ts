export async function getCurrentPlan() {
  const urlParams = new URLSearchParams(window.location.search);
  const planID = urlParams.get('add-plan');

  if (planID) {
    sessionStorage.setItem('ms_price', planID);
  }
}
