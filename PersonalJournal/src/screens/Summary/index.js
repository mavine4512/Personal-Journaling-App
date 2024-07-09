import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Card } from 'react-native-paper';
import { moderateScale } from "react-native-size-matters";
import { connect } from 'react-redux';
import { primary, secondary, Gray } from '../../utilities/color';
import { useFocusEffect } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
const SCRIPTS = require("../../utilities/network");

const SummaryView = ({ user }) => {
  const [period, setPeriod] = useState('daily');
  const [summaryData, setSummaryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      fetchSummaryData();
    }, [period])
  );

  const fetchSummaryData = () => {
    let endpoint = `${SCRIPTS.API_SUMMARY_DATA}?period=${period}`;

    NetInfo.fetch().then((state) => {
      if (!state.isConnected) {
        setLoading(false);
      } else {
        setLoading(true);
        SCRIPTS.callGet(endpoint, "", "")
          .then((response) => response.data)
          .then((responseJson) => {
            setLoading(false);
            setSummaryData(responseJson ? responseJson: []);
          })
          .catch((error) => {
            console.log("NetworkError", error);
            setLoading(false);
          });
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {user?.username}</Text>
      <Text style={styles.heading}>Summary View</Text>
      
      <Picker
        selectedValue={period}
        style={styles.picker}
        onValueChange={(itemValue) => setPeriod(itemValue)}
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="Weekly" value="weekly" />
        <Picker.Item label="Monthly" value="monthly" />
      </Picker>
  
      {loading ? (
        <Text>Data Loading...</Text>
      ) : summaryData.length < 1 ? (
        <View style={styles.emptyArray}>
          <Text style={styles.emptyText}>No entries for the selected period.</Text>
        </View>
      ) : (
        <FlatList
          data={summaryData}
          keyExtractor={(item) => item.id}
          onRefresh={() => {
            fetchSummaryData();
          }}
          refreshing={loading}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.row}>
                  <Text style={styles.date}>{new Date(item.cdate).toLocaleDateString()}</Text>
                  <Text style={styles.category}>{item.category}</Text>
                </View>
                <Text style={styles.content}>{item.content}</Text>
              </Card.Content>
            </Card>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: moderateScale(16), backgroundColor: '#f5f5f5' },
  greeting: { fontSize: moderateScale(15), fontWeight: 'bold', marginBottom: 10, color: primary },
  heading: { fontSize: moderateScale(18), fontWeight: 'bold', marginBottom: 10, color: secondary },
  picker: { height: 50, width: '100%', marginBottom: 20 , backgroundColor: '#6BBCFF'},
  card: { marginBottom: 10, backgroundColor: 'white' },
  title: { fontSize: 18, fontWeight: 'bold', color: secondary },
  date: { fontSize: 14, color: primary, marginTop: 4 },
  content: { fontSize: 14, marginTop: 8, color: primary },
  emptyArray: {
    justifyContent:'center', 
    alignItems:'center',
    marginTop:moderateScale(90)
  },
  emptyText:{
  fontWeight: 'bold', 
  fontSize: 20,
  color: primary
},
row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
category: {
    fontSize: 14,
    color: 'gray',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.appState.user
  };
};

export default connect(mapStateToProps)(SummaryView);
