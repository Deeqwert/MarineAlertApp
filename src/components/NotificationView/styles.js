import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
        borderRadius: 3,
        backgroundColor: 'white',
        padding: 10
    },
    message: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey,
    },
    title: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoBold,
        color: AppColor.colors.black,
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    textStyle: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey,
    },
})