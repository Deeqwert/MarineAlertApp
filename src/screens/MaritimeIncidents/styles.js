import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: AppDimensions.deviceHeight,
        width: AppDimensions.deviceWeight,
    },
    titleText: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.montserratMedium,
        color: AppColor.colors.black
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
    viewContainer: {
        margin: 15,
        paddingBottom: 30,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: AppColor.colors.lightGrey,
    },

})