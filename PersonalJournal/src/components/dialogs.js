import React from "react";
import {
  Modal,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import LottieView from "lottie-react-native";
import changeSVGColor from "@killerwink/lottie-react-native-color";
import { scale, moderateScale } from "react-native-size-matters";
import { Text, Button } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import Loader from "../assets/animetions/loading.json";
import Success from "../assets/animetions/success.json";
import Failed from "../assets/animetions/error-animation.json";
import NoWifi from "../assets/animetions/signal-wifi.json";
import { LightGrey, Grey, primary, white, black } from "../utilities/color";
import Icon from "./icon";

const btnStyle = {
  backgroundColor: primary,
  borderRadius: moderateScale(50),
  alignItems: "center",
  justifyContent: "center",
};

export const LoadingDialog = (props) => {
  return (
    <View
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50%",
        },
        props.style,
      ]}
    >
      <LottieView
        source={changeSVGColor(Loader, primary)}
        autoPlay={true}
        speed={5}
        style={{
          width: moderateScale(150),
          color: primary,
          height: moderateScale(150),
        }}
      />
    </View>
  );
};

export class NetworkLostDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  _dismiss = () => {
    this.setState({ visible: false });
  };

  _show = () => {
    this.setState({ visible: true });
  };

  render() {
    return (
      <Modal visible={this.state.visible} transparent>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1, backgroundColor: primary }}>
            <TouchableWithoutFeedback
              onPress={() => {
                this._dismiss();
              }}
              style={{ marginTop: "15%" }}
            >
              <Icon
                onPress={() => this._dismiss()}
                style={{
                  color: white,
                  marginLeft: "5%",
                  marginTop: "5%",
                  fontSize: moderateScale(25),
                }}
                type={"AntDesign"}
                name={"close"}
              />
            </TouchableWithoutFeedback>
            <View style={styles.animationContainer}>
              <LottieView
                source={changeSVGColor(NoWifi, white)}
                autoPlay
                loop
                hardwareAccelerationAndroid
                style={{
                  width: scale(200),
                  marginLeft: moderateScale(40),
                  height: scale(200),
                }}
              />
              <View
                style={{
                  marginHorizontal: moderateScale(20),
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(15),
                    fontFamily: "Gotham SSm Light",
                    color: white,
                    textAlign: "center",
                  }}
                >
                  No internet connection! Make sure that the WI-FI or mobile
                  data is turned on, then try again.
                </Text>
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    marginTop: moderateScale(30),
                    fontFamily: "Gotham SSm Light",
                    color: LightGrey,
                    alignSelf: "center",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  Personal Journal
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    );
  }
}

export class SuccessDialog extends React.Component {
  state = {
    paused: false,
    visible: false,
    title: "",
    message: "",
    callback: () => {},
  };

  showDialog = (message = "", callback = () => {}) => {
    this.setState({ visible: true, paused: true }, () => {
      this.setState({ message, callback });
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        animated
        transparent
        overFullScreen
        onRequestClose={(e) => {
          this.setState({ visible: false });
          this.state.callback();
        }}
        animationType={"fade"}
      >
        <Animatable.View
          style={styles.modalBack}
          animation={"zoomIn"}
          duration={500}
          useNativeDriver
        >
          <View style={styles.dialogContainer}>
            <LottieView
              source={changeSVGColor(Success, primary)}
              style={{
                width: moderateScale(200),
                height: moderateScale(200),
                alignSelf: "center",
              }}
              autoPlay={true}
              loop={false}
              duration={2500}
              hardwareAccelerationAndroid
              onAnimationFinish={(b) =>
                this.setState({ visible: false }, () => {
                  if (this.state.callback) {
                    this.state.callback();
                  }
                })
              }
            />
            <Text style={styles.info}>{this.state.message}</Text>
          </View>
        </Animatable.View>
      </Modal>
    );
  }
}

export class ErrorDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      message: "",
      Title: "",
      dismiss: 5000,
      hasAction: false,
      callback: () => {},
    };
  }
  handleOK = () => {
    this.setState({ visible: false });
  };

  showDialog = (Title = "Error", message = "body", dismiss = 4, tag = true) => {
    this.setState({
      visible: true,
      message,
      Title,
      dismiss: dismiss * 1000,
      hasAction: tag,
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        animated
        transparent
        overFullScreen
        onRequestClose={(e) => {
          this.setState({ visible: false });
        }}
        animationType={"fade"}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Animatable.View
            style={styles.modalBack}
            animation={"zoomIn"}
            duration={200}
            useNativeDriver
          >
            <View style={styles.dialogContainer}>
              <LottieView
                source={Failed}
                style={{
                  width: moderateScale(200),
                  height: moderateScale(200),
                  alignSelf: "center",
                }}
                autoPlay={true}
                loop={false}
                duration={1500}
                onAnimationFinish={(b) => {
                  this.state.hasAction === true
                    ? this.setState({ visible: true })
                    : this.setState({ visible: false });
                }}
              />
              <Text style={styles.titleError}>{this.state.Title}</Text>
              <Text style={styles.error}>{this.state.message}</Text>
              {this.state.hasAction === true && (
                <View
                  style={{
                    alignSelf: "center",
                    marginTop: moderateScale(10),
                    flexDirection: "row",
                  }}
                >
                  <Button
                    style={styles.btnStyle}
                    onPress={() => this.handleOK()}
                  >
                    <Text style={styles.btnText}>Try Again</Text>
                  </Button>
                </View>
              )}
            </View>
          </Animatable.View>
        </SafeAreaView>
      </Modal>
    );
  }
}

export class LogoutPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      title: "",
      message: "",
      callback: () => {},
    };
  }

  dismiss = () => {
    this.setState({ visible: false });
  };

  showDialog = (title = "Title", message = "body", callback = () => {}) => {
    this.setState({
      visible: true,
      title,
      message,
      callback,
    });
  };

  render() {
    return (
      <Modal visible={this.state.visible} transparent>
        <Animatable.View
          style={[styles.container, { backgroundColor: "rgba(0,0,0,.4)" }]}
          animation={"slideInUp"}
          duration={500}
        >
          <SafeAreaView
            style={{
              marginTop: moderateScale(380),
              backgroundColor: white,
              height: moderateScale(260),
              borderTopLeftRadius: moderateScale(10),
              borderTopRightRadius: moderateScale(10),
              paddingLeft: moderateScale(20),
              paddingRight: moderateScale(20),
            }}
          >
            <View>
              <View style={styles.lineContainer}>
                <View style={styles.headerLine} />
              </View>
              <View style={styles.IconText}>
                <Icon
                  name={"logout"}
                  type={"AntDesign"}
                  style={{
                    color: "red",
                    fontSize: moderateScale(20),
                    paddingRight: moderateScale(10),
                  }}
                />
                <Text style={styles.logoutText}>Log Out</Text>
              </View>

              <Text style={styles.moreInfo}>
                You are about to log out. All your local app change will be
                lost.
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: moderateScale(30),
                }}
              >
                <TouchableOpacity
                  style={[
                    btnStyle,
                    {
                      borderRadius: moderateScale(5),
                      height: moderateScale(30),
                      width: moderateScale(150),
                      backgroundColor: "red",
                    },
                  ]}
                  onPress={() => this.props.logOut()}
                >
                  <Text style={styles.btnText}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    btnStyle,
                    {
                      borderRadius: moderateScale(5),
                      height: moderateScale(30),
                      width: moderateScale(150),
                    },
                  ]}
                  onPress={() => {
                    this.dismiss();
                  }}
                >
                  <Text style={styles.btnText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animatable.View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  panelHandle: {
    width: moderateScale(60),
    height: moderateScale(5),
    borderRadius: moderateScale(4),
    backgroundColor: "#00000040",
    marginTop: moderateScale(3),
    marginBottom: moderateScale(5),
  },
  panelHeader: {
    alignItems: "center",
  },
  invisibleHeader: {
    backgroundColor: "rgba(0,0,0,.01)",
    paddingTop: moderateScale(10),
  },
  header: {
    backgroundColor: white,
    shadowColor: LightGrey,
    shadowOffset: { width: moderateScale(-1), height: moderateScale(-3) },
    shadowRadius: moderateScale(2),
    shadowOpacity: moderateScale(0.4),
    paddingTop: moderateScale(10),
    borderTopLeftRadius: moderateScale(15),
    borderTopRightRadius: moderateScale(15),
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.98)",
  },
  modalBack: {
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  animationContainer: {
    alignSelf: "center",
    height: scale(400),
    backgroundColor: primary,
  },
  title: {
    marginTop: moderateScale(10),
    alignSelf: "center",
    fontSize: moderateScale(16),
    fontFamily: "Gotham SSm Book",
  },
  buttonContainer: {
    width: moderateScale(75),
    height: moderateScale(75),
    marginRight: moderateScale(15),
    alignSelf: "flex-end",
    top: Platform.OS === "android" ? 0 : 15,
  },
  btnText: {
    color: white,
    fontFamily: "Gotham SSm Medium",
    fontSize: moderateScale(12),
    alignSelf: "center",
  },
  btn: {
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
    height: moderateScale(40),
    backgroundColor: primary,
    borderWidth: moderateScale(0.5),
    color: "white",
    marginBottom: moderateScale(15),
    elevation: 0,
    borderRadius: moderateScale(5),
    overflow: "hidden",
    marginTop: moderateScale(40),
    alignSelf: "stretch",
    justifyContent: "center",
  },
  receive: {
    marginTop: moderateScale(10),
    fontSize: moderateScale(16),
    marginBottom: moderateScale(10),
    fontFamily: "Gotham SSm Book",
  },
  messageHint: {
    flex: 1,
    marginBottom: moderateScale(50),
    padding: moderateScale(5),
  },
  buttonHint: {
    height: moderateScale(35, 0.25),
    marginRight: "5%",
    alignSelf: "flex-end",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: moderateScale(30),
    height: moderateScale(30),
  },
  btnStyle: {
    borderRadius: moderateScale(30),
    borderColor: "red",
    borderWidth: moderateScale(1),
    width: moderateScale(130),
    alignItems: "center",
    justifyContent: "center",
  },
  subText: {
    marginLeft: moderateScale(10),
    color: "#000",
    fontFamily: "Gotham SSm Book",
    fontSize: moderateScale(17),
    fontWeight: "bold",
  },
  dialogContainer: {
    backgroundColor: "white",
    margin: moderateScale(20),
    padding: moderateScale(20),
    borderRadius: moderateScale(5),
  },
  info: {
    fontFamily: "Gotham SSm Light",
    fontSize: moderateScale(18),
    marginHorizontal: moderateScale(6),
    textAlign: "center",
  },
  error: {
    fontFamily: "Gotham SSm Light",
    fontSize: moderateScale(14),
    marginHorizontal: moderateScale(6),
    textAlign: "center",
  },
  titleError: {
    fontFamily: "Gotham SSm Light",
    fontSize: moderateScale(18),
    fontWeight: "bold",
    textAlign: "center",
    color: Grey,
  },
  textList: {
    width: "70%",
    fontSize: moderateScale(16),
    fontFamily: "Gotham SSm Light",
  },
  containerList: {
    padding: moderateScale(10),
    width: "100%",
    flexDirection: "row",
    borderBottomWidth: moderateScale(1),
    alignItems: "center",
    borderBottomColor: "#eee",
  },
  endList: {
    position: "absolute",
    right: "20%",
  },
  selectTitle: {
    marginHorizontal: moderateScale(20),
    alignSelf: "center",
    fontSize: moderateScale(16),
    fontFamily: "Gotham SSm Book",
  },
  emptyView: {
    height: moderateScale(90),
  },
  lineContainer: {
    height: moderateScale(25),
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  headerLine: {
    backgroundColor: Grey,
    height: moderateScale(5),
    width: moderateScale(35),
    borderRadius: moderateScale(10),
  },
  IconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: black,
    fontFamily: "Gotham SSm Light",
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
  moreInfo: {
    fontFamily: "Gotham SSm Light",
    fontSize: moderateScale(14),
    marginTop: moderateScale(10),
  },
})