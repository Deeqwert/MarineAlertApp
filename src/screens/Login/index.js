import React, { Component } from "react";
import {
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    View,
    Alert,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { loginAction, resendEmail } from "../../redux/actions/AuthenticationAction";
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../translations/localeConfig';
import { Loader, Inputs, Button, DataManager } from '../../components';
import { CommonFunctions, AppColor } from '../../utils'
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '815583667406-dol4cb2cd7a6hggfvdgbssukhgb9p54d.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    androidClientId: '815583667406-vlikaipuka1a5aeieh541t0keavahe6g.apps.googleusercontent.com',
    iosClientId: '815583667406-ibvqfoh30i1t9o4e6ebbtslps7ib1ut5.apps.googleusercontent.com',
    scopes: ['profile', 'email'] // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});
class Login extends Component {
    
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            email: "",
            password: "",
            googleToken: "",
            firstName: "",
            lastName: "",
            rememberPassword: false,
        };
        this.getSavedDetails();
        GoogleSignin.signOut()
    }

    async getSavedDetails() {
        await DataManager.getUserPassword().then(response => {
            if (response !== null) {
                let result = JSON.parse(response);
                // this.setState({ password: result.password, email: result.email });
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.apiResult) {
            let loginResponse = nextProps.apiResult;
            if (loginResponse.verified == false) {
                this.onResendEmail()
            }
        }
    }
    
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp()
        return true;
    }

    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(JSON.stringify(userInfo))
            this.setState({
                googleToken: userInfo.idToken,
                firstName: userInfo.user.givenName,
                lastName: userInfo.user.familyName,
                email: userInfo.user.email
            })
            this.props.loginAction(
                this.state.email,
                null,
                userInfo.user.id,
                userInfo.user.givenName,
                userInfo.user.familyName,
                userInfo.idToken,
                this.props.navigation)
        } catch (error) {
            alert(JSON.stringify(error))
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // console.log("SIGN_IN_CANCELLED")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // console.log("IN_PROGRESS")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // console.log("PLAY_SERVICES_NOT_AVAILABLE")
            } else {
                // console.log(JSON.stringify(error))
            }
        }
    };

    onLogin() {
        if (this.state.email.trim().length <= 0) {
            alert(I18n.t('enterEmail'))
        } else if (!CommonFunctions.validateEmail(this.state.email)) {
            alert(I18n.t('enterEmail'))
        } else if (this.state.password.trim().length <= 0) {
            alert(I18n.t('enterPassword'))
        } else {
            DataManager.setUserPassword({
                "email": this.state.email,
                "password": this.state.password
            });
            this.props.loginAction(
                this.state.email,
                this.state.password,
                null,
                null,
                null,
                null,
                this.props.navigation)
        }
    }

    onResendEmail() {
        Alert.alert(
            "Login",
            "Your email is not verified. To verify your email click on link that we have sent on your email.",
            [
                {
                    text: "Cancel",
                    onPress: () => {
                        // console.log("Cancel Pressed")
                    },
                    style: "cancel"
                },
                {
                    text: "Re-Send verification email", onPress: () => {
                        this.props.resendEmail(this.state.email, this.props.navigation)
                    }
                }
            ],
            { cancelable: false }
        );

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <Loader loading={this.props.onLoad} title={I18n.t('loading')}></Loader>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0.75 }} colors={[AppColor.colors.blueTheme, AppColor.colors.blueTheme, AppColor.colors.blueTheme]} style={{ flex: 1 }}>
                            <StatusBar hidden={false} backgroundColor={AppColor.colors.blueTheme} barStyle="light-content"> </StatusBar>
                            <View style={styles.logoContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.imageLogo} source={require('../../images/app_logo.png')}></Image>
                                <Text style={styles.titleText}>{I18n.t('appName').toLocaleUpperCase()} </Text>
                            </View>
                            <View style={styles.fieldsContainer}>
                                <Inputs
                                    onChangeText={email => {
                                        this.setState({ email });
                                    }}
                                    value={this.state.email}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"email-address"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("enterEmail")}
                                    leftImageSource={require('../../images/email.png')}></Inputs>
                                <Inputs
                                    onChangeText={password => {
                                        this.setState({ password });
                                    }}
                                    secureTextEntry={true}
                                    numberOfLines={1}
                                    value={this.state.password}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("enterPassword")}
                                    leftImageSource={require('../../images/key.png')}></Inputs>

                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    onPress={() => {
                                        this.setState({ rememberPassword: !this.state.rememberPassword })
                                    }}
                                    style={styles.rememberPasswordView}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25
                                        }}
                                        source={this.state.rememberPassword ? require('../../images/checkbox_marked.png') : require('../../images/checkbox_blank.png')}></Image>
                                    <Text style={[styles.textStyle, { marginLeft: 10 }]}>{I18n.t('rememberPassword')}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonsContainer}>
                                <Button
                                customStyles={{
                                    buttonView:{
                                        backgroundColor:AppColor.colors.alertColor
                                    }
                                }}
                                    onPress={() => {
                                        this.onLogin()
                                    }}
                                    activeOpacity={0.5} Text={I18n.t('login').toUpperCase()}></Button>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.navigate('ForgotPassword')
                                    }}
                                    style={styles.forgotPasswordView}>
                                    <Text style={styles.textStyle}>{I18n.t('forgotPassword')}</Text>
                                </TouchableOpacity>
                                <Button onPress={() => {
                                    this.props.navigation.navigate('SignUp')
                                }} customStyles={{
                                    container: {
                                        marginTop: 10,
                                    },
                                    buttonView: {
                                        backgroundColor: AppColor.colors.buttonLight
                                    },
                                    textStyle: {
                                        color: AppColor.colors.grey
                                    }
                                }} activeOpacity={0.5} Text={I18n.t('signUp').toUpperCase()}></Button>
                                <GoogleSigninButton
                                    style={{ marginTop: 10, width: '80%', height: 55, alignSelf: 'center' }}
                                    size={GoogleSigninButton.Size.Wide}
                                    color={GoogleSigninButton.Color.Light}
                                    onPress={this.signIn}
                                    disabled={this.state.isSigninInProgress} />
                            </View>
                            <View style={styles.copyrightContainer}>
                                <Text style={[styles.copyrightText]}>{I18n.t('copywriteText').toUpperCase()}</Text>
                            </View>

                        </LinearGradient>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.AuthenticationReducer.onLoad,
        apiResult: state.AuthenticationReducer.apiResult,
        apiError: state.AuthenticationReducer.apiError,
    };
}

const mapDispatchToProps = { loginAction, resendEmail };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
