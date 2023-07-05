import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
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
import { getInfracciones, saveReporte } from "../functions/apiReportes";
import { uploadImage } from "../functions/apiImage";
import { Video } from "expo-av";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ReporteForm = ({ navigation, route }) => {
  const date = new Date();
  const [infracciones, setInfracciones] = useState([]);
  const [showAlert, setshowAlert] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showAlertUbicacion, setshowAlertUbicacion] = useState(false);
  const [showAlertImagen, setshowAlertImagen] = useState(false);
  const [showAlertReporte, setShowAlertReporte] = useState(false);
  const [inputsValidate, setinputsValidate] = useState(false);
  const [direc, setDirec] = useState("");
  const [descrip, setDescripcion] = useState("");
  const [mapVisible, setmapVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [newRegion, setNewRegion] = useState("");

  const { userInfo } = useContext(AuthContext);

  const getInfraccionesInfo = async () => {
    const res = await getInfracciones();
    let newArray = res.map((item) => {
      return { key: item.idtipoincidente, value: item.incidente };
    });
    setInfracciones(newArray);
  };

  useEffect(() => {
    getInfraccionesInfo().then(
      getCurrentLocation().then((response) => {
        if (response.status) {
          setNewRegion(response.location);
          setDirec(
            response.direccion[0].city +
              "," +
              response.direccion[0].street +
              "," +
              response.direccion[0].subregion +
              "," +
              response.direccion[0].postalCode
          );
        }
      })
    );
  }, []);

  useEffect(() => {
    if (route.params?.uri) {
    }
  }, [route.params?.uri]);

  const validarInputs = () => {
    if (direc === "" || descrip === "" || location == "") return true;
  };
  const confirmLocation = () => {
    setLocation(newRegion);
    setshowAlertUbicacion(true);
    setmapVisible(false);
  };

  const enviarDatos = async () => {
    setinputsValidate(false);
    if (validarInputs()) {
      return setinputsValidate(true);
    }
    let localUri = route.params?.uri;
    if (localUri === undefined || location === undefined) {
      return setshowAlertImagen(true);
    } else {
      let filename = localUri.split("/").pop();
      let reporte = {
        fecha: date,
        direccion: direc,
        descripcion: descrip,
        ubicacion: location.latitude + "," + location.longitude,
        evidencia: filename,
        estatus: "Revisión",
        razon: selected,
        idreportadorfk: userInfo.idpersonafk.idpersona,
        tipousuariofk: userInfo.tipousuariofk.idtipousuario,
      };
      await saveReporte(reporte).then(
        await uploadImage(localUri, "reportes")
          .then(setShowAlertReporte(true))
          .catch((error) => {
            alert(error);
          })
      );
      setNewRegion(null);
      route.params.uri = "";
      setDescripcion("");
      setDirec("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.title}>
        <Text style={styles.text}>
          Ingrese los datos para que pueda ser generado su reporte
        </Text>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Camara")}>
          {route.params?.video === true ? (
            <Video
              source={{ uri: route.params.uri }}
              useNativeControls
              style={styles.imagen}
            />
          ) : route.params?.uri ? (
            <Image source={{ uri: route.params.uri }} style={styles.imagen} />
          ) : (
            <Image
              source={require("../assets/camera.png")}
              style={styles.imagen}
            />
          )}
        </TouchableOpacity>
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
            style={{
              width: "90%",
              fontSize: 14,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "gray",
              height: 35,
              color: "#ffffff",
              padding: 5,
              textalign: "center",
              borderRadius: 5,
            }}
            value={route.params?.uri}
            editable={false}
          />
        </View>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={infracciones}
          save="value"
          placeholder="Tipo de infraccion"
          inputStyles={{ color: "white", width: "72%" }}
          boxStyles={{ marginBottom: 10, height: 50, color: "white" }}
          dropdownStyles={{ width: 300, marginBottom: 15, height: 150 }}
          dropdownTextStyles={{ color: "white" }}
          search={false}
          arrowicon={
            <Ionicons name="chevron-down-outline" color={"white"} size={16} />
          }
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
            setshowAlert(true);
            enviarDatos();
          }}
        >
          <Text style={styles.buttonText}>Enviar Reporte</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={mapVisible} setVisible={setmapVisible}>
        <View>
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
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Confirmacion"
        message="¿Esta seguro de enviar esta informacion para su reporte?"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No, cancelar"
        confirmText="Si, estoy de acuerdo"
        confirmButtonColor="#105293"
        cancelButtonColor="red"
        contentContainerStyle={{ backgroundColor: "#1E262E" }}
        contentStyle={{ backgroundColor: "#1E262E" }}
        titleStyle={{ color: "white", textAlign: "center" }}
        messageStyle={{ color: "white", textAlign: "center" }}
        onCancelPressed={() => {
          setshowAlert(false);
        }}
        onConfirmPressed={() => {
          setshowAlert(false);
          enviarDatos();
        }}
      />
      <AwesomeAlert
        show={showAlertUbicacion}
        showProgress={false}
        title="Alerta"
        message="Se registro la ubicacion"
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
          setshowAlertUbicacion(false);
        }}
      />
      <AwesomeAlert
        show={showAlertImagen}
        showProgress={false}
        title="Alerta"
        message="Necesita tomar una evidencia"
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
          setshowAlertImagen(false);
        }}
      />
      <AwesomeAlert
        show={showAlertReporte}
        showProgress={false}
        title="Alerta"
        message="Se genero su reporte"
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
          setShowAlertReporte(false);
        }}
        onDismiss={() => {
          navigation.navigate("Reportes");
        }}
      />
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
    height: hp("25"),
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
