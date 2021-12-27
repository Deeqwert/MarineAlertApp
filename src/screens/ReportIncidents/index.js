import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, Header, WaveIndicator, AlertView } from '../../components';
import { changeLanguage, getIncidents } from "../../redux/actions/ApplicationAction";
import I18n from '../../translations/localeConfig';
import { AppColor } from './../../utils';

class ReportIncidents extends Component {

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

    renderReportView = ({ item, index }) => (
        <AlertView
            readMorePress={() => {
                this.props.navigation.navigate('AlertDetails', { province: "", incidentId: item.ID })
            }}
            title={item.post_title}
            description={item.post_content}
            timeStamp={item.post_date}
            status={item.post_status} />
    );

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>
                <StatusBar hidden={false} backgroundColor={AppColor.colors.blueTheme} barStyle="light-content"> </StatusBar>
                {/* <Loader loading={this.props.onLoad} /> */}
                <Header customStyles={{
                    imageView: {
                        tintColor: AppColor.colors.white
                    },
                    textStyle: {
                        color: AppColor.colors.white
                    }
                }} onPress={() => {
                    this.props.navigation.goBack();
                }} title={I18n.t('reportIncident')}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {!this.props.onLoad && this.props.incidentList.length > 0 ? <FlatList
                            bounces={false}
                            style={{ paddingHorizontal: 10, marginBottom: 10 }}
                            showsHorizontalScrollIndicator={false}
                            data={this.props.incidentList}
                            extraData={this.state}
                            renderItem={this.renderReportView}
                        /> : !this.props.onLoad ?
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <View
                                        style={[styles.noDataContainer]}>
                                        <WaveIndicator count={2} size={200} color={AppColor.colors.alertColor} waveMode='fill' />
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.props.navigation.navigate('AddReport')
                                            }}
                                            style={[styles.reportButton]}>
                                            <Text style={[styles.reportText]}>{I18n.t('report').toUpperCase()}</Text>
                                            <Text style={[styles.reportText1]}>{I18n.t('newIncident')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.titleText}>{I18n.t('sendReport').toLocaleUpperCase()}</Text>
                                    <Text style={styles.messageText}>{I18n.t('sendReportMessage')}</Text>
                                </View> : null}

                    </View>
                </ScrollView >
                {!this.props.onLoad && this.props.incidentList.length > 0 ? <View style={[styles.floatingContainer]}>
                    <WaveIndicator count={2} size={80} color={AppColor.colors.alertColor} waveMode='fill' />
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('AddReport')
                        }}
                        style={[styles.floatingView]}>

                        <Image style={styles.imageView} source={require('../../images/add.png')}></Image>
                    </TouchableOpacity>
                </View> : null}

            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.ApplicationReducer.onLoad,
        incidentList: state.ApplicationReducer.incidentList
    };
}

const mapDispatchToProps = { changeLanguage, getIncidents };

export default connect(mapStateToProps, mapDispatchToProps)(ReportIncidents);
