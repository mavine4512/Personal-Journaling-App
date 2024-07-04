import React,{ useState, useEffect, useMemo } from 'react';

import {View,Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Slash from '@screens/slash';

// import AuthScreen from '../screens/AuthScreen';
// import HomeScreen from '../screens/HomeScreen';
// import JournalScreen from '../screens/JournalScreen';
// import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
}

export default function Main() {
     const [isLoading, setIsLoading] = useState(true);

     if (isLoading) {
    return <Slash />;
    }
  return (
    <View>
        <Text>hello</Text>
    </View>
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     {/* <Stack.Screen name="Auth" component={AuthScreen} /> */}
    //     <Stack.Screen name="HomeTabs" component={HomeTabs} />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}
