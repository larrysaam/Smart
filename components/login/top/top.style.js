import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "30%",
    backgroundColor: COLORS.gray,
    marginBottom: SIZES.Large,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.xTLarge,
    height: 70,
  },
  
  profileImage:{
    width: 50,
    height: 50,
    tintColor: COLORS.white,
    borderRadius: SIZES.large,
    borderWidth: 1,
    borderColor: COLORS.white,
  },
});

export default styles;
