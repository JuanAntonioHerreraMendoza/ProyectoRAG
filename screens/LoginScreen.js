import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useNavigation } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";
import Ionicons from "react-native-vector-icons/Ionicons";

import { AuthContext } from "../context/AuthContext";
import { KeyboardAvoidingView } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  //Obtencion de funcion para el login
  const { isLoading, login } = useContext(AuthContext);
  //Variables
  const [accesToken, setAccesToken] = useState(null);
  const [userG, setUserG] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "46543387206-l1kci17tb7hgddi43fn6odt4ua08jvfd.apps.googleusercontent.com",
    iosClientId:
      "46543387206-smelvtc1l97odmfa8gtk1qmrv6psq72g.apps.googleusercontent.com",
    androidClientId:
      "46543387206-emjkj7pqrcro2cdf21u2st03n73769id.apps.googleusercontent.com",
  });
  const [seePass, setSeePass] = useState(true);
  const [emailValidate, setemailValidate] = useState(false);
  const [inputsValidate, setinputsValidate] = useState(false);
  const [loginValidate, setloginValidate] = useState(false);

  const [user, setUser] = useState({
    idusuarios: 0,
    usuario: "",
    contraseña: "",
  });

  //Funcion para navegar
  const navigation = useNavigation();

  const validarInputs = (user) => {
    if (user.usuario === "" || user.contraseña === "") return true;
  };

  const handleChange = (name, value) => setUser({ ...user, [name]: value });

  //Envio de informacion
  const handleSubmmit = async (user) => {
    setinputsValidate(false);
    if (validarInputs(user)) {
      return setinputsValidate(true);
    }
    let u = await login(user);
    if (u === undefined) {
      return setloginValidate(true);
    }
  };

  //Funciones de google
  useEffect(() => {
    if (response?.type === "success") {
      console.log(response);
      setAccesToken(response.authentication.accessToken);
      accesToken && fetchUserGInfo();
    }
  }, [response, accesToken]);

  const fetchUserGInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: Bearer`${accesToken}`,
      },
    });
    const useInfo = await response.json();
    console.log(useInfo);
    setUserG(useInfo);
  };

  const ShowUserInfo = () => {
    if (userG) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 35, fontWeight: "bold", marginBottom: 20 }}>
            Welcome
          </Text>
          <Image
            source={{ uri: userG.picture }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{userG.name}</Text>
        </View>
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
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
        {userG && <ShowUserInfo />}
        {inputsValidate ? (
          <Text style={styles.warningText}>Rellene ambos campos</Text>
        ) : (
          <></>
        )}
        {loginValidate ? (
          <Text style={styles.warningText}>
            Usuario o contraseña incorrectos
          </Text>
        ) : (
          <></>
        )}
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => handleChange("usuario", text)}
        />
        <View
          style={{
            flexDirection: "row",
            borderColor: "white",
            borderWidth: 0.1,
          }}
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
        {/* <TouchableOpacity
          style={styles.buttonGoogle}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
        <Text style={styles.buttonText}>Aqui va lo de google</Text>
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: "row",
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Registro");
            }}
          >
            <Text style={{ color: "white" }}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RecuperarContraseña");
            }}
          >
            <Text style={{ color: "white" }}>Olvide mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    borderWidth: 2,
    borderColor: "gray",
    height: 35,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 8,
  },
  buttonSave: {
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "#105293",
    width: "80%",
    marginVertical: 10,
  },
  buttonGoogle: {
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "#105293",
    width: "80%",
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
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
