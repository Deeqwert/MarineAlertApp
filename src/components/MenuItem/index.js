import React, { Component } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./styles";

class MenuItem extends Component {
    render() {
        let { customStyles, activeOpacity, disabled, onPress, imageSource } = this.props;
        return (

            <TouchableOpacity
                disabled={disabled ? disabled : false}
                activeOpacity={activeOpacity ? activeOpacity : 1}
                style={[styles.container, customStyles.container]}
                onPress={onPress}>
                {imageSource && <View style={[styles.logoView, customStyles.logoView]}>
                    <Image
                        resizeMode='contain'
                        source={imageSource}
                        style={[styles.logo, customStyles.logo]} />
                </View>}

                <Text numberOfLines={1} style={[styles.textStyle, customStyles.textStyle]}>{this.props.text}</Text>
            </TouchableOpacity>

        );
    }
}

MenuItem.defaultProps = { customStyles: {} };

export default MenuItem;
