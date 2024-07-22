import React, { useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Card, IconButton, Button } from 'react-native-paper';
import { secondary, primary } from "../../utilities/color";
import LottieView from "lottie-react-native";
import changeSVGColor from "@killerwink/lottie-react-native-color";
import { bindActionCreators } from "redux";
import styles from "./styles";
import { connect } from "react-redux";
import { addUser} from "../../redux/actions";
import Loader from "../../assets/animetions/loading.json";
import { moderateScale } from "react-native-size-matters";
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
const SCRIPTS = require("../../utilities/network");

const daysOfWeek = [
  { day: "Sun", color: "#FFCDD2" },
  { day: "Mon", color: "#F8BBD0" },
  { day: "Tue", color: "#E1BEE7" },
  { day: "Wed", color: "#D1C4E9" },
  { day: "Thu", color: "#C5CAE9" },
  { day: "Fri", color: "#BBDEFB" },
  { day: "Sat", color: "#B3E5FC" }
];

const time = () => {
  let today = new Date();
  let curHr = today.getHours();

  if (curHr < 12) {
    return "Good Morning";
  } else if (curHr < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const Dashboard = ({ user, navigation, props }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [journalList, setJournalList] = useState([]);
  const [loading, setLoading] = useState(false);

  const networkModalRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      dashboardAction();
    }, [])
  );

  const dashboardAction = () => {
    let endpoint = SCRIPTS.API_JOURNAL_LIST;

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        setLoading(false);
        networkModalRef.current?.showDialog();
      } else {
        setLoading(true);
        SCRIPTS.callGet(endpoint, "", "")
          .then((response) => {
            return response.data;
          })
          .then((responseJson) => {
            setLoading(false);
            setJournalList(responseJson ? responseJson : []);
          })
          .catch((error) => {
            console.log("NetworkError", error);
            setLoading(false);
          });
      }
    });
  };

  const addEntry = () => {
    navigation.navigate('EditJournal', { mode: 'add' });
  };

  const editEntry = (entry) => {
    navigation.navigate('EditJournal', { mode: 'edit', entry });
  };

  const deleteEntry = (entryId) => {
    let endpoint = `${SCRIPTS.API_JOURNAL_DELETE}/${entryId}`;
    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        setLoading(false);
        networkModalRef.current?.showDialog();
      } else {
        setLoading(true);
        SCRIPTS.callDelete(endpoint, "", "")
          .then((response) => {
            return response.data;
          })
          .then((responseJson) => {
            setLoading(false);
            dashboardAction();
          })
          .catch((error) => {
            console.log("DeleteError", error);
            setLoading(false);
          });
      }
    });
  };

  const filterEntriesByDay = (entries, day) => {
    if (day === null) return entries;
    return entries.filter(entry => {
      const entryDate = new Date(entry.cdate);
      return entryDate.getDay() === day;
    });
  };

  const filteredData = filterEntriesByDay(journalList, selectedDay);

  const resetFilter = () => {
    setSelectedDay(null);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{time()} {user?.username}</Text>
      </View>
      <View style={{ height: moderateScale(60) }}>
        <FlatList
          horizontal
          data={daysOfWeek}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => setSelectedDay(index)}>
              <View style={[
                styles.dayCircle,
                { backgroundColor: item.color },
                selectedDay === index && styles.selectedDayCircle
              ]}>
                <Text
                  style={[
                    styles.day,
                    selectedDay === index && styles.selectedDayText
                  ]}
                >
                  {item.day}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          style={styles.daysList}
        />
      </View>

      {selectedDay !== null && (
        <Button mode="contained" onPress={resetFilter} style={styles.resetButton}>
          Reset Filter
        </Button>
      )}


      { loading ? (
        <View style={styles.loaderItem}>
          <LottieView
            source={changeSVGColor(Loader, primary)}
            autoPlay={true}
            speed={5}
            style={{ width: moderateScale(150), color: primary, height: moderateScale(150) }}
          />
        </View>
      ) : filteredData.length < 1 ? (
        <View style={styles.emptyArray}>
          <Text style={styles.emptyText}>No journal added yet, click the add new entry to add</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={() => {
            dashboardAction();
          }}
          refreshing={loading}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.title}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <IconButton icon="pencil" size={20} color={secondary} onPress={() => editEntry(item)} />
                    <IconButton icon="delete" size={20} color="red" onPress={() => deleteEntry(item.id)} />
                  </View>
                </View>
                <View style={styles.categoryDate}>
                  <Text style={styles.category}>{item.category}</Text>
                  <Text style={styles.date}>{new Date(item.cdate).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.content}>{item.content}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )
      }

      <Button mode="contained" onPress={addEntry} style={styles.addButton}>
        Add New Entry
      </Button>
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


