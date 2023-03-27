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

const LoginScreen = ({ navigation }) => {
  const { isLoading, login } = useContext(AuthContext);

  const [user, setUser] = useState({
    usuario: "",
    contraseña: "",
  });

  const handleChange = (name, value) => setUser({ ...user, [name]: value });

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <Text style={styles.text}>Supervision Ciudadana</Text>
      <Text style={styles.text} >SuCi</Text>
      <Ionicons style={{marginBottom:30}} name={"shield-outline"} size={150} color={"#E1EC2F"} />
      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#ffffff"
        onChangeText={(text) => handleChange("usuario", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor="#ffffff"
        secureTextEntry
        onChangeText={(text) => handleChange("contraseña", text)}
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
    backgroundColor: "#1E262E",
  },
  text:{
    color:"white",
    fontSize:28,
  }
  ,
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
    marginVertical:20
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontStyle:"italic",
    fontSize: 16
  },
});

export default LoginScreen;
