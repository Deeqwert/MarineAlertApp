import { StyleSheet } from 'react-native';
import { AppDimensions, AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: AppDimensions.deviceHeight,
        width: AppDimensions.deviceWeight,
    },
    titleText: {
        fontSize: 20,
        alignSelf: 'center',
        color: AppColor.colors.black,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold
    },
    messageText: {
        fontSize: 14,
        marginTop: 5,
        width: '80%',
        alignSelf: 'center',
        textAlign: 'center',
        color: AppColor.colors.grey,
        fontFamily: AppFontFamily.fontFamily.robotoRegular
    },
    SosNumberAlert: {
        fontSize: 14,
        marginTop: 5,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
        color: AppColor.colors.grey,
        fontFamily: AppFontFamily.fontFamily.robotoRegular
    },
    button: {
        alignSelf: 'center',
        width: 90,
        justifyContent: 'center',
        position: 'absolute',
        height: 90,
        borderRadius: 90 / 2,
        backgroundColor: AppColor.colors.alertColor
    },
    buttonText: {
        fontSize: 15,
        alignSelf: 'center',
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        color: AppColor.colors.lightGrey
    }

})