import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "../../screens/Dashboard";
import Summary from "../../screens/Summary";
import { white, primary, Grey } from "../../utilities/color";
import { moderateScale } from "react-native-size-matters";
import Settings from "../../screens/Settings";

const Tab = createMaterialBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor={primary}
      barStyle={{ backgroundColor: '#277FEE'}}
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
      {/* <Tab.Screen
        name="Summary"
        component={Summary}
        options={{
          tabBarLabel: "Journal Summary",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="bell"
              color={color}
              size={moderateScale(21)}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
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