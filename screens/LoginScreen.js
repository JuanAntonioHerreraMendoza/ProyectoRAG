import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";

import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const { isLoading, login } = useContext(AuthContext);

  const [user, setUser] = useState({
    user: "",
    pass: "",
  });

  const handleChange = (name, value) => setUser({ ...user, [name]: value });

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => handleChange("user", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ffffff"
        secureTextEntry
        onChangeText={(text) => handleChange("pass", text)}
      />
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={() => {
          login(user);
        }}
      >
        <Text style={styles.buttonText}>Iniciar sesion</Text>
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
    backgroundColor: "#20187C",
  },
  input: {
    width: "80%",
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 35,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#10ac84",
    width: "80%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontStyle:"italic",
    fontSize: 16
  },
});

export default LoginScreen;
