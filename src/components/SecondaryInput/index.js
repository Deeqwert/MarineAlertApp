import React, { Component } from "react";
import {
    View,
    TextInput,
    Text
} from "react-native";
import styles from "./styles";
import AppColor from "../../utils/AppColor";

class SecondaryInput extends Component {
    render() {
        let {
            customStyles,
            title,
            onKeyPress
        } = this.props;
        return (
            <View style={[styles.mainView, customStyles.mainView]}>
                <Text style={[styles.titleText, customStyles.titleText]}>{title}</Text>
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
                    style={[styles.textInput, {
                        borderColor: this.props.editable ? AppColor.colors.lightGrey1 : AppColor.colors.white,
                        paddingHorizontal: this.props.editable ? 10 : 0,
                    },
                    customStyles.textInput]}>
                </TextInput>
            </View>
        );
    }
}

SecondaryInput.defaultProps = { customStyles: {} };

export default SecondaryInput;

