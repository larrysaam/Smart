import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../constants/theme";


const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.xSmall,
    marginBottom: SIZES.medium,
    justifyContent: "space-evenly",
  },
  seqContainer: {
    width: "43%",
    height: 120,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.xLarge,
    ...SHADOWS.medium,
    shadowColor: COLORS.shinyblue,
    borderColor: COLORS.shinyblue,
    borderLeftWidth: 2,
    alignItems: "center",
  },
  name: {
    fontFamily: FONT.regular,
    fontSize: 16 ,
    color: COLORS.black,
    textAlign: "left",
    marginTop: SIZES.xSmall,
  },
  number: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xLarge,
    color: COLORS.secondary,
    textAlign: "left",
    marginTop: SIZES.large,
  },
  sequenceTitle: {
    marginTop: SIZES.large,
  },
  miniCircle: {
    height: 20,
    width: 20,
    borderRadius: SIZES.xLarge,
    backgroundColor: COLORS.white,
    alignItems: "center",
    marginRight: 2,
    justifyContent: "space-between"
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
  },
});

export default styles;
