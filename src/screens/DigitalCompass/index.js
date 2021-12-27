import React, { Component } from "react";
import {
    Text,
    View,
    Image,
    Dimensions,
    SafeAreaView,
    StatusBar,
    ImageBackground,
    BackHandler
} from "react-native";
import {
    magnetometer,
    SensorTypes,
    setUpdateIntervalForType
} from "react-native-sensors";
import LPF from "lpf";
import { connect } from "react-redux";
import I18n from '../../translations/localeConfig';
import { AppColor, AppFontFamily } from './../../utils';
import { Header } from '../../components';

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

class DigitalCompass extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            magnetometer: "0",
        };
        LPF.init([]);
        LPF.smoothing = 0.2;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._toggle();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        this._unsubscribe();
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    _toggle = () => {
        if (this._subscription) {
            this._unsubscribe();
        } else {
            this._subscribe();
        }
    };

    _subscribe = async () => {
        setUpdateIntervalForType(SensorTypes.magnetometer, 5);
        this._subscription = magnetometer.subscribe(
            sensorData => this.setState({ magnetometer: this._angle(sensorData) }),
            error => {
                // console.log("The sensor is not available")
            } ,
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.unsubscribe();
        this._subscription = null;
    };

    _angle = magnetometer => {
        let angle = 0;
        if (magnetometer) {
            let { x, y } = magnetometer;
            if (Math.atan2(y, x) >= 0) {
                angle = Math.atan2(y, x) * (180 / Math.PI);
            } else {
                angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
            }
        }
        return Math.round(LPF.next(angle));
    };

    _direction = degree => {
        if (degree >= 22.5 && degree < 67.5) {
            return "NE";
        } else if (degree >= 67.5 && degree < 112.5) {
            return "E";
        } else if (degree >= 112.5 && degree < 157.5) {
            return "SE";
        } else if (degree >= 157.5 && degree < 202.5) {
            return "S";
        } else if (degree >= 202.5 && degree < 247.5) {
            return "SW";
        } else if (degree >= 247.5 && degree < 292.5) {
            return "W";
        } else if (degree >= 292.5 && degree < 337.5) {
            return "NW";
        } else {
            return "N";
        }
    };

    _degree = magnetometer => {
        return magnetometer - 90 >= 0
            ? magnetometer - 90
            : magnetometer + 271;
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>
                <StatusBar hidden={false} backgroundColor={AppColor.colors.blueTheme} barStyle="light-content"> </StatusBar>
                <ImageBackground
                    // source={require('../../images/compass_bg.png')}
                    style={{ backgroundColor: AppColor.colors.blueTheme, flex: 1 }}>
                    <Header customStyles={{ container: { flex: 0.30 } }} onPress={() => {
                        this.props.navigation.goBack();
                    }} title={I18n.t('digitalCompass')}></Header>
                    <View style={{ justifyContent: 'center', alignItems: "center", flex: 0.7 }}>
                        <Text
                            style={{
                                color: AppColor.colors.white,
                                fontSize: 25,
                                fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
                            }}
                        >
                            {this._direction(this._degree(this.state.magnetometer))}
                        </Text>
                    </View>

                    <View style={{
                        justifyContent: 'flex-end',
                        alignItems: "center",
                        flex: 0.6
                    }}>
                        <Image
                            source={require("../../images/compass_pointer.png")}
                            style={{
                                height: 25,
                                resizeMode: "contain",
                            }}
                        />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        flex: 2
                    }}>
                        <Text
                            style={{
                                color: AppColor.colors.white,
                                fontSize: 25,
                                width: width,
                                position: "absolute",
                                fontFamily: AppFontFamily.fontFamily.robotoMedium,
                                textAlign: "center",
                            }}
                        >
                            {this._degree(this.state.magnetometer)}°</Text>
                        <Image
                            source={require("../../images/compass_reading.png")}
                            style={{
                                height: width - 80,
                                justifyContent: "center",
                                alignItems: "center",
                                resizeMode: "contain",
                                transform: [
                                    { rotate: 360 - this.state.magnetometer + "deg" },
                                ],
                            }}
                        />
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: "center",
                        flex: 1
                    }}>
                        {/* <Text style={{ fontFamily: AppFontFamily.fontFamily.robotoRegular, fontSize: 14, color: AppColor.colors.white }}>30.705471, 76.713876</Text> */}
                    </View>
                </ImageBackground>
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

export default connect(mapStateToProps, mapDispatchToProps)(DigitalCompass);