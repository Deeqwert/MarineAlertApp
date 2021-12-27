import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        justifyContent: 'center',
        flex: 1
    },
    headerContainer: {
        width: '100%',
        backgroundColor: AppColor.backgroundLight,
        paddingHorizontal: 15
    },
    titleText: {
        fontSize: 14,
        marginLeft: 5,
        color: AppColor.colors.black,
        fontFamily: AppFontFamily.fontFamily.robotoMedium
    },
    rowView: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 5
    },
    rowView1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    radioButton: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioSelected: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: AppColor.colors.bgGradient1,
    },
    radioText: {
        marginLeft: 5,
        marginRight: 30,
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.robotoRegular,
        color: AppColor.colors.black,
        alignSelf: 'flex-start'
    },
    rowView2: {
        flexDirection: 'row',
        marginBottom: 10
    },
    textButton: {
        borderColor: AppColor.colors.lightGrey1,
        borderWidth: 1,
        fontSize: 13,
        borderRadius: 3,
        padding: 8,
        backgroundColor: AppColor.colors.white,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        height: 35,
        color: AppColor.colors.black,
        fontFamily: AppFontFamily.fontFamily.robotoRegular
    },
    footerContainer: {
        width: '100%',
        justifyContent: 'center',
        backgroundColor: AppColor.backgroundLight,
        padding: 15
    },
    textStyle: {
        fontSize: 10,
        textAlign: 'center',
        textAlignVertical: 'center',
        alignContent: 'center',
        color: AppColor.colors.grey,
        fontFamily: AppFontFamily.fontFamily.robotoRegular
    },
    rowView3:{
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modalContainer:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: AppColor.colors.opacitiveBlack
    },
    modalWrapper:{
        width: '90%',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 15,
        backgroundColor: 'white',
    }

})