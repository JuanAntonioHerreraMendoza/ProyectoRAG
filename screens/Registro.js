import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import {Picker} from '@react-native-picker/picker';

const Registro = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de usuario</Text>
      <Text style={styles.subs}>
        Rellene los campos a continuacion para realizar su registro
      </Text>
      <View style={styles.form}>
          <Picker
            style={{width:"100%",color:"white"}}
            mode="dropdown"
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedLanguage(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        <TextInput
          style={styles.input}
          placeholder="Nombres"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido paterno"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido materno"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Calle"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Colonia"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Municipio"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefono"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor={"white"}
        />
        <TextInput
          style={styles.input}
          placeholder="Numero de cuenta"
          placeholderTextColor={"white"}
        />
        <TouchableOpacity style={styles.buttonSave}>
          <Text style={styles.buttonText}>Registrarme</Text>
        </TouchableOpacity>
      </View>
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
  form: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 28,
  },
  subs: {
    color: "white",
    fontSize: 15,
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
