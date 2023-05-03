import React, { useContext } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

import Login from "../screens/LoginScreen";
import Tabs from "../navigation/Tabs";
import SplashScreen from "../components/SplashScreen";
import Registro from "../screens/Registro";
import RecuperarContraseña from "../screens/RecuperarContraseña";
import CambioContraseña from "../screens/CambioContraseña";
import Camara from "../components/Camara"

const Stack = createNativeStackNavigator();

function Navigation() {
  const { userInfo, splashLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
        ) : userInfo.idusuarios ? (
          <>
            <Stack.Screen
              name="Index"
              component={Tabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Camara"
              component={Camara}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Registro"
              component={Registro}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RecuperarContraseña"
              component={RecuperarContraseña}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CambioContraseña"
              component={CambioContraseña}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
