import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { cambiarContraseña } from "../functions/api";

const CambioContraseña = () => {
    
  const [user, setUser] = useState({
    contraseña: "",
  });
  const [codigo, setCodigo] = useState({
    codigo: "",
  });

  const handleChange = (name, value) => setUser({ ...user, [name]: value });

  const handleChangeC = (name, value) =>
    setCodigo({ ...codigo, [name]: value });

  const handleSubmmit = async (user, codigo) => {
    await cambiarContraseña(user, codigo);
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambio contraseña</Text>
      <Text style={styles.subs}>
        Escriba el codigo que se le envio a su correo asi como su nueva
        contraseña
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Codigo"
        keyboardType="numeric"
        placeholderTextColor={"white"}
        onChangeText={(text) => handleChangeC("codigo", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nueva Contraseña"
        placeholderTextColor={"white"}
        onChangeText={(text) => handleChange("contraseña", text)}
      />
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => {
          handleSubmmit(user,codigo);
        }}
      >
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
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

export default CambioContraseña;
