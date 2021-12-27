import React, { Component } from "react";
import {
    View,
    Text,
    PermissionsAndroid,
    Platform,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    BackHandler,
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, WaveIndicator, Header ,DataManager,Button} from '../../components';
import { sendSOS } from "../../redux/actions/ApplicationAction";
import I18n from '../../translations/localeConfig';
import Geolocation from '@react-native-community/geolocation';
import { AppColor, AppFontFamily } from './../../utils';
import LinearGradient from 'react-native-linear-gradient';
import SwipeButton from 'rn-swipe-button';
class MainTab extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            currentRegion: {
                latitude: null,
                longitude: null,
            },
            contactNumber:"",
        };
    }
    componentDidMount() {
       
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        DataManager.getUserDetails().then((response) => {
            if (response !== null) {
                let result = JSON.parse(response)
                this.setState({
                contactNumber:result.contact_number,
                })
            }
            else {
            }
        })
        this.requestLocationPermission();
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
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                console.log(JSON.stringify(position))
            },
            (error) => {
                console.log(JSON.stringify(error))
            } ,
        );
    };

    subscribeLocationLocation = () => {
        Geolocation.watchPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                // console.log(JSON.stringify(position))
            },
            (error) => {
                // console.log(JSON.stringify(error))
            },
            { enableHighAccuracy: true, maximumAge: 1000 },
        );
    };
    componentDidUpdate(){
        DataManager.getUserDetails().then((response) => {
            if (response !== null) {
                let result = JSON.parse(response)
                this.setState({
                contactNumber:result.contact_number,
                })
            }
            else {
            }
        })
    }
   
    renderBtnView = () => (
        <View
            style={{ width: 100, height: 100, borderRadius: 50, justifyContent: 'center' }}>
            <WaveIndicator count={2} size={120} color={AppColor.colors.alertColor} waveMode='fill' />
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('AddReport')
                }}
                style={[styles.button]}>
                <Text style={[styles.buttonText]}>{I18n.t('sos').toUpperCase()}</Text>
            </TouchableOpacity>
        </View>
    );


    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight,marginTop:Platform.OS=="ios"?30:10 }}>
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
                        title={I18n.t('panicButton')}
                    ></Header>
                   

                    <View style={{ flex: 1, justifyContent: 'center' }}>
                    
                    <View style={{marginHorizontal:20,padding:8}}>
                         <Text style={styles.SosNumberAlert}>{this.state.contactNumber!=""? 
                         I18n.t('phoneNumberExist'):I18n.t('phoneNumberNotExist')}</Text>
                         <View style={{height:5}}></View>

                        {
                            this.state.contactNumber==""?
                            <Button  onPress={()=>{
                                this.state.contactNumber==""? this.props.navigation.navigate("Profile"):null
                               }} customStyles={{
                                       container: {
                                           marginTop: 10,
                                       },
                                       buttonView: {
                                           backgroundColor: AppColor.colors.blueTheme
                                       },
                                       textStyle: {
                                           color: AppColor.colors.white
                                       }
                                   }} activeOpacity={0.5}
                                    Text={this.state.contactNumber!=""? this.state.contactNumber:  I18n.t('addContact').toUpperCase()}>
                                    </Button>:

                                <Text style={styles.titleText}>{ this.state.contactNumber!=""? this.state.contactNumber:I18n.t('addContact')}</Text>
                        }

                        
                      </View>

                        <SwipeButton
                            onSwipeSuccess={() => {
                                this.props.sendSOS(this.state.latitude, this.state.longitude,this.state.contactNumber, this.props.navigation)
                            }}
                            containerStyles={{ alignSelf: 'center', marginBottom: 50,marginTop:50 }}
                            height={100}
                            railBackgroundColor={'white'}
                            railBorderColor={AppColor.colors.alertColor}
                            width={'85%'}
                            thumbIconBackgroundColor={AppColor.colors.white}
                            thumbIconComponent={this.renderBtnView}
                            title={"               " + I18n.t('slideSOS')}
                            thumbIconStyles={{ borderWidth: 0 }}
                            titleStyles={{
                                fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
                                fontSize: 12
                            }}
                            railStyles={{
                                backgroundColor: AppColor.colors.alertColor,
                                borderColor: AppColor.colors.alertColor,
                            }}

                        />

                        <Text style={styles.titleText}>{I18n.t('keepCalm').toUpperCase()}</Text>
                        <Text style={styles.messageText}>{I18n.t('sosMessage')}</Text>

                    </View>

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
        sosResult: state.ApplicationReducer.sosResult
    };
}

const mapDispatchToProps = { sendSOS };

export default connect(mapStateToProps, mapDispatchToProps)(MainTab);
