import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { cambiarContraseña } from "../functions/api";
import { validarContraseña } from "../functions/Validaciones";
import { Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CambioContraseña = ({ route }) => {
  const navigation = useNavigation();
  const [messageE, setmessageE] = useState("");
  const [messageErrorC, setMessageErrorC] = useState("");
  const [seePass, setSeePass] = useState(true);

  const [user, setUser] = useState({
    correo: route.params.correo,
    contraseña: "",
  });
  const [codigo, setCodigo] = useState({
    codigo: "",
  });

  const handleChange = (name, value) => setUser({ ...user, [name]: value });

  const handleChangeC = (name, value) =>
    setCodigo({ ...codigo, [name]: value });

  const handleSubmmit = (user, codigo) => {
    setmessageE("");
    setMessageErrorC("");
    if (codigo.codigo === "") {
      return setmessageE("Rellene el campo");
    }
    let checkPass = validarContraseña(user.contraseña);
    if (checkPass) {
      return setMessageErrorC(checkPass);
    }
    cambiarContraseña(user, codigo).then((status) => {
      if (status === 200) {
        navigation.navigate("Login");
      } else {
        Alert.alert("Codigo incorrecto");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambio contraseña</Text>
      <Text style={styles.subs}>
        Escriba el codigo que se le envio a su correo asi como su nueva
        contraseña
      </Text>
      {messageE === "" ? (
        <></>
      ) : (
        <Text style={styles.warningText}>{messageE}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Codigo"
        placeholderTextColor={"white"}
        onChangeText={(text) => handleChangeC("codigo", text)}
      />
      {messageErrorC === "" ? (
        <></>
      ) : (
        <Text style={styles.warningText}>{messageErrorC}</Text>
      )}
      <View
        style={{ flexDirection: "row", borderColor: "white", borderWidth: 0.1 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Nueva Contraseña"
          placeholderTextColor={"white"}
          secureTextEntry={seePass}
          onChangeText={(text) => handleChange("contraseña", text)}
        />
        <View style={styles.wrapperIcon}>
          <TouchableOpacity onPress={() => setSeePass(!seePass)}>
            {seePass ? (
              <Ionicons name={"eye-outline"} size={30} color="white" />
            ) : (
              <Ionicons name={"eye-off-outline"} size={30} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => {
          handleSubmmit(user, codigo);
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
  wrapperIcon: {
    position: "absolute",
    right: 0,
    top: -4,
    padding: 7,
  },
});

export default CambioContraseña;
