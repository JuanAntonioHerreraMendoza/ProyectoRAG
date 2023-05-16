import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Inicio";
import ReporteForm from "../screens/ReporteForm";
import ReporteDetail from "../components/Reportes/ReporteDetail";
import { Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Notificaciones from "../screens/Notificaciones";

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Inicio"
        component={Home}
        options={({navigation}) => ({
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Notificaciones")}
            >
              <Text style={{ color: "white", marginRight: 20, fontSize: 18 }}>
                <Ionicons name={"notifications-outline"} size={25} color="white" />
              </Text>
            </TouchableOpacity>
          ),
        })}
      />
      <HomeStack.Screen
        name="ReporteForm"
        component={ReporteForm}
        options={{
          headerTitle: "Formulario de reporte",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
      <HomeStack.Screen
        name="ReporteDetail"
        component={ReporteDetail}
        options={{
          headerTitle: "Detalles",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
      <HomeStack.Screen
        name="Notificaciones"
        component={Notificaciones}
        options={{
          headerTitle: "Notificaciones",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#222f3e" },
        }}
      />
    </HomeStack.Navigator>
  );
}
