import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    Image,
    ScrollView,
    Animated,
    Linking,
    TouchableOpacity,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, Header } from '../../components';
import I18n from '../../translations/localeConfig';
import { AppColor, AppDimensions, CommonFunctions } from './../../utils';
import { WebView } from 'react-native-webview';
import { getRelatedIncidents, getIncidentDetail } from '../../redux/actions/ApplicationAction';

class AlertDetails extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            animation: new Animated.Value(300),
            animation1: new Animated.Value(270),
            webViewHeight: AppDimensions.deviceHeight,
            collapsed: true,
        };
        this.incidentId = this.props.navigation.state.params.incidentId ? this.props.navigation.state.params.incidentId : ""
        this.province = this.props.navigation.state.params.province ? this.props.navigation.state.params.province : ""

    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        this.getIncidentDetail();
        this.getRelatedIncidents();
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack();
        return true;
    }

    getRelatedIncidents() {
        this.props.getRelatedIncidents(
            this.incidentId,
            this.props.navigation);

    }

    getIncidentDetail() {
        this.props.getIncidentDetail(
            this.incidentId,
            this.province,
            this.props.navigation);

    }

    onMorePress = (value) => {
        this.setState({ collapsed: value }, () => {
            Animated.parallel([
                Animated.timing(this.state.animation, {
                    toValue: value ? 300 : 450,
                    duration: 300,
                }),
                Animated.timing(this.state.animation1, {
                    toValue: value ? 270 : 420,
                    duration: 300,
                }),

            ]).start();
        })

    }

    renderImageView = ({ item, index }) => (
        <TouchableOpacity activeOpacity={0.8} style={{ backgroundColor: AppColor.colors.white, borderRadius: 3, marginLeft: 5, marginRight: 10, height: 150, width: 150, }}
            onPress={() => { }}>
            <Image
                style={{ width: 150, height: 150, borderRadius: 3 }}
                resizeMode="cover"
                source={item ? { uri: item } : require('../../images/image_bg.png')}
            />

        </TouchableOpacity>
    );

    renderReportView = ({ item, index }) => (
        <View style={{ marginBottom: 15, width: '100%', borderRadius: 3, backgroundColor: AppColor.colors.white, paddingHorizontal: 15, paddingVertical: 10 }}
        >
            <Text numberOfLines={2} style={[styles.title]}>{item.post_title}</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10
            }}>
                <Image style={styles.imageView} source={require('../../images/calendar.png')}></Image>
                <Text style={[styles.titleHeader]}>{CommonFunctions.parseDate(item.post_modified)}</Text>
                <Image style={[styles.imageView, { marginLeft: 20 }]} source={require('../../images/clock.png')}></Image>
                <Text style={[styles.titleHeader]}>{CommonFunctions.parseTime(item.post_modified)}</Text>
            </View>
            <Text numberOfLines={3} style={[styles.titleHeader]}>{item.post_content}</Text>
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
                }} title={I18n.t('alertDetails')}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>

                        <View style={{
                            borderRadius: 3,
                            margin: 15,
                            padding: 10,
                            width: AppDimensions.deviceWidth - 30,
                            backgroundColor: AppColor.colors.white
                        }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[styles.titleText]}>{I18n.t('province')}</Text>
                                <Text style={[styles.titleText]}>{this.province}</Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 10
                            }}>
                                <Image style={styles.imageView} source={require('../../images/calendar.png')}></Image>
                                <Text style={[styles.titleHeader, { flex: 1 }]}>{CommonFunctions.parseDate(this.props.incidentDetail == null ? "" : this.props.incidentDetail.post_modified)}</Text>
                                <Image style={[styles.imageView, { marginLeft: 20 }]} source={require('../../images/clock.png')}></Image>
                                <Text style={[styles.titleHeader]}>{CommonFunctions.parseTime(this.props.incidentDetail == null ? "" : this.props.incidentDetail.post_modified)}</Text>
                            </View>
                        </View>

                        <Animated.View style={{
                            overflow: 'hidden',
                            marginHorizontal: 15,
                            alignItems: 'center',
                            height: this.state.animation,
                            width: AppDimensions.deviceWidth - 30,
                        }}>

                            <Animated.View style={{
                                borderRadius: 3,
                                height: this.state.animation1,
                                backgroundColor: 'white',
                                width: '100%',
                                paddingHorizontal: 10,
                                paddingTop: 10,
                                paddingBottom: 45,
                                overflow: 'hidden'
                            }}>
                                <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    contentContainerStyle={{ flexGrow: 1 }}
                                    nestedScrollEnabled={true}>
                                    <Text style={[styles.title]}>{this.props.incidentDetail == null ? "" : this.props.incidentDetail.post_title}</Text>
                                    <WebView
                                        showsHorizontalScrollIndicator={false}
                                        showsVerticalScrollIndicator={false}
                                        style={{ marginTop: 10, height: this.state.webViewHeight }}
                                        textZoom={200}
                                        javaScriptEnabled={true}
                                        cacheEnabled={true}
                                        onShouldStartLoadWithRequest={(event) => {
                                            Linking.openURL(event.url)
                                            return false
                                        }}
                                        source={{ html: this.props.incidentDetail == null ? "" : this.props.incidentDetail.post_content }}
                                    />

                                </ScrollView>

                            </Animated.View>
                            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.onMorePress(!this.state.collapsed)
                                    }}
                                    activeOpacity={0.9}
                                    style={{
                                        alignSelf: 'center',
                                        width: 60,
                                        justifyContent: 'center',
                                        height: 60,
                                        elevation: 3,
                                        borderRadius: 30,
                                        backgroundColor: AppColor.colors.alertColor
                                    }}>
                                    <Image
                                        style={{
                                            tintColor: AppColor.colors.white,
                                            alignSelf: 'center',
                                            width: 30,
                                            height: 30,
                                        }}
                                        source={this.state.collapsed ? require('../../images/chevron_down.png') : require('../../images/chevron_up.png')}
                                    />
                                </TouchableOpacity>
                            </View>

                        </Animated.View>

                        {(this.props.incidentDetail != null && this.props.incidentDetail.attachments) ? <View>
                            <Text style={[styles.title1]}>{I18n.t('locationImages')}</Text>
                            <FlatList
                                bounces={false}
                                horizontal={true}
                                contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 10 }}
                                showsHorizontalScrollIndicator={false}
                                data={this.props.incidentDetail.attachments}
                                extraData={this.state}
                                renderItem={this.renderImageView}
                            />
                        </View> : null}

                        {
                            this.props.relatedIncidentList.length > 0 ? <View>
                                <Text style={[styles.title1]}>{I18n.t('relatedReports')}</Text>

                                <FlatList
                                    bounces={false}
                                    style={{ paddingHorizontal: 15, marginBottom: 10 }}
                                    showsHorizontalScrollIndicator={false}
                                    data={this.props.relatedIncidentList}
                                    extraData={this.state}
                                    renderItem={this.renderReportView}
                                />
                            </View>
                                : null
                        }

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
        incidentDetail: state.ApplicationReducer.incidentDetail,
        relatedIncidentList: state.ApplicationReducer.relatedIncidentList
    };
}

const mapDispatchToProps = { getRelatedIncidents, getIncidentDetail };

export default connect(mapStateToProps, mapDispatchToProps)(AlertDetails);
