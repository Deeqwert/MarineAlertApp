import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '100%',
        borderRadius: 3,
        backgroundColor: AppColor.colors.white,
        padding: 10
    },
    title: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoBold,
        color: AppColor.colors.black,
    },
    readMoreText: {
        fontSize: 12,
        fontFamily: AppFontFamily.fontFamily.montserratMedium,
        color: AppColor.colors.grey,
    },
    alertText: {
        fontSize: 13,
        fontFamily: AppFontFamily.fontFamily.montserratMedium,
        color: AppColor.colors.white,
    },
    imageView: {
        width: 15,
        height: 15,
        marginRight: 5,
        tintColor: AppColor.colors.grey
    },
    imageView1: {
        tintColor: AppColor.colors.bgGradient1,
        marginLeft: 5,
        width: 15,
        height: 15
    },
    titleHeader: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.grey,
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
    }
})