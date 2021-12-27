import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    LayoutAnimation,
    Platform,
    UIManager,
    Image,
    Dimensions
} from "react-native";
import { AppColor } from '../../utils';
import styles from "./styles";
import HTML from 'react-native-render-html';

export default class Accordian extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            expanded: false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    render() {

        return (
            <View>
                <TouchableOpacity ref={this.accordian} style={styles.row} onPress={() => this.toggleExpand()}>
                    <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                    <Image style={{
                        width: 24,
                        height: 24,
                        tintColor: AppColor.colors.black
                    }}
                        source={this.state.expanded ? require('../../images/chevron_up.png') : require('../../images/chevron_down.png')} />

                </TouchableOpacity>
                <View style={styles.parentHr} />
                {
                    this.state.expanded &&
                    <View style={styles.child}>
                        <HTML html={this.props.data} imagesMaxWidth={Dimensions.get('window').width} />
                    </View>
                }

            </View>
        )
    }

    toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ expanded: !this.state.expanded })
    }

}