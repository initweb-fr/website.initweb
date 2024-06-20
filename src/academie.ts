import { manageModuleTOC } from '$utils/manageCustomElement';
import { getMemberEmailOnLoad, updateModuleLecture } from '$utils/manageUserData';

window.Webflow ||= [];
window.Webflow.push(() => {
  manageModuleTOC();
  updateModuleLecture();

  //getMemberEmailOnLoad();
});
