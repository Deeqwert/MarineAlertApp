import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, Linking, Platform } from "react-native";
import styles from "./styles";
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

class ContactView extends Component {
    render() {
        let { name, imageSource, phoneNumbers } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.itemHeader}>

                    <Text numberOfLines={1} style={[styles.titleText]}>{name}</Text>
                    {
                        imageSource ? <Image style={[styles.imageView]} source={{ uri: imageSource }} />
                            : null}

                </View>
                {phoneNumbers.map((item, index) => {
                    return (
                        <View style={[styles.rowView]}>
                            <View style={{ flex: 1, }}>

                                <Text numberOfLines={2} style={[styles.textStyle]}>{item.number}</Text>
                                <Text numberOfLines={2} style={[styles.textStyle, { fontSize: 10 }]}>{(item.label).toUpperCase()}</Text>
                            </View>
                            <TouchableOpacity

                                onPress={() => {
                                    if (Platform.OS == "ios") {
                                        Linking.openURL("tel:/" + item.number)
                                    } else
                                        RNImmediatePhoneCall.immediatePhoneCall(item.number);
                                }}
                                style={styles.itemButton}>
                                <Image style={[styles.imageView1]} source={require('../../images/phone.png')}></Image>
                            </TouchableOpacity>

                        </View>
                    );
                })
                }
            </View>
        );
    }
}

ContactView.defaultProps = { customStyles: {} };

export default ContactView;
