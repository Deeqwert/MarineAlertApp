import React, { Component } from 'react';
import {
  View,
  Modal,
  ActivityIndicator,
  Platform,
  Text
} from 'react-native';
import styles from './styles';
import { AppColor } from '../../utils';

const Loader = props => {
  const {
    whiteColor,
    loading,
    title,
    ...attributes
  } = props;

  return (
    <Modal
      statusBarTranslucent
      transparent={true}
      animationType={'none'}
      visible={loading}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.activityIndicatorWrapper, {width:title?'50%':'30%'}]}>
          <ActivityIndicator color={AppColor.colors.grey} size={Platform.OS === "ios" ? 0 : 40}
            animating={loading} />
          {title && <Text style={styles.textStyle}>{title}</Text>}
        </View>
      </View>
    </Modal>
  )
}

module.exports = Loader