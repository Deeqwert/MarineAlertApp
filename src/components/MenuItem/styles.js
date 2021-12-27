import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical:10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    logoView: {
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35/2,
        marginRight: 15,
        backgroundColor: AppColor.colors.darkBlue
    },
    logo: {
        tintColor:AppColor.colors.white,
        height: 15,
        width: 15
    },
    textStyle: {
        fontSize: 14,
        overflow: 'hidden',
        color: AppColor.colors.grey,
        fontFamily: AppFontFamily.fontFamily.robotoRegular
    },
})