import { manageModuleTOC } from '$utils/manageCustomElement';
import { updateModuleLecture } from '$utils/manageuserdata';

window.Webflow ||= [];
window.Webflow.push(() => {
  manageModuleTOC();
  updateModuleLecture();
});
