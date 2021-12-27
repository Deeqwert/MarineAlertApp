import { Platform } from "react-native";
// const baseUrl = "https://rudraserver.com/maritime-alert/wp-json/wp/v2/";

const baseUrl = "https://satamp.net/wp-json/wp/v2/";
let accessToken = "",
  device_token = "",
  connectionState = { "isConnected": true, "type": "wifi" };

const Fetch = {
  checkInternetConnection(connectionState) {
    connectionState = connectionState
  },
  //method to set token
  setAccessToken(token) {
    accessToken = token;
  },
  setDeviceToken(token) {
    device_token = token;
  },

  // Method to call login api
  login(email, password, googleToken, firstName, lastName, idToken) {
    var body = {
      "email": email,
      "password": password,
      "googletoken": googleToken,
      "first_name": firstName,
      "last_name": lastName,
      "device_type": Platform.OS === "ios" ? "ios" : "android",
      "firebase_token": device_token,
      "id_token":idToken
    }
    var url = baseUrl + "users/login";
    return Method.dataPost(body, url, true);
  },

  // Method to call register api
  register(firstName, lastName, phoneNo, email, password,) {
    var body = {
      "first_name": firstName,
      "last_name": lastName,
      "contact_number": phoneNo,
      "email": email,
      "password": password,
      "device_type": Platform.OS === "ios" ? "ios" : "android",
      "firebase_token": device_token
    }
    var url = baseUrl + "users/register";
    return Method.dataPost(body, url, true);
  },

  // Method to call forgot password api
  forgot(email) {
    var body = {
      "email": email
    }
    var url = baseUrl + "users/forgotpwd";
    return Method.dataPost(body, url, true);
  },

  changePassword(oldPassword, newPassword) {
    var body = {
      "old_password": oldPassword,
      "password": newPassword
    }
    var url = baseUrl + "users/change-password";
    return Method.dataPost(body, url, true);
  },

  resendEmail(email) {
    var body = {
      "email": email
    }
    var url = baseUrl + "users/resend-verification-email";
    return Method.dataPost(body, url, true);
  },

  notificationList() {
    var url = baseUrl + "users/notifications";
    return Method.dataGet(url);
  },

  // Method to call update profile api
  updateProfile(firstName, lastName, phone, image, address) {
    let body = new FormData();
    body.append("first_name", firstName);
    body.append("last_name", lastName);
    body.append("contact_number", phone);
    body.append("address", address);
    if (image) {
      body.append("image", {
        "uri": image.uri,
        "type": image.type,
        "name": Platform.OS == 'android' ? image.fileName : "abc"
      });
    }

    var url = baseUrl + "users/update-profile";
    return Method.dataPost(body, url);
  },

  mapData() {
    var url = baseUrl + "province";
    return Method.dataGet(url);
  },

  // Method to call update profile api
  reportIncident(title, description, latitude, longitude, images, tags,contactNumber) {
    let body = new FormData();
    body.append("title", title);
    body.append("description", description);
    body.append("latitude", latitude);
    body.append("longitude", longitude);
    body.append("contact_number", contactNumber);
    if (images.length > 0) {
      images.map((item, index) => {
        body.append("images[" + index + "]", {
          "uri": item.uri,
          "type": item.type,
          "name": Platform.OS == 'android' ? item.fileName : "abc"
        });
      })
    }
    if (tags.length > 0) {
      var tag = ""
      tags.map((item, index) => {
        if (index == tags.length - 1) {
          tag = tag + "" + item.tag
        } else {
          tag = tag + "" + item.tag + ","
        }
      })
      body.append("tags", tag);
    }

    var url = baseUrl + "users/incident";
    return Method.dataPost(body, url);
  },

  getAllIncidents(latitude, longitude, fromDate, toDate, radius) {
    var url = baseUrl + "incident" +
      "?latitude=" + latitude +
      "&longitude=" + longitude +
      (fromDate ? "&from_date=" + fromDate : "") +
      (toDate ? "&to_date=" + toDate : "") +
      (radius ? "&radius=" + radius : "&radius=5");
    return Method.dataGet(url);
  },

  getIncidents() {
    var url = baseUrl + "users/incident";
    return Method.dataGet(url);
  },

  getIncidentDetail(incidentId) {
    var url = baseUrl + "incident/" + incidentId;
    return Method.dataGet(url);
  },

  sendSOS(latitude, longitude,contactNumber) {
    var body = {
      "latitude": latitude,
      "longitude": longitude,
      "contact_number":contactNumber
    }
    var url = baseUrl + "users/sos-alert";
    return Method.dataPost(body, url, true);
  },

  getRelatedIncidents(incidentId) {
    var url = baseUrl + "related-incident/" + incidentId;
    return Method.dataGet(url);
  },

  getMissingObjects(latitude, longitude, fromDate, toDate, radius) {
    var url = baseUrl + "missing-person-vessels" +
      "?latitude=" + latitude +
      "&longitude=" + longitude +
      (fromDate ? "&from_date=" + fromDate : "") +
      (toDate ? "&to_date=" + toDate : "") +
      (radius ? "&radius=" + radius : "&radius=5");
    return Method.dataGet(url);
  },

  getProcedureReading() {
    var url = baseUrl + "procedure-reading";
    return Method.dataGet(url);
  },

  getAdminEmail() {
    var url = baseUrl + "email";
    return Method.dataGet(url);
  },

  logout() {
    var body = {}
    var url = baseUrl + "users/logout";
    return Method.dataPost(body, url, true);
  },

  saveLocation(latitude, longitude) {
    var body = {
      "latitude": latitude,
      "longitude": longitude,
    }
    var url = baseUrl + "users/location";
    return Method.dataPost(body, url, true);
  },

  emergencyContacts() {
    var url = baseUrl + "users/emergency-contacts";
    return Method.dataGet(url);
  },

};

const Method = {
  dataPost(body, newurl, applicationJson) {
    const url = newurl;
    const data = {
      method: "POST",
      headers: {
        "Content-Type": applicationJson ? "application/json" : "multipart/form-data",
        Accept: "application/json",
        "token": accessToken
      },
      body: applicationJson ? JSON.stringify(body) : body
    };
    return new Promise((resolve, reject) => {
      if (connectionState.isConnected === true) {
        fetch(url, data)
          .then(responseData => {
            if (connectionState.isConnected === true) {
              if (responseData.status == 200) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 1,
                      result: result
                    });
                  } else if (
                    result.success == false ||
                    result.status == false
                  ) {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (
                responseData.status == 400 ||
                responseData.status == 404
              ) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 2,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (responseData.status == 401) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 3,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (responseData.status == 403) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 4,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (
                responseData.status == 500 ||
                responseData.status === 504
              ) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 5,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (responseData.status == 429) {
                return reject({
                  result: "Too Many Attempts.",
                  status: 0
                });
              }

            } else {
              return reject({
                result: "Please check your internet connection.",
                status: 0
              });
            }
          })
          .catch(error => {
            if (connectionState.isConnected == true) {
              return reject({
                result: error.TypeError
                  ? error.TypeError
                  : "Something went wrong.",
                status: 0
              });
            } else {
              return reject({
                result: "Please check your internet connection.",
                status: 0
              });
            }
          });

      } else {
        return reject({
          result: "Please check your internet connection.",
          status: 0
        });
      }
    });
  },

  dataGet(newurl) {
    const url = newurl;
    const data = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "token": accessToken
      }
    };
    return new Promise((resolve, reject) => {
      if (connectionState.isConnected === true) {
        fetch(url, data)
          .then(responseData => {
            if (connectionState.isConnected === true) {
              if (responseData.status == 200) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 1,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (responseData.status == 400) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 2,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (responseData.status == 401) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 3,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (responseData.status == 403) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 4,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              } else if (
                responseData.status == 500 ||
                responseData.status === 504
              ) {
                return responseData.json().then(result => {
                  if (result) {
                    return resolve({
                      status: 5,
                      result: result
                    });
                  } else {
                    return reject({
                      status: 0,
                      result: "Something went wrong."
                    });
                  }
                });
              }

            } else {
              return reject({
                result: "Please check your internet connection.",
                status: 0
              });
            }
          })
          .catch(error => {
            if (connectionState.isConnected == true) {
              return reject({
                result: "Something went wrong.",
                status: 0
              });
            } else {
              return reject({
                result: "Please check your internet connection.",
                status: 0
              });
            }
          });

      } else {
        return reject({
          result: "Please check your internet connection.",
          status: 0
        });
      }
    });
  }
};

module.exports = Fetch;
