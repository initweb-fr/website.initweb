import {
  manageChapterTOC,
  manageGlobalTOC,
  manageGlobalTOC_mobile,
  manageSubChapterTOC,
  showProgression,
  surveyProgression,
} from '$utils/manage-custom-element';
import { getDeviceType, saveModuleSeen, updateModuleLecture } from '$utils/manage-user-data';

window.Webflow ||= [];
window.Webflow.push(() => {
  getDeviceType();
});

window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsnest',
  (listInstances) => {
    manageGlobalTOC();
    manageChapterTOC();
    manageSubChapterTOC();

    const breakpoint = window.matchMedia('(max-width: 991px)');
    function checkBreakpoint(e) {
      if (e.matches) {
        // Execute the function if the condition is met
        manageGlobalTOC_mobile();
      }
    }

    // Initial check
    checkBreakpoint(breakpoint);
    // Add a listener for changes in the viewport size
    breakpoint.addListener(checkBreakpoint);
  },
]);
if (window.$memberstackReady) {
  // Run the code immediately if Memberstack is already ready
  async function loadMemberstackRelated() {
    await updateModuleLecture();
    setTimeout(showProgression, 1000);
    surveyProgression();
    saveModuleSeen();
  }
  loadMemberstackRelated();
} else {
  // Wait for Memberstack to be ready if it's not already
  document.addEventListener('memberstack.ready', function (event) {
    async function loadMemberstackRelated() {
      await updateModuleLecture();
      setTimeout(showProgression, 1000);
      surveyProgression();
      saveModuleSeen();
    }
    loadMemberstackRelated();
  });
}
