import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { BottomTabNavigation } from "./../components";
import {
    Login,
    MainTab,
    SecondaryTab,
    ForgotPassword,
    SignUp,
    SOSTab,
    DigitalCompass,
    Settings,
    Profile,
    AlertDetails,
    EmergencyContacts,
    ReportIncidents,
    AddReport,
    Notifications,
    ChangePassword,
    MaritimeConditions,
    PortLocation,
    TermsNConditions,
    ReportedIncidents,
    HomePage,
    MaritimeIncidents
} from "../screens";

const AuthenticationStack = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
    ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
    SignUp: {
        screen: SignUp,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
});

const HomePageStack = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    MainTab: {
        screen: MainTab,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    SOSTab: {
        screen: SOSTab,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    SecondaryTab: {
        screen: SecondaryTab,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    MaritimeIncidents: {
        screen: MaritimeIncidents,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    AlertDetails: {
        screen: AlertDetails,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    EmergencyContacts: {
        screen: EmergencyContacts,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    MaritimeConditions: {
        screen: MaritimeConditions,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
    PortLocation: {
        screen: PortLocation,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
    ReportIncidents: {
        screen: ReportIncidents,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    ReportedIncidents: {
        screen: ReportedIncidents,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    AddReport: {
        screen: AddReport,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    DigitalCompass: {
        screen: DigitalCompass,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    Settings: {
        screen: Settings,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    Notifications: {
        screen: Notifications,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
    TermsNConditions: {
        screen: TermsNConditions,
        navigationOptions: {
            headerLeft: null,
            headerShown: false,
            gestureEnabled: false
        }
    },
});

const mainStack = (loggedIN) => {
    return createSwitchNavigator(
        {
            AuthenticationStack: AuthenticationStack,
            HomePageStack: HomePageStack
        },
        {
            initialRouteName: loggedIN == true ? "HomePageStack" : "AuthenticationStack",
            navigationOptions: {
                gestureEnabled: false
            }
        }
    );
};

export default mainStack;
