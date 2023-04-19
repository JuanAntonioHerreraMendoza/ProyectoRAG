import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Busqueda from "../components/Oficiales/Busqueda";
import ConductorDetail from "../components/Oficiales/ConductorDetail";
import ScanBarCode from "../components/ScanBarCode"

const OficialStack = () => {
  const OficialStack = createNativeStackNavigator();

  return (
    <OficialStack.Navigator>
      <OficialStack.Screen
        name="Busqueda"
        component={Busqueda}
        options={{
          headerTitle: "Busqueda",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
      <OficialStack.Screen
        name="ConductorDetail"
        component={ConductorDetail}
        options={{
          headerTitle: "Detalles del conductor",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
          headerBackTitle: "Busqueda",
        }}
      />
      <OficialStack.Screen
        name="ScanCode"
        component={ScanBarCode}
        options={{
          headerTitle: "Lector",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
    </OficialStack.Navigator>
  );
};

export default OficialStack;
