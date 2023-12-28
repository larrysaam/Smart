import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 25,
    padding: SIZES.small,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navContainer: {
    width: "90%",
    height: 70,
    padding: SIZES.small,
    alignItems: "flex-end",
    paddingRight: 0,
  },
  saveBtn: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    backgroundColor: COLORS.shinyblue,
  },
  saveBtnImage: {
    width: "60%",
    height: "60%",
    tintColor: COLORS.white,
  },
});

export default styles;
