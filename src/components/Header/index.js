import React, { Component } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import I18n from '../../translations/localeConfig';

class Header extends Component {
    render() {
        let { onPress, title, customStyles, rightTitle, rightImage } = this.props;
        return (
            <View style={[styles.container, customStyles.container]}>
                <TouchableOpacity
                    onPress={onPress}
                    style={[styles.imageContainer, customStyles.imageContainer]}>
                    <Image
                        resizeMode="contain"
                        style={[styles.imageView, customStyles.imageView]} source={require('../../images/chevron_left.png')}></Image>
                </TouchableOpacity>
                {title && <Text numberOfLines={1} style={[styles.textStyle, customStyles.textStyle, { flex: rightTitle ? 1 : 0 }]} >{title}</Text>}
                {rightTitle && <View style={{ overflow: 'scroll', marginHorizontal: 15, flex: 1, alignItems: 'center', justifyContent: 'flex-end', flexDirection: 'row' }}>
                    <Text numberOfLines={1}
                        style={[styles.textRightStyle]}  >{I18n.t('by')}</Text>
                    {rightImage && <Image style={{ width: 30, height: 30, borderRadius: 10 }} source={rightImage} />}
                    <Text numberOfLines={1}
                        style={[styles.textRightStyle]}  >{rightTitle}</Text>
                </View>}
            </View>

        );
    }
}


Header.defaultProps = { customStyles: {} };

function mapStateToProps(state) {
    return {
        language: state.ApplicationReducer.language
    };
}
const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);
