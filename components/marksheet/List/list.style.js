import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants";

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    padding: SIZES.small,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderBottomColor: COLORS.gray,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: SIZES.medium,
    color: COLORS.black,
  },
  input: {
    width: 50,
    height: 40,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SIZES.medium,
    textAlign: "center",
  },
});

export default styles;
