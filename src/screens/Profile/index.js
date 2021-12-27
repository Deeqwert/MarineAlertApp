import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, SecondaryInput, Button, Header, DataManager } from '../../components';
import { updateProfileAction } from "../../redux/actions/AuthenticationAction";
import I18n from '../../translations/localeConfig';
import { AppColor, AppDimensions } from '../../utils';
import ImagePicker from "react-native-image-picker";
import CommonFunctions from "../../utils/CommonFunctions";
class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            editable: false,
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            profileImage: "",
            selectedImage: "",
        };
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        DataManager.getUserDetails().then((response) => {
            if (response !== null) {
                let result = JSON.parse(response)
                // alert(response)
                this.setState({
                    firstName: result.first_name,
                    lastName: result.last_name,
                    email: result.email,
                    phone: result.contact_number,
                    address: result.address,
                    profileImage: result.profile_image
                })
            }
            else {

            }
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    selectPhoto = async () => {
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
                var obj = {
                    "url": response.uri,
                    "uri": response.uri,
                    "type": response.type,
                    "fileName": response.fileName
                }
                this.setState({ selectedImage: obj });
            }
        });

    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.blueTheme }}>
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={'position'} keyboardVerticalOffset={-AppDimensions.deviceHeight * 0.090}>
                    <StatusBar hidden={false} backgroundColor={AppColor.colors.blueTheme} barStyle="light-content"> </StatusBar>
                    <Loader loading={this.props.onLoad}></Loader>
                    <View style={{ height: AppDimensions.deviceHeight }}>

                        <View style={{ height: AppDimensions.deviceHeight * 0.35, backgroundColor: AppColor.colors.blueTheme }}>
                            <Header customStyles={{
                                imageView: {
                                    tintColor: AppColor.colors.white
                                },
                                textStyle: {
                                    color: AppColor.colors.white
                                }
                            }} onPress={() => {
                                this.props.navigation.goBack();
                            }} title={this.state.editable ? I18n.t('editProfile') : I18n.t('userProfile')}></Header>
                            <View style={{
                                height: 120,
                                width: 120,
                                alignSelf: 'center',
                            }}>
                                <Image style={styles.profileImage}
                                    source={this.state.selectedImage ? { uri: this.state.selectedImage.url } : this.state.profileImage ? { uri: this.state.profileImage } : require('../../images/user_blank.png')} />
                                <TouchableOpacity
                                    onPress={() => {
                                        this.selectPhoto();
                                    }}
                                    style={styles.cameraImageView}>
                                    <Image style={styles.cameraImage} source={require('../../images/camera.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ height: AppDimensions.deviceHeight * 0.65, backgroundColor: AppColor.colors.backgroundLight }}>
                            <Button
                                onPress={() => {

                                 if (this.state.editable || this.state.selectedImage != "") {
                                    if (this.state.phone.trim().length <= 0) {
                                        alert(I18n.t('enterPhone'))
                                    } else if (!CommonFunctions.validatePhoneNumber(this.state.phone)) {
                                        alert(I18n.t('enterPhone'))
                                    }else{
                                        this.props.updateProfileAction(
                                            this.state.firstName,
                                            this.state.lastName,
                                            this.state.phone,
                                            this.state.selectedImage ? this.state.selectedImage : null,
                                            this.state.address,
                                            this.props.navigation
                                        )
                                    }
                                    }
                                }}
                                customStyles={{
                                    container: {
                                        position: 'absolute',
                                        bottom: 30,
                                        width: AppDimensions.deviceWidth - 40,
                                    },
                                    buttonView: {
                                        backgroundColor: AppColor.colors.blueTheme,
                                        opacity: (this.state.editable || this.state.selectedImage != "") ? 1.0 : 0.5,
                                    }
                                }} activeOpacity={(this.state.editable || this.state.selectedImage != "") ? 0.5 : 1.0} Text={I18n.t('update').toUpperCase()}></Button>
                        </View>
                        <View style={{
                            top: (AppDimensions.deviceHeight * 0.35) - 50,
                            width: AppDimensions.deviceWidth - 40,
                            marginHorizontal: 20,
                            marginVertical: 15,
                            paddingBottom: 10,
                            elevation: 2,
                            position: 'absolute',
                            backgroundColor: 'white',
                            height: AppDimensions.deviceHeight * 0.55
                        }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                <View
                                    style={styles.container}>
                                    {!this.state.editable && <TouchableOpacity
                                        onPress={() => {
                                            this.setState({ editable: true })
                                        }}
                                        style={{ alignSelf: 'flex-end', paddingTop: 10, paddingHorizontal: 10 }}>
                                        <Text style={styles.textStyle} >{I18n.t('edit')}</Text>
                                    </TouchableOpacity>}

                                    <SecondaryInput
                                        editable={this.state.editable}
                                        title={I18n.t('firstName')}
                                        onChangeText={firstName => {
                                            this.setState({ firstName });
                                        }}
                                        value={this.state.firstName}
                                        numberOfLines={1}
                                        returnKeyType={"next"}
                                        keyboardType={"default"}
                                        autoCapitalize={"none"}
                                        placeholder={I18n.t("enterFirstName")}></SecondaryInput>

                                    <SecondaryInput
                                        editable={this.state.editable}
                                        title={I18n.t('lastName')}
                                        onChangeText={lastName => {
                                            this.setState({ lastName });
                                        }}
                                        value={this.state.lastName}
                                        maxLength={15}
                                        numberOfLines={1}
                                        returnKeyType={"next"}
                                        keyboardType={"default"}
                                        autoCapitalize={"none"}
                                        placeholder={I18n.t("enterLastName")}></SecondaryInput>

                                    <SecondaryInput
                                        editable={this.state.editable}
                                        title={I18n.t('email')}
                                        onChangeText={email => {
                                            this.setState({ email });
                                        }}
                                        value={this.state.email}
                                        numberOfLines={1}
                                        returnKeyType={"next"}
                                        keyboardType={"email-address"}
                                        autoCapitalize={"none"}
                                        placeholder={I18n.t("enterEmail")}></SecondaryInput>

                                    <SecondaryInput
                                        editable={this.state.editable}
                                        title={I18n.t('phoneNo')}
                                        onChangeText={phone => {
                                            this.setState({ phone });
                                        }}
                                        value={this.state.phone}
                                        numberOfLines={1}
                                        returnKeyType={"next"}
                                        keyboardType={"phone-pad"}
                                        autoCapitalize={"none"}
                                        placeholder={I18n.t("enterPhone")}></SecondaryInput>
                                    <SecondaryInput
                                        customStyles={{ textInput: { height: 90 } }}
                                        editable={this.state.editable}
                                        title={I18n.t('address')}
                                        onChangeText={address => {
                                            this.setState({ address });
                                        }}
                                        multiline={true}
                                        value={this.state.address}
                                        numberOfLines={2}
                                        returnKeyType={"next"}
                                        keyboardType={"default"}
                                        autoCapitalize={"none"}
                                        placeholder={I18n.t("enterAddress")}></SecondaryInput>
                                </View>

                            </ScrollView>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
  

              );

    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.AuthenticationReducer.onLoad,

    };
}

const mapDispatchToProps = { updateProfileAction };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);