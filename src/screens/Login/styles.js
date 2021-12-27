import { StyleSheet } from "react-native";
import { AppColor, AppFontFamily } from "./../../utils";

export default StyleSheet.create({
  logoContainer: {
    flex: 0.25,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  imageLogo: {
    alignSelf: 'center',
    borderRadius:1,
    width: 200,
    height: 70
  },
  titleText: {
    color: AppColor.colors.white,
    fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 10
  },
  fieldsContainer: {
    flex: 0.25,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  rememberPasswordView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
    alignSelf: 'center',
    marginTop: 10
  },
  textStyle: {
    fontSize: 14,
    color: AppColor.colors.white,
    fontFamily: AppFontFamily.fontFamily.robotoRegular,
  },
  buttonsContainer: {
    flex: 0.40,
    overflow: 'hidden'
  },
  forgotPasswordView: {
    padding: 10,
    alignSelf: 'center'
  },
  copyrightContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 0.05,
    overflow: 'hidden'
  },
  copyrightText: {
    fontSize: 8,
    color: AppColor.colors.white,
    fontFamily: AppFontFamily.fontFamily.robotoMedium,
  },
});