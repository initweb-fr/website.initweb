import { manageModuleTOC } from '$utils/manageCustomElement';
import { getDeviceType, updateModuleLecture } from '$utils/manageuserdata';

window.Webflow ||= [];
window.Webflow.push(() => {
  manageModuleTOC();
  updateModuleLecture();
  getDeviceType();
  //manageFUPEWWTrackingData();

  //getMemberEmailOnLoad();
});
