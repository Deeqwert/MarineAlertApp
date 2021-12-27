import { StyleSheet } from "react-native";
import { AppFontFamily, AppColor } from "./../../utils";
export default StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainContainer: {
        width: 300,
        backgroundColor: 'white',
        paddingVertical: 15,
        elevation: 3,
        shadowRadius: 3,
        shadowColor: 'grey',
        borderRadius: 3,
        marginBottom: 150
    },
    seeMoreView: {
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColor.colors.blueTheme,
        borderRadius: 15,
        padding: 10

    },
    titleHeader: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.black,
    },
    title: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoBold,
        color: AppColor.colors.black,
    },
    description: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey,
        alignSelf: 'flex-start',
    },
    seeMore: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.white,
        alignSelf: 'center',
    },
    imageView: {
        width: 15,
        height: 15,
        marginRight: 5,
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: AppColor.colors.lightGrey,
        marginVertical: 10

    }
});
