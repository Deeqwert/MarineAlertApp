import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    title: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoBold,
        color: AppColor.colors.black,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 56,
        paddingLeft: 25,
        paddingRight: 18,
        alignItems: 'center',
        backgroundColor: AppColor.colors.backgroundLight,
    },
    parentHr: {
        height: 1,
        color: AppColor.colors.bgGradient1,
        width: '100%'
    },
    child: {
        backgroundColor: AppColor.colors.lightGrey,
        padding: 16,
    }
})