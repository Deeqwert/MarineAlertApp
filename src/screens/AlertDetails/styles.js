import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.colors.blueTheme
    },
    titleText: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        color: AppColor.colors.black
    },
    messageText: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey
    },
    imageView: {
        width: 15,
        height: 15,
        marginRight: 5,
        tintColor: AppColor.colors.grey
    },
    titleHeader: {
        fontSize: 13,
        lineHeight:20,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey,
    },
    title: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.montserratBold,
        color: AppColor.colors.black,
    },
    title1: {
        fontSize: 14,
        margin: 15,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        color: AppColor.colors.white,
    },
    readMoreText: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        color: AppColor.colors.grey,
    },
    alertText: {
        fontSize: 11,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.white,
    },

})