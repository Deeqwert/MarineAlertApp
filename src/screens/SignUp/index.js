import React, { Component } from "react";
import {
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { registerAction } from "../../redux/actions/AuthenticationAction";
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../translations/localeConfig';
import { Loader, Inputs, Button, Header } from '../../components';
import CommonFunctions from "../../utils/CommonFunctions";
import { AppColor } from '../../utils';

class SignUp extends Component {
    
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            conPassword: "",
            acceptTNC: false,
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack()
        return true;
    }

    onSignup() {
        if (this.state.firstName.trim().length <= 0) {
            alert(I18n.t('enterFirstName'))
        } else if (this.state.lastName.trim().length <= 0) {
            alert(I18n.t('enterLastName'))
        } else if (this.state.phone.trim().length <= 0) {
            alert(I18n.t('enterPhone'))
        } else if (!CommonFunctions.validatePhoneNumber(this.state.phone)) {
            alert(I18n.t('enterPhone'))
        } else if (this.state.email.trim().length <= 0) {
            alert(I18n.t('enterEmail'))
        } else if (!CommonFunctions.validateEmail(this.state.email)) {
            alert(I18n.t('enterEmail'))
        } else if (this.state.password.trim().length <= 0) {
            alert(I18n.t('enterPassword'))
        } else if (this.state.conPassword.trim().length <= 0) {
            alert(I18n.t('confirmPassword'))
        } else if (this.state.conPassword != this.state.password) {
            alert(I18n.t('confirmPassword'))
        } else if (!this.state.acceptTNC) {
            alert(I18n.t('agreeTC'))
        } else {
            this.props.registerAction(
                this.state.firstName,
                this.state.lastName,
                this.state.phone,
                this.state.email,
                this.state.password,
                this.props.navigation)
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0.75 }} colors={[AppColor.colors.blueTheme, AppColor.colors.blueTheme, AppColor.colors.blueTheme]} style={{ flex: 1 }}>
                        <StatusBar hidden={false} backgroundColor={AppColor.colors.blueTheme} barStyle="light-content"> </StatusBar>
                        <Loader loading={this.props.onLoad} title={I18n.t('loading')} />
                        <Header onPress={() => {
                            this.props.navigation.goBack();
                        }}></Header>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={styles.fieldsContainer}>
                                <Text style={[styles.titleText, { marginBottom: 15 }]}>{I18n.t('createAnAccount').toLocaleUpperCase()} </Text>
                                <Inputs
                                    onChangeText={firstName => {
                                        this.setState({ firstName });
                                    }}
                                    value={this.state.firstName}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("enterFirstName")}
                                    leftImageSource={require('../../images/user.png')}></Inputs>

                                <Inputs
                                    onChangeText={lastName => {
                                        this.setState({ lastName });
                                    }}
                                    value={this.state.lastName}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("enterLastName")}
                                    leftImageSource={require('../../images/user.png')}></Inputs>

                                <Inputs
                                    onChangeText={phone => {
                                        this.setState({ phone });
                                    }}
                                    value={this.state.phone}
                                    maxLength={15}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"phone-pad"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("enterPhone")}
                                    leftImageSource={require('../../images/phone.png')}></Inputs>

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
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("enterPassword")}
                                    leftImageSource={require('../../images/key.png')}></Inputs>

                                <Inputs
                                    onChangeText={conPassword => {
                                        this.setState({ conPassword });
                                    }}
                                    value={this.state.conPassword}
                                    secureTextEntry={true}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("confirmPassword")}
                                    leftImageSource={require('../../images/key.png')}></Inputs>
                                <TouchableOpacity
                                    activeOpacity={1.0}
                                    onPress={() => {
                                        this.setState({ acceptTNC: !this.state.acceptTNC })
                                    }}
                                    style={styles.rememberPasswordView}>
                                    <Image
                                        resizeMode="contain"
                                        style={{
                                            width: 25,
                                            height: 25
                                        }}
                                        source={this.state.acceptTNC ? require('../../images/checkbox_marked.png') : require('../../images/checkbox_blank.png')}></Image>
                                    <Text style={[styles.textStyle, { marginLeft: 10 }]}>{I18n.t('agreeTC')}</Text>
                                </TouchableOpacity>
                                <Button
                                    onPress={() => {
                                        this.onSignup();
                                    }}
                                    customStyles={{
                                        container: {
                                            marginTop: 15
                                        },
                                        buttonView:{
                                            backgroundColor:AppColor.colors.alertColor
                                        }
                                    }} activeOpacity={0.5} Text={I18n.t('submit').toUpperCase()}></Button>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}
                                    style={styles.forgotPasswordView}>
                                    <Text style={styles.textStyle}>{I18n.t('backToLogin')}</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                        <View style={styles.copyrightContainer}>
                            <Text style={[styles.copyrightText]}>{I18n.t('copywriteText').toUpperCase()}</Text>
                        </View>
                    </LinearGradient>
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

const mapDispatchToProps = { registerAction };

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
