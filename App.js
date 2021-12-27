import React, { Component } from "react";
import { TextInput, Text, StatusBar, YellowBox } from "react-native";
import Setup from "./src/route/setup";
import { Provider } from "react-redux";
import ConfigureStore from './src/config/configureStore';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
YellowBox.ignoreWarnings([""]);

Text.defaultProps = { ...(Text.defaultProps || {}), allowFontScaling: false };
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false
};

const store = ConfigureStore();

export default class App extends Component {
  render() {
    return (
      <InAppNotificationProvider>
        <Provider store={store}>
          <StatusBar hidden />
          <Setup />
        </Provider>
      </InAppNotificationProvider>
    );
  }
}
