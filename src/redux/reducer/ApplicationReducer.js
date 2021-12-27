import { ApiConstants } from "../../utils";
import I18n from '../../translations/localeConfig';
import { CommonFunctions } from '../../utils'
import { DataManager } from "./../../components";

const initialState = {
    navigation: null,
    language: null,
    mapData: [],
    onLoad: false,
    incidentList: [],
    allIncidentList: [],
    incidentDetail: null,
    relatedIncidentList: [],
    missingObjectsList: [],
    procedureReadingList: [],
    emergencyContactList: [],
    sosResult: null
};

function application(state = initialState, action) {
    switch (action.type) {

        ////////////// get map data ////////////////

        case ApiConstants.constants.API_MAP_DATA_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_MAP_DATA_SUCCESS:
            state.mapData = CommonFunctions.addMapData(action.result.data);
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_MAP_DATA_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_MAP_DATA_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// report incident ////////////////

        case ApiConstants.constants.API_REPORT_INCIDENT_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_REPORT_INCIDENT_SUCCESS:
            return {
                ...state,
                onLoad: false,
                navigation: action.navigation.goBack()
            };

        case ApiConstants.constants.API_REPORT_INCIDENT_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_REPORT_INCIDENT_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// get all incidents ////////////////

        case ApiConstants.constants.API_GET_ALL_INCIDENT_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_GET_ALL_INCIDENT_SUCCESS:
            return {
                ...state,
                onLoad: false,
                allIncidentList: action.result.data,
            };

        case ApiConstants.constants.API_GET_ALL_INCIDENT_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_GET_ALL_INCIDENT_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// get incidents ////////////////

        case ApiConstants.constants.API_GET_INCIDENT_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_GET_INCIDENT_SUCCESS:
            return {
                ...state,
                onLoad: false,
                incidentList: action.result.data,
                navigation: action.navigation.navigate('ReportIncidents')
            };

        case ApiConstants.constants.API_GET_INCIDENT_FAIL:
            return {
                ...state,
                onLoad: false,
                navigation: action.navigation.navigate('ReportIncidents')
            };

        case ApiConstants.constants.API_GET_INCIDENT_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// get incident detail ////////////////

        case ApiConstants.constants.API_GET_INCIDENT_DETAIL_LOAD:
            return { ...state, onLoad: true, incidentDetail: null, relatedIncidentList: [] };

        case ApiConstants.constants.API_GET_INCIDENT_DETAIL_SUCCESS:
            return {
                ...state,
                onLoad: false,
                incidentDetail: action.result.data,
            };

        case ApiConstants.constants.API_GET_INCIDENT_DETAIL_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_GET_INCIDENT_DETAIL_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// send SOS ////////////////

        case ApiConstants.constants.API_SEND_SOS_LOAD:
            return { ...state, onLoad: true, sosResult: null };

        case ApiConstants.constants.API_SEND_SOS_SUCCESS:
            return {
                ...state,
                sosResult: action.result,
                onLoad: false,
            };

        case ApiConstants.constants.API_SEND_SOS_FAIL:
            return {
                ...state,
                sosResult: action.result,
                onLoad: false,
            };

        case ApiConstants.constants.API_SEND_SOS_ERROR:
            return {
                ...state,
                sosResult: action.result,
                onLoad: false,
            };

        ////////////// get related incidents ////////////////

        case ApiConstants.constants.API_GET_RELATED_INCIDENT_LOAD:
            return { ...state };

        case ApiConstants.constants.API_GET_RELATED_INCIDENT_SUCCESS:
            return {
                ...state,
                onLoad: false,
                relatedIncidentList: action.result.data,
            };

        case ApiConstants.constants.API_GET_RELATED_INCIDENT_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_GET_RELATED_INCIDENT_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// get missing objects ////////////////

        case ApiConstants.constants.API_GET_MISSING_OBJECT_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_GET_MISSING_OBJECT_SUCCESS:
            return {
                ...state,
                onLoad: false,
                missingObjectsList: action.result.data,
            };

        case ApiConstants.constants.API_GET_MISSING_OBJECT_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_GET_MISSING_OBJECT_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// get procedure reading ////////////////

        case ApiConstants.constants.API_PROCEDURE_READING_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_PROCEDURE_READING_SUCCESS:
            return {
                ...state,
                onLoad: false,
                procedureReadingList: action.result.data,
                navigation: action.navigation.navigate('ProcedureReading')
            };

        case ApiConstants.constants.API_PROCEDURE_READING_FAIL:
            return {
                ...state,
                onLoad: false,
                navigation: action.navigation.navigate('ProcedureReading')
            };

        case ApiConstants.constants.API_PROCEDURE_READING_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// get admin email ////////////////

        case ApiConstants.constants.API_ADMIN_EMAIL_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_ADMIN_EMAIL_SUCCESS:
            DataManager.setAdminEmail(action.result);
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_ADMIN_EMAIL_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_ADMIN_EMAIL_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// save location ////////////////

        case ApiConstants.constants.API_SAVE_LOCATION_LOAD:
            return { ...state };

        case ApiConstants.constants.API_SAVE_LOCATION_SUCCESS:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_SAVE_LOCATION_FAIL:
            return {
                ...state,
                onLoad: false,
            };

        case ApiConstants.constants.API_SAVE_LOCATION_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// emergency contacts ////////////////

        case ApiConstants.constants.API_EMERGENCY_CONTACTS_LOAD:
            return { ...state, onLoad: true };

        case ApiConstants.constants.API_EMERGENCY_CONTACTS_SUCCESS:
            state.emergencyContactList = CommonFunctions.parseEmergencyContacts(action.result.data);
            return {
                ...state,
                onLoad: false,
                navigation: action.navigation.navigate('EmergencyContacts')
            };

        case ApiConstants.constants.API_EMERGENCY_CONTACTS_FAIL:
            return {
                ...state,
                onLoad: false,
                navigation: action.navigation.navigate('EmergencyContacts')
            };

        case ApiConstants.constants.API_EMERGENCY_CONTACTS_ERROR:
            return {
                ...state,
                onLoad: false,
            };

        ////////////// change language ////////////////

        case ApiConstants.constants.CHANGE_LANGUAGE:
            I18n.locale = action.language;
            return {
                ...state,
                language: action.language
            };

        default:
            return state;
    }
}

export default application;
