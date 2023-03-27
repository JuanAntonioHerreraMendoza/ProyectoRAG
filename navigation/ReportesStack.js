import * as React from "react";
import { Button, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReportesList from "../components/Reportes/ReportesList";
import ReporteDetail from "../components/Reportes/ReporteDetail";


const HomeStack = createNativeStackNavigator();

export default function ReportesStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="ReportesList" component={ReportesList} options={{headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}}/>
      <HomeStack.Screen name="ReporteDetail" component={ReporteDetail} options={{headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}}/>
    </HomeStack.Navigator>
  );
}
