import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import {
    FetchApi,
    DataManager
} from '../components';

const androidCredentials = {
    clientId: "815583667406-dol4cb2cd7a6hggfvdgbssukhgb9p54d.apps.googleusercontent.com",
    appId: "1:815583667406:android:5b6bc72d61e61793b29c9f",
    apiKey: "AIzaSyA4gAnoR8l9wRG-BY8gsimGetVglCXsaK0",
    databaseURL: "https://satamp-289216.firebaseio.com",
    storageBucket: "satamp-289216.appspot.com",
    messagingSenderId: "815583667406",
    projectId: "satamp-289216",
};

const iosCredentials = {
    clientId: "815583667406-ibvqfoh30i1t9o4e6ebbtslps7ib1ut5.apps.googleusercontent.com",
    appId: "1:815583667406:ios:28be67d94a1c32d4b29c9f",
    apiKey: "AIzaSyCVx-hzS_m5NjliOttDjW8VY80wEdAJ1cU",
    databaseURL: "https://satamp-289216.firebaseio.com",
    storageBucket: "satamp-289216.appspot.com",
    messagingSenderId: "815583667406",
    projectId: "satamp-289216",
};

// Select the relevant credentials
const credentials = Platform.select({
    android: androidCredentials,
    ios: iosCredentials,
});

class FcmService {

    // we use this method to register notification service in our app.
    // we call this method in componetDidMount() so, we app load we get permission to
    // display notification.
    register = (onNotification, onOpenNotification) => {
        this.checkPermission(onNotification, onOpenNotification)
        // when register function call that time we create notification listener
        //this.createNoitificationListeners(onRegister, onNotification, onOpenNotification)
    }

    registerAppWithFCM = async (onNotification, onOpenNotification) => {
        if (Platform.OS === 'ios') {
            messaging().registerDeviceForRemoteMessages()
                .then((register) => {
                    this.getToken(onNotification, onOpenNotification)
                });
            //await messaging().setAutoInitEnabled(true);
        }
        else {
            this.getToken(onNotification, onOpenNotification)
        }
    }

    checkPermission = async (onNotification, onOpenNotification) => {
        // await firebase.initializeApp(credentials)
        messaging().hasPermission()
            .then(enabled => {
                if (enabled) {
                    this.registerAppWithFCM(onNotification, onOpenNotification)
                    //user has permission
                } else {
                    //user don't have permission
                    this.requestPermission(onNotification, onOpenNotification)
                }
            }).catch(error => {
                this.requestPermission(onNotification, onOpenNotification)
                // console.log("[FCMService] Permission rejected", error)
            })
    }

    getToken = (onNotification, onOpenNotification) => {
        DataManager.getDevicetoken().then((response) => {
            if (response !== null) {
                let fcmToken = JSON.parse(response)
                FetchApi.setDeviceToken(fcmToken);
                this.createNoitificationListeners(onNotification, onOpenNotification)
            }
            else {
                messaging().getToken()
                    .then(fcmToken => {
                        if (fcmToken) {
                            DataManager.setDeviceToken(fcmToken)
                            FetchApi.setDeviceToken(fcmToken);
                            this.createNoitificationListeners(onNotification, onOpenNotification)
                        } else {
                            // console.log("[FCMService] User does not have a device token")
                        }
                    }).catch(error => {
                        // console.log("[FCMService] getToken rejected ", error)
                    })
            }
        })
    }

    async setToken(token) {
        await AsyncStorage.setItem(Constants.FCM_TOKEN, token);
    }

    requestPermission = (onNotification, onOpenNotification) => {
        messaging().requestPermission().then(() => {
            this.registerAppWithFCM(onNotification, onOpenNotification)
        }).catch(error => {
            // console.log("[FCMService] Requested persmission rejected ", error)
        })
    }

    deletedToken = async () => {
        await messaging().deleteToken()
            .catch(error => {
                // console.log("Delected token error ", error)
            })
    }

    createNoitificationListeners = (onNotification, onOpenNotification) => {

        messaging().onNotificationOpenedApp(remoteMessage => {
            // console.log("[FCMService] onNotificationOpenedApp Notification caused app to open from background state:", remoteMessage);
            if (remoteMessage) {
                onOpenNotification(remoteMessage)
            } 
        });

        // when the application is opened form a quit state
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                // console.log('[FCMService] getInitialNotification Notification caused app to open from quit state:', remoteMessage);
                if (remoteMessage) {
                    onOpenNotification(remoteMessage)
                }
            }
            );

        // Foreground state messages
        this.messageListener = messaging().onMessage(async remoteMessage => {
            // console.log("[FCMService] A new FCM message arrived", remoteMessage);
            if (remoteMessage) {
                let notification = null;
                if (Platform.OS === 'ios') {
                    notification = remoteMessage
                } else {
                    notification = remoteMessage
                }
                onNotification(notification);
            }
        });

        // Triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            // console.log("New token refresh: ", fcmToken)
            this.setToken(fcmToken)
        })

    }

    unRegister = () => {
        this.messageListener()
    }

}

const fcmService = new FcmService();
export default fcmService;