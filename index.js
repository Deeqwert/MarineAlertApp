/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import firebase from '@react-native-firebase/app';
// const androidCredentials = {
//     clientId: "815583667406-dol4cb2cd7a6hggfvdgbssukhgb9p54d.apps.googleusercontent.com",
//     appId: "1:815583667406:android:5b6bc72d61e61793b29c9f",
//     apiKey: "AIzaSyA4gAnoR8l9wRG-BY8gsimGetVglCXsaK0",
//     databaseURL: "https://satamp-289216.firebaseio.com",
//     storageBucket: "satamp-289216.appspot.com",
//     messagingSenderId: "815583667406",
//     projectId: "satamp-289216",
// };

const androidCredentials = {
    clientId: "815583667406-vlikaipuka1a5aeieh541t0keavahe6g.apps.googleusercontent.com",
    appId: "1:815583667406:android:85011319baaf3baeb29c9f",
    apiKey: "AIzaSyADmDELd9vU30ZW5bCwi7f4Fi-hWVSWn4c",
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

firebase.initializeApp(credentials)

AppRegistry.registerComponent(appName, () => App);
