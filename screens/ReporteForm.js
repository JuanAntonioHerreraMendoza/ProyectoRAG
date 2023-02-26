import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import ButtonCamera from "../components/ButtonCamera";
import { Modal } from "../components/Modal";
import { getCurrentLocation } from "../functions/locationMap";
import MapView, { Marker } from "react-native-maps";
import { Button } from "@rneui/themed";

const ReporteForm = ({ navigation, route }) => {
  const [ubicacion, setUbicacion] = useState(null);
  const [foto, setFoto] = useState(null);
  const [descrip, setDescripcion] = useState(null);
  const [mapVisible, setmapVisible] = useState(false);

  const [location, setLocation] = useState(null);
  const [newRegion, setNewRegion] = useState(null);

  const [reporte, setReporte] = useState({
    fecha: "",
    direccion: "",
    descripcion: "",
    evidencia: "",
    status: "",
    idreportador: "",
  });

  const handleChange = async(name, value) => {
    setReporte({ ...reporte, [name]: value });
    console.log(name + " " + value);
  };

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

  const confirmLocation = () => {
    setLocation(newRegion);
    Alert.alert("Se registro la ubicacion");
    console.log(location);
    setmapVisible(false);
  };
  const enviarDatos = async () => {
    const date = new Date();
    handleChange("evidencia",route.params?.uri)
    handleChange("fecha", date);
    console.log(reporte);
  };

  return (
    <>
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 25,
          }}
        >
          <TextInput
            placeholder="Ubicacion"
            placeholderTextColor={"#ffffff"}
            style={styles.input}
            onEndEditing={(text) => {
              handleChange("direccion", text);
            }}
            value={location ? location.latitude + " " + location.longitude : ""}
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
        <TextInput
          placeholder="Ingrese una pequeña descripcion"
          placeholderTextColor={"#ffffff"}
          style={styles.inputArea}
          onChangeText={(text) => {
            handleChange("descripcion", text);
          }}
        />
        <TouchableOpacity style={styles.buttonSave} onPress={()=>{enviarDatos()}}>
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
    </>
  );
};

const styles = new StyleSheet.create({
  container: {
    paddingBottom: 20,
    flex: 1,
    alignItems: "center",
    backgroundColor: "#20187C",
  },
  title: {
    backgroundColor: "#20187C",
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
    borderColor: "#10ac84",
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
    borderColor: "#10ac84",
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
    backgroundColor: "#10ac84",
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
