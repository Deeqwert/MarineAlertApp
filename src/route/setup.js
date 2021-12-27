import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import mainStack from './route';
import { createAppContainer } from 'react-navigation';
import SplashScreen from 'react-native-splash-screen';
import { DataManager, FetchApi } from './../components';
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { changeLanguage } from "../redux/actions/ApplicationAction";
import { settingsDetailAction } from "../redux/actions/AuthenticationAction";
import fcmService from '../pushManager/fcmService';
import firebase from '@react-native-firebase/app';

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

let unsubscribe
class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
        }
        DataManager.getSettingsDetail().then(result => {
            if (result) {
                var settings = JSON.parse(result);
                this.props.changeLanguage(
                    settings[0].isSelected ? 'en' : 'es'
                );
                this.props.settingsDetailAction(JSON.parse(result))
            } else {
                var settingsArr = [
                    {
                        image: "web",
                        title: "appLanguage",
                        subTitle: "appLanguageMessage",
                        isSelected: false
                    },
                    {
                        image: "key",
                        title: "password",
                        subTitle: "changePasswordMessage",
                        isSelected: null
                    },
                    {
                        image: "user",
                        title: "userProfile",
                        subTitle: "manageProfile",
                        isSelected: null
                    },
                    {
                        image: "user",
                        title: "contactUs",
                        isSelected: null
                    },
                    {
                        image: "condition",
                        title: "termConditions",
                        isSelected: null
                    },
                    {
                        image: "logout",
                        title: "logout",
                        isSelected: null
                    },
                ]
                this.props.changeLanguage(
                    'es'
                );
                DataManager.setSettingsDetail(settingsArr);
                this.props.settingsDetailAction(settingsArr)

            }
        });
        setTimeout(() => {
            SplashScreen.hide();
        }, 2000);
        this.checkUserLogedIn()
    }
    componentDidMount() {
        // this.initializeApp1()
        unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
        fcmService.register(this.onNotification, this.onOpenNotification);
    }
    async initializeApp1() {
        await firebase.initializeApp(credentials)
    }
    componentWillUnmount() {
        unsubscribe()
    }

    handleConnectivityChange(connectionState) {
        FetchApi.checkInternetConnection(connectionState)
    }
    checkUserLogedIn() {
        DataManager.getUserDetails().then((response) => {
            if (response !== null) {
                let result = JSON.parse(response)
                DataManager.setAccessToken(result.token)
                FetchApi.setAccessToken(result.token)
                this.setState({ loggedIn: true })
            }
            else {
                this.setState({ loggedIn: false })
            }
        })

    }

    onOpenNotification() {
        // console.log('onOpenNotification')
    }
    onNotification() {
        // console.log('onNotification')
    }

    render() {
        const MainLayout = mainStack(this.state.loggedIn)
        const AppContainer = createAppContainer(MainLayout);
        return (
            <View style={{ flex: 1 }}>
                <AppContainer />
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
    };
}

const mapDispatchToProps = { changeLanguage, settingsDetailAction };

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
