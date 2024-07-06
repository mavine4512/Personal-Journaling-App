import React from 'react';
import { View, Text,ActivityIndicator } from 'react-native';
import { bindActionCreators } from "redux";
import { addUser } from "../../redux/actions";
import { connect } from "react-redux";
import { secondary } from "../../utilities/color";
import { CommonActions } from "@react-navigation/native";
import styles from './styles';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      majorUpdate: false,
      user: null,
      screen: "Dashboard",
    };
    this.mounted = false;
  }
  componentDidMount() {
    this.mounted = true;
    this.getData();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  async getData() {
    try {
      // let user = await AsyncStorage.getItem("user");
      // if (user) {
      //   user = JSON.parse(user);
      //   this.props.addUser(user);
      //   let storedVersion = await AsyncStorage.getItem("storedVersion");

      //   //redirect to home screen
      //   this.setState(
      //     {
      //       user: user,
      //       storedVersion: storedVersion,
      //     },
      //     () => {
      //       //timeout
      //       setTimeout(() => {
      //         this.validateUser();
      //       }, 2000);
      //     }
      //   );
      // } else {
        setTimeout(() => {
          this._redirect("Login"); 
        }, 2000);
      // }
    } catch (error) {}
  }

  async setContact(contact) {
    storeLocalStorage("contact", contact);
  }

  validateUser = () => {
    if (this.state.user) {
      this.props.navigation.navigate("Dashboard");
    }
  };
  _redirect(page) {
    // navigation.dispatch(jumpToAction);
    // this.props.navigation.navigate(page);
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: page }],
      })
    );
  }

  render() {
  return (
    <View style={styles.SlashContainer}>
      <ActivityIndicator
          style={styles.activityIndicator}
          size={'large'}
          color={secondary}
        />
      <Text style={styles.SlashLoading}>Loading ...</Text>
    </View>
  );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.appState.user,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addUser,
      // addPaymentAllowable,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Splash);