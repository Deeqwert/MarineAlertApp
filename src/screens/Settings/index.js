import React, { Component } from "react";
import {
    SafeAreaView,
    StatusBar,
    KeyboardAvoidingView,
    FlatList,
    Linking,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, Header, DataManager, SettingView } from '../../components';
import { changeLanguage } from "../../redux/actions/ApplicationAction";
import { settingsDetailAction, logout } from "../../redux/actions/AuthenticationAction";
import I18n from '../../translations/localeConfig';
import { AppColor } from './../../utils';
import LinearGradient from 'react-native-linear-gradient';

class Settings extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            settings: [
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

            ],

        };
        this.getSettings();
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

    async getSettings() {
        await DataManager.getSettingsDetail().then(response => {
            if (response !== null) {
                let result = JSON.parse(response);
                this.setState({ settings: result });
            }
        });
    }
    selectSwitch = (value, mIndex) => {
        const newArray = [...this.state.settings];


        newArray.map((item, index) => {
            if (index == mIndex) {
                item.isSelected = value
            }
        })
        this.setState({ settings: newArray });
        if (mIndex == 0)
            this.props.changeLanguage(
                value ? 'en' : 'es'
            );
        DataManager.setSettingsDetail(newArray);
        setTimeout(() => {
            this.props.settingsDetailAction(newArray)
        }, 500);

    };

    sendEmail = () => {
        DataManager.getAdminEmail().then((response) => {
            if (response !== null) {
                let result = JSON.parse(response)
                Linking.openURL('mailto:' + result.admin_email)
            }
        })
    }

    renderBtnView = ({ item, index }) => (
        <SettingView
            image={item.image}
            title={I18n.t(item.title)}
            subTitle={item.subTitle ? I18n.t(item.subTitle) : null}
            onPress={() => {
                if (index == 1) {
                    this.props.navigation.navigate('ChangePassword')
                } else if (index == 2) {
                    this.props.navigation.navigate('Profile')
                } else if (index == 3) {
                    this.sendEmail()
                } else if (index == 4) {
                    this.props.navigation.navigate('TermsNConditions')
                } else if (index == 5) {
                    this.props.logout(this.props.navigation);
                }


            }}
            onValueChange={(value) => {
                this.selectSwitch(value, index)
            }}
            isSelected={item.isSelected} />
    );

    render() {
        return (
            <SafeAreaView forceInset={{ top: 'always', bottom: 'always' }} style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundLight} barStyle="dark-content"> </StatusBar>
                    <Loader loading={this.props.onLoad || this.props.onLoad1}></Loader>
                    <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={[AppColor.colors.backgroundLight, AppColor.colors.backgroundLight]}
                        style={styles.container}>
                        <Header customStyles={{
                            imageView: {
                                tintColor: AppColor.colors.black
                            },
                            textStyle: {
                                color: AppColor.colors.black
                            }
                        }} onPress={() => {
                            this.props.navigation.goBack();
                        }} title={I18n.t('preferences')}></Header>
                        <FlatList
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            data={this.state.settings}
                            extraData={this.state}
                            renderItem={this.renderBtnView}
                        />
                    </LinearGradient>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.ApplicationReducer.onLoad,
        onLoad1: state.AuthenticationReducer.onLoad,
    };
}

const mapDispatchToProps = { changeLanguage, settingsDetailAction, logout };

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
