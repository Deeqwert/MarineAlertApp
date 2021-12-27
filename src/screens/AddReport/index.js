import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    Image,
    FlatList,
    Modal,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    PermissionsAndroid,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, Header, SecondaryInput, Button,DataManager } from '../../components';
import { changeLanguage, reportIncident } from "../../redux/actions/ApplicationAction";
import I18n from '../../translations/localeConfig';
import { AppColor, AppDimensions } from './../../utils';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from "react-native-image-picker";
import Geolocation from '@react-native-community/geolocation';
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps';


class AddReport extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            currentRegion: null,
            initialRegion: {
                latitude: 8.566354,
                longitude: -80.114793,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
            },
            chooseLocation: false,
            title: "",
            description: "",
            latitude: null,
            longitude: null,
            locationImages: [
                {

                },
                {

                },
                {

                },
                {

                }
            ],
            tag: "",
            contactNumber: "",
            tags: [],
        };
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);

        DataManager.getUserDetails().then((response) => {
            if (response !== null) {
                let result = JSON.parse(response)
                this.setState({
                contactNumber: result.contact_number,
                })
            }
            else {
            }
        })
        this.requestLocationPermission();
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

    addPhoto = async (index) => {
        const options = {
            storageOptions: {
                skipBackup: true
            }
        };
        await ImagePicker.showImagePicker(options, response => {
            if (response.didCancel) {
            } else if (response.error) {
                alert('ImagePicker Error:' + '\n' + response.error);
            } else if (response.customButton) {
                alert('User tapped custom button');
            } else {
                const newArray = [...this.state.locationImages];
                newArray.map((e, i) => {
                    if (i == index) {
                        e['url'] = response.uri
                        e['uri'] = response.uri
                        e['type'] = response.type
                        e['fileName'] = response.fileName
                    }
                })
                this.setState({ locationImages: newArray })
            }
        });

    }

    removePhoto = (index) => {
        const newArray = [...this.state.locationImages];
        newArray.map((e, i) => {
            if (i == index) {
                e['url'] = ""
            }
        })
        newArray.splice(index, 1)
        newArray.push({ "url": "" })
        this.setState({ locationImages: newArray })

    }

    addTag = () => {
        if (this.state.tag != "") {
            const newArray = [...this.state.tags];
            newArray.push({ "tag": this.state.tag })
            this.setState({ tags: newArray, tag: "" })
        }
    }
    removeTag = (index) => {
        const newArray = [...this.state.tags];
        newArray.splice(index, 1);
        this.setState({ tags: newArray })
    }

    reportIncident = () => {
        if (this.state.title.trim().length <= 0) {
            alert(I18n.t('enterTitle'))
        } else if (this.state.description.trim().length <= 0) {
            alert(I18n.t('enterDescription'))
        } 
        else if (this.state.contactNumber.trim().length <= 0) {
            alert(I18n.t('enterPhoneNumber'))
        }
        else {
            var selectedImages = []
            this.state.locationImages.map((item, index) => {
                if (item.url) {
                    selectedImages.push(item)
                }
            })
            this.props.reportIncident(
                this.state.title,
                this.state.description,
                this.state.currentRegion == null ? this.state.latitude : this.state.currentRegion.latitude,
                this.state.currentRegion == null ? this.state.longitude : this.state.currentRegion.longitude,
                selectedImages,
                this.state.tags,
                this.state.contactNumber,
                this.props.navigation
            )
        }

    }

    renderImageView = ({ item, index }) => (

        <View style={[styles.imageViewContainer, { borderWidth: item.url ? 0 : 0.5 }]}>
            <Image
                style={[styles.imageView, { width: item.url ? AppDimensions.deviceWidth * 0.5 - 25 : 50, height: item.url ? 150 : 50, }]}
                resizeMode="cover"
                source={item.url ? { uri: item.url } : require('../../images/image_bg.png')}
            />

            {index == 0 ? <TouchableOpacity
                onPress={() => {
                    if (item.url) {
                        this.removePhoto(index)
                    } else {
                        this.addPhoto(index)
                    }

                }}
                style={[styles.deleteButton, { backgroundColor: item.url ? AppColor.colors.alertColor : AppColor.colors.lightGrey1 }]}>
                <Image
                    style={[styles.deleteImage, { tintColor: item.url ? AppColor.colors.white : AppColor.colors.grey }]}
                    resizeMode="cover"
                    source={item.url ? require('../../images/delete.png') : require('../../images/add.png')}
                />

            </TouchableOpacity>
                :
                (index != 0 && this.state.locationImages[index - 1].url) ? <TouchableOpacity
                    onPress={() => {
                        if (item.url) {
                            this.removePhoto(index)
                        } else {
                            this.addPhoto(index)
                        }

                    }}
                    style={[styles.deleteButton, { backgroundColor: item.url ? AppColor.colors.alertColor : AppColor.colors.lightGrey1 }]}>
                    <Image
                        style={[styles.deleteImage, { tintColor: item.url ? AppColor.colors.white : AppColor.colors.grey }]}
                        resizeMode="cover"
                        source={item.url ? require('../../images/delete.png') : require('../../images/add.png')}
                    />

                </TouchableOpacity> : null
            }

        </View>
    );

    renderTagView = ({ item, index }) => (
        <View style={[styles.tagContainer]} >
            <Text style={[styles.tagText]}>{item.tag}</Text>
            <TouchableOpacity
                onPress={() => {
                    this.removeTag(index)
                }}
                style={[styles.removeButton]} >

                <Image style={[styles.removeImage]} source={require('../../images/close.png')} ></Image>
            </TouchableOpacity>
        </View>
    )

    chooseLocationManually = () => {
        var selectedRegion = null
        return (
            <Modal
                statusBarTranslucent
                transparent={true}
                animationType={'none'}
                visible={this.state.chooseLocation}>
                <TouchableOpacity
                    activeOpacity={1.0}
                    onPress={() => {
                        // this.setState({ chooseLocation: false })
                    }}
                    style={[styles.modalContainer]}>
                    <TouchableOpacity
                        activeOpacity={1.0}
                        onPress={() => { }}
                        style={[styles.modalWrapper]}>

                        <MapView
                            onRegionChangeComplete={(region) => {
                                selectedRegion = region
                            }}
                            showsMyLocationButton={true}
                            showsUserLocation={true}
                            ref={mapView => this._mapView = mapView}
                            initialRegion={this.state.initialRegion}
                            provider={PROVIDER_GOOGLE}
                            style={{
                                width: '100%',
                                height: '90%'
                            }}
                        >
                        </MapView>
                        <View style={{ position: 'absolute', alignSelf: 'center' }}>
                            <Image style={{
                                alignSelf: 'center',
                                width: 50,
                                height: 50
                            }} source={require('../../images/user_marker.png')} ></Image>
                        </View>
                        <TouchableOpacity
                            activeOpacity={1.0}
                            onPress={() => { }} style={{ padding: 15, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ chooseLocation: false })
                                }}
                                style={{ height: 20, borderColor: AppColor.colors.blueTheme, borderBottomWidth: 1 }} >
                                <Text style={[styles.titleText, { color: AppColor.colors.blueTheme, fontSize: 12 }]}>{I18n.t('cancel')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({ currentRegion: selectedRegion, chooseLocation: false })
                                }}
                                style={{ height: 20, borderColor: AppColor.colors.blueTheme, borderBottomWidth: 1 }} >
                                <Text style={[styles.titleText, { color: AppColor.colors.blueTheme, fontSize: 12 }]}>{I18n.t('add')}</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        )
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.backgroundLight }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
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
                        }} title={I18n.t('reportIncident')}></Header>

                        <ScrollView style={{ marginBottom: 10 }} contentContainerStyle={{ flexGrow: 1, }}>
                            <View style={[styles.container]}>
                                <SecondaryInput
                                    customStyles={{ mainView: { width: AppDimensions.deviceWidth - 20 } }}
                                    editable={true}
                                    title={I18n.t('title')}
                                    onChangeText={title => {
                                        this.setState({ title });
                                    }}
                                    value={this.state.title}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}></SecondaryInput>
                                <SecondaryInput
                                    customStyles={{ textInput: { height: 225 }, mainView: { width: AppDimensions.deviceWidth - 20 } }}
                                    editable={true}
                                    title={I18n.t('description')}
                                    onChangeText={description => {
                                        this.setState({ description });
                                    }}
                                    multiline={true}
                                    value={this.state.description}
                                    numberOfLines={5}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}></SecondaryInput>
                                <Text style={[styles.title1, { marginHorizontal: 15, marginTop: 15, marginBottom: 5, }]}>{I18n.t('incidentLocation')}</Text>
                                <Text style={[styles.titleText, { flex: 1, marginBottom: 10, marginHorizontal: 15 }]}>{this.state.currentRegion == null ? I18n.t('currentLocation') : this.state.currentRegion.latitude + ", " + this.state.currentRegion.longitude}</Text>
                                <View style={{ marginHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {
                                        this.state.currentRegion != null ? <TouchableOpacity
                                            onPress={() => {
                                                this.setState({ currentRegion: null })
                                            }}
                                            style={{ height: 20, borderColor: AppColor.colors.blueTheme, borderBottomWidth: 1 }} >
                                            <Text style={[styles.titleText, { color: AppColor.colors.blueTheme, fontSize: 12 }]}>{I18n.t('userCurrentLocation')}</Text>
                                        </TouchableOpacity> : null
                                    }

                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ chooseLocation: true })
                                        }}
                                        style={{ height: 20, borderColor: AppColor.colors.blueTheme, borderBottomWidth: 1 }} >
                                        <Text style={[styles.titleText, { color: AppColor.colors.blueTheme, fontSize: 12 }]}>{I18n.t('enterManually')}</Text>
                                    </TouchableOpacity>
                                </View>

                                <Text style={[styles.title1]}>{I18n.t('locationImages')}</Text>
                                <FlatList
                                    bounces={false}
                                    numColumns={2}
                                    contentContainerStyle={{ paddingHorizontal: 10 }}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.locationImages}
                                    extraData={this.state}
                                    renderItem={this.renderImageView}
                                />
                                {
                                    this.state.tags.length <= 1 ?
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                                            <SecondaryInput
                                                maxLength={15}
                                                customStyles={{ mainView: { width: AppDimensions.deviceWidth - 110 } }}
                                                editable={true}
                                                title={I18n.t('tags')}
                                                onChangeText={tag => {
                                                    if (tag.indexOf(" ") > -1) {
                                                        this.addTag()
                                                    } else {
                                                        this.setState({ tag });
                                                    }

                                                }}
                                                value={this.state.tag}
                                                numberOfLines={1}
                                                returnKeyType={"next"}
                                                keyboardType={"default"}
                                                autoCapitalize={"none"}></SecondaryInput>

                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.addTag()
                                                }}
                                                style={{ justifyContent: 'center', margin: 5, borderRadius: 3, width: 80, height: 45, backgroundColor: AppColor.colors.blueTheme }}>
                                                <Text style={[styles.titleText, { alignSelf: 'center', color: AppColor.colors.white }]}>{I18n.t('add')}</Text>
                                            </TouchableOpacity>
                                        </View> : null
                                }
                                <SecondaryInput
                                    maxLength={15}
                                    customStyles={{ mainView: { width: AppDimensions.deviceWidth - 20 } }}
                                    editable={true}
                                    title={I18n.t('phoneNo')}
                                    onChangeText={contactNumber => {
                                        this.setState({ contactNumber });
                                    }}
                                    value={this.state.contactNumber}
                                    numberOfLines={1}
                                    returnKeyType={"next"}
                                    keyboardType={"default"}
                                    autoCapitalize={"none"}></SecondaryInput>

                                <FlatList
                                    horizontal={true}
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{ paddingHorizontal: 15 }}
                                    data={this.state.tags}
                                    extraData={this.state}
                                    renderItem={this.renderTagView}
                                />

                            </View>
                        </ScrollView>
                        <Button
                            activeOpacity={0.5}
                            onPress={() => {
                                this.reportIncident()
                            }}
                            customStyles={{
                                container: {
                                    marginBottom: 20,
                                    width: AppDimensions.deviceWidth - 40,
                                },
                                buttonView: {
                                    backgroundColor: AppColor.colors.blueTheme,
                                }
                            }} Text={I18n.t('submit').toUpperCase()}></Button>
                        {this.chooseLocationManually()}
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

const mapDispatchToProps = { changeLanguage, reportIncident };

export default connect(mapStateToProps, mapDispatchToProps)(AddReport);
