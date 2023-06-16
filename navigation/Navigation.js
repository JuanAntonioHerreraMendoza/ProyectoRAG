import React, { useContext, useEffect, useRef } from "react";
import { View, Text, StyleSheet, StatusBar, Linking } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";
import { registerForPushNotificationsAsync } from "../functions/notificaciones";
import * as Notifications from "expo-notifications";
import { navigate, navigationRef } from '../functions/rootNavigation';

import Login from "../screens/LoginScreen";
import Tabs from "../navigation/Tabs";
import SplashScreen from "../components/SplashScreen";
import Registro from "../screens/Registro";
import RecuperarContraseña from "../screens/RecuperarContraseña";
import CambioContraseña from "../screens/CambioContraseña";
import Camara from "../components/Camara";

const Stack = createNativeStackNavigator();

function Navigation() {
  const { userInfo, splashLoading } = useContext(AuthContext);

  const notificationListener = useRef();
  const responseListener = useRef();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const handleNotification = (response) => {
    // if (response) {
    //   
    // }
  };

  const handleNotificationResponse = (response) => {
    if (response) {
      navigate("Notificaciones")
    }
  };

  useEffect(() => {
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener(handleNotification);

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        handleNotificationResponse
      );

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
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
