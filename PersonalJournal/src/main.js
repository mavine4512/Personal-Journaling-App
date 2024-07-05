import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Splash from "./screens/splash";
import Login from "./screens/login";
import Register from "./screens/register";
import Dashboard from "./screens/Dashboard";
// import UserName from "./screens/register/userName";
// import PhoneNumber from "./screens/register/PhoneNumber";
// import County from "./screens/register/county";
// import Password from "./screens/register/password";
// import Privacy from "./Privacy";
// import EventLists from "./screens/EventLists";
// import Tabs from "../src/components/navigation/tabs";
// import RegisterEvent from "../src/screens/registerEvent";
// import TypeOfWaste from "./screens/TypeOfWaste";
// import CollectionPoints from "./screens/CollectionPoints";
// import Training from "./screens/Training";
// import SolidWasteHeatMap from "./screens/SolidWasteHeatMap";
// import RecycleWaste from "./screens/RecycleWaste";
// import SelectedType from "./screens/TypeOfWaste/selectedType";
// import BookWasteCollection from "./screens/BookWasteCollection";
// import NameShame from "./screens/NameShame";

const Stack = createStackNavigator();

class Main extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{
              headerShown: false,
            }}
          />
           <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{
              headerShown: false,
            }}
          />
         {/* <Stack.Screen
            name="PhoneNumber"
            component={PhoneNumber}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="County"
            component={County}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Password"
            component={Password}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Privacy"
            component={Privacy}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RegisterEvent"
            component={RegisterEvent}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="EventLists"
            component={EventLists}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TypeOfWaste"
            component={TypeOfWaste}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CollectionPoints"
            component={CollectionPoints}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Training"
            component={Training}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SolidWasteHeatMap"
            component={SolidWasteHeatMap}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="RecycleWaste"
            component={RecycleWaste}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SelectedType"
            component={SelectedType}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name=" BookWasteCollection"
            component={BookWasteCollection}
            options={{
              headerShown: false,
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Main;