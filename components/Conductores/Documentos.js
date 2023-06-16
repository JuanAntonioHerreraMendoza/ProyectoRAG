import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";
import { getConductor } from "../../functions/apiConductor";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


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
    <ScrollView bounces={false}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("VistaDocumentos", {
              imagen: conductor.imgLicencia,
            });
          }}
          style={styles.buttonSave}
        >
          <Text style={styles.buttonText}>Licencia de conducir</Text>
          <Image
            source={{
              uri: "http://192.168.1.75:8080/images/" + conductor.imgLicencia+"?path=documentos"
            }}
            style={styles.images}
          />
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
          <Image
            source={{
              uri:
                "http://192.168.1.75:8080/images/" + conductor.imgtarjetaCirc+"?path=documentos"
            }}
            style={styles.images}
          />
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
          <Image
            source={{
              uri: "http://192.168.1.75:8080/images/" + conductor.imgPlacas+"?path=documentos"
            }}
            style={styles.images}
          />
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
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
    width: "90%",
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 17,
  },
  images: {
    width: wp("80"),
    height: hp("25"),
    alignSelf: "center",
  },
});

export default Documentos;
