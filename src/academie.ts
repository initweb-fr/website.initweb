import { surveyProgression } from '$utils/data/dataMemberProgression';
import { saveModuleSeen, updateModuleLecture } from '$utils/data/dataMemberProgression';
import { sendFunnelTrackingData } from '$utils/data/dataMemberSource';
import { getUserDevice } from '$utils/data/dataUser';
import { showProgression } from '$utils/display/displayMemberProgression';
import {
  manageChapterTOC,
  manageGlobalTOC,
  manageGlobalTOC_mobile,
  manageSubChapterTOC,
} from '$utils/display/displaySiteTOC';

// INITIALISATION

declare global {
  interface Window {
    $memberstackReady?: boolean;
    fsAttributes: any[];
    $memberstackDom: any;
  }
}

// Au Chargement de Webflow
window.Webflow ||= [];
window.Webflow.push(() => {
  getUserDevice();
});

// Au Chargement de Memberstack
if (window.$memberstackReady) {
  loadMemberstackRelated();
} else {
  // Wait for Memberstack to be ready if it's not already
  document.addEventListener('memberstack.ready', function () {
    loadMemberstackRelated();
  });
}
// Au Chargement des Attributes de Finsweet
window.fsAttributes = window.fsAttributes || [];
window.fsAttributes.push([
  'cmsnest',
  () => {
    manageGlobalTOC();
    manageChapterTOC();
    manageSubChapterTOC();

    const breakpoint = window.matchMedia('(max-width: 991px)');
    function checkBreakpoint(e: MediaQueryListEvent) {
      if (e.matches) {
        // Execute the function if the condition is met
        manageGlobalTOC_mobile();
      }
    }

    // Initial check
    checkBreakpoint(breakpoint as unknown as MediaQueryListEvent);
    // Add a listener for changes in the viewport size
    breakpoint.addListener(checkBreakpoint);
  },
]);

// ------------------------------------------------------------------------------------------------------------------------

async function loadMemberstackRelated() {
  await updateModuleLecture();
  setTimeout(showProgression, 1000);
  surveyProgression();
  saveModuleSeen();
  await sendFunnelTrackingData();
}
