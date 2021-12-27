import React, { Component } from "react";
import {
    SafeAreaView,
    StatusBar,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Header } from '../../components';
import { AppColor } from "../../utils";
import I18n from '../../translations/localeConfig';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';

class TermsNConditions extends Component {

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
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight }}>
                <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundLight} barStyle="dark-content"> </StatusBar>
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
                    }} title={I18n.t('termConditions')}
                    />
                    <WebView
                        style={{ backgroundColor: AppColor.colors.backgroundLight }}
                        onShouldStartLoadWithRequest={(event) => {
                            if (event.url != 'https://satamp.net/terms-and-conditions-mobile/') {
                                Linking.openURL(event.url)
                            }
                            return false;
                        }}
                        javaScriptEnabled={true}
                        cacheEnabled={true}
                        source={{ uri: 'https://satamp.net/terms-and-conditions-mobile/' }}
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
    };
}


const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TermsNConditions);