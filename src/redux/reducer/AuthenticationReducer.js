import { ApiConstants } from "../../utils";
import { DataManager, FetchApi } from "./../../components";

const initialState = {
  onLoad: false,
  apiResult: null,
  navigation: null,
  currentUserDetails: "",
  settingsDetail: "",
  notificationList: [],

};

function authentication(state = initialState, action) {
  switch (action.type) {

    ////////////// login user ////////////////

    case ApiConstants.constants.API_LOGIN_LOAD:
      return { ...state, onLoad: true, apiResult: null };

    case ApiConstants.constants.API_LOGIN_SUCCESS:
      DataManager.setUserDetails(action.result.data);
      FetchApi.setAccessToken(action.result.data.token);
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: action.navigation.navigate("HomePageStack")
      };

    case ApiConstants.constants.API_LOGIN_FAIL:
      return {
        ...state,
        apiResult: action.result,
        onLoad: false,
        navigation: null
      };

    case ApiConstants.constants.API_LOGIN_ERROR:
      return {
        ...state,
        apiResult: action.result,
        onLoad: false,
        navigation: null
      };


    ////////////// register user ////////////////

    case ApiConstants.constants.API_REGISTER_LOAD:
      return { ...state, onLoad: true, apiResult: null };

    case ApiConstants.constants.API_REGISTER_SUCCESS:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result.result,
        navigation: action.navigation.goBack()
      };

    case ApiConstants.constants.API_REGISTER_FAIL:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: null
      };

    case ApiConstants.constants.API_REGISTER_ERROR:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: null
      };

    ////////////// update profile ////////////////

    case ApiConstants.constants.API_UPDATE_PROFILE_LOAD:
      return { ...state, onLoad: true, apiResult: null };

    case ApiConstants.constants.API_UPDATE_PROFILE_SUCCESS:
      DataManager.getUserDetails().then(response => {
        if (response !== null) {
          let result = JSON.parse(response);
          result.first_name = action.result.data.first_name;
          result.last_name = action.result.data.last_name;
          result.contact_number = action.result.data.contact_number;
          result.address = action.result.data.address;
          result.profile_image = action.result.data.profile_image;
          DataManager.setUserDetails(result);
        }
      });

      return {
        ...state,
        onLoad: false,
        navigation: action.navigation.goBack()
      };

    case ApiConstants.constants.API_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        onLoad: false
      };

    case ApiConstants.constants.API_UPDATE_PROFILE_ERROR:
      return {
        ...state,
        onLoad: false
      };

    ////////////// forgot password ////////////////

    case ApiConstants.constants.API_FORGOT_LOAD:
      return { ...state, onLoad: true, apiResult: null };

    case ApiConstants.constants.API_FORGOT_SUCCESS:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: action.navigation.goBack()
      };

    case ApiConstants.constants.API_FORGOT_FAIL:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: null
      };

    case ApiConstants.constants.API_FORGOT_ERROR:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: null
      };

    ////////////// resend email ////////////////

    case ApiConstants.constants.API_RESEND_EMAIL_LOAD:
      return { ...state, onLoad: true, apiResult: null };

    case ApiConstants.constants.API_RESEND_EMAIL_SUCCESS:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: null
      };

    case ApiConstants.constants.API_RESEND_EMAIL_FAIL:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: null
      };

    case ApiConstants.constants.API_RESEND_EMAIL_ERROR:
      return {
        ...state,
        onLoad: false,
        apiResult: action.result,
        navigation: null
      };

    ////////////// change password ////////////////

    case ApiConstants.constants.API_CHANGE_PASSWORD_LOAD:
      return { ...state, onLoad: true, apiResult: null };

    case ApiConstants.constants.API_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        onLoad: false,
        navigation: action.navigation.goBack()
      };

    case ApiConstants.constants.API_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        onLoad: false,
        navigation: null
      };

    case ApiConstants.constants.API_CHANGE_PASSWORD_ERROR:
      return {
        ...state,
        onLoad: false,
        navigation: null
      };

    ////////////// notification ////////////////

    case ApiConstants.constants.API_NOTIFICATION_LIST_LOAD:
      return {
        ...state,
        onLoad: true,
      };

    case ApiConstants.constants.API_NOTIFICATION_LIST_SUCCESS:
      return {
        ...state,
        onLoad: false,
        notificationList: action.result.data,
        navigation: action.navigation.navigate('Notifications')
      };

    case ApiConstants.constants.API_NOTIFICATION_LIST_FAIL:
      return {
        ...state,
        onLoad: false,
        navigation: action.navigation.navigate('Notifications')
      };

    case ApiConstants.constants.API_NOTIFICATION_LIST_ERROR:
      return {
        ...state,
        onLoad: false,
      };

    ////////////// logout ////////////////

    case ApiConstants.constants.API_LOGOUT_LOAD:
      return {
        ...state,
        onLoad: true,
      };

    case ApiConstants.constants.API_LOGOUT_SUCCESS:
      DataManager.clearData();
      return {
        ...state,
        onLoad: false,
        navigation: action.navigation.navigate('Login')
      };

    case ApiConstants.constants.API_LOGOUT_FAIL:
      DataManager.clearData();
      return {
        ...state,
        onLoad: false,
        navigation: action.navigation.navigate('Login')
      };

    case ApiConstants.constants.API_LOGOUT_ERROR:
      DataManager.clearData();
      return {
        ...state,
        onLoad: false,
        navigation: action.navigation.navigate('Login')
      };

    /////////////////////////////////////////

    case ApiConstants.constants.USER_DETAILS:
      return {
        ...state,
        currentUserDetails: action.userDetails
      };

    case ApiConstants.constants.SETTINGS_DETAIL:
      return {
        ...state,
        settingsDetail: action.settingsDetail
      };

    case ApiConstants.constants.CLEAR_AUTHENTICATION_ACTION_DATA:
      return {
        ...state,
        apiResult: null,
        navigation: null,
        currentUserDetails: "",
        settingsDetail: "",
        notificationList: []

      };
    default:
      return state;
  }
}

export default authentication;
