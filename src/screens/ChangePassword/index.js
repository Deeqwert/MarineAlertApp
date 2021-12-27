import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, SecondaryInput, Button, Header } from '../../components';
import { changePassword } from "../../redux/actions/AuthenticationAction";
import I18n from '../../translations/localeConfig';
import { AppColor, AppDimensions } from '../../utils';

class ChangePassword extends Component {
    
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    changePassword = () => {
        if (this.state.oldPassword.trim().length <= 0) {
            alert(I18n.t('enterOldPassword'))
        } else if (this.state.newPassword.trim().length <= 0) {
            alert(I18n.t('enterPassword'))
        } else if (this.state.confirmPassword.trim().length <= 0) {
            alert(I18n.t('confirmPassword'))
        } else if (this.state.confirmPassword.trim() != this.state.newPassword.trim()) {
            alert(I18n.t('confirmPassword'))
        } else {
            this.props.changePassword(
                this.state.oldPassword,
                this.state.confirmPassword,
                this.props.navigation
            )
        }

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundLight} barStyle="dark-content"> </StatusBar>
                    <Loader loading={this.props.onLoad}></Loader>

                    <Header customStyles={{
                        imageView: {
                            tintColor: AppColor.colors.black
                        },
                        textStyle: {
                            color: AppColor.colors.black
                        }
                    }} onPress={() => {
                        this.props.navigation.goBack();
                    }} title={I18n.t('changePassword')} />
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View
                            style={styles.container}>

                            <SecondaryInput
                                customStyles={{ mainView: { width: AppDimensions.deviceWidth - 30 } }}
                                editable={true}
                                title={I18n.t('oldPassword')}
                                onChangeText={oldPassword => {
                                    this.setState({ oldPassword });
                                }}
                                value={this.state.oldPassword}
                                numberOfLines={1}
                                returnKeyType={"next"}
                                keyboardType={"default"}
                                autoCapitalize={"none"}></SecondaryInput>

                            <SecondaryInput
                                customStyles={{ mainView: { width: AppDimensions.deviceWidth - 30 } }}
                                editable={true}
                                title={I18n.t('newPassword')}
                                onChangeText={newPassword => {
                                    this.setState({ newPassword });
                                }}
                                value={this.state.newPassword}
                                maxLength={15}
                                numberOfLines={1}
                                returnKeyType={"next"}
                                keyboardType={"default"}
                                autoCapitalize={"none"}></SecondaryInput>

                            <SecondaryInput
                                customStyles={{ mainView: { width: AppDimensions.deviceWidth - 30 } }}
                                editable={true}
                                title={I18n.t('confirmPassword')}
                                onChangeText={confirmPassword => {
                                    this.setState({ confirmPassword });
                                }}
                                value={this.state.confirmPassword}
                                numberOfLines={1}
                                returnKeyType={"next"}
                                keyboardType={"default"}
                                autoCapitalize={"none"}></SecondaryInput>

                            <Button
                                activeOpacity={0.5}
                                onPress={() => {
                                    this.changePassword()
                                }}
                                customStyles={{
                                    container: {
                                        marginBottom: 20,
                                        marginTop: 20,
                                        width: AppDimensions.deviceWidth - 50,
                                    },
                                    buttonView: {
                                        backgroundColor: AppColor.colors.blueTheme,
                                    }
                                }} Text={I18n.t('update').toUpperCase()}></Button>
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );

    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.ApplicationReducer.onLoad,
    };
}

const mapDispatchToProps = { changePassword };

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
