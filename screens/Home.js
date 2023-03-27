import React, { useContext } from "react";
import {
  Button,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import ReportesStack from "../navigation/ReportesStack";
import HomeStackScreen from "../navigation/HomeStack";
import SettingsStack from "../navigation/SettingsStack";


const Tab = createBottomTabNavigator();

export default function HomeScreen() {

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused
              ? "home"
              : "home-outline";
          } else if (route.name === "Opciones") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Reportes") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00B2FF",
        tabBarLabelStyle:{fontSize:12},
        tabBarInactiveTintColor: "white",
        tabBarStyle:{
          backgroundColor:"#464646"
          //"#818E9C"
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} options={{headerShown:false,title:"Inicio",}}/>
      <Tab.Screen name="Reportes" component={ReportesStack} options={{headerShown:false}}/>
      <Tab.Screen name="Opciones" component={SettingsStack} options={{headerShown:false}}/>
    </Tab.Navigator>
  );
}
