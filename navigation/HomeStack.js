import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Inicio";
import ReporteForm from "../screens/ReporteForm";
import ReporteDetail from "../components/Reportes/ReporteDetail"

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Inicio" component={Home} options={{headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}} />
      <HomeStack.Screen name="ReporteForm" component={ReporteForm} options={{headerTitle:"Formulario de reporte",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}} />
      <HomeStack.Screen name="ReporteDetail" component={ReporteDetail} options={{headerTitle:"Detalles",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}}/>
    </HomeStack.Navigator>
  );
}