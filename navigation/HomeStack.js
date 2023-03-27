import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Inicio";
import ReporteForm from "../screens/ReporteForm";
import Camara from "../components/Camara"

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Inicio" component={Home} options={{headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}} />
      <HomeStack.Screen name="ReporteForm" component={ReporteForm} options={{headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}} />
      <HomeStack.Screen name="Camara" component={Camara} options={{headerShown:false}}/>
    </HomeStack.Navigator>
  );
}