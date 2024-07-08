import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { bindActionCreators } from "redux";
import { addUser } from "../../redux/actions";
import { connect } from "react-redux";
import { secondary } from "../../utilities/color";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    this.checkUserToken();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

   async checkUserToken() {
    try {
      let user = await AsyncStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        this.props.addUser(user);

        //redirect to home screen
        this.setState(
          {
            user: user,
          },
          () => {
            //timeout
            setTimeout(() => {
              this.validateUser();
            }, 2000);
          }
        );
      } else {
        setTimeout(() => {
          this._redirect("Login");
        }, 2000);
      }
    } catch (error) {
    }
  }

  validateUser = () => {
    if (this.state.user.token) {
      this._redirect("Dashboard");
    }
  };

  _redirect(page) {
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
