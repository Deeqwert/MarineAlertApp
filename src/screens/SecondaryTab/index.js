import React, { Component } from "react";
import {
    SafeAreaView,
    StatusBar,
    Linking,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { WebView } from 'react-native-webview';
import { AppColor } from '../../utils';
import { Loader, Header } from '../../components';
import I18n from '../../translations/localeConfig';
import LinearGradient from 'react-native-linear-gradient';

class SecondaryTab extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {

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

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: AppColor.colors.backgroundLight }}>
                <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundLight} barStyle="dark-content"> </StatusBar>
                <Loader loading={this.props.onLoad || this.props.onLoad1}></Loader>
                <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={[AppColor.colors.backgroundLight, AppColor.colors.backgroundLight]}
                    style={styles.container}>
                    <Header
                        customStyles={{
                            imageView: {
                                tintColor: AppColor.colors.black
                            },
                            textStyle: {
                                color: AppColor.colors.black
                            }
                        }}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        title={I18n.t('weatherForecast')}
                    ></Header>
                    <WebView
                        style={{ backgroundColor: AppColor.colors.backgroundLight }}
                        onNavigationStateChange={(event)=>{
                            if (event.url != 'https://satamp.net/pronostico-m/') {
                                Linking.openURL(event.url)
                                return false;
                            }
                        }}
                        onShouldStartLoadWithRequest={(event) => {
                            if (event.url != 'https://satamp.net/pronostico-m/') {
                                Linking.openURL(event.url)
                                return false;
                            }
                        }}
                        javaScriptEnabled={true}
                        // cacheEnabled={true}
                        source={{ uri: 'https://satamp.net/pronostico-m/' }}
                    />
                </LinearGradient>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SecondaryTab);
