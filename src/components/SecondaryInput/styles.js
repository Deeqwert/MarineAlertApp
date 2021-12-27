import { StyleSheet } from "react-native";
import { AppFontFamily, AppColor } from "./../../utils";
export default StyleSheet.create({
  mainView: {
    alignSelf: 'center',
    width: '85%',
    padding: 5,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textInput: {
    fontSize: 14,
    backgroundColor: AppColor.colors.white,
    borderColor: AppColor.colors.lightGrey1,
    borderWidth: 0.5,
    justifyContent: 'center',
    borderRadius: 3,
    color: AppColor.colors.grey,
    fontFamily: AppFontFamily.fontFamily.robotoRegular,
    paddingHorizontal: 10,
    paddingVertical: 12,
    height: 45,
    textAlignVertical: 'top',
    fontWeight: 'normal',
  },
  titleText: {
    fontSize: 14,
    color: AppColor.colors.black,
    fontFamily: AppFontFamily.fontFamily.montserratSemiBold,
    marginTop: 10,
    marginBottom: 5
  },
});
