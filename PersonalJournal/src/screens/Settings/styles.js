import {  white,Grey,secondary } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";

export default {
    container: {
    flex: 1,
    padding: moderateScale(16),
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    padding: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(24),
    marginBottom: moderateScale(16),
  },
  input: {
    marginBottom: moderateScale(16),
  },
  button: {
    marginTop: moderateScale(16),
  },
   loaderContainer: {
    flex:1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: white,
  },
  activityIndicator: {
    position: 'relative',
  },
  profileLoading: {
    fontFamily: "Roboto-Medium",
    fontSize: moderateScale(15),
    fontWeight: "bold",
    color: Grey,
    marginVertical: moderateScale(20),
    marginLeft: moderateScale(10),
  },
}