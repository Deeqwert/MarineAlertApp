import React, { Component } from 'react';
import {
    View,
    Modal,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import { CommonFunctions } from "./../../utils";
import { connect } from "react-redux";
import I18n from '../../translations/localeConfig';

class MapPopUp extends Component {
    render() {
        let { title,
            subTitle,
            timeStamp,
            description,
            isVisible,
            customStyles,
            onSeeMorePress,
            seeMore,
            onOutsidePress } = this.props;
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={isVisible}
            >
                <TouchableOpacity onPress={onOutsidePress} activeOpacity={1.0} style={styles.container}>
                    <TouchableOpacity activeOpacity={1.0} onPress={() => { }}
                        style={[styles.mainContainer, customStyles.container]}>
                        <View style={{
                            flexDirection: 'row',
                            paddingHorizontal: 15
                        }}>
                            <Text style={[styles.titleHeader]}>{I18n.t('province')}</Text>
                            <Text style={[styles.title, customStyles.title]}>{title}</Text>
                        </View>
                        {seeMore && <View style={styles.divider}></View>}

                        <View style={{ paddingHorizontal: 15 }}>
                            <Text numberOfLines={2} style={[styles.title, customStyles.title]}>{subTitle}</Text>
                            {seeMore && <View>
                                <View style={[styles.rowContainer, { paddingVertical: 10 }]}>
                                    <Image style={styles.imageView} source={require('../../images/calendar.png')}></Image>
                                    <Text style={[styles.titleHeader]}>{CommonFunctions.parseDate(timeStamp)}</Text>
                                    <Image style={[styles.imageView, { marginLeft: 20 }]} source={require('../../images/clock.png')}></Image>
                                    <Text style={[styles.titleHeader]}>{CommonFunctions.parseTime(timeStamp)}</Text>
                                </View>
                                <Text numberOfLines={3} style={[styles.description, customStyles.description]}>{description}</Text>
                                <View style={[styles.rowContainer, { marginTop: 10, justifyContent: 'space-between' }]}>
                                    <TouchableOpacity onPress={onSeeMorePress} style={[styles.seeMoreView, customStyles.seeMoreView]}>
                                        <Text style={[styles.seeMore, customStyles.seeMore]}>{I18n.t('moreDetails')}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>}


                        </View>

                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        );
    }
}

MapPopUp.defaultProps = { customStyles: {} };

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language
    };
}

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MapPopUp);