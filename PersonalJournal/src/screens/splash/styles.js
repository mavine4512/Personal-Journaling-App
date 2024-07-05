import { StyleSheet } from "react-native";
import { Grey, black, white } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";

export default {
  SlashContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white,
  },
  activityIndicator: {
    position: 'relative',
  },
  SlashLoading: {
    fontFamily: "Roboto-Medium",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: Grey,
    marginVertical: moderateScale(20),
    margingLeft: moderateScale(10),
  },
};