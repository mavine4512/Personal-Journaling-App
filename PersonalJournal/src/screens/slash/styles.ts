import { StyleSheet } from "react-native";
import { primary, black, white } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";

export default StyleSheet.create({
  SlashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: white,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    zIndex: -1,
  },
  SlashLoading: {
    fontFamily: "Roboto-Medium",
    fontSize: moderateScale(20),
    fontWeight: "bold",
    // color: primary,
    marginVertical: moderateScale(20),
    // margingLeft: moderateScale(10),
  },
});