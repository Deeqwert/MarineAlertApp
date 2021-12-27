import { StyleSheet } from "react-native";
import { AppFontFamily, AppColor } from "./../../utils";
export default StyleSheet.create({
  mainView: {
    alignSelf: 'center',
    borderRadius: 30,
    width: '85%',
    padding: 5,
    margin: 7,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: AppColor.colors.white
  },
  leftImageView: {
    backgroundColor: AppColor.colors.lightGrey,
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 20
  },
  leftImage: {
    width: 20,
    height: 20,
    alignSelf: 'center'
  },
  textInput: {
    fontSize: 14,
    color: AppColor.colors.grey,
    fontFamily: AppFontFamily.fontFamily.robotoRegular,
    paddingHorizontal: 15,
    paddingVertical:0,
    flex: 1,
    height: 40,
    fontWeight: 'normal',
  },
});
