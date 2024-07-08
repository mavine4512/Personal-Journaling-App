import React, { useState, useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card, Title } from 'react-native-paper';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addUser, addJournal} from "../../redux/actions";

const SettingsScreen = ({user}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log(user)
    if (user && user.username) {
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [user]);

  const updateUser = () => {
    // Update user information
  };

  return (
    <View style={styles.container}>
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
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  card: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.appState.user
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addUser,
      // addJournal
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps) (SettingsScreen);
