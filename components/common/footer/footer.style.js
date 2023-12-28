import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 70,
    position: "absolute",
    bottom: 10,
    padding: SIZES.small,
    justifyContent: "space-between",
    alignItems: "center",
  },
  navContainer: {
    width: "90%",
    height: 60,
    padding: SIZES.small,
    backgroundColor: COLORS.shinyblue,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
  },
  likeBtn: {
    width: 55,
    height: 55,

    alignItems: "center",
  },
  likeBtnImage: {
    width: "60%",
    height: "60%",
    tintColor: COLORS.white,
  },
  applyBtn: {
    flex: 1,
    backgroundColor: "#FE7654",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: SIZES.medium,
    borderRadius: SIZES.medium,
  },
  applyBtnText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONT.bold,
  },
});

export default styles;
