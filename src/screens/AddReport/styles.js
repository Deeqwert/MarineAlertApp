import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        flex: 1,
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
    },
    title1: {
        fontSize: 14,
        margin: 15,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        color: AppColor.colors.black,
    },
    imageViewContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        borderColor: AppColor.colors.lightGrey1,
        borderWidth: 0,
        borderRadius: 3,
        marginLeft: 5,
        marginRight: 10,
        marginBottom: 15,
        height: 150,
        width: AppDimensions.deviceWidth * 0.5 - 25,
    },
    imageView: {
        width: 50,
        height: 50,
        borderRadius: 3,
        alignSelf: 'center'
    },
    deleteButton:{
        position: 'absolute',
        bottom: 5,
        right: 5,
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: AppColor.colors.lightGrey1
    },
    deleteImage:{
        tintColor: AppColor.colors.grey,
        width: 20,
        height: 20,
        alignSelf: 'center'
    },
    tagContainer: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 10,
        marginTop: 10,
        padding: 5
    },
    tagText: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        fontSize: 14,
        fontFamily: AppFontFamily.fontFamily.montserratRegular,
        color: AppColor.colors.black
    },
    removeButton: {
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        backgroundColor: AppColor.colors.alertColor
    },
    removeImage: {
        alignSelf: 'center',
        width: 10,
        height: 10,
        tintColor: AppColor.colors.white
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
        height:'70%',
        justifyContent: 'center',
        backgroundColor: 'white',
    }

})