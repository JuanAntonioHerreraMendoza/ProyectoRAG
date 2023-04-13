import { View, Text } from "react-native";
import React from "react";
import Documentos from "../components/Conductores/Documentos";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VistaDocumentos from "../components/Conductores/VistaDocumentos"

const DocumentosStack = () => {
  const DocumentosStack = createNativeStackNavigator();

  return (
    <DocumentosStack.Navigator>
      <DocumentosStack.Screen
        name="Documentos"
        component={Documentos}
        options={{
          headerTitle: "Documentos",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
      <DocumentosStack.Screen
        name="VistaDocumentos"
        component={VistaDocumentos}
        options={{
          headerTitle: "Documento",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
    </DocumentosStack.Navigator>
  );
};

export default DocumentosStack;
