import React, { Component } from "react";
import {
  View,
  TextInput,
  Image
} from "react-native";
import styles from "./styles";

class Inputs extends Component {
  render() {
    let {
      customStyles,
      leftImageSource,
      onKeyPress
    } = this.props;
    return (
      <View style={[styles.mainView, customStyles.mainView]}>
        <View style={[styles.leftImageView, customStyles.leftImageView]}>
          {leftImageSource ? <Image
            resizeMode="contain"
            style={[styles.leftImage, customStyles.leftImage]} source={leftImageSource} /> : null}

        </View>

        <TextInput
          onKeyPress={onKeyPress}
          underlineColorAndroid="transparent"
          keyboardType={this.props.keyboardType}
          maxLength={this.props.maxLength}
          secureTextEntry={this.props.secureTextEntry}
          placeholderTextColor={this.props.placeholderTextColor}
          onChangeText={this.props.onChangeText}
          returnKeyType={this.props.returnKeyType}
          onSubmitEditing={this.props.onSubmitEditing}
          // ref={input => this.props.refs(input)}
          numberOfLines={this.props.numberOfLines}
          value={this.props.value}
          multiline={this.props.multiline}
          editable={this.props.editable}
          autoCapitalize="none"
          {...this.props}
          style={[styles.textInput, customStyles.textInput]}>
        </TextInput>
      </View>
    );
  }
}

Inputs.defaultProps = { customStyles: {} };

export default Inputs;

