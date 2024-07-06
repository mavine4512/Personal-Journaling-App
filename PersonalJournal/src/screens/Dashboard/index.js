import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, IconButton, Button } from 'react-native-paper';
import { secondary, primary, Gray } from "../../utilities/color";

const data = [
  {
    id: 1,
    title: "Introduction to React",
    content: "React is a popular JavaScript library for building user interfaces...",
    category: "Web Development",
    date: "2024-07-06"
  },
  {
    id: 2,
    title: "Understanding Node.js",
    content: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine...",
    category: "Backend Development",
    date: "2024-06-30"
  },
  {
    id: 3,
    title: "Getting Started with HTML",
    content: "HTML stands for Hyper Text Markup Language and is the standard markup language for creating web pages...",
    category: "Web Design",
    date: "2024-07-01"
  },
  {
    id: 4,
    title: "Mastering CSS",
    content: "CSS is a language that describes the style of an HTML document...",
    category: "Web Design",
    date: "2024-07-02"
  },
  {
    id: 5,
    title: "JavaScript Basics",
    content: "JavaScript is a programming language that allows you to implement complex features on web pages...",
    category: "Programming",
    date: "2024-07-03"
  }
];

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

const JournalScreen = ({ navigation }) => {
  const [selectedDay, setSelectedDay] = useState(null);

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

  const filteredData = filterEntriesByDay(data, selectedDay);

  const resetFilter = () => {
    setSelectedDay(null);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>{time()} Andrew</Text>
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
              <Text style={[
                styles.day,
                selectedDay === index && styles.selectedDayText
              ]}>
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
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <Text style={styles.title}>{item.title}</Text>
                <IconButton icon="pencil" size={20} onPress={() => editEntry(item)} />
              </View>
              <View style={styles.row}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
              <Text style={styles.content}>{item.content}</Text>
            </Card.Content>
          </Card>
        )}
      />
      <Button mode="contained" onPress={addEntry} style={styles.addButton}>
        Add New Entry
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  greeting: { fontSize: 15, fontWeight: 'bold', marginBottom: 10, color: primary },
  daysList: { marginBottom: 8, height: 65, paddingVertical: 3 },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
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
  row: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  category: { fontSize: 14, color: Gray },
  date: { fontSize: 12, color: Gray },
  content: { fontSize: 14, marginTop: 8 },
  addButton: { marginTop: 16 }
});

export default JournalScreen;
