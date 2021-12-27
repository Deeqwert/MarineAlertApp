import { ApiConstants } from "../../utils";

function changeLanguage(language) {
  const action = {
    type: ApiConstants.constants.CHANGE_LANGUAGE,
    language: language,
  };
  return action;
}

function getMapData(navigation) {
  const action = {
    type: ApiConstants.constants.API_MAP_DATA_LOAD,
    navigation: navigation,
  };
  return action;
}

function reportIncident(title, description, latitude, longitude, images, tags,contactNumber,navigation) {
  const action = {
    type: ApiConstants.constants.API_REPORT_INCIDENT_LOAD,
    title: title,
    description: description,
    latitude: latitude,
    longitude: longitude,
    images: images,
    tags: tags,
    contactNumber:contactNumber,
    navigation: navigation,
  };
  return action;
}

function getAllIncidents(latitude, longitude, fromDate, toDate, radius, navigation) {
  const action = {
    type: ApiConstants.constants.API_GET_ALL_INCIDENT_LOAD,
    latitude: latitude,
    longitude: longitude,
    fromDate: fromDate,
    toDate: toDate,
    radius: radius,
    navigation: navigation,
  };
  return action;
}

function getIncidents(navigation) {
  const action = {
    type: ApiConstants.constants.API_GET_INCIDENT_LOAD,
    navigation: navigation,
  };
  return action;
}

function getIncidentDetail(incidentId, province, navigation) {
  const action = {
    type: ApiConstants.constants.API_GET_INCIDENT_DETAIL_LOAD,
    incidentId: incidentId,
    province: province,
    navigation: navigation,
  };
  return action;
}

function sendSOS(latitude, longitude, contactNumber,navigation) {
  const action = {
    type: ApiConstants.constants.API_SEND_SOS_LOAD,
    latitude: latitude,
    longitude: longitude,
    contactNumber:contactNumber,
    navigation: navigation,
  };
  return action;
}

function getRelatedIncidents(incidentId, navigation) {
  const action = {
    type: ApiConstants.constants.API_GET_RELATED_INCIDENT_LOAD,
    incidentId: incidentId,
    navigation: navigation,
  };
  return action;
}

function getMissingObject(latitude, longitude, fromDate, toDate, radius, navigation) {
  const action = {
    type: ApiConstants.constants.API_GET_MISSING_OBJECT_LOAD,
    latitude: latitude,
    longitude: longitude,
    fromDate: fromDate,
    toDate: toDate,
    radius: radius,
    navigation: navigation,
  };
  return action;
}

function getProcedureReading(navigation) {
  const action = {
    type: ApiConstants.constants.API_PROCEDURE_READING_LOAD,
    navigation: navigation,
  };
  return action;
}

function getAdminEmail(navigation) {
  const action = {
    type: ApiConstants.constants.API_ADMIN_EMAIL_LOAD,
    navigation: navigation,
  };
  return action;
}

function saveLocation(latitude, longitude, navigation) {
  const action = {
    type: ApiConstants.constants.API_SAVE_LOCATION_LOAD,
    latitude: latitude,
    longitude: longitude,
    navigation: navigation,
  };
  return action;
}

function emergencyContacts(navigation) {
  const action = {
    type: ApiConstants.constants.API_EMERGENCY_CONTACTS_LOAD,
    navigation: navigation,
  };
  return action;
}

module.exports = {
  changeLanguage,
  getMapData,
  reportIncident,
  getAllIncidents,
  getIncidents,
  getIncidentDetail,
  sendSOS,
  getRelatedIncidents,
  getMissingObject,
  getProcedureReading,
  getAdminEmail,
  saveLocation,
  emergencyContacts
};
