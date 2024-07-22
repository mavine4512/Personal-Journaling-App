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
import LoginImg from "../../assets/images/login.png";
import { white, black } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { storeLocalStorage } from "../../localData/localData";
import NetInfo from "@react-native-community/netinfo";
const SCRIPTS = require("../../utilities/network");

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const navigation = useNavigation();

  const networkModalRef = useRef(null);
  const errorDialogRef = useRef(null);
  const successDialogRef = useRef(null);

  const LoginAction = () => {
    let endpoint = SCRIPTS.API_LOGIN;
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
            userLogin(responseJson);
          })
          .catch((error) => {
            console.log("NetworkError", error);
            setLoading(false);
          });
      }
    });
  };

  const userLogin = (responseJson) => {
    let user = responseJson;
    const userData = user.data
    if (user.error) {
      errorDialogRef.current?.showDialog("Log In Error", user.error);
    } 
    
    if (userData){
      successDialogRef.current?.showDialog(userData.status, () =>{
        _redirect("Dashboard");
      });

    console.log("Login was Success", userData);

    // Ensure props.addUser is defined and available
    if (props && props.addUser) {
      props.addUser(userData);
      saveUser(userData);
    } else {
      console.error("addUser function is not available in props.");
    }
     setPassword("");
    setUsername(""); 
    }
  };

  _redirect=(page)=>{
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: page }],
      })
    );
  }

   const saveUser = async (user) => {
    try {
      // setToken(user.access_token);
      setLoading(false);
      storeLocalStorage("user", user);
    } catch (e) {
      console.error("Error saving user:", e);
    }
  };

  const handleLogin = () => {
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
    LoginAction();
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
        <View style={{ alignItems: "center",marginTop:'7%', marginBottom: moderateScale(40) }}>
          <Image style={styles.loginimg} source={LoginImg} />
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>
        <Animatable.View
          animation="slideInUp"
          useNativeDriver
          easing={"ease-in-out-cubic"}
          style={styles.animatableContent}
        >
          <Text style={styles.signInText}>Login</Text>
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
                secureTextEntry={secureTextEntry}
                style={styles.TextItems}
                placeholder="Enter your password"
                placeholderTextColor={white}
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry(!secureTextEntry)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={secureTextEntry ? "eye-with-line" : "eye"}
                  type={"Entypo"}
                  size={20}
                  color={white}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: moderateScale(30) }}>
              <Button title="Login" onPress={handleLogin} 
              />
            </View>
            <View style={styles.viewContainerText}>
              <View style={styles.viewDash} />
              <Text style={styles.createTxt}>OR</Text>
              <View style={styles.viewDash} />
            </View>

            <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
          style={styles.noAccount}
        >
          <Text style={[styles.textRegister, { color: black }]}>
            Don't have an account?{"  "}
          </Text>
          <Text style={styles.textRegister}>Register</Text>
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
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addUser,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Login);
