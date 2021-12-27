import { put, call } from "redux-saga/effects";
import { FetchApi } from "../../components";
import { ApiConstants } from "../../utils";

export function* mapDataApiSaga(action) {
    try {
        const result = yield call(FetchApi.mapData);
        // console.log("mapData------->" + JSON.stringify(result))
        if (result.result.data) {
            yield put({
                type: ApiConstants.constants.API_MAP_DATA_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            setTimeout(() => {
                alert(result.result.message);
            }, 500);
            yield put({
                type: ApiConstants.constants.API_MAP_DATA_FAIL,
                result: result.result,
            });
        }
    } catch (error) {
        setTimeout(() => {
            alert(error.result);
        }, 500);
        yield put({
            type: ApiConstants.constants.API_MAP_DATA_ERROR,
            result: error.result
        });
    }
}

export function* reportIncidentApiSaga(action) {
    try {
        const result = yield call(
            FetchApi.reportIncident,
            action.title,
            action.description,
            action.latitude,
            action.longitude,
            action.images,
            action.tags,
            action.contactNumber
        );
        // console.log("report Incident------->" + JSON.stringify(result))
        if (result.result.status == true) {
            setTimeout(() => {
                alert(result.result.message);
            }, 500);
            yield put({
                type: ApiConstants.constants.API_REPORT_INCIDENT_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            setTimeout(() => {
                alert(result.result.message);
            }, 500);
            yield put({
                type: ApiConstants.constants.API_REPORT_INCIDENT_FAIL,
                result: result.result,
            });
        }
    } catch (error) {
        yield put({
            type: ApiConstants.constants.API_REPORT_INCIDENT_ERROR,
            result: error.result
        });
    }
}

export function* getAllIncidentsApiSaga(action) {
    try {
        const result = yield call(
            FetchApi.getAllIncidents,
            action.latitude,
            action.longitude,
            action.fromDate,
            action.toDate,
            action.radius
        );
        // console.log("get all incident ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            try {
                const result = yield call(
                    FetchApi.getMissingObjects,
                    action.latitude,
                    action.longitude,
                    action.fromDate,
                    action.toDate,
                    action.radius
                );
                // console.log("get missing objects ------->" + JSON.stringify(result))
                if (result.result.status == true) {
                    yield put({
                        type: ApiConstants.constants.API_GET_MISSING_OBJECT_SUCCESS,
                        result: result.result,
                        navigation: action.navigation
                    });
                } else {
                    // alert(result.result.message)
                    yield put({
                        type: ApiConstants.constants.API_GET_MISSING_OBJECT_FAIL,
                        result: result.result,
                        navigation: action.navigation
                    });
                }
            } catch (error) {
                yield put({
                    type: ApiConstants.constants.API_GET_MISSING_OBJECT_ERROR,
                    result: error.result
                });
            }
            yield put({
                type: ApiConstants.constants.API_GET_ALL_INCIDENT_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            try {
                const result = yield call(
                    FetchApi.getMissingObjects,
                    action.latitude,
                    action.longitude,
                    action.fromDate,
                    action.toDate,
                    action.radius
                );
                // console.log("get missing objects ------->" + JSON.stringify(result))
                if (result.result.status == true) {
                    yield put({
                        type: ApiConstants.constants.API_GET_MISSING_OBJECT_SUCCESS,
                        result: result.result,
                        navigation: action.navigation
                    });
                } else {
                    alert(result.result.message)
                    yield put({
                        type: ApiConstants.constants.API_GET_MISSING_OBJECT_FAIL,
                        result: result.result,
                        navigation: action.navigation
                    });
                }
            } catch (error) {
                yield put({
                    type: ApiConstants.constants.API_GET_MISSING_OBJECT_ERROR,
                    result: error.result
                });
            }
            // alert(result.result.message)
            yield put({
                type: ApiConstants.constants.API_GET_ALL_INCIDENT_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        yield put({
            type: ApiConstants.constants.API_GET_ALL_INCIDENT_ERROR,
            result: error.result
        });
    }
}

export function* getIncidentsApiSaga(action) {
    try {
        const result = yield call(FetchApi.getIncidents);
        // console.log("get Incidents ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_GET_INCIDENT_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            yield put({
                type: ApiConstants.constants.API_GET_INCIDENT_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        setTimeout(() => {
            alert(error.result);
        }, 500);
        yield put({
            type: ApiConstants.constants.API_GET_INCIDENT_ERROR,
            result: error.result
        });
    }
}

export function* getIncidentDetailApiSaga(action) {
    try {
        const result = yield call(FetchApi.getIncidentDetail, action.incidentId);
        // console.log("get Incident Detail ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_GET_INCIDENT_DETAIL_SUCCESS,
                result: result.result,
                incidentId: action.incidentId,
                province: action.province,
                navigation: action.navigation
            });
        } else {
            yield put({
                type: ApiConstants.constants.API_GET_INCIDENT_DETAIL_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        setTimeout(() => {
            alert(error.result);
        }, 500);
        yield put({
            type: ApiConstants.constants.API_GET_INCIDENT_DETAIL_ERROR,
            result: error.result
        });
    }
}

export function* sendSOSApiSaga(action) {
    try {
        const result = yield call(
            FetchApi.sendSOS,
            action.latitude,
            action.longitude,
            action.contactNumber
        );
        console.log("send SOS ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            setTimeout(() => {
                alert(result.result.message);
            }, 500);
            yield put({
                type: ApiConstants.constants.API_SEND_SOS_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            setTimeout(() => {
                alert(result.result.message);
            }, 500);
            yield put({
                type: ApiConstants.constants.API_SEND_SOS_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        setTimeout(() => {
            alert(error.result);
        }, 500);
        yield put({
            type: ApiConstants.constants.API_SEND_SOS_ERROR,
            result: error.result
        });
    }
}

export function* getRelatedIncidentsApiSaga(action) {
    try {
        const result = yield call(
            FetchApi.getRelatedIncidents,
            action.incidentId
        );
        // console.log("get related Incidents ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_GET_RELATED_INCIDENT_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            yield put({
                type: ApiConstants.constants.API_GET_RELATED_INCIDENT_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        yield put({
            type: ApiConstants.constants.API_GET_RELATED_INCIDENT_ERROR,
            result: error.result
        });
    }
}

export function* getMissingObjectsApiSaga(action) {
    try {
        const result = yield call(
            FetchApi.getMissingObjects,
            action.latitude,
            action.longitude,
            action.fromDate,
            action.toDate,
            action.radius
        );
        // console.log("get missing objects ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_GET_MISSING_OBJECT_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            alert(result.result.message)
            yield put({
                type: ApiConstants.constants.API_GET_MISSING_OBJECT_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        yield put({
            type: ApiConstants.constants.API_GET_MISSING_OBJECT_ERROR,
            result: error.result
        });
    }
}

export function* getProcedureReadingApiSaga(action) {
    try {
        const result = yield call(FetchApi.getProcedureReading,);
        // console.log("get procedure reading ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_PROCEDURE_READING_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            yield put({
                type: ApiConstants.constants.API_PROCEDURE_READING_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        yield put({
            type: ApiConstants.constants.API_PROCEDURE_READING_ERROR,
            result: error.result
        });
    }
}

export function* getAdminEmailApiSaga(action) {
    try {
        const result = yield call(FetchApi.getAdminEmail,);
        // console.log("get admin email ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_ADMIN_EMAIL_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            yield put({
                type: ApiConstants.constants.API_ADMIN_EMAIL_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        yield put({
            type: ApiConstants.constants.API_ADMIN_EMAIL_ERROR,
            result: error.result
        });
    }
}

export function* saveLocationApiSaga(action) {
    try {
        const result = yield call(
            FetchApi.saveLocation,
            action.latitude,
            action.longitude
        );
        // console.log("save location ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_SAVE_LOCATION_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            yield put({
                type: ApiConstants.constants.API_SAVE_LOCATION_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        yield put({
            type: ApiConstants.constants.API_SAVE_LOCATION_ERROR,
            result: error.result
        });
    }
}

export function* emergencyContactsApiSaga(action) {
    try {
        const result = yield call(FetchApi.emergencyContacts);
        // console.log("emergency contacts ------->" + JSON.stringify(result))
        if (result.result.status == true) {
            yield put({
                type: ApiConstants.constants.API_EMERGENCY_CONTACTS_SUCCESS,
                result: result.result,
                navigation: action.navigation
            });
        } else {
            alert(result.result.message)
            yield put({
                type: ApiConstants.constants.API_EMERGENCY_CONTACTS_FAIL,
                result: result.result,
                navigation: action.navigation
            });
        }
    } catch (error) {
        setTimeout(() => {
            alert(error.result);
        }, 500);
        yield put({
            type: ApiConstants.constants.API_EMERGENCY_CONTACTS_ERROR,
            result: error.result
        });
    }
}


