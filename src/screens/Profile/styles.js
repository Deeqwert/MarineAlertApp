import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        flex:1,
    },
    textStyle: {
        fontSize: 14,
        color: AppColor.colors.alertColor,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold
    },
    messageText: {
        fontSize: 14,
        marginTop: 5,
        width:'80%',
        alignSelf: 'center',
        textAlign: 'center',
        color: AppColor.colors.grey,
        fontFamily: AppFontFamily.fontFamily.robotoMedium
    },
    profileImage:{
        height: 120,
        backgroundColor:AppColor.colors.white,
        width: 120,
        borderRadius: 60,
    },
    cameraImageView:{
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        top: 0,
        backgroundColor: AppColor.colors.white,
        height: 30,
        width: 30,
        borderRadius: 15,
    },
    cameraImage:{
        tintColor: AppColor.colors.grey,
        height: 15,
        width: 15,
    }

})