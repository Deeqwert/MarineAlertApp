import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor } from './../../utils';

export default StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: AppColor.colors.imageBackground,
        alignItems: 'center'
    },
    containerIn: {
        width: AppDimensions.deviceWidth - 120,
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
})