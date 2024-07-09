import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Dashboard from "../../screens/Dashboard";
import Summary from "../../screens/Summary";
import { white, primary, Grey } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";
import Icon from "../icon";
import Settings from "../../screens/Settings";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor={primary}
      barStyle={{ backgroundColor: white}}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Dashboard",
          tabBarIcon: ({ color }) => (
            <Icon
              type={"MaterialCommunityIcons"}
              name="home"
              color={color}
              size={moderateScale(25)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Summary"
        component={Summary}
        options={{
          tabBarLabel: "Journal Summary",
          tabBarIcon: ({ color }) => (
            <Icon
              type={"Entypo"}
              name="open-book"
              color={color}
              size={moderateScale(25)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Icon
              type={"MaterialCommunityIcons"}
              name="account"
              color={color}
              size={moderateScale(26)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default Tabs;