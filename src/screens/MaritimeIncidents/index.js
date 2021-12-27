import React, { Component } from "react";
import {
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    View,
    Text,
    KeyboardAvoidingView,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, Header } from '../../components';
import { getIncidents } from '../../redux/actions/ApplicationAction'
import I18n from '../../translations/localeConfig';
import { AppColor } from './../../utils';
import LinearGradient from 'react-native-linear-gradient';

class MaritimeIncidents extends Component {

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
            <SafeAreaView forceInset={{ top: 'always', bottom: 'always' }} style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundLight} barStyle="dark-content"> </StatusBar>
                    <Loader loading={this.props.onLoad}></Loader>
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
                        }} title={I18n.t('maritimeIncidents')}></Header>

                        <TouchableOpacity onPress={() => {
                            this.props.getIncidents(this.props.navigation)
                        }}
                            style={[styles.viewContainer, { marginTop: 25 }]}>
                            <Image source={require('../../images/safety.png')}
                                style={[styles.imageView]}></Image>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.titleText}>{I18n.t('reportIncident')}</Text>
                            </View>
                            <Image
                                source={require('../../images/chevron_right.png')}
                                style={[styles.imageView1]}></Image>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('ReportedIncidents')
                        }}
                            style={[styles.viewContainer]}>
                            <Image source={require('../../images/board.png')}
                                style={[styles.imageView]}></Image>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.titleText}>{I18n.t('reportedIncidents')}</Text>
                            </View>
                            <Image
                                source={require('../../images/chevron_right.png')}
                                style={[styles.imageView1]}></Image>
                        </TouchableOpacity>

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
    };
}

const mapDispatchToProps = { getIncidents };

export default connect(mapStateToProps, mapDispatchToProps)(MaritimeIncidents);
