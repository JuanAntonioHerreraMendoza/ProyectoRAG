import React, { useRef, useEffect } from "react";
import Navigation from "./navigation/Navigation";

import { AuthProvider } from "./context/AuthContext";
import { registerForPushNotificationsAsync } from "./functions/notificaciones";
import * as Notifications from "expo-notifications";

function App() {
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
    //console.log(response);
  };

  const handleNotificationResponse = (response) => {
    //console.log(response);
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      //console.log(token)
    });
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
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;
