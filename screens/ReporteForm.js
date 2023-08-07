import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext, useRef } from "react";
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
import { KeyboardAvoidingView } from "react-native";
import { Platform } from "react-native";
import { ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import * as ImagePicker from "expo-image-picker";
import moment from "moment/moment";

const ReporteForm = ({ navigation, route }) => {
  let date = new moment().format();
  const [isLoading, setIsLoading] = useState(true);
  const [infracciones, setInfracciones] = useState([]);
  const [masFotos, setmasFotos] = useState(false);
  const [showAlert, setshowAlert] = useState(false);
  const [showAlertfotos, setshowAlertFotos] = useState(false);
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
  const [data, setData] = useState({
    activeIndex: 0,
    carouselItems: [],
  });

  const { userInfo } = useContext(AuthContext);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: true,
      selectionLimit: 2,
    });
    if (!result.canceled) {
      setIsLoading(true);
      if (route.params?.uri.length === 2) {
        route.params?.uri.pop();
      } else if (route.params?.uri.length === 3) {
        route.params?.uri.pop();
        route.params?.uri.pop();
      } else if (route.params?.uri.length === 4) {
        route.params?.uri.pop();
        route.params?.uri.pop();
        route.params?.uri.pop();
      } else if (route.params?.uri.length === 5) {
        route.params?.uri.pop();
        route.params?.uri.pop();
        route.params?.uri.pop();
        route.params?.uri.pop();
      }
      for (let index = 0; index < 4; index++) {
        route.params?.uri.push(result.assets[index]?.uri);
      }
      sleep(1000).then(() => {
        setIsLoading(false);
      });
    }
  };

  const getInfraccionesInfo = async () => {
    const res = await getInfracciones();
    let newArray = res.map((item) => {
      return { key: item.idtipoincidente, value: item.incidente };
    });
    setInfracciones(newArray);
  };

  useEffect(() => {
    getInfraccionesInfo().then(() => {
      getCurrentLocation().then((response) => {
        if (response.status) {
          setNewRegion(response.location);
          setLocation(response.location);
          setDirec(
            response.direccion[0].city +
              "," +
              response.direccion[0].street +
              "," +
              response.direccion[0].subregion +
              "," +
              response.direccion[0].postalCode
          );
          setIsLoading(false);
        }
      });
    });
  }, []);

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  useEffect(() => {
    if (route.params?.uri.length === 1) {
      setshowAlertFotos(true);
      setmasFotos(true);
    }
  }, [route.params?.uri, isLoading]);

  const validarInputs = () => {
    if (direc === "" || descrip === "" || location == "") return true;
  };
  const confirmLocation = () => {
    setLocation(newRegion);
    setshowAlertUbicacion(true);
    setmapVisible(false);
  };

  const enviarDatos = async () => {
    setIsLoading(true);
    setinputsValidate(false);
    if (validarInputs()) {
      return setinputsValidate(true);
    }
    let localUri = route.params?.uri;
    if (localUri === undefined) {
      return setshowAlertImagen(true);
    } else {
      let filename =
        route.params?.video === false
          ? localUri[0].split("/").pop()
          : localUri.split("/").pop();
      let filename2 = localUri[1] ? localUri[1].split("/").pop() : "null";
      let filename3 = localUri[2] ? localUri[2].split("/").pop() : "null";
      let filename4 = localUri[3] ? localUri[3].split("/").pop() : "null";
      let filename5 = localUri[4] ? localUri[4].split("/").pop() : "null";

      let reporte = {
        fecha: date.substring(0, 19),
        direccion: direc,
        descripcion: descrip,
        ubicacion: location.latitude + "," + location.longitude,
        evidencia: filename,
        evidencia2: filename2,
        evidencia3: filename3,
        evidencia4: filename4,
        evidencia5: filename5,
        estatus: "Revisión",
        razon: selected,
        idreportadorfk: userInfo.idpersonafk.idpersona,
        tipousuariofk: userInfo.tipousuariofk.idtipousuario,
      };
      saveReporte(reporte)
        .then(() => {
          if (route.params?.video === true) {
            uploadImage(localUri, "reportes").then((res) => {
              if (res === 200) {
                sleep(4000).then(() => {
                  setIsLoading(false);
                });
                setShowAlertReporte(true);
              }else{
                sleep(500).then(() => {
                  setIsLoading(false);
                });
                alert("Ha sucedido un error")
              }
            });
          } else {
            uploadImage(localUri[0], "reportes")
              .then(() => {
                if (filename2 !== "null") uploadImage(localUri[1], "reportes");
              })
              .then(() => {
                if (filename3 !== "null") uploadImage(localUri[2], "reportes");
              })
              .then(() => {
                if (filename4 !== "null") uploadImage(localUri[3], "reportes");
              })
              .then(() => {
                if (filename5 !== "null") uploadImage(localUri[4], "reportes");
              })
              .then(() => {
                sleep(1500).then(() => {
                  setIsLoading(false);
                });
                setShowAlertReporte(true);
              });
          }
        })
        .catch((error) => {
          setIsLoading(false);
          return alert(error);
        });
    }
  };

  function LoadingAnimation() {
    return (
      <View style={styles.indicatorWrapper}>
        <ActivityIndicator size="large" style={styles.indicator} />
        <Text style={styles.indicatorText}>Espera un momento...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#1E262E" }}>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <>
          <View style={styles.title}>
            <Text style={styles.text}>
              Ingrese los datos para que pueda ser generado su reporte,puede
              tomar una fotografía presionando la camara
            </Text>
          </View>
          <ScrollView style={{ flex: 1 }} automaticallyAdjustKeyboardInsets>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={{ flex: 1, backgroundColor: "black" }}
            >
              <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("Camara")}>
                  {route.params?.video === true ? (
                    <Video
                      source={{ uri: route.params.uri }}
                      useNativeControls
                      style={styles.imagen}
                    />
                  ) : route.params?.uri ? (
                    <Image
                      source={{ uri: route.params.uri[0] }}
                      style={styles.imagen}
                    />
                  ) : (
                    <Image
                      source={require("../assets/camera.png")}
                      style={styles.imagen}
                    />
                  )}
                </TouchableOpacity>

                {masFotos ? (
                  <>
                    <View>
                      {route.params?.uri[1] ? (
                        <Image
                          source={{ uri: route.params?.uri[1] }}
                          style={styles.imagen}
                        />
                      ) : (
                        <></>
                      )}
                      {route.params?.uri[2] ? (
                        <Image
                          source={{ uri: route.params?.uri[2] }}
                          style={styles.imagen}
                        />
                      ) : (
                        <></>
                      )}
                      {route.params?.uri[3] ? (
                        <Image
                          source={{ uri: route.params?.uri[3] }}
                          style={styles.imagen}
                        />
                      ) : (
                        <></>
                      )}
                      {route.params?.uri[4] ? (
                        <Image
                          source={{ uri: route.params?.uri[4] }}
                          style={styles.imagen}
                        />
                      ) : (
                        <></>
                      )}
                    </View>
                    <TouchableOpacity
                      style={styles.buttonSave}
                      onPress={() => {
                        pickImage(true);
                      }}
                    >
                      <Text style={styles.buttonText}>Añadir Evidencias</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <></>
                )}

                {inputsValidate ? (
                  <Text style={styles.warningText}>
                    Rellene todos los campos
                  </Text>
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
                  <ButtonCamera
                    icon="location"
                    onPress={() => setmapVisible(true)}
                  />
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
                    value={
                      route.params?.video === true
                        ? route.params.uri
                        : route.params?.uri[0]
                    }
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
                    <Ionicons
                      name="chevron-down-outline"
                      color={"white"}
                      size={16}
                    />
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
                    {/* <Marker
              coordinate={{
                latitude: newRegion.latitude,
                longitude: newRegion.longitude,
              }}
              draggable={true}
              pinColor={"green"}
            /> */}
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
                show={showAlertfotos}
                showProgress={false}
                title="Mensajes"
                message="Puede añadir hasta 4 fotos más presionando el botón de añadir evidencias,estas evidencias tendrán que ser tomadas con la cámara propia del celular"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showConfirmButton={true}
                cancelText="No, cancelar"
                confirmText="Si, estoy de acuerdo"
                confirmButtonColor="#105293"
                cancelButtonColor="red"
                contentContainerStyle={{ backgroundColor: "#1E262E" }}
                contentStyle={{ backgroundColor: "#1E262E" }}
                titleStyle={{ color: "white", textAlign: "center" }}
                messageStyle={{ color: "white", textAlign: "center" }}
                onConfirmPressed={() => {
                  setshowAlertFotos(false);
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
            </KeyboardAvoidingView>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1E262E",
    paddingTop: 20,
  },
  container2: {
    width: "100%",
    borderColor: "#818E9C",
    borderWidth: 2,
    alignItems: "center",
    paddingBottom: 5,
    borderRadius: 10,
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
  indicatorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    padding: 12,
    backgroundColor: "#555",
    borderRadius: 12,
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "white",
  },
});

export default ReporteForm;
