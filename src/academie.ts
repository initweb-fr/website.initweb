import { manageModuleTOC } from '$utils/manageCustomElement';
import { getDeviceType, updateModuleLecture } from '$utils/manageUserData';

window.Webflow ||= [];
window.Webflow.push(() => {
  manageModuleTOC();
  updateModuleLecture();
  getDeviceType();
  //manageFUPEWWTrackingData();

  //getMemberEmailOnLoad();
});
