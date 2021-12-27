import { StyleSheet } from 'react-native';
import { AppDimensions } from './../../utils';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: AppDimensions.deviceHeight,
        width: AppDimensions.deviceWeight,
    },
})