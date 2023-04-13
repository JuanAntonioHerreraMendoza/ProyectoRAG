import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getConductor } from "../../functions/api";

const Documentos = () => {
  const navigation = useNavigation();
  const [conductor, setConductor] = useState({});
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const data = await getConductor(userInfo.idpersonafk);
    setConductor(data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("VistaDocumentos", {
            imagen: conductor.imgLicencia,
          });
        }}
        style={styles.buttonSave}
      >
        <Text style={styles.buttonText}>Licencia de conducir</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => {
          navigation.navigate("VistaDocumentos", {
            imagen: conductor.imgtarjetaCirc,
          });
        }}
      >
        <Text style={styles.buttonText}>Tarjeta de circulacion</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => {
          navigation.navigate("VistaDocumentos", {
            imagen: conductor.imgPlacas,
          });
        }}
      >
        <Text style={styles.buttonText}>Placas</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = new StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E262E",
  },
  subs: {
    color: "white",
    fontSize: 15,
    marginVertical: 20,
  },
  buttonSave: {
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "#105293",
    width: "80%",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Documentos;
