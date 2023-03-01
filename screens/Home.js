import React, { useContext } from "react";
import {
  Button,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import ReporteForm from "./ReporteForm";
import Camara from "../components/Camara";
import Reportes from "./Reportes";
import ReporteDetail from "../components/Reportes/ReporteDetail";
import menuImage from "../components/menuImage";

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
  const { userInfo, logout } = useContext(AuthContext);

  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        drawerStyle: { backgroundColor: "#222f3e" },
        drawerLabelStyle: { color: "white" },
      }}
      drawerContent={(props)=>menuImage(props,logout,userInfo)}
    >
      <Drawer.Screen name="Inicio" component={Home} options={{ headerTitle: "Inicio",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"},headerTitleStyle:{color:"white"}}}/>
      <Drawer.Screen
        name="Reporte"
        component={ReporteForm}
        options={{ headerTitle: "Crear reporte",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"},headerTitleStyle:{color:"white"}}}
      />
      <Drawer.Screen
        name="Reportes"
        component={Reportes}
        options={{ headerTitle: "Mis reportes", headerTitleAlign: "center",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"},headerTitleStyle:{color:"white"}}}
      />
      <Drawer.Screen
        name="ReporteDetail"
        component={ReporteDetail}
        options={{
          drawerItemStyle: { height: 0 },
        }}
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
