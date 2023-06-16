import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthContext } from "../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import ReportesStack from "./ReportesStack";
import HomeStackScreen from "./HomeStack";
import SettingsStack from "./SettingsStack";
import DocumentosStack from "./DocumentosStack";
import OficialStack from "./OficialStack";

//Creacion de los tabs para navegacion
const Tab = createBottomTabNavigator();

export default function Tabs() {
  const { userInfo } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Opciones") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Reportes") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "DocumentosStack") {
            iconName = focused ? "card" : "card-outline";
          } else if (route.name === "OficialStack") {
            iconName = focused ? "search-circle" : "search-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00B2FF",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#464646",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerShown: false, title: "Inicio" }}
      />
      {userInfo.tipousuariofk.idtipousuario === 2 ? (
        <Tab.Screen
          name="DocumentosStack"
          component={DocumentosStack}
          options={{ tabBarLabel: "Documentos", headerShown: false }}
        />
      ) : (
        <>
          <Tab.Screen
            name="Reportes"
            component={ReportesStack}
            options={{ headerShown: false }}
          />
        </>
      )}
      {userInfo.tipousuariofk.idtipousuario === 3 ? (
        <Tab.Screen
          name="OficialStack"
          component={OficialStack}
          options={{ tabBarLabel: "Busqueda", headerShown: false }}
        />
      ) : (
        <></>
      )}
      <Tab.Screen
        name="Opciones"
        component={SettingsStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
