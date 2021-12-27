import React, { Component } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Text,
  BackHandler,
  ScrollView,
  Linking
} from "react-native";
import styles from "./styles";
import { AppColor, AppDimensions } from "../../utils"
import { connect } from "react-redux";
import BottomSheet from '../../components/BottomSheet';
import MenuItem from '../../components/MenuItem';
import I18n from '../../translations/localeConfig';
import DataManager from '../../components/DataManager';
import { getIncidents, getProcedureReading, getAdminEmail, emergencyContacts } from '../../redux/actions/ApplicationAction'
import { getNotificationList, logout } from '../../redux/actions/AuthenticationAction'
class BottomNavigator extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      name: "",
      email: "",
      profileImage: "",
      currentPageParams: "",
      buttonsData: [
        {
          isSelected: true,
          name: "home",
          image: require("./../../images/home.png"),
        },
        {
          isSelected: false,
          name: "info",
          image: require("./../../images/info.png"),
        },
        {
          isSelected: false,
          name: "sos",
          image: require("./../../images/siren.png"),
        },
        {
          isSelected: false,
          name: "more",
          image: require("./../../images/menu.png"),
        },
      ],
      selectedIndex: 0
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    return true;
  }

  componentWillReceiveProps(nextProps) {
    const { routes, index } = this.props.navigation.state;

    let currentStack = routes[index]
    let { routes: currentRoute, index: currentPageIndex } = currentStack
    let currentPage = currentRoute[currentPageIndex]
    let currentPageKey = currentPage.routeName
    let currentPageParams = currentPage.params;
    this.setState({ currentPageParams })
  }

  componentDidMount() {
    DataManager.getUserDetails().then((response) => {
      if (response !== null) {
        let result = JSON.parse(response)
        // alert(response)
        this.setState({
          name: result.first_name + " " + result.last_name,
          email: result.email,
          profileImage: result.profile_image
        })
      }
      else {

      }
    })
    setTimeout(() => {
      this.props.getAdminEmail(this.props.navigation)
    }, 500);
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    const { routes, index } = this.props.navigation.state;
    if (routes[index].key == "MainTabStack") {
      this.setState({ selectedIndex: 0 });
    } else if (routes[index].key == "SecondaryTabStack") {
      this.setState({ selectedIndex: 1 });
    } else if (routes[index].key == "SOSStack") {
      this.setState({ selectedIndex: 2 });
    } else if (routes[index].key == "MenuStack") {
    }
  }

  renderBtnView = ({ item, index }) => (
    <TouchableOpacity style={[styles.buttonContainer]}
      onPress={() => this.onTabItemClicked(index, item)}>
      <View style={[styles.button, { backgroundColor: index == this.state.selectedIndex ? AppColor.colors.tabSelected : AppColor.colors.white }]}>
        <Image
          style={[styles.addImage,
          { tintColor: index == this.state.selectedIndex ? AppColor.colors.white : AppColor.colors.grey }
          ]}
          resizeMode="contain"
          source={item.image}
        />
      </View>

    </TouchableOpacity>
  );

  onTabItemClicked(tabIndex, item) {
    let { navigation } = this.props;
    if (tabIndex == 0) {
      this.setState({ selectedIndex: tabIndex });
      navigation.navigate("MainTabStack")
    } else if (tabIndex == 1) {
      this.setState({ selectedIndex: tabIndex });
      navigation.navigate("SecondaryTabStack")
    } else if (tabIndex == 2) {
      this.setState({ selectedIndex: tabIndex });
      navigation.navigate("SOSStack")
    } else if (tabIndex == 3) {
      this.menuOptionSheet.open();
    }
  }

  bottomSheetComponent = () => {
    var height = AppDimensions.deviceHeight * 0.83
    return (
      <BottomSheet
        ref={ref => {
          this.menuOptionSheet = ref;
        }}
        height={height}
        width={AppDimensions.deviceWidth}
        openDuration={700}
        customStyles={{
          container: {
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            backgroundColor: AppColor.colors.white,
            alignItems: "center",
            position: 'absolute',
            bottom: 0
          },
        }}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Profile')
            this.menuOptionSheet.close();
          }}
          style={styles.profileContainer} >
          <Image style={styles.profileImage} source={this.state.profileImage ? { uri: this.state.profileImage } : require('../../images/user_blank.png')} ></Image>
          <View style={styles.profileInfoView}>
            <Text numberOfLines={1} style={styles.profileTitleText}>{this.state.name}</Text>
            <Text numberOfLines={1} style={styles.profileText}>{this.state.email}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.menuContainer}>
            <MenuItem
              onPress={() => {
                this.props.emergencyContacts(this.props.navigation)
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('emergencyContacts')}
              imageSource={require('../../images/phone.png')} />

            <MenuItem
              onPress={() => {
                this.props.getProcedureReading(this.props.navigation)
                this.menuOptionSheet.close();

              }}
              activeOpacity={0.5}
              text={I18n.t('procedureReading')}
              imageSource={require('../../images/safety.png')} />

            <MenuItem
              onPress={() => {
                this.props.getNotificationList(this.props.navigation)
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('notifications')}
              imageSource={require('../../images/alert.png')} />

            <MenuItem
              onPress={() => {
                this.props.getIncidents(this.props.navigation)
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('reportIncident')}
              imageSource={require('../../images/board.png')} />

            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('ReportedIncidents')
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('reportedIncidents')}
              imageSource={require('../../images/board.png')} />

            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('GPSLocator')
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('searchMissing')}
              imageSource={require('../../images/gps.png')} />

            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('DigitalCompass')
                this.menuOptionSheet.close();

              }}
              activeOpacity={0.5}
              text={I18n.t('digitalCompass')}
              imageSource={require('../../images/compass.png')} />

            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('MaritimeConditions')
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('maritimeConditions')}
              imageSource={require('../../images/forecast.png')} />

            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('PortLocation')
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('aidToNavigation')}
              imageSource={require('../../images/lock_outline.png')} />

            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('Settings')
                this.menuOptionSheet.close();

              }}
              activeOpacity={0.5}
              text={I18n.t('settings')}
              imageSource={require('../../images/settings.png')} />

            <MenuItem
              onPress={() => {
                this.menuOptionSheet.close();
                this.sendEmail()
              }}
              activeOpacity={0.5}
              text={I18n.t('contactUs')}
              imageSource={require('../../images/user.png')} />

            <MenuItem
              onPress={() => {
                this.props.navigation.navigate('TermsNConditions')
                this.menuOptionSheet.close();
              }}
              activeOpacity={0.5}
              text={I18n.t('termConditions')}
              imageSource={require('../../images/condition.png')} />

            <MenuItem
              onPress={() => {
                this.props.logout(this.props.navigation);
              }}
              customStyles={{
                container: {
                  marginTop: 50
                }
              }}
              activeOpacity={0.5}
              text={I18n.t('logout')}
              imageSource={require('../../images/logout.png')} />
          </View>
        </ScrollView>


      </BottomSheet>

    );
  }

  sendEmail = () => {
    DataManager.getAdminEmail().then((response) => {
      if (response !== null) {
        let result = JSON.parse(response)
        Linking.openURL('mailto:' + result.admin_email)
      }
    })
  }

  render() {
    return (
      <View>
        <View style={[styles.mainContainer]}>
          <FlatList
            bounces={false}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.buttonsData}
            extraData={this.state}
            renderItem={this.renderBtnView}
            scrollEnabled={false}
          />
        </View>
        {this.bottomSheetComponent()}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.ApplicationReducer.language
  };
}
const mapDispatchToProps = {
  getIncidents,
  getNotificationList,
  getProcedureReading,
  getAdminEmail,
  logout,
  emergencyContacts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BottomNavigator);
