import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: AppColor.colors.blueTheme
    },
    titleText: {
        fontSize: 16,
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        color: AppColor.colors.white
    },
    messageText: {
        fontSize: 12,
        alignSelf: 'center',
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.lightGrey
    },
    imageView: {
        width: 20,
        height: 20,
        alignSelf: 'center',
        tintColor: AppColor.colors.white
    },
    floatingContainer: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 60,
        justifyContent: 'center',
        height: 60,
        borderRadius: 30,
        backgroundColor: AppColor.colors.alertColor
    },
    floatingView: {
        position: 'absolute',
        width: 60,
        justifyContent: 'center',
        height: 60,
        borderRadius: 30,
        backgroundColor: AppColor.colors.alertColor
    },
    noDataContainer: {
        alignSelf: 'center',
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: AppColor.colors.alertColor
    },
    reportButton: {
        alignSelf: 'center',
        width: 150,
        justifyContent: 'center',
        position: 'absolute',
        height: 150,
        borderRadius: 75,
        backgroundColor: AppColor.colors.alertColor
    },
    reportText: {
        fontSize: 25,
        alignSelf: 'center',
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold
    },
    reportText1: {
        fontSize: 12,
        alignSelf: 'center',
        textAlign: 'center',
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.robotoRegular
    }

})