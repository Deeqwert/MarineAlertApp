import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

class CustomButton extends Component {
  render() {
    let { customStyles, activeOpacity, disabled, onPress } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled ? disabled : false}
        activeOpacity={activeOpacity ? activeOpacity : 1}
        style={[styles.container, customStyles.container]}
        onPress={onPress}
      >
        <View style={[styles.buttonView, customStyles.buttonView]} >
          <Text
            numberOfLines={1}
            style={[styles.text, customStyles.textStyle]}
          >
            {this.props.Text}
          </Text>
        </View>

      </TouchableOpacity>
    );
  }
}

CustomButton.defaultProps = { customStyles: {} };

export default CustomButton;
