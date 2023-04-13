import * as React from "react";
import { Button, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportesList from "../components/Reportes/ReportesList";
import ReporteDetail from "../components/Reportes/ReporteDetail";


const ReporteStack = createNativeStackNavigator();

export default function ReportesStackScreen() {
  return (
    <ReporteStack.Navigator>
      <ReporteStack.Screen name="ReportesList" component={ReportesList}  options={{ headerTitle:"Reportes",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}}/>
      <ReporteStack.Screen name="ReporteDetail" component={ReporteDetail} options={{headerTitle:"Detalles",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}}/>
    </ReporteStack.Navigator>
  );
}
