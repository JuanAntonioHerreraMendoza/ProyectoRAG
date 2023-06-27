import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View, Text } from "react-native";
import React from "react";
import Mensajes from "../components/Conductores/Mensajes";

const MensajesStack = () => {
  const MensajesStack = createNativeStackNavigator();
  return (
    <MensajesStack.Navigator>
      <MensajesStack.Screen
        name="Mensajes"
        component={Mensajes}
        options={{
          headerTitle: "Mensajes",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
    </MensajesStack.Navigator>
  );
};

export default MensajesStack;
