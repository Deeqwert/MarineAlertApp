import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    StatusBar,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Polygon } from 'react-native-maps';
import { MapPopUp, Loader, Header } from '../../components';
import { changeLanguage, getMapData, saveLocation } from "../../redux/actions/ApplicationAction";
import I18n from '../../translations/localeConfig';
import { AppColor } from "../../utils";
import mapStyle from '../../mapData/mapStyle.json';
class MainTab extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            modalVisible: false,
            selectedZone: {},
            currentRegion: {
                latitude: 8.566354,
                longitude: -80.114793,
                latitudeDelta: 30,
                longitudeDelta: 30,
            },
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getMapData();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    getMapData() {
        setTimeout(() => {
            this.props.getMapData(this.props.navigation);
        }, 500);
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundLight} barStyle="dark-content"> </StatusBar>
                    <Loader loading={this.props.onLoad || this.props.onLoad1}></Loader>
                    <View style={styles.container}>
                        <MapView
                            showsUserLocation={true}
                            showsCompass={false}
                            onRegionChangeComplete={(mRegion) => {
                                this.setState({ currentRegion: mRegion })
                            }}
                            ref={mapView => this._mapView = mapView}
                            onMapReady={() => {
                                this._mapView.setMapBoundaries(
                                    { "latitude": 13.051612408589248, "longitude": -77.09678225219251 },
                                    { "latitude": 3.0626270383217467, "longitude": -83.19859251379967 }
                                )
                            }}
                            customMapStyle={mapStyle}
                            maxZoomLevel={9}
                            minZoomLevel={7}
                            provider={PROVIDER_GOOGLE}
                            style={styles.map}
                            initialRegion={this.state.currentRegion}
                        >
                            {
                                this.props.mapData.map(item => {
                                    return (
                                        <Polygon
                                            geodesic={true}
                                            tappable={true}
                                            fillColor={item.status == 'warning' ? 'rgba(255,255,0, 0.6)' :
                                                item.status == 'alert' ? 'rgba(255,0,0, 0.6)' :
                                                    item.status == 'emergency' ? 'rgba(255,0,0, 0.6)' :
                                                        'rgba(105, 105, 105, 0.6)'}
                                            onPress={() => {
                                                this.setState({ modalVisible: true, selectedZone: item })
                                            }}
                                            coordinates={item.boundaries}
                                            strokeColor={
                                                'rgba(105, 105, 105, 0.6)'} // fallback for when `strokeColors` is not supported by the map-provider
                                            strokeWidth={1}
                                        />
                                    )

                                })
                            }
                        </MapView>
                        <View style={{ position: 'absolute', left: 0, right: 0, top: 0 }}>
                            <Header
                                customStyles={{
                                    container: {
                                        backgroundColor: AppColor.colors.backgroundLight
                                    },
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
                                title={I18n.t('noticeNAlert')}
                            ></Header>
                        </View>
                        <View style={styles.indicatorContainer} >
                            <View style={styles.indicatorView}>
                                <View style={[styles.indicator, { backgroundColor: 'rgba(105, 105, 105, 0.6)' }]}></View>
                                <Text style={styles.indicatorText}>{I18n.t('noEmergency')}</Text>
                            </View>
                            <View style={styles.indicatorView}>
                                <View style={[styles.indicator, { backgroundColor: AppColor.colors.warningColor }]}></View>
                                <Text style={styles.indicatorText}>{I18n.t('warning')}</Text>
                            </View>
                            <View style={styles.indicatorView}>
                                <View style={[styles.indicator, { backgroundColor: AppColor.colors.alertColor }]}></View>
                                <Text style={styles.indicatorText} >{I18n.t('alert')}</Text>
                            </View>
                        </View>
                        <MapPopUp onSeeMorePress={() => {
                            this.setState({ modalVisible: false })
                            this.props.navigation.navigate('AlertDetails', { province: this.state.selectedZone.province, incidentId: this.state.selectedZone.post.ID })
                        }}
                            seeMore={
                                this.state.selectedZone.status == 'warning' ||
                                this.state.selectedZone.status == 'alert' ||
                                this.state.selectedZone.status == 'emergency'}
                            onOutsidePress={() => {
                                this.setState({ modalVisible: false })
                            }}
                            isVisible={this.state.modalVisible}
                            title={this.state.selectedZone.province}
                            subTitle={this.state.selectedZone.post ? this.state.selectedZone.post.post_title : ""}
                            timeStamp={this.state.selectedZone.updated_at ? this.state.selectedZone.updated_at : "2020-10-20 13:04:44"}
                            description={this.state.selectedZone.post ? this.state.selectedZone.post.post_content : ""}></MapPopUp>

                    </View>
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
        mapData: state.ApplicationReducer.mapData,
    };
}


const mapDispatchToProps = { changeLanguage, getMapData, saveLocation };

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);