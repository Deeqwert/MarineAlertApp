import { StyleSheet } from "react-native";
import { AppFontFamily, AppColor } from "./../../utils";
export default StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: AppColor.colors.opacitiveBlack
    },
    activityIndicatorWrapper: {
        height: 100,
        width: '50%',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 15,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    textStyle: {
        fontSize: 14,
        alignSelf: 'center',
        marginLeft: 10,
        textAlign: 'center',
        color: AppColor.colors.grey,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
    }
});
