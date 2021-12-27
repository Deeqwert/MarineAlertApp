import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { CommonFunctions } from './../../utils';

class NotificationView extends Component {
    render() {
        let { customStyles, title, message, timeStamp, onPress } = this.props;
        return (
            <TouchableOpacity onPress={onPress} style={[styles.container, customStyles.container]}>
                <Text numberOfLines={1} style={[styles.title, customStyles.title]}>{title}</Text>
                <Text numberOfLines={2} style={[styles.message, customStyles.message]}>{message}</Text>
                <View style={[styles.rowView]}>
                    <Text style={[styles.textStyle, { flex: 1 }]}>{CommonFunctions.parseDate(timeStamp)}</Text>
                    <Text style={[styles.textStyle]}>{CommonFunctions.parseTime(timeStamp)}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

NotificationView.defaultProps = { customStyles: {} };

export default NotificationView;
