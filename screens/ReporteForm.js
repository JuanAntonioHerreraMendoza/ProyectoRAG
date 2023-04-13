import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import ButtonCamera from "../components/ButtonCamera";
import { Modal } from "../components/Modal";
import { getCurrentLocation } from "../functions/locationMap";
import { AuthContext } from "../context/AuthContext";
import MapView, { Marker } from "react-native-maps";
import { Button } from "@rneui/themed";
import { SelectList } from "react-native-dropdown-select-list";
import Ionicons from "react-native-vector-icons/Ionicons";
import { saveReporte, uploadImage } from "../functions/api";
import { SafeAreaView } from "react-native";

const ReporteForm = ({ navigation, route }) => {
  const date = new Date();
  const [selected, setSelected] = useState([]);
  const [inputsValidate, setinputsValidate] = useState(false);
  const [direc, setDirec] = useState(null);
  const [descrip, setDescripcion] = useState(null);
  const [mapVisible, setmapVisible] = useState(false);
  const [location, setLocation] = useState(null);
  const [newRegion, setNewRegion] = useState(null);

  const { userInfo } = useContext(AuthContext);

  const data = [
    { key: "1", value: "Mal estacionado"},
    { key: "2", value: "Golpe de vehiculos" },
    { key: "3", value: "Auto sin luces" },
    { key: "4", value: "Auto pasandose un semaforo en rojo" },
  ];

  useEffect(() => {
    (async () => {
      const response = await getCurrentLocation();
      if (response.status) {
        setNewRegion(response.location);
        console.log(response.location);
      }
    })();
  }, []);

  useEffect(() => {
    if (route.params?.uri) {
    }
  }, [route.params?.uri]);

  const validarInputs = (reporte) => {
    if (direc === null || descrip === null || location == null) return true;
  };
  const confirmLocation = () => {
    setLocation(newRegion);
    Alert.alert("Se registro la ubicacion");
    console.log(location);
    setmapVisible(false);
  };

  const enviarDatos = async () => {
    setinputsValidate(false);
    let localUri = route?.params.uri;
    if (localUri === null) {
      return Alert.alert("Tome una imagen");
    } else {
      let filename = localUri.split("/").pop();
      let reporte = {
        fecha: date,
        direccion: direc,
        descripcion: descrip,
        ubicacion: location.latitude + "," + location.longitude,
        evidencia: filename,
        estatus: "Revision",
        idreportadorfk: userInfo.idpersonafk.idpersona,
        tipousuariofk: userInfo.tipousuariofk.idtipousuario,
      };
      if (validarInputs(reporte)) {
        return setinputsValidate(true);
      }
      await saveReporte(reporte);
      await uploadImage(localUri);
      Alert.alert("Reporte generado");
      setNewRegion(null);
      route.params.uri = "";
      setDescripcion("");
      setDirec("");
      navigation.navigate("Reportes");
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.title}>
        <Text style={styles.text}>
          Ingrese los datos para que pueda ser generado su reporte
        </Text>
      </View>
      <View style={styles.container}>
        <Image
          source={{
            uri: route.params?.uri
              ? route.params.uri
              : "https://reactjs.org/logo-og.png",
          }}
          style={styles.imagen}
        ></Image>
        {inputsValidate ? (
          <Text style={styles.warningText}>Rellene todos los campos</Text>
        ) : (
          <></>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <TextInput
            placeholder="Direccion"
            placeholderTextColor={"#ffffff"}
            style={styles.input}
            value={direc}
            onChangeText={(text) => {
              setDirec(text);
            }}
          ></TextInput>
          <ButtonCamera icon="location" onPress={() => setmapVisible(true)} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <TextInput
            placeholder="Url de la imagen"
            placeholderTextColor={"#ffffff"}
            style={styles.input}
            value={route.params?.uri}
            editable={false}
          >
            <Text></Text>
          </TextInput>
          <ButtonCamera
            icon="camera"
            onPress={() => navigation.navigate("Camara")}
          />
        </View>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          placeholder="Tipo de infraccion"
          inputStyles={{color:"white",width:"72%"}}
          boxStyles={{marginBottom:10,height:40,color:"white"}}
          dropdownStyles={{width:300,marginBottom:15}}
          dropdownTextStyles={{color:"white"}}
          search={false}
          notFoundText="No se encontro similitud"
          searchicon={<Ionicons name="search-outline" color={"white"} size={16}/>}
          arrowicon={<Ionicons name="chevron-down-outline" color={"white"} size={16} />}
        />
        <TextInput
          placeholder="Ingrese una pequeña descripcion"
          placeholderTextColor={"#ffffff"}
          style={styles.inputArea}
          value={descrip}
          onChangeText={(text) => {
            setDescripcion(text);
          }}
        />
        <TouchableOpacity
          style={styles.buttonSave}
          onPress={() => {
            enviarDatos();
          }}
        >
          <Text style={styles.buttonText}>Enviar Reporte</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={mapVisible} setVisible={setmapVisible}>
        <View>
          {newRegion && (
            <MapView
              style={styles.map}
              initialRegion={newRegion}
              showsUserLocation
              onRegionChange={(region) => setLocation(region)}
            >
              <Marker
                coordinate={{
                  latitude: newRegion.latitude,
                  longitude: newRegion.longitude,
                }}
                draggable={true}
                pinColor={"green"}
              />
            </MapView>
          )}
          <View style={styles.viewMap}>
            <Button
              title={"Guardar"}
              containerStyle={styles.containerSaveMapBtn}
              buttonStyle={styles.saveMapBtn}
              onPress={confirmLocation}
            />
            <Button
              title={"Cancelar"}
              containerStyle={styles.containerCancelMapBtn}
              buttonStyle={styles.cancelMapBtn}
              onPress={() => setmapVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E262E",
  },
  title: {
    backgroundColor: "#1E262E",
  },
  warningText: {
    color: "red",
    fontSize: 15,
    marginTop: 0,
    marginBottom: 10,
  },
  text: {
    paddingVertical: 20,
    fontSize: 16,
    color: "#ffffff",
    width: "95%",
  },
  input: {
    width: "80%",
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    height: 35,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 5,
  },
  inputArea: {
    width: "80%",
    fontSize: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    height: 35,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 5,
  },
  imagen: {
    width: 200,
    height: 200,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#105293",
    width: "80%",
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontStyle: "italic",
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: 550,
  },
  viewMap: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  containerSaveMapBtn: {
    paddingRight: 5,
  },
  containerCancelMapBtn: {
    paddingLeft: 5,
  },
  saveMapBtn: { backgroundColor: "green" },
  cancelMapBtn: { backgroundColor: "red" },
});

export default ReporteForm;
