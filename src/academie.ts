import { manageModuleTOC } from '$utils/manage-custom-element';
import { getDeviceType, updateModuleLecture } from '$utils/manage-user-data';

window.Webflow ||= [];
window.Webflow.push(() => {
  manageModuleTOC();
  updateModuleLecture();
  getDeviceType();
  //manageFUPEWWTrackingData();

  //getMemberEmailOnLoad();
});
