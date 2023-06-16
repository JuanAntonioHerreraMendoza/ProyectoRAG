import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import ButtonCamera from "../ButtonCamera";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getConductorInfo, getMultasConductor } from "../../functions/apiConductor";
import { TouchableWithoutFeedback } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { Keyboard } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Busqueda = () => {
  const navigation = useNavigation();
  const [showAlert, setshowAlert] = useState(false);
  const [licencia, setLicencia] = useState("");
  const [circulacion, setCirculacion] = useState("");
  const [placas, setPlacas] = useState("");

  const handleSubmit = async () => {
    const data = await getConductorInfo(licencia, circulacion, placas);
    if (data.idconductor === null) {
      return setshowAlert(true);
    }
    const multasConductor = await getMultasConductor(data.idconductor);
    navigation.navigate("ConductorDetail", {
      datos: data,
      multas: multasConductor,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text}>
          Ingrese alguno de los campos a continuación para realizar la búsqueda
          de información del conductor
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Número de licencia"
          keyboardType="numeric"
          placeholderTextColor={"white"}
          onChangeText={(text) => setLicencia(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tarjeta de circulación"
          placeholderTextColor={"white"}
          onChangeText={(text) => setCirculacion(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Placas"
          placeholderTextColor={"white"}
          onChangeText={(text) => setPlacas(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Buscar conductor</Text>
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 25, marginVertical: 15 }}>
          ó
        </Text>
        <ButtonCamera
          title={"Escanear codigo"}
          icon="camera"
          onPress={() => navigation.navigate("ScanCode")}
        />
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alerta"
          message="No se encontro al usuario"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="De acuerdo"
          confirmButtonColor="#105293"
          contentContainerStyle={{ backgroundColor: "#1E262E" }}
          contentStyle={{ backgroundColor: "#1E262E" }}
          titleStyle={{ color: "white", textAlign: "center" }}
          messageStyle={{ color: "white", textAlign: "center" }}
          onConfirmPressed={() => {
            setshowAlert(false);
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = new StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E262E",
  },
  text: {
    color: "white",
    fontSize: hp("2"),
    marginBottom: 30,
  },
  input: {
    width: "80%",
    fontSize: 14,
    marginVertical: 10,
    borderWidth: 2,
    borderColor: "gray",
    height: 40,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 8,
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "#105293",
    width: "50%",
    marginVertical: 20,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: hp("2"),
  },
});

export default Busqueda;
