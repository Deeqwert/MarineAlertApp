import { put, call } from "redux-saga/effects";
import { FetchApi } from "../../components";
import { ApiConstants } from "../../utils";
import { Alert } from "react-native";

export function* loginApiSaga(action) {
  try {
    const result = yield call(
      FetchApi.login,
      action.email,
      action.password,
      action.googleToken,
      action.firstName,
      action.lastName,
      action.idToken
    );
    // console.log("login------->" + JSON.stringify(result))
    if (result.result.status == true) {
      yield put({
        type: ApiConstants.constants.API_LOGIN_SUCCESS,
        result: result.result,
        navigation: action.navigation
      });
    } else {
      if (result.result.verified == false) {

      } else {
        setTimeout(() => {
          alert(result.result.message);
        }, 500);
      }
      yield put({
        type: ApiConstants.constants.API_LOGIN_FAIL,
        result: result.result,
      });
    }
  } catch (error) {
    setTimeout(() => {
      alert(error.result);
    }, 500);
    yield put({
      type: ApiConstants.constants.API_LOGIN_ERROR,
      result: error.result
    });
  }
}

export function* registerApiSaga(action) {
  try {
    const result = yield call(
      FetchApi.register,
      action.firstName,
      action.lastName,
      action.phoneNo,
      action.email,
      action.password
    );
    // console.log("register------->" + JSON.stringify(result))
    if (result.result.status == true) {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({
        type: ApiConstants.constants.API_REGISTER_SUCCESS,
        result: result.result,
        navigation: action.navigation
      });
    } else {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({ type: ApiConstants.constants.API_REGISTER_FAIL, result: result.result.message ? result.result.message : result.result.error, });
    }
  } catch (error) {
    yield put({
      type: ApiConstants.constants.API_REGISTER_ERROR,
      error: error,
      result: error.result,
      status: error.status
    });
  }
}

export function* forgotPasswordApiSaga(action) {
  try {
    const result = yield call(FetchApi.forgot, action.email);
    // console.log("forgot password------->" + JSON.stringify(result))
    if (result.result.status == true) {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({
        type: ApiConstants.constants.API_FORGOT_SUCCESS,
        result: result.result,
        navigation: action.navigation
      });
    } else {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({ type: ApiConstants.constants.API_FORGOT_FAIL, result: result.result.message ? result.result.message : result.result.error, });
    }
  } catch (error) {
    setTimeout(() => {
      alert(error.result)
    }, 500);
    yield put({
      type: ApiConstants.constants.API_FORGOT_ERROR,
      error: error,
      result: error.result,
      status: error.status
    });
  }
}

export function* resendEmailApiSaga(action) {
  try {
    const result = yield call(FetchApi.resendEmail, action.email);
    // console.log("resend email------->" + JSON.stringify(result))
    if (result.result.status == true) {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({
        type: ApiConstants.constants.API_RESEND_EMAIL_SUCCESS,
        result: result.result,
        navigation: action.navigation
      });
    } else {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({ type: ApiConstants.constants.API_RESEND_EMAIL_FAIL, result: result.result.message ? result.result.message : result.result.error, });
    }
  } catch (error) {
    setTimeout(() => {
      alert(error.result)
    }, 500);
    yield put({
      type: ApiConstants.constants.API_RESEND_EMAIL_ERROR,
      error: error,
      result: error.result,
      status: error.status
    });
  }
}

export function* updateProfileApiSaga(action) {
  try {
    const result = yield call(
      FetchApi.updateProfile,
      action.firstName,
      action.lastName,
      action.phone,
      action.image,
      action.address
    );
    if (result.result.status == true) {
      yield put({
        type: ApiConstants.constants.API_UPDATE_PROFILE_SUCCESS,
        result: result.result,
        navigation: action.navigation
      });
      setTimeout(() => {
        alert(result.result.message);
      }, 500);
    } else {
      yield put({ type: ApiConstants.constants.API_UPDATE_PROFILE_FAIL });
      setTimeout(() => {
        alert(result.result.message);
      }, 500);
    }
  } catch (error) {
    yield put({
      type: ApiConstants.constants.API_UPDATE_PROFILE_ERROR,
      error: error,
      status: error.status
    });
    setTimeout(() => {
      alert(error.result);
    }, 500);
  }
}

export function* changePasswordApiSaga(action) {
  try {
    const result = yield call(FetchApi.changePassword, action.oldPassword, action.newPassword);
    // console.log("change password------->" + JSON.stringify(result))
    if (result.result.status == true) {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({
        type: ApiConstants.constants.API_CHANGE_PASSWORD_SUCCESS,
        result: result,
        navigation: action.navigation
      });
    } else {
      setTimeout(() => {
        alert(result.result.message)
      }, 500);
      yield put({ type: ApiConstants.constants.API_CHANGE_PASSWORD_FAIL, result: result.result.message ? result.result.message : result.result.error, });
    }
  } catch (error) {
    setTimeout(() => {
      alert(error.result)
    }, 500);
    yield put({
      type: ApiConstants.constants.API_CHANGE_PASSWORD_ERROR,
      error: error,
      result: error.result,
      status: error.status
    });
  }
}


export function* getNotificationListApiSaga(action) {
  try {
    const result = yield call(FetchApi.notificationList);
    // console.log("get notifications ------->" + JSON.stringify(result))
    if (result.result.status == true) {
      yield put({
        type: ApiConstants.constants.API_NOTIFICATION_LIST_SUCCESS,
        result: result.result,
        navigation: action.navigation
      });
    } else {
      yield put({
        type: ApiConstants.constants.API_NOTIFICATION_LIST_FAIL,
        result: result.result.message ? result.result.message : result.result.error,
        navigation: action.navigation
      });
    }
  } catch (error) {
    setTimeout(() => {
      alert(error.result)
    }, 500);
    yield put({
      type: ApiConstants.constants.API_NOTIFICATION_LIST_ERROR,
      result: error.result
    });
  }
}

export function* logoutApiSaga(action) {
  try {
    const result = yield call(FetchApi.logout);
    // console.log("logout ------->" + JSON.stringify(result))
    if (result.result.status == true) {
      yield put({
        type: ApiConstants.constants.API_LOGOUT_SUCCESS,
        result: result.result,
        navigation: action.navigation
      });
    } else {
      yield put({
        type: ApiConstants.constants.API_LOGOUT_FAIL,
        result: result.result.message ? result.result.message : result.result.error,
        navigation: action.navigation
      });
    }
  } catch (error) {
    yield put({
      type: ApiConstants.constants.API_LOGOUT_ERROR,
      result: error.result,
      navigation: action.navigation
    });
  }
}
