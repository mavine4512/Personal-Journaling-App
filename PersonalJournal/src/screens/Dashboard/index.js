import React, { useState,  useEffect, useRef} from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Card, IconButton, Button } from 'react-native-paper';
import { secondary, primary, Gray } from "../../utilities/color";
import LottieView from "lottie-react-native";
import changeSVGColor from "@killerwink/lottie-react-native-color";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions";
import Loader from "../../assets/animetions/loading.json"
import { moderateScale } from "react-native-size-matters";
import backgroundImage from "../../assets/images/backgroundImage.png"
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

const Dashboard = ({ user, navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [jounrnalList, setJournalList] = useState('');
  const [loading, setLoading] = useState(false);

  const networkModalRef = useRef(null);

   useEffect(() => {
     dashboardAction();
  }, []);

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

  const addEntry = () => {
    navigation.navigate('EditJournal', { mode: 'add' });
  };

  const editEntry = (entry) => {
    navigation.navigate('EditJournal', { mode: 'edit', entry });
  };

  const deleteEntry = (entry) => {
    // Handle entry deletion
  };

  const filterEntriesByDay = (entries, day) => {
    if (day === null) return entries;
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.getDay() === day;
    });
  };

  const filteredData = filterEntriesByDay(jounrnalList, selectedDay);

  const resetFilter = () => {
    setSelectedDay(null);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{time()} {user?.username}</Text>
      </View>
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

      {selectedDay !== null && (
        <Button mode="contained" onPress={resetFilter} style={styles.resetButton}>
          Reset Filter
        </Button>
      )}
      {
       jounrnalList.length > 0 && loading && <View
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

      {
        // jounrnalList.data.length > 0 ? 
          <FlatList
              data={filteredData.data}
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
                      <IconButton icon="pencil" size={20} onPress={() => editEntry(item)} />
                    </View>
                    <View style={styles.categoryDate}>
                      <Text style={styles.category}>{item.category}</Text>
                      <Text style={styles.date}>{item.date}</Text>
                    </View>
                    <Text style={styles.content}>{item.content}</Text>
                  </Card.Content>
                </Card>
              )}
         />
      //  : <View style={styles.backgroundImgView}>
      //       <Image  style={styles.backgroundImg} source={backgroundImage} />
      //       <Text style={[styles.category,{marginVertical: 20, fontSize: 20}]}>No Journal yet create on by clicking the button Add New entry</Text>
      //     </View>
      }
     
      <Button mode="contained" onPress={addEntry} style={styles.addButton}>
        Add New Entry
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: moderateScale(16), backgroundColor: '#f5f5f5' },
  greeting: { fontSize: moderateScale(15), fontWeight: 'bold', marginBottom: 10, color: primary },
  daysList: { 
    marginBottom: moderateScale(8), 
    height: moderateScale(10), 
    paddingVertical: 3 , 
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  selectedDayCircle: {
    borderWidth: 1,
    borderColor: primary
  },
  day: { fontSize: 16, color: 'white' },
  selectedDayText: {
    fontWeight: 'bold'
  },
  resetButton: {
    marginVertical: 10,
    alignSelf: 'center',
    backgroundColor: secondary,
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  card: { marginBottom: 10, backgroundColor: 'white' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold', color: secondary },
  categoryDate: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4},
  category: { fontSize: 14, color: primary },
  date: { fontSize: 12, color: primary },
  content: { fontSize: 14, marginTop: 8, color: primary },
  addButton: { marginTop: 16 },
  backgroundImgView:{
     alignItems: "center",
    justifyContent: "center",
    marginBottom: moderateScale(50)
  },
  backgroundImg:{
     height: moderateScale(300),
     width: moderateScale(300),
  }
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
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
