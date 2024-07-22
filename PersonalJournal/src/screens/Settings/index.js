import React, { useState, useEffect} from 'react';
import { View, ActivityIndicator, Alert} from 'react-native';
import { TextInput, Button, Text, Card, Title } from 'react-native-paper';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { secondary } from "../../utilities/color";
import styles from "./styles";
import { addUser, updateProfile} from "../../redux/actions";
import NetInfo from "@react-native-community/netinfo";
const SCRIPTS = require("../../utilities/network");

const SettingsScreen = ({user, updateProfile}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(user.password)
    if (user && user.username) {
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [user]);

  const updateUser = () => {
    const updatedProfile = { ...user, username, password };
    const endpoint = SCRIPTS.API_PROFILE;

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        Alert.alert("Error", "No internet connection");
      } else {
        setLoading(true);
        console.log('endpoint', endpoint)
        SCRIPTS.callUpdate(endpoint, updatedProfile, "")
          .then((response) => response.data)
          .then((responseJson) => {
            setLoading(false);
            if (responseJson && responseJson.status === 'Success') {
              updateProfile(updatedProfile);
              Alert.alert("Success", "User details updated successfully!");
            } else {
              Alert.alert("Error", "Failed to update user details");
            }
          })
          .catch((error) => {
            console.log("NetworkError", error);
            setLoading(false);
            Alert.alert("Error", "An error occurred while updating user details");
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      {loading ?
      <View style={styles.loaderContainer}>
        <ActivityIndicator
          style={styles.activityIndicator}
          size={'large'}
          color={secondary}
        />
        <Text style={styles.profileLoading}>Updating Profile ...</Text>
      </View> : 
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Settings</Title>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            mode="outlined"
            secureTextEntry
            style={styles.input}
          />
          <Button mode="contained" onPress={updateUser} style={styles.button}>
            Update
          </Button>
        </Card.Content>
      </Card>}
      
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.appState.user
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addUser,
     updateProfile
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps) (SettingsScreen);
