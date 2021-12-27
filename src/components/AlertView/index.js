import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { CommonFunctions, AppColor } from '../../utils';
import I18n from '../../translations/localeConfig';

class ContactView extends Component {
    render() {
        let { title, timeStamp, description, status, readMorePress } = this.props;
        return (
            <View style={[styles.container]}  >
                <Text numberOfLines={1} style={[styles.title]}>{title}</Text>
                <View style={[styles.rowView]}>
                    <Image style={styles.imageView} source={require('../../images/calendar.png')}></Image>
                    <Text style={[styles.titleHeader]}>{CommonFunctions.parseDate(timeStamp)}</Text>
                    <Image style={[styles.imageView, { marginLeft: 20 }]} source={require('../../images/clock.png')}></Image>
                    <Text style={[styles.titleHeader]}>{CommonFunctions.parseTime(timeStamp)}</Text>
                </View>
                <Text numberOfLines={3} style={[styles.titleHeader]}>{description}</Text>

                <View style={[styles.rowView1]}>
                    <TouchableOpacity
                        onPress={readMorePress}
                        style={[styles.rowView2]}>
                        <Text style={[styles.readMoreText]}>{I18n.t('readMore').toUpperCase()}</Text>
                        <Image
                            style={[styles.imageView1]}
                            resizeMode="contain"
                            source={require('../../images/right_arrow.png')}
                        />
                    </TouchableOpacity>
                    {
                        status == "pending" ? <View style={{
                            paddingVertical: 3,
                            paddingHorizontal: 15,
                            borderRadius: 3,
                            backgroundColor: status == 2 ? AppColor.colors.emergencyColor :
                                status == 3 ? AppColor.colors.warningColor :
                                    status == 4 ? AppColor.colors.alertColor : AppColor.colors.grey
                        }}>
                            <Text style={[styles.alertText]}>{I18n.t('pending').toUpperCase()}</Text>
                        </View> : null
                    }

                </View>
            </View>
        );
    }
}

ContactView.defaultProps = { customStyles: {} };

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language
    };
}

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactView);
