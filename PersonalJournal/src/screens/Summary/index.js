import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { primary, secondary, Gray } from "../../utilities/color";

const Summary = ({ dailyEntries=40, weeklyEntries=10, monthlyEntries }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Summary of Entries</Text>
      <View style={styles.summaryContainer}>
        {dailyEntries !== null && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.subHeader}>Daily</Text>
              <Text style={styles.text}>Number of entries today: {dailyEntries}</Text>
            </Card.Content>
          </Card>
        )}
        {weeklyEntries !== null && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.subHeader}>Weekly</Text>
              <Text style={styles.text}>Number of entries this week: {weeklyEntries}</Text>
            </Card.Content>
          </Card>
        )}
        {monthlyEntries !== null && (
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.subHeader}>Monthly</Text>
              <Text style={styles.text}>Number of entries this month: {monthlyEntries}</Text>
            </Card.Content>
          </Card>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: primary, 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  summaryContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    marginHorizontal: 16
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: secondary,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    color: Gray
  }
});

export default Summary;
