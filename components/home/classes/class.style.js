import { StyleSheet } from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../../../constants/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";


const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  classContainer: {
    width: "80%",
    height: 150,
    backgroundColor: COLORS.gray2,
    borderRadius: SIZES.xLarge,
    ...SHADOWS.medium,
    shadowColor: COLORS.shinyblue,
    borderColor: COLORS.shinyblue,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    paddingLeft: SIZES.large,
  },
  form: {
    fontFamily: FONT.regular,
    fontSize: 20,
    color: COLORS.black,
    textAlign: "left",
    marginTop: SIZES.large,
  },
  subjectName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.xLarge,
    color: COLORS.secondary,
    textAlign: "left",
    marginTop: SIZES.xxSmall,
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
  circleContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
  },
  number: {
    textAlign: "right",
    alignItems: "flex-end",
  }
});

export default styles;
