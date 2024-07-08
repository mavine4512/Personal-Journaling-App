import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import { primary, secondary } from "../../utilities/color";
import NetInfo from "@react-native-community/netinfo";
const SCRIPTS = require("../../utilities/network");

const EditJournal = ({ route, navigation }) => {
  const { mode, entry } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (mode === 'edit' && entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setCategory(entry.category);
    }
  }, [mode, entry]);

  const AddAction = () => {
    let endpoint = SCRIPTS.API_ADDNEW;
    const data = {
      title: title,
      content: content,
      category:category
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
            const data = responseJson
            setLoading(false);
            setJournalList({data})
          })
          .catch((error) => {
            console.log("NetworkError", error);
            setLoading(false);
          });
      }
    });
  };


  const saveEntry = () => {
    if (mode === 'add') {
      // Add new entry
    } else {
      // Update existing entry
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.header}>{mode === 'add' ? 'Add New Entry' : 'Edit Entry'}</Title>
          <TextInput
            label="Title"
            value={title}
            onChangeText={setTitle}
            style={styles.input}
            mode="outlined"
          />
          <TextInput
            label="Content"
            value={content}
            onChangeText={setContent}
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={4}
          />
          <TextInput
            label="Category"
            value={category}
            onChangeText={setCategory}
            style={styles.input}
            mode="outlined"
          />
          <Button mode="contained" onPress={saveEntry} style={styles.saveButton}>
            Save
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5',justifyContent: 'center', },
  card: { margin: 16, backgroundColor: 'white', borderRadius: 10, elevation: 3 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: primary,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: { marginBottom: 16, backgroundColor: 'white' },
  saveButton: {
    marginTop: 16,
    backgroundColor: secondary
  }
});

export default EditJournal;
