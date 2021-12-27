import { StyleSheet } from "react-native";
import { AppColor, AppFontFamily } from "./../../utils";

export default StyleSheet.create({
    logoContainer: {
        flex: 0.30,
        justifyContent: 'center',
        overflow: 'hidden'
    },
    imageLogo: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    titleText: {
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        fontSize: 20,
        alignSelf: 'center',
        marginTop: 10
    },
    fieldsContainer: {
        flex: 0.60,
        overflow: 'hidden'
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
        alignSelf: 'center',
        width: '85%',
        textAlign: 'center',
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
    },
    forgotPasswordView: {
        padding: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    copyrightContainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 0.05,
        overflow: 'hidden'
    },
    copyrightText: {
        fontSize: 8,
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.robotoMedium,
      },
});