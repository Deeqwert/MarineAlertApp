import { ApiConstants } from "../../utils";

function loginAction(email, password, googleToken, firstName, lastName, idToken, navigation) {
  const action = {
    type: ApiConstants.constants.API_LOGIN_LOAD,
    email: email,
    password: password,
    googleToken: googleToken,
    firstName: firstName,
    lastName: lastName,
    idToken:idToken,
    navigation: navigation
  };
  return action;
}

function registerAction(
  firstName,
  lastName,
  phoneNo,
  email,
  password,
  navigation
) {
  const action = {
    type: ApiConstants.constants.API_REGISTER_LOAD,
    firstName: firstName,
    lastName: lastName,
    phoneNo: phoneNo,
    email: email,
    password: password,
    navigation: navigation
  };
  return action;
}

function forgotPasswordAction(email, navigation) {
  const action = {
    type: ApiConstants.constants.API_FORGOT_LOAD,
    email: email,
    navigation: navigation
  };
  return action;
}

function resendEmail(email, navigation) {
  const action = {
    type: ApiConstants.constants.API_RESEND_EMAIL_LOAD,
    email: email,
    navigation: navigation
  };
  return action;
}

function updateProfileAction(firstName, lastName, phone, image, address, navigation) {
  const action = {
    type: ApiConstants.constants.API_UPDATE_PROFILE_LOAD,
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    image: image,
    address: address,
    navigation: navigation
  };
  return action;
}

function getNotificationList(navigation) {
  const action = {
    type: ApiConstants.constants.API_NOTIFICATION_LIST_LOAD,
    navigation: navigation
  }
  return action
}

function settingsDetailAction(settingsDetail) {
  const action = {
    type: ApiConstants.constants.SETTINGS_DETAIL,
    settingsDetail: settingsDetail
  };
  return action;
}

function changePassword(oldPassword, newPassword, navigation) {
  const action = {
    type: ApiConstants.constants.API_CHANGE_PASSWORD_LOAD,
    oldPassword: oldPassword,
    newPassword: newPassword,
    navigation: navigation
  };
  return action;
}

function logout(navigation) {
  const action = {
    type: ApiConstants.constants.API_LOGOUT_LOAD,
    navigation: navigation
  };
  return action;
}

module.exports = {
  loginAction,
  registerAction,
  resendEmail,
  updateProfileAction,
  forgotPasswordAction,
  getNotificationList,
  settingsDetailAction,
  changePassword,
  logout
};
