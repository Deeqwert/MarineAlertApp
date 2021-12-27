import { StyleSheet } from "react-native";
import { AppFontFamily, AppDimensions, AppColor } from "./../../utils";

export default StyleSheet.create({

  imageLogo: {
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'center',
    borderRadius: 1,
    width: 200,
    height: 70
  },
  imageLogo1: {
    width: AppDimensions.deviceWidth,
    height: 120
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 1,
    height: (AppDimensions.deviceWidth - 50) / 3,
    width: (AppDimensions.deviceWidth - 50) / 3
  },
  cardImage: {
    width: 40,
    height: 40
  },
  titleText: {
    marginBottom: 20,
    fontSize: 14,
    textAlign: 'center',
    color: AppColor.colors.white,
    fontFamily: AppFontFamily.fontFamily.montserratSemiBold
  },
  cardText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: AppFontFamily.fontFamily.robotoRegular
  }
});