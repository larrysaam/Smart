import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: SIZES.small,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: SIZES.medium,
  },
  mainText: {
    fontSize: SIZES.large,
    color: COLORS.shinyblue,
    fontWeight: "bold"
  },
});

export default styles;
