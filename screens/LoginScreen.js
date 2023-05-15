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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { AuthContext } from "../context/AuthContext";
import { KeyboardAvoidingView } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
  //Obtencion de funcion para el login
  const { isLoading, login, loginGoogle } = useContext(AuthContext);
  //Variables
  const [showAlert, setshowAlert] = useState(false);
  const [accesToken, setAccesToken] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
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
      setAccesToken(response.authentication.accessToken);
      accesToken && fetchUserGInfo();
    }
  }, [response, accesToken]);

  const fetchUserGInfo = async () => {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer${accesToken}`,
      },
    });
    const useInfo = await response.json();
    if (useInfo === null || useInfo === undefined) {
      setshowAlert(true)
    } else {
      await loginGoogle({ usuario: useInfo.email });
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1,backgroundColor:"#1E262E" }}>
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
        <TouchableOpacity
          style={styles.buttonGoogle}
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <Ionicons
            name="logo-google"
            size={20}
            color={"white"}
            style={{ position: "absolute", left: 15, top: 5 }}
          />
          <Text style={styles.buttonText}>Iniciar sesión con google</Text>
        </TouchableOpacity>
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
            <Text style={{ color: "white",fontSize:hp("1.5") }}>Registrarse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RecuperarContraseña");
            }}
          >
            <Text style={{ color: "white",fontSize:hp("1.5")}}>Olvide mi contraseña</Text>
          </TouchableOpacity>
        </View>
        <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Alerta"
        message="No existe un usuario con este correo"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Si, estoy de acuerdo"
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
    width: wp('70%'),
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
    width: wp("70"),
    marginVertical: 10,
  },
  buttonGoogle: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "#105293",
    width: wp("70%"),
    marginBottom: 15,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: hp("1.7")
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
