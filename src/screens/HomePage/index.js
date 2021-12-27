import React, { Component } from "react";
import {
    Text,
    StatusBar,
    SafeAreaView,
    Image,
    View,
    FlatList,
    ScrollView,
    TouchableOpacity,
    KeyboardAvoidingView,
    BackHandler,
    Platform,
    PermissionsAndroid
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import I18n from '../../translations/localeConfig';
import { Loader } from '../../components';
import { getAdminEmail, emergencyContacts, getMapData, saveLocation } from '../../redux/actions/ApplicationAction'
import { AppColor } from '../../utils'
import Geolocation from '@react-native-community/geolocation';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            buttonsData: [
                {
                    id: 1,
                    color: AppColor.colors.white,
                    title: "noticeNAlert",
                    image: require('../../images/warning_icon.png')

                },
                {
                    id: 2,
                    color: AppColor.colors.white,
                    title: "weatherForecast",
                    image: require('../../images/weather_icon.png')

                },
                {
                    id: 3,
                    color: AppColor.colors.white,
                    title: "maritimeConditions",
                    image: require('../../images/boat_icon.png')
                },
                {
                    id: 4,
                    color: AppColor.colors.white,
                    title: "maritimeIncidents",
                    image: require('../../images/sinking_icon.png')
                },
                {
                    id: 5,
                    color: AppColor.colors.white,
                    title: "aidToNavigation",
                    image: require('../../images/cargo_ship.png')
                },
                {
                    id: 6,
                    color: AppColor.colors.white,
                    title: "digitalCompass",
                    image: require('../../images/compass_icon.png')
                },
                {
                    id: 7,
                    color: "#DD1F2B",
                    title: "panicButton",
                    image: require('../../images/sos_icon.png')
                },
                {
                    id: 8,
                    color: AppColor.colors.white,
                    title: "emergencyContacts",
                    image: require('../../images/phone_icon.png')
                },
                {
                    id: 9,
                    color: AppColor.colors.white,
                    title: "preferences",
                    image: require('../../images/settings_icon.png')
                }
            ]

        };

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        setTimeout(() => {
            this.props.getAdminEmail(this.props.navigation)
            this.props.getMapData(this.props.navigation);
        }, 500);
        this.requestLocationPermission();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp()
        return true;
    }

    requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
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
                    this.getOneTimeLocation()
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            this.getOneTimeLocation()
        }
    };

    getOneTimeLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                setTimeout(() => {
                    this.props.saveLocation(position.coords.latitude, position.coords.longitude, this.props.navigation)
                }, 500);
                // console.log(JSON.stringify(position))
            },
            (error) => {
                // console.log(JSON.stringify(error))
            } ,
        );
    };

    onOptionSelect(index) {
        switch (index) {
            case 0:
                this.props.navigation.navigate('MainTab')
                break;
            case 1:
                this.props.navigation.navigate('SecondaryTab')
                break;
            case 2:
                this.props.navigation.navigate('MaritimeConditions')
                break;
            case 3:
                this.props.navigation.navigate('MaritimeIncidents')
                break;
            case 4:
                this.props.navigation.navigate('PortLocation')
                break;
            case 5:
                this.props.navigation.navigate('DigitalCompass')
                break;
            case 6:
                this.props.navigation.navigate('SOSTab')
                break;
            case 7:
                this.props.emergencyContacts(this.props.navigation)
                break;
            case 8:
                this.props.navigation.navigate('Settings')
                break;
            default:
                break;
        }
    }

    renderBtnView = ({ item, index }) => (
        <TouchableOpacity
            style={[styles.cardContainer, { backgroundColor: item.color }]}
            onPress={() => {
                this.onOptionSelect(index)
            }} >
            <Image
                style={[styles.cardImage]}
                resizeMode="contain"
                source={item.image}
            />
            <Text style={[styles.cardText, {
                color: index == 6 ? AppColor.colors.white : AppColor.colors.black
            }]} >{I18n.t(item.title)}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <StatusBar hidden={false} backgroundColor={AppColor.colors.blueTheme} barStyle="light-content"> </StatusBar>
                    <Loader loading={this.props.onLoad || this.props.onLoad1}></Loader>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>

                            <Image
                                resizeMode="contain"
                                style={[styles.imageLogo]} source={require('../../images/app_logo.png')}></Image>

                            <Text style={[styles.titleText]} >{I18n.t("appTitle")}</Text>
                            <FlatList
                                bounces={false}
                                contentContainerStyle={{ padding: 10 }}
                                showsHorizontalScrollIndicator={false}
                                data={this.state.buttonsData}
                                extraData={this.state}
                                renderItem={this.renderBtnView}
                                numColumns={3}
                            />
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
        onLoad: state.AuthenticationReducer.onLoad,
        onLoad1: state.ApplicationReducer.onLoad
    };
}

const mapDispatchToProps = { emergencyContacts, getAdminEmail, getMapData, saveLocation };

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
