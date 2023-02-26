import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import ReporteForm from "./ReporteForm";
import Camara from "../components/Camara";

function Home({ navigation }) {
  const { userInfo, isLoading, logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Bienvenido {userInfo.nombre}</Text>
      <Button title="Cerrar sesion" onPress={logout} />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function HomeScreen() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen
        name="Reporte"
        component={ReporteForm}
        options={{ headerTitle: "Crear reporte" }}
      />
      <Drawer.Screen
        name="Camara"
        component={Camara}
        options={{
          drawerItemStyle: { height: 0 },
        }}
      />
    </Drawer.Navigator>
  );
}
