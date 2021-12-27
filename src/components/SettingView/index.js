import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Switch } from "react-native";
import styles from "./styles";
import { CommonFunctions, AppColor } from '../../utils';

class SettingView extends Component {
    render() {
        let { title, subTitle, image, onPress, isSelected, onValueChange } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.container]}>
                <Image source={CommonFunctions.imageWithKey(image)}
                    style={[styles.imageView]}></Image>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText} >{title}</Text>
                    {subTitle ? <Text style={styles.messageText} >{subTitle}</Text> : null}

                </View>
                {isSelected != null ? <Switch
                    thumbColor={AppColor.colors.white}
                    trackColor={{ true: AppColor.colors.blueTheme, false: AppColor.colors.grey }}
                    style={[styles.switchView]}
                    onValueChange={onValueChange}
                    value={isSelected} /> :
                    <Image
                        source={CommonFunctions.imageWithKey("chevron_right")}
                        style={[styles.imageView1]}></Image>}
            </TouchableOpacity>
        );
    }
}

SettingView.defaultProps = { customStyles: {} };

export default SettingView;
