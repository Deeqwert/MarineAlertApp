import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: AppDimensions.deviceHeight,
        width: AppDimensions.deviceWeight,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    indicatorContainer: {
        position: 'absolute',
        backgroundColor:AppColor.colors.backgroundLight,
        left: 0,
        right:0,
        top: 30,
        padding: 15
    },
    indicatorView: {
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center'
    },
    indicator: {
        height: 18,
        width: 18,
        backgroundColor: AppColor.colors.grey,
        borderRadius: 5,
        marginRight: 5
    },
    indicatorText: {
        fontSize: 13,
        color: AppColor.colors.grey,
        fontFamily: AppFontFamily.fontFamily.robotoRegular
    }

})