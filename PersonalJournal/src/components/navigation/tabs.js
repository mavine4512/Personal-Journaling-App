import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Dashboard from "../../../src/screens/dashboard";
import NameShame from "../../screens/NameShame";
import { white, primary, Grey } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";
import Profile from "../../screens/Profile";
import Settings from "../../screens/settings";
import Notification from "../../screens/Notification";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={primary}
      barStyle={{ backgroundColor: white }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={moderateScale(21)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="NameShame"
        component={NameShame}
        options={{
          tabBarLabel: "NameShame",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="emoticon-sad"
              color={color}
              size={moderateScale(20)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarLabel: "Notification",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell"
              color={color}
              size={moderateScale(21)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "settings",
          tabBarIcon: ({ color }) => (
            <Icon name="settings" color={color} size={moderateScale(18)} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              color={color}
              size={moderateScale(23)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Tabs;