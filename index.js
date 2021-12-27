/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import firebase from '@react-native-firebase/app';


const androidCredentials = {
  clientId: "client ID",
    appId: "App id",
    apiKey: "Your API Key",
    databaseURL: "databaseURL",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    projectId: "projectId",
};



const iosCredentials = {
    clientId: "client ID",
    appId: "App id",
    apiKey: "Your API Key",
    databaseURL: "databaseURL",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    projectId: "projectId",
};

// Select the relevant credentials
const credentials = Platform.select({
    android: androidCredentials,
    ios: iosCredentials,
});

firebase.initializeApp(credentials)

AppRegistry.registerComponent(appName, () => App);
