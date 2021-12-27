import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from './../../utils';

export default StyleSheet.create({
    container: {
        // width: Dimensions.deviceWidth - 280,
        margin: 5,
        alignSelf: 'center',
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden",
        borderRadius:30
    },
    buttonView: {
        backgroundColor: AppColor.colors.buttonDark,
        height: 50,
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 30,
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: "hidden"
    },
    text: {
        fontSize: 12,
        color: AppColor.colors.white,
        fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
        textAlign: 'center',
    },
})