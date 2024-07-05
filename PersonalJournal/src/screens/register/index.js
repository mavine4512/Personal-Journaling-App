import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  Image,
  Alert,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import {
  ErrorDialog,
  NetworkLostDialog,
  SuccessDialog,
} from "../../components/dialogs";
// import { AuthContext } from "../../components/context";
import styles from "./styles";
import Icon from "../../components/icon";
import SignUp from "../../assets/images/signUp.png";
import { white,black } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions";
import { useNavigation, CommonActions } from "@react-navigation/native";


const Register = ({ addUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { login } = useContext(AuthContext);

  const navigation = useNavigation();

  // const LoginAction = () => {
  //   fetch("https://dummyjson.com/auth/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       username: username,
  //       password: password,
  //       // expiresInMins: 60, // optional
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => {
  //       console.log("res", res);
  //       // navigation.navigate("Home", { screen: "Home" });
  //       saveUser(res);
  //       addUser(res);
  //       setPassword("");
  //       setUsername("");
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };

  // const saveUser = async (user) => {
  //   try {
  //     // storeLocalStorage("user", user);
  //     console.log("User data saved successfully!");
  //   } catch (error) {
  //     console.log("Error saving user data:", error);
  //   }
  // };

  // const handleLogin = () => {
  //   // Check if email is valid
  //   if (username === "") {
  //     Alert.alert("Invalid user name", "Please enter a valid user name.");
  //     return;
  //   }

  //   // Check if password is valid
  //   if (!password || password.length < 6) {
  //     Alert.alert(
  //       "Invalid Password",
  //       "Password must be at least 6 characters long."
  //     );
  //     return;
  //   }
  //   LoginAction();
  // };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar
        hidden={false}
        translucent={true}
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <View>
        <NetworkLostDialog ref={(ref) => (this.networkmodal = ref)} />
        <ErrorDialog ref={(ref) => (this.errordialog = ref)} />
        <SuccessDialog ref={(ref) => (this.successDialog = ref)} />
        <View style={{ alignItems: "center",marginTop:'7%', marginBottom: moderateScale(30) }}>
          <Image style={styles.loginimg} source={SignUp} resizeMode={'contain'}  />
          <Text style={styles.welcomeText}>Hello Register?</Text>
        </View>
        <Animatable.View
          animation="slideInUp"
          useNativeDriver
          easing={"ease-in-out-cubic"}
          style={styles.animatableContent}
        >
          <Text style={styles.signInText}>Register</Text>
          <View>
            <View style={styles.textInput}>
              <Icon
                name="user"
                type={"Entypo"}
                size={20}
                color={white}
                style={styles.icons}
              />
              <TextInput
                // onChangeText={(text) => setUsername(text)}
                value={username}
                style={styles.TextItems}
                placeholder="Enter your user name"
                placeholderTextColor={white}
              />
            </View>
            <View style={styles.textInput}>
              <Icon
                name="locked"
                type={"Fontisto"}
                size={20}
                color={white}
                style={styles.icons}
              />
              <TextInput
                // onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
                style={styles.TextItems}
                placeholder="Enter your password"
                placeholderTextColor={white}
              />
            </View>
            <View style={{ marginTop: moderateScale(30) }}>
              <Button title="Register" 
              // onPress={handleLogin} 
              />
            </View>
            <View style={styles.viewContainerText}>
              <View style={styles.viewDash} />
              <Text style={styles.createTxt}>OR</Text>
              <View style={styles.viewDash} />
            </View>

            <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.noAccount}
        >
          <Text style={[styles.textRegister, { color: black }]}>
            Have an account?{"  "}
          </Text>
          <Text style={styles.textRegister}>Login</Text>
        </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  const { appState } = state;
  return {
    appState,
    isPortrait: appState.isPortrait,
    deviceDimension: appState.deviceDimension,
    width: appState.deviceDimension.width,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Register);
