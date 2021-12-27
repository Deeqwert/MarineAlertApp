import React, { Component } from "react";
import {
    View,
    SafeAreaView,
    StatusBar,
    FlatList,
    ScrollView,
    Platform,
    TouchableOpacity,
    Text,
    Image,
    BackHandler,
    Linking
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, Header } from '../../components';
import I18n from '../../translations/localeConfig';
import { AppColor } from './../../utils';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

class EmergencyContacts extends Component {

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
        <View style={{ overflow: 'hidden', marginTop: 5, marginBottom: 15, width: '100%', borderRadius: 3, backgroundColor: 'white', padding: 10 }}
        >
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderBottomColor: AppColor.colors.lightGrey, paddingBottom: 10
            }}>

                <Text numberOfLines={2} style={[styles.titleText]}>{item.name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (Platform.OS == "ios") {
                            Linking.openURL("tel:/" + item.contact)
                        } else {
                            RNImmediatePhoneCall.immediatePhoneCall(item.contact);
                        }

                    }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        justifyContent: 'center',
                        backgroundColor: AppColor.colors.alertColor
                    }}>
                    <Image style={[styles.imageView]} source={require('../../images/phone_filled.png')}></Image>
                </TouchableOpacity>

            </View>
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                marginBottom: 5,
                overflow: 'hidden'
            }}>
                <Image style={[styles.imageView1]} source={require('../../images/map_marker_outline.png')}></Image>
                <Text numberOfLines={2} style={[styles.titleHeader]}>{item.address}</Text>
            </View>
            <View style={{
                marginBottom: 10,
                marginTop: 5,
                flexDirection: 'row',
                overflow: 'hidden'
            }}>
                <Image style={[styles.imageView1]} source={require('../../images/phone.png')}></Image>
                <Text numberOfLines={2} style={[styles.titleHeader]}>{item.contact}</Text>
            </View>

        </View>
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
                }} title={I18n.t('emergencyContacts')}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <FlatList
                            bounces={false}
                            style={{ paddingHorizontal: 10, marginBottom: 10 }}
                            showsHorizontalScrollIndicator={false}
                            data={this.props.emergencyContactList}
                            extraData={this.state}
                            renderItem={this.renderReportView}
                        />
                    </View>
                </ScrollView >
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.ApplicationReducer.onLoad,
        emergencyContactList: state.ApplicationReducer.emergencyContactList,
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyContacts);
