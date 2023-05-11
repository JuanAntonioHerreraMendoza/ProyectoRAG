import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { enviarCorreo, existeCorreo } from "../functions/api";
import { validarEmail } from "../functions/Validaciones";

const RecuperarContraseña = () => {
  const navigation = useNavigation();
  //Variables
  const [correo, setCorreo] = useState("");
  const [emailValidate, setEmailValidete] = useState(false);
  const [inputValidate, setInputValidate] = useState(false);
  //Funcion de confirmacion de correo
  const confirmarCorreo = async (correo) => {
    setInputValidate(false);
    setEmailValidete(false);

    if (correo === "") {
      return setInputValidate(true);
    }
    if (!validarEmail(correo)) {
      return setEmailValidete(true);
    }
    if(await existeCorreo(correo)){
    enviarCorreo(correo);
    navigation.navigate("CambioContraseña", { correo: { correo } });
    }else{
      alert("No existe este correo")
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <Text style={styles.subs}>
        Escriba su correo a continuación para poder enviarle un codigo y
        recupere su contraseña
      </Text>
      {inputValidate ? (
        <Text style={styles.warningText}>Rellene el campo de correo</Text>
      ) : (
        <></>
      )}
      {emailValidate ? (
        <Text style={styles.warningText}>
          No es el formato de correo correcto
        </Text>
      ) : (
        <></>
      )}
      <TextInput
        style={styles.input}
        onChangeText={(text) => setCorreo(text)}
      />
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => {
          confirmarCorreo(correo);
        }}
      >
        <Text style={styles.buttonText}>Confirmar correo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    padding: 20,
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
  input: {
    width: "80%",
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "gray",
    height: 35,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 8,
  },
  title: {
    marginTop: 50,
    color: "white",
    fontSize: 28,
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
  warningText: {
    color: "red",
    fontSize: 15,
    marginTop: 0,
    marginBottom: 10,
  },
});

export default RecuperarContraseña;
