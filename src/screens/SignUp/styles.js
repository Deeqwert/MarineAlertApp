import { StyleSheet } from "react-native";
import { AppColor, AppFontFamily } from "./../../utils";

export default StyleSheet.create({
    fieldsContainer: {
        flex: 1,
        overflow: 'hidden'
    },
    titleText: {
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        fontSize: 20,
        alignSelf: 'center'
    },
    rememberPasswordView: {
        alignItems: 'center',
        flexDirection: 'row',
        width: '85%',
        alignSelf: 'center',
        marginTop: 10
    },
    textStyle: {
        fontSize: 14,
        width: '85%',
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
    },
    forgotPasswordView: {
        padding: 5,
        alignSelf: 'center',
    },
    copyrightContainer: {
        marginVertical:5,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    copyrightText: {
        fontSize: 8,
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.robotoMedium,
    },
});