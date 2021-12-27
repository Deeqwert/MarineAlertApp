import { StyleSheet } from "react-native";
import { AppDimensions, AppColor, AppFontFamily } from "./../../utils";

export default StyleSheet.create({
  mainContainer: {
    height: 87,
    paddingBottom: 20,
    width: AppDimensions.deviceWidth,
    backgroundColor: AppColor.colors.backgroundLight
  },
  buttonContainer: {
    backgroundColor: AppColor.colors.backgroundLight,
    alignItems: "center",
    width: (AppDimensions.deviceWidth) / 4,
    justifyContent: "center",
    overflow: "hidden"
  },
  button: {
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    height: 60,
    width: 60,
    elevation: 3,
    borderRadius: 60 / 2,
  },
  addImage: {
    width: 25,
    height: 25
  },
  bottomText: {
    fontFamily: AppFontFamily.fontFamily.semiBold,
    color: AppColor.colors.white,
    fontSize: 9,
  },
  menuText: {
    fontFamily: AppFontFamily.fontFamily.regular,
    color: AppColor.colors.white,
    fontSize: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5
  },
  profileContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileImage: {
    height: 70,
    width: 70,
    borderRadius: 35
  },
  profileInfoView: {
    flex: 1,
    marginHorizontal: 15
  },
  profileTitleText: {
    fontSize: 16,
    overflow: 'hidden',
    color: AppColor.colors.black,
    fontFamily: AppFontFamily.fontFamily.montserratBold
  },
  profileText: {
    fontSize: 13,
    overflow: 'hidden',
    color: AppColor.colors.black,
    fontFamily: AppFontFamily.fontFamily.robotoMedium
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: AppColor.colors.lightGrey
  },
  menuContainer: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: '100%'
  }
});
