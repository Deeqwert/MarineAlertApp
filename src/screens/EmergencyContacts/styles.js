import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColor.colors.blueTheme
    },
    titleText: {
        fontSize: 18,
        flex: 1,
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
        alignSelf: 'center',
        tintColor: AppColor.colors.white
    },
    imageView1: {
        width: 20,
        height: 20,
        marginRight: 5,
        tintColor: AppColor.colors.grey
    },
    titleHeader: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey,
    },
    title: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoBold,
        color: AppColor.colors.black,
    },
    title1: {
        fontSize: 14,
        margin: 15,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        color: AppColor.colors.white,
    },
    readMoreText: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.montserratMedium,
        color: AppColor.colors.grey,
    },
    alertText: {
        fontSize: 13,
        fontFamily: AppFontFamily.fontFamily.montserratMedium,
        color: AppColor.colors.white,
    },
})