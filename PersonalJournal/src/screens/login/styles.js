import { primary, black, white,Grey } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";

export default {
  loginContainer: {
    justifyContent: "center",
    backgroundColor: white,
  },
  loginimg: {
    height: moderateScale(220),
    width: moderateScale(220),
  },
  welcomeText: {
    fontFamily: "Roboto-Medium",
    fontSize: moderateScale(28),
    fontWeight: "bold",
    color: black,
    marginBottom: moderateScale(10),
  },
  signInText: {
    fontFamily: "Roboto-Medium",
    fontSize: moderateScale(25),
    fontWeight: "500",
    color: white,
    marginVertical: moderateScale(20),
    marginLeft: moderateScale(10),
  },
  animatableContent: {
    backgroundColor: '#277FEE',
    height: '59%',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  textInput: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: white,
    marginBottom: moderateScale(20),
  },
  icons: {
    marginRight: moderateScale(15),
    marginTop: moderateScale(13),
  },
  TextItems: {
    fontFamily: "Roboto-Medium",
    fontSize: moderateScale(14),
    fontWeight: "400",
    color: white,
  },
  noAccount: {
    marginBottom: moderateScale(30),
    marginHorizontal: moderateScale(30),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  textRegister: {
    color: white,
    fontSize: moderateScale(14),
  },
   viewContainerText: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(20),
    width: moderateScale(240),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewDash: {
    width: moderateScale(80),
    height: moderateScale(0.9),
    backgroundColor: Grey,
  },
  createTxt: {
    textAlign: 'center',
    color: '#06b7cc',
    fontSize: moderateScale(16),
    fontFamily: 'Gotham SSm Light',
  },
  eyeIcon: {
    padding: moderateScale(5),
    marginLeft: moderateScale(70),
  },
};