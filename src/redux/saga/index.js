import { takeEvery } from 'redux-saga/effects';
import { ApiConstants } from './../../utils';
import {
    loginApiSaga,
    registerApiSaga,
    updateProfileApiSaga,
    forgotPasswordApiSaga,
    resendEmailApiSaga,
    changePasswordApiSaga,
    getNotificationListApiSaga,
    logoutApiSaga
} from './AuthenticationSaga';
import {
    mapDataApiSaga,
    reportIncidentApiSaga,
    getAllIncidentsApiSaga,
    getIncidentsApiSaga,
    getIncidentDetailApiSaga,
    sendSOSApiSaga,
    getRelatedIncidentsApiSaga,
    getMissingObjectsApiSaga,
    getProcedureReadingApiSaga,
    getAdminEmailApiSaga,
    saveLocationApiSaga,
    emergencyContactsApiSaga
} from './ApplicationSaga';
export default function* root_saga() {
    yield takeEvery(ApiConstants.constants.API_LOGIN_LOAD, loginApiSaga)
    yield takeEvery(ApiConstants.constants.API_REGISTER_LOAD, registerApiSaga)
    yield takeEvery(ApiConstants.constants.API_FORGOT_LOAD, forgotPasswordApiSaga)
    yield takeEvery(ApiConstants.constants.API_RESEND_EMAIL_LOAD, resendEmailApiSaga)
    yield takeEvery(ApiConstants.constants.API_UPDATE_PROFILE_LOAD, updateProfileApiSaga)
    yield takeEvery(ApiConstants.constants.API_CHANGE_PASSWORD_LOAD, changePasswordApiSaga)
    yield takeEvery(ApiConstants.constants.API_NOTIFICATION_LIST_LOAD, getNotificationListApiSaga)
    yield takeEvery(ApiConstants.constants.API_LOGOUT_LOAD, logoutApiSaga)

    yield takeEvery(ApiConstants.constants.API_MAP_DATA_LOAD, mapDataApiSaga)
    yield takeEvery(ApiConstants.constants.API_REPORT_INCIDENT_LOAD, reportIncidentApiSaga)
    yield takeEvery(ApiConstants.constants.API_GET_ALL_INCIDENT_LOAD, getAllIncidentsApiSaga)
    yield takeEvery(ApiConstants.constants.API_GET_INCIDENT_LOAD, getIncidentsApiSaga)
    yield takeEvery(ApiConstants.constants.API_GET_INCIDENT_DETAIL_LOAD, getIncidentDetailApiSaga)
    yield takeEvery(ApiConstants.constants.API_SEND_SOS_LOAD, sendSOSApiSaga)
    yield takeEvery(ApiConstants.constants.API_GET_RELATED_INCIDENT_LOAD, getRelatedIncidentsApiSaga)
    yield takeEvery(ApiConstants.constants.API_GET_MISSING_OBJECT_LOAD, getMissingObjectsApiSaga)
    yield takeEvery(ApiConstants.constants.API_PROCEDURE_READING_LOAD, getProcedureReadingApiSaga)
    yield takeEvery(ApiConstants.constants.API_ADMIN_EMAIL_LOAD, getAdminEmailApiSaga)
    yield takeEvery(ApiConstants.constants.API_SAVE_LOCATION_LOAD, saveLocationApiSaga)
    yield takeEvery(ApiConstants.constants.API_EMERGENCY_CONTACTS_LOAD, emergencyContactsApiSaga)
}