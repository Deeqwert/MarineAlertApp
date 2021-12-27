import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden'
    },
    imageContainer: {
        padding: 10,
        width: 45
    },
    imageView: {
        tintColor: AppColor.colors.white,
        width: 25,
        height: 25
    },
    textStyle: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoMedium,
        color: AppColor.colors.white
    },
    textRightStyle: {
        fontSize: 13,
        margin:5,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.white
    },
})