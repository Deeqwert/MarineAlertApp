import React, { Component } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StatusBar,
    FlatList,
    ScrollView,
    BackHandler
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Loader, Header, NotificationView } from '../../components';
import I18n from '../../translations/localeConfig';
import { AppColor } from './../../utils';

class Notifications extends Component {

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

    renderView = ({ item, index }) => (
        <NotificationView
            onPress={() => {
                this.props.navigation.navigate('AlertDetails', { province: "", incidentId: item.post_id })
            }}
            title={item.title}
            message={item.description}
            timeStamp={item.created_at} />
    );

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: AppColor.colors.backgroundDark }}>
                <StatusBar hidden={false} backgroundColor={AppColor.colors.backgroundDark} barStyle="light-content"> </StatusBar>
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
                }} title={I18n.t('notifications')}
                />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        {!this.props.onLoad && this.props.notificationList.length > 0 ?
                            <FlatList
                                bounces={false}
                                style={{ paddingHorizontal: 10, marginBottom: 10 }}
                                showsHorizontalScrollIndicator={false}
                                data={this.props.notificationList}
                                extraData={this.state}
                                renderItem={this.renderView}
                            /> : !this.props.onLoad ?
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={styles.titleText}>{I18n.t('notifications')}</Text>
                                    <Text style={styles.messageText}>{I18n.t('notificationMessage')}</Text>
                                </View> : null}

                    </View>
                </ScrollView >
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language,
        onLoad: state.AuthenticationReducer.onLoad,
        notificationList: state.AuthenticationReducer.notificationList
    };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
