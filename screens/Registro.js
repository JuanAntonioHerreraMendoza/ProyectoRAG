import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { CheckBox } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { saveUsuario } from "../functions/api";

const Registro = () => {
  const [seePass, setSeePass] = useState(true);
  const [checked, setChecked] = useState(0);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [persona, setPersona] = useState({
    nombres: "",
    apellidop: "",
    apellidom: "",
    edad: "",
    calle: "",
    colonia: "",
    municipio: "",
    telefono: "",
    numcuenta: "",
    correo: "",
    activo: true,
    numSuspenciones: 0,
    tipousuariofk:{}
  });
  const [tipoUser, setTipoUser] = useState({
    idtipousuario: 1,
    tipousuario: "civico",
  });

  const [user, setUser] = useState({
    usuario: "",
    contraseña: "",
    idpersonafk:{
    }
  });

  const handleChangeP = (name, value) => {
    setPersona({ ...persona, [name]: value });
  };
  const handleChangeU = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmmit = (usuario,persona,tipousuario) => {
    persona.tipousuariofk=tipousuario;
    usuario.idpersonafk=persona;
    saveUsuario(usuario);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#1E262E" }}
      automaticallyAdjustKeyboardInsets={true}
      bounces={false}
    >
      <StatusBar />
      <View style={styles.container}>
        <Text style={styles.title}>Registro de usuario</Text>
        <Text style={styles.subs}>
          Rellene los campos a continuacion para realizar su registro
        </Text>
        <View style={{ flexDirection: "row" }}>
          <CheckBox
            containerStyle={{ backgroundColor: "#1E262E" }}
            textStyle={{ color: "white" }}
            center
            checked={checked === 0}
            onPress={() => setChecked(0)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Agente civico"
          />
          <CheckBox
            containerStyle={{ backgroundColor: "#1E262E" }}
            center
            textStyle={{ color: "white" }}
            checked={checked === 1}
            onPress={() => setChecked(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Agente Ciudadano"
          />
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Nombres"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("nombres", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido paterno"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("apellidop", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido materno"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("apellidom", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            keyboardType="numeric"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("edad", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Calle"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("calle", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Colonia"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("colonia", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Municipio"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("municipio", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Telefono"
            keyboardType="numeric"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("telefono", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Numero de cuenta"
            keyboardType="numeric"
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("numCuenta", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              handleChangeP("correo", text);
              handleChangeU("usuario", text);
            }}
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
              onChangeText={(text) => handleChangeU("contraseña", text)}
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
          <CheckBox
            containerStyle={{ backgroundColor: "#1E262E" }}
            center
            checked={checkedTerms}
            onPress={() => setCheckedTerms(!checkedTerms)}
            title="De acuerdo"
          />
          <TouchableOpacity
            onPress={() => handleSubmmit(user,persona,tipoUser)}
            style={styles.buttonSave}
          >
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  form: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 50,
    color: "white",
    fontSize: 28,
  },
  subs: {
    color: "white",
    fontSize: 15,
    marginVertical: 20,
  },
  input: {
    width: "100%",
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

export default Registro;
