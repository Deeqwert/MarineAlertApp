import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Modal,
    Text,
    Platform,
    PermissionsAndroid,
    FlatList,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps';
import { Loader, Header, Button } from '../../components';
import { AppColor, AppDimensions, AppFontFamily } from "../../utils";
import I18n from '../../translations/localeConfig';
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
import Slider from '@react-native-community/slider';
import Geolocation from '@react-native-community/geolocation';
import { getAllIncidents } from '../../redux/actions/ApplicationAction'

const ASPECT_RATIO = AppDimensions.deviceWidth / AppDimensions.deviceHeight * 0.75;
const LATITUDE_DELTA = (Platform.OS == 'ios' ? 1.0 : 0.5);
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class ReportedIncidents extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            nearYou: true,
            datePicker: false,
            provincePicker: false,
            latitude: 8.566354,
            longitude: -80.114793,
            currentLatitude: 8.566354,
            currentLongitude: -80.114793,
            radius: 250000,
            selectedStartDate: moment(new Date()).subtract(1, 'month'),
            selectedEndDate: new Date(),
            selectedProvince: null
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.requestLocationPermission();
        setTimeout(() => {
            this.props.getAllIncidents(
                this.state.latitude,
                this.state.longitude,
                moment(this.state.selectedStartDate).format("YYYY-MM-DD hh:mm"),
                moment(this.state.selectedEndDate).format("YYYY-MM-DD hh:mm"),
                this.state.radius / 1000,
                this.props.navigation)
        }, 500);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            this.getOneTimeLocation();
            this.subscribeLocationLocation();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                        buttonPositive: 'OK'
                    },
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //To Check, If Permission is granted
                    this.getOneTimeLocation();
                    this.subscribeLocationLocation();
                } else {
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    currentLatitude: position.coords.latitude,
                    currentLongitude: position.coords.longitude,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                })
                this._mapView.animateToCoordinate({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }, 200)
                // console.log(JSON.stringify(position))
            },
            (error) => {
                // console.log(JSON.stringify(error))
            } ,
        );
    };

    subscribeLocationLocation = () => {
        Geolocation.watchPosition(
            (position) => {
                this.setState({
                    currentLatitude: position.coords.latitude,
                    currentLongitude: position.coords.longitude
                })
                // console.log(JSON.stringify(position))
            },
            (error) => {
                // console.log(JSON.stringify(error))
            },
            { enableHighAccuracy: true, maximumAge: 1000 },
        );
    };


    onDateChange(date, type) {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date,
                datePicker: false
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: new Date(),
            });
        }
    }

    renderBtnView = ({ item, index }) => (
        <TouchableOpacity style={{ paddingVertical: 5 }}
            onPress={() => {
                this._mapView.animateToCoordinate({
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                }, 500)
                this.setState({
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                    selectedProvince: item, provincePicker: false
                })

            }}>
            <Text style={[styles.titleText, { fontFamily: AppFontFamily.fontFamily.robotoRegular }]} >{item.province}</Text>
        </TouchableOpacity>
    );

    renderCalender = () => {
        const minDate = new Date(2019, 6, 3);
        const maxDate = new Date();
        return (
            <Modal
                statusBarTranslucent
                transparent={true}
                animationType={'none'}
                visible={this.state.datePicker}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => {
                        this.setState({ datePicker: false })
                    }}
                    style={[styles.modalContainer]}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => { }}
                        style={[styles.modalWrapper]}>
                        <CalendarPicker
                            width={AppDimensions.deviceWidth * 0.8}
                            startFromMonday={true}
                            enableDateChange={true}
                            horizontal={true}
                            allowRangeSelection={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            todayBackgroundColor={AppColor.colors.lightGrey1}
                            selectedDayColor={AppColor.colors.blueTheme}
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={this.onDateChange}
                        />

                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }

    renderProvinceList = () => {
        return (
            <Modal
                statusBarTranslucent
                transparent={true}
                animationType={'none'}
                visible={this.state.provincePicker}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => {
                        this.setState({ provincePicker: false })
                    }}
                    style={[styles.modalContainer]}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => {}}
                        style={[styles.modalWrapper]}>
                        <FlatList
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            data={this.props.mapData}
                            extraData={this.state}
                            renderItem={this.renderBtnView}
                        />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight }}>
                <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundLight} barStyle="dark-content"> </StatusBar>
                <View style={styles.container}>
                    <Header customStyles={{
                        imageView: {
                            tintColor: AppColor.colors.black
                        },
                        textStyle: {
                            color: AppColor.colors.black
                        }
                    }} onPress={() => {
                        this.props.navigation.goBack();
                    }} title={I18n.t('reportedIncidents')}
                    />
                    <View style={[styles.headerContainer]}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row'

                        }}>
                            <Text style={[styles.titleText, { flex: 1 }]} >{I18n.t('searchBy')}</Text>
                            <Button
                                onPress={() => {
                                    this.props.getAllIncidents(
                                        this.state.latitude,
                                        this.state.longitude,
                                        moment(this.state.selectedStartDate).format("YYYY-MM-DD hh:mm"),
                                        moment(this.state.selectedEndDate).format("YYYY-MM-DD hh:mm"),
                                        this.state.radius / 1000,
                                        this.props.navigation)
                                }}
                                activeOpacity={0.5} Text={I18n.t('filter')}
                                customStyles={{
                                    container: {
                                        width: 70,
                                        alignSelf: 'flex-end',
                                        margin: 0
                                    },
                                    buttonView: {
                                        height: 35,
                                        paddingHorizontal: 10,
                                        backgroundColor: AppColor.colors.blueTheme
                                    }
                                }} />
                        </View>


                        <View style={[styles.rowView]}>
                            <TouchableOpacity onPress={() => {
                                this._mapView.animateToCoordinate({
                                    latitude: this.state.currentLatitude,
                                    longitude: this.state.currentLongitude,
                                }, 500)
                                this.setState({
                                    nearYou: true,
                                    latitude: this.state.currentLatitude,
                                    longitude: this.state.currentLongitude
                                })
                            }}
                                style={[styles.rowView1]}>
                                <View
                                    style={[styles.radioButton, { borderColor: this.state.nearYou ? AppColor.colors.blueTheme : AppColor.colors.black }]}>
                                    {
                                        this.state.nearYou ?
                                            <View style={[styles.radioSelected]} />
                                            : null
                                    }
                                </View>
                                <Text style={[styles.radioText]}>{I18n.t('nearYou')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => {
                                if (this.state.selectedProvince) {
                                    this._mapView.animateToCoordinate({
                                        latitude: parseFloat(this.state.selectedProvince.latitude),
                                        longitude: parseFloat(this.state.selectedProvince.longitude),
                                    }, 500)
                                    this.setState({
                                        nearYou: false,
                                        latitude: parseFloat(this.state.selectedProvince.latitude),
                                        longitude: parseFloat(this.state.selectedProvince.longitude)
                                    })
                                } else {
                                    this.setState({ nearYou: false })
                                }

                            }}
                                style={[styles.rowView1, { marginLeft: 25 }]}>
                                <View
                                    style={[styles.radioButton, { borderColor: !this.state.nearYou ? AppColor.colors.blueTheme : AppColor.colors.black }]}>
                                    {
                                        !this.state.nearYou ?
                                            <View style={[styles.radioSelected]} />
                                            : null
                                    }
                                </View>
                                <Text style={[styles.radioText]}>{I18n.t('byProvince')}</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={[styles.rowView2]}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ datePicker: true })
                                }}
                                style={{ width: '50%', justifyContent: 'center' }}>
                                <Text style={[styles.textButton]} >{
                                    moment(this.state.selectedStartDate).format('DD/MM/YYYY') + " - " + moment(this.state.selectedEndDate).format('DD/MM/YYYY')
                                }</Text>
                            </TouchableOpacity>
                            {!this.state.nearYou ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this.setState({ provincePicker: true })
                                    }}
                                    style={{ width: '50%', height: 35 }}>
                                    <Text style={[styles.textButton, { marginLeft: 10, textAlign: 'auto' }]} >{this.state.selectedProvince ? this.state.selectedProvince.province : I18n.t('selectProvince')}</Text>
                                </TouchableOpacity> : null
                            }

                        </View>
                    </View>
                    <MapView
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        ref={mapView => this._mapView = mapView}
                        onMapReady={() => {
                            this.setState({
                                latitude: this.state.currentLatitude,
                                longitude: this.state.currentLongitude
                            })
                        }}
                        provider={PROVIDER_GOOGLE}
                        style={[styles.map]}
                        initialRegion={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: LATITUDE_DELTA * Number(this.state.radius / 20000),
                            longitudeDelta: LONGITUDE_DELTA * Number(this.state.radius / 20000),
                        }}
                    >
                        {this.props.allIncidentList.length > 0 && this.props.allIncidentList.map((marker, index) => (
                            <Marker
                            image={marker.missing_people == "1" ? require('../../images/user_marker.png') : require('../../images/ship_marker.png')}
                                key={index}
                                coordinate={{ latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lng) }}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}

                        {this.props.missingObjectsList.length > 0 && this.props.missingObjectsList.map((marker, index) => (
                            <Marker
                                image={marker.missing_people == "1" ? require('../../images/user_marker.png') : require('../../images/ship_marker.png')}
                                key={index}
                                coordinate={{ latitude: parseFloat(marker.lat), longitude: parseFloat(marker.lng) }}
                                title={marker.title}
                                description={marker.description}
                            />
                        ))}
                        
                    </MapView>

                </View>

                {this.renderCalender()}
                {this.renderProvinceList()}

            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.ApplicationReducer.onLoad,
        mapData: state.ApplicationReducer.mapData,
        allIncidentList: state.ApplicationReducer.allIncidentList,
        missingObjectsList: state.ApplicationReducer.missingObjectsList
    };
}


const mapDispatchToProps = { getAllIncidents };

export default connect(mapStateToProps, mapDispatchToProps)(ReportedIncidents);