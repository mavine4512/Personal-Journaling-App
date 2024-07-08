import React, { useRef, useState } from "react";
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
import styles from "./styles";
import Icon from "../../components/icon";
import SignUp from "../../assets/images/signUp.png";
import { white, black } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";
import NetInfo from "@react-native-community/netinfo";
import { useNavigation } from "@react-navigation/native";
const SCRIPTS = require("../../utilities/network");

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const networkModalRef = useRef(null);
  const errorDialogRef = useRef(null);
  const successDialogRef = useRef(null);

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const registerUser = () => {
    let endpoint = SCRIPTS.API_REGISTER;
    const data = {
      username: username,
      password: password,
    };
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        setLoading(false);
        networkModalRef.current?.showDialog();
      } else {
        setLoading(true);
        SCRIPTS.callPost(endpoint, data, "")
          .then((response) => {
            return response.data;
          })
          .then((responseJson) => {
            registerNewUser(responseJson);
          })
          .catch((error) => {
            console.log("NetworkError", error);
            setLoading(false);
          });
      }
    });
  };

  const registerNewUser = (responseJson) => {
    let user = responseJson;
    if (user.success) {
      errorDialogRef.current?.showDialog("Register Error", user.status);
    } else {
      successDialogRef.current?.showDialog("Registration was Success", user.status);
      navigation.navigate("Login", { screen: "Login" });
      setPassword("");
      setUsername("");
      setConfirmPassword("");
    }
  };

  const handleRegister = () => {
    // Check if user name is valid
    if (username === "") {
      Alert.alert("Invalid user name", "Please enter a valid user name.");
      return;
    }

    // Check if password is valid
    if (!password || password.length < 6) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 6 characters long."
      );
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match. Please try again.");
      return;
    }

    registerUser();
  };

  return (
    <SafeAreaView style={styles.loginContainer}>
      <StatusBar
        hidden={false}
        translucent={true}
        barStyle={"dark-content"}
        backgroundColor={"transparent"}
      />
      <View>
        <NetworkLostDialog ref={networkModalRef} />
        <ErrorDialog ref={errorDialogRef} />
        <SuccessDialog ref={successDialogRef} />
        <View style={{ alignItems: "center", marginTop: '7%', marginBottom: moderateScale(40) }}>
          <Image style={styles.loginimg} source={SignUp} resizeMode={'contain'} />
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
                onChangeText={(text) => setUsername(text)}
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
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={!passwordVisible}
                style={styles.TextItems}
                placeholder="Enter your password"
                placeholderTextColor={white}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={togglePasswordVisibility}
              >
                <Icon
                  name={passwordVisible ? "eye" : "eye-off"}
                  type={"Feather"}
                  size={20}
                  color={white}
                />
              </TouchableOpacity>
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
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={!confirmPasswordVisible}
                style={styles.TextItems}
                placeholder="Confirm your password"
                placeholderTextColor={white}
              />
              <TouchableOpacity
                style={styles.confirmEyeIcon}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Icon
                  name={confirmPasswordVisible ? "eye" : "eye-off"}
                  type={"Feather"}
                  size={20}
                  color={white}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: moderateScale(30) }}>
              <Button title="Register" onPress={handleRegister} />
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


export default Register;
