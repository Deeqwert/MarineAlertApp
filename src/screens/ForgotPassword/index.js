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
import { forgotPasswordAction } from "../../redux/actions/AuthenticationAction";
import LinearGradient from 'react-native-linear-gradient';
import I18n from '../../translations/localeConfig';
import { Loader, Inputs, Button, Header } from '../../components';
import { CommonFunctions, AppColor } from '../../utils'

class ForgotPassword extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            email: "",
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

    onSubmit() {
        if (this.state.email.trim().length <= 0) {
            alert(I18n.t('enterEmail'))
        } else if (!CommonFunctions.validateEmail(this.state.email)) {
            alert(I18n.t('enterEmail'))
        } else {
            this.props.forgotPasswordAction(this.state.email, this.props.navigation)
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <Loader loading={this.props.onLoad} title={I18n.t('loading')}></Loader>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0.75 }} colors={[AppColor.colors.blueTheme, AppColor.colors.blueTheme, AppColor.colors.blueTheme]} style={{ flex: 1 }}>
                            <StatusBar hidden={false} backgroundColor={AppColor.colors.blueTheme} barStyle="light-content"> </StatusBar>
                            <Header onPress={() => {
                                this.props.navigation.goBack();
                            }}></Header>
                            <View style={styles.logoContainer}>
                                <Image
                                    resizeMode="contain"
                                    style={styles.imageLogo} source={require('../../images/lock.png')}></Image>
                                <Text style={styles.titleText}>{I18n.t('forgotPassword').toLocaleUpperCase()} </Text>
                                <Text style={styles.textStyle}>{I18n.t('forgotPassMessage')}</Text>
                            </View>
                            <View style={styles.fieldsContainer}>
                                <Inputs
                                    onChangeText={email => {
                                        this.setState({ email });
                                    }}
                                    numberOfLines={1}
                                    value={this.state.email}
                                    returnKeyType={"next"}
                                    keyboardType={"email-address"}
                                    autoCapitalize={"none"}
                                    placeholder={I18n.t("enterEmail")}
                                    leftImageSource={require('../../images/email.png')}></Inputs>
                                <Button
                                    customStyles={{
                                        container: {
                                            marginTop: 10
                                        },
                                        buttonView:{
                                            backgroundColor:AppColor.colors.alertColor
                                        }
                                    }}
                                    onPress={() => {
                                        this.onSubmit();
                                    }}
                                    activeOpacity={0.5} Text={I18n.t('submit').toUpperCase()}></Button>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.props.navigation.goBack();
                                    }}
                                    style={styles.forgotPasswordView}>
                                    <Text style={styles.textStyle}>{I18n.t('backToLogin')}</Text>
                                </TouchableOpacity>
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

const mapDispatchToProps = { forgotPasswordAction };

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
