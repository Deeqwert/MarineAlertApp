import { StyleSheet, Platform } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        margin: 15,
        paddingBottom: 30,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: AppColor.colors.lightGrey,
    },
    title: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoBold,
        color: AppColor.colors.black,
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
    imageView: {
        tintColor: AppColor.colors.grey,
        width: 20,
        height: 20,
        marginRight: 10
    },
    imageView1: {
        tintColor: AppColor.colors.grey,
        width: 20,
        height: 20,
        marginRight: 10
    },
    switchView: {
        height: 20,
        width: 40,
        marginRight: Platform.OS == "ios" ? 10 : 0,
        alignSelf: "flex-end",
        marginTop: 5
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    rowView1: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowView2: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10
    },
    titleText: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.montserratMedium,
        color: AppColor.colors.black
    },
    messageText: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey
    }
})