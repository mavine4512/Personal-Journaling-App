import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity,Text } from 'react-native';
import { TextInput, Button, Card, Title} from 'react-native-paper';
import { primary, secondary, LightGrey } from "../../utilities/color";
import LottieView from "lottie-react-native";
import changeSVGColor from "@killerwink/lottie-react-native-color";
import Loader from "../../assets/animetions/loading.json";
import { moderateScale } from "react-native-size-matters";
import { CategoryModal} from "../../components/dialogs"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import NetInfo from "@react-native-community/netinfo";
const SCRIPTS = require("../../utilities/network");

const EditJournal = ({ route, navigation }) => {
  const { mode, entry } = route.params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCategoryName, setCategoryName] = useState('');
  const [focused, setFocused] = useState('');
  const categoryModalRef = useRef(null);

  useEffect(() => {
    if (mode === 'edit' && entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setCategory(entry.category);
      setCategoryName(entry.category)
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
            setLoading(false);
          })
          .catch((error) => {
            console.log("NetworkError", error);
            setLoading(false);
          });
      }
    });
  };

  const UpdateAction = () =>{
   let endpoint = `${SCRIPTS.API_UPDATE}/${entry.id}`;
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
        SCRIPTS.callUpdate(endpoint, data, "")
          .then((response) => {
           console.log('response', response )
            return response.data;
          })
          .then((responseJson) => {
            const data = responseJson
            setLoading(false);
          })
          .catch((error) => {
            console.log("UpdateError", error);
            setLoading(false);
          });
      }
    }); 
  }


  const saveEntry = () => {
    if (mode === 'add') {
      AddAction()
    } else {
      UpdateAction()
    }
    navigation.goBack();
  };

  if (loading){
    <View
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50%",
          },
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
  }
  return (
    <View style={styles.container}>
      <CategoryModal
        ref={categoryModalRef}
        category={category}
        onSelect={(selectedCategory, selectedCategoryName) => {
          setCategory(selectedCategory);
          setCategoryName(selectedCategoryName);
        }}
      />
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

          <View
      style={focused === 'category' ? styles.inputContainerFocus : styles.inputContainer}
    >
      <Icon
        name="google-classroom"
        style={styles.iconInput}
      />
      <TouchableOpacity
        style={[styles.textInput, { justifyContent: 'center' }]}
        onPress={()=>{
          categoryModalRef.current._show();
          setFocused('category')
      }}
      >
        <Text
          style={[
            styles.textCategory,
            {
              color: category === '' ? '#000' : '#444',
            },
          ]}
        >
          {category === '' ? 'Select Category' : selectedCategoryName}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          categoryModalRef.current._show();
        }}
      >
        <AntDesignIcon
          name="caretdown"
          style={styles.iconInput}
        />
      </TouchableOpacity>
    </View>
          
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
  },
   inputContainerFocus: {
    height: moderateScale(40),
    paddingLeft: moderateScale(6),
    paddingRight: moderateScale(6),
    paddingTop: moderateScale(2),
    paddingBottom: moderateScale(2),
    backgroundColor: '#f8f8f8',
    width: null,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(4),
    overflow: 'hidden',
    borderColor: 'purple',
    borderWidth: 1,
  },
   inputContainer: {
    height: moderateScale(50),
    paddingLeft: moderateScale(6),
    paddingRight: moderateScale(6),
    paddingTop: moderateScale(2),
    paddingBottom: moderateScale(2),
    backgroundColor: '#f8f8f8',
    width: null,
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginLeft: moderateScale(20),
    marginRight: moderateScale(20),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    alignItems: 'center',
    borderRadius: moderateScale(4),
    overflow: 'hidden',
    borderColor: 'purple',
    borderWidth: 1,
  },
  iconInput: {
    color: '#c4c4c4',
    marginRight: moderateScale(5),
    fontSize: moderateScale(22),
  },
  textInput: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    height: moderateScale(40),
    flex: 1,
    color: 'black',
    fontFamily: 'Gotham SSm Light',
    fontSize: moderateScale(15),
  },
  textCategory:{
    fontSize: moderateScale(15),
    fontFamily: 'Gotham SSm Light',
    alignSelf: 'flex-start',
    marginStart: moderateScale(5),
  }
});

export default EditJournal;
