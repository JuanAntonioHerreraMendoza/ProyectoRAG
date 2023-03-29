import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const { isLoading, login } = useContext(AuthContext);
  const [seePass, setSeePass] = useState(true);
  const [emailValidate, setemailValidate] = useState(false);
  const [inputsValidate, setinputsValidate] = useState(false);
  const [loginValidate, setloginValidate] = useState(false);

  const [user, setUser] = useState({
    usuario: "",
    contraseña: "",
  });

  const validarEmail = (user) => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (re.test(user.usuario) || regex.test(user.usuario)) {
      return true;
    }
  };

  const validarInputs = (user) => {
    if (user.usuario === "" || user.contraseña === "") return true;
  };

  const handleSubmmit = (user) => {
    setinputsValidate(false);
    setemailValidate(false);
    if (validarInputs(user)) {
      return setinputsValidate(true);
    }
    if (!validarEmail(user)) {
      return setemailValidate(true);
    }
    if (login(user)) {
      return setloginValidate(true);
    }
    login(user);
  };

  const handleChange = (name, value) => setUser({ ...user, [name]: value });

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.text}>Supervisión Ciudadana</Text>
      <Text style={styles.text}>SuCi</Text>
      <Ionicons
        style={{ marginBottom: 30 }}
        name={"shield-outline"}
        size={150}
        color={"#E1EC2F"}
      />
      {emailValidate ? (
        <Text style={styles.warningText}>Formato de email incorrecto</Text>
      ) : (
        <></>
      )}
      {inputsValidate ? (
        <Text style={styles.warningText}>Rellene ambos campos</Text>
      ) : (
        <></>
      )}
      {loginValidate ? (
        <Text style={styles.warningText}>Usuario o contraseña incorrectos</Text>
      ) : (
        <></>
      )}
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => handleChange("usuario", text)}
      />
      <View
        style={{ flexDirection: "row", borderColor: "white", borderWidth: 0.1 }}
      >
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#ffffff"
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
          handleSubmmit(user);
        }}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
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
  text: {
    color: "white",
    fontSize: 28,
  },
  input: {
    width: "80%",
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#E1EC2F",
    height: 35,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 8,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "#10ac84",
    width: "80%",
    marginVertical: 20,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 16,
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    top: -4,
    padding: 7,
  },
  warningText: {
    color: "red",
    fontSize: 15,
    marginTop: 0,
    marginBottom: 10,
  },
});

export default LoginScreen;
