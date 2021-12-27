import { StyleSheet } from "react-native";
import { AppColor, AppFontFamily } from "./../../utils";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: AppColor.colors.opacitiveBlack
  },
  mask: {
    flex: 1,
    backgroundColor: AppColor.colors.transparent
  },
  container: {
    backgroundColor: AppColor.colors.white,
    width: "100%",
    height: 0,
    overflow: "hidden"
  },
  draggableContainer: {
    width: "100%",
    alignItems: "center",
    backgroundColor: AppColor.colors.transparent
  },
  draggableIcon: {
    width: 35,
    height: 5,
    borderRadius: 5,
    margin: 10,
    backgroundColor: AppColor.colors.darkGrey
  }
});
