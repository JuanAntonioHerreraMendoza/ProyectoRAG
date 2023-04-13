import * as Location from "expo-location";
import { Alert } from "react-native";

export const getCurrentLocation= async () => {
  const response = { status: false, location: null,direccion:null };
  let resPermisos = await Location.requestForegroundPermissionsAsync();
  if (resPermisos.status !== "granted") {
    Alert.alert("No se concedieron los permisos");
    return response;
  }

  const posicion = await Location.getCurrentPositionAsync({});

  const location = {
    latitude: posicion.coords.latitude,
    longitude: posicion.coords.longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };
  response.status = true;
  response.location = location;
  const direccion = await Location.reverseGeocodeAsync(response.location);
  response.direccion = direccion;
  return response;
}
