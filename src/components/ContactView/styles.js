import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        overflow: 'hidden',
        marginTop: 5,
        marginBottom: 15,
        width: '100%',
        borderRadius: 3,
        backgroundColor: 'white',
        padding: 10
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: AppColor.colors.lightGrey,
        paddingBottom: 10
    },
    titleText: {
        fontSize: 18,
        flex: 1,
        overflow:'hidden',
        fontFamily: AppFontFamily.fontFamily.robotoBold,
        color: AppColor.colors.black
    },
    imageView:{
        width: 40,
        height: 40,
        borderRadius: 20
    },
    textStyle: {
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.montserratRegular,
        color: AppColor.colors.grey,
    },
    itemButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        backgroundColor: AppColor.colors.bgGradient1
    },
    imageView1: {
        width: 15,
        height: 15,
        alignSelf: 'center',
        tintColor: AppColor.colors.white
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
})