import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Modal } from "../components/Modal";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import { API, cambiarContraseña, cambiarNumeroCuenta } from "../functions/api";
import { getConductor } from "../functions/apiConductor";
import { enviarCorreo } from "../functions/apiCorreo";
import * as ImagePicker from "expo-image-picker";
import {
  validarContraseña,
  validarDatosNumRegistro,
} from "../functions/Validaciones";
import { cambiarImagen, deleteImage, uploadImage } from "../functions/apiImage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Settings = () => {
  const { logout, userInfo } = useContext(AuthContext);
  const [showAlert, setshowAlert] = useState(false);
  const [showAlertImage, setshowAlertImage] = useState(false);
  const [showAlertContraseñaConfrim, setshowAlertContraseñaConfrim] =
    useState(false);
  const [showAlertContraseña, setshowAlertContraseña] = useState(false);
  const [showAlertSesion, setshowAlertSesion] = useState(false);
  const [seePass, setSeePass] = useState(true);
  const [infoVisible, setinfoVisible] = useState(false);
  const [NumCModalVisible, setNumCModalVisible] = useState(false);
  const [contraseñaMVisible, setcontraseñaMVisible] = useState(false);
  const [conductor, setConductor] = useState({});
  const [contraseña, setContraseña] = useState("");
  const [codigo, setCodigo] = useState({ codigo: "" });
  const [code, setCode] = useState("");
  const [messageE, setMessageE] = useState("");
  const [messageErrorC, setmessageErrorC] = useState("");
  const [persona, setpersona] = useState({
    numcuenta: "",
    claveInterB: "",
    titularCuenta: "",
    banco: "",
  });

  const [usuario, setUsuario] = useState({
    usuario: userInfo.usuario,
    contraseña: contraseña,
    idpersonafk: {},
  });

  useEffect(() => {
    if (userInfo.idpersonafk.tipousuariofk.idtipousuario === 2) obtenerDatos();
  }, []);

  const handleChange = (name, value) =>
    setpersona({ ...persona, [name]: value });

  const obtenerDatos = async () => {
    const data = await getConductor(userInfo.idpersonafk);
    setConductor(data);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      await uploadImage(result.assets[0].uri, "imagesPerfil");
      let filename = result.assets[0].uri.split("/").pop();
      await cambiarImagen(usuario, filename);
      await deleteImage("imagesPerfil", userInfo.idpersonafk.imagenperfil);
      setshowAlertImage(true);
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={pickImage}>
          {userInfo.idpersonafk.imagenperfil === null ? (
            <Image
              source={{
                uri: "https://i.pinimg.com/originals/6f/57/76/6f57760966a796644b8cfb0fbc449843.png",
              }}
              style={styles.image}
            />
          ) : (
            <Image
              source={{
                uri:
                  API+"images/" +
                  userInfo.idpersonafk.imagenperfil +
                  "?path=imagesPerfil",
              }}
              style={styles.image}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.fontTitle}>
          {userInfo.idpersonafk.nombres +
            " " +
            userInfo.idpersonafk.apellidop +
            " " +
            userInfo.idpersonafk.apellidom}
        </Text>
        <Text style={styles.fontTitle}>
          Correo: {userInfo.idpersonafk.correo}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setinfoVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Ver mi información</Text>
      </TouchableOpacity>

      {/* Modal para muestra de informacion */}

      <Modal isVisible={infoVisible} setVisible={setinfoVisible}>
        <ScrollView style={{ height: 600 }}>
          <View style={styles.principal}>
            <Text style={styles.fontTitle}>Nombre(s)</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.nombres}</Text>
            </View>
            <Text style={styles.fontTitle}>Apellido Paterno</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.apellidop}</Text>
            </View>
            <Text style={styles.fontTitle}>Apellido Materno</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.apellidom}</Text>
            </View>
            <Text style={styles.fontTitle}>Edad</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.edad}</Text>
            </View>
            <Text style={styles.fontTitle}>Calle</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.calle}</Text>
            </View>
            <Text style={styles.fontTitle}>Colonia</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.colonia}</Text>
            </View>
            <Text style={styles.fontTitle}>Municipio</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.municipio}</Text>
            </View>
            <Text style={styles.fontTitle}>Codigo postal</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.codigopostal}</Text>
            </View>
            <Text style={styles.fontTitle}>Teléfono</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.telefono}</Text>
            </View>
            <Text style={styles.fontTitle}>Correo</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.correo}</Text>
            </View>
            <Text style={styles.fontTitle}>Titular de la cuenta</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>
                {userInfo.idpersonafk.titularCuenta}
              </Text>
            </View>
            <Text style={styles.fontTitle}>Banco</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.banco}</Text>
            </View>
            <Text style={styles.fontTitle}>Número de cuenta bancaria</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.numcuenta}</Text>
            </View>
            <Text style={styles.fontTitle}>Clave Interbancaria</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>
                {userInfo.idpersonafk.claveInterB}
              </Text>
            </View>

            {conductor.noLicencia === undefined ? (
              <></>
            ) : (
              <>
                <Text style={styles.fontTitle}>Numero de licencia</Text>
                <View style={styles.containerInfo}>
                  <Text style={styles.font}>{conductor.noLicencia}</Text>
                </View>
                <Text style={styles.fontTitle}>Tarjeta de circulacion</Text>
                <View style={styles.containerInfo}>
                  <Text style={styles.font}>
                    {conductor.tarjetaCirculacion}
                  </Text>
                </View>
                <Text style={styles.fontTitle}>Placas</Text>
                <View style={styles.containerInfo}>
                  <Text style={styles.font}>{conductor.numplacas}</Text>
                </View>
              </>
            )}
            <View style={styles.viewMap}>
              <Button
                title={"Cerrar"}
                containerStyle={styles.containerCancelMapBtn}
                buttonStyle={styles.cancelMapBtn}
                onPress={() => setinfoVisible(false)}
              />
            </View>
          </View>
        </ScrollView>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setNumCModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Cambiar datos bancarios</Text>
      </TouchableOpacity>

      {/* Modal para cambio de informacion bancaria */}
      <Modal isVisible={NumCModalVisible} setVisible={setNumCModalVisible}>
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.fontTitle}>
              Escriba los datos que se requieren a continuacion
            </Text>
            <Text style={styles.warningText}>{messageE}</Text>
            <TextInput
              placeholder="Nuevo número de cuenta"
              placeholderTextColor={"white"}
              style={styles.input}
              onChangeText={(text) => {
                handleChange("numcuenta", text);
              }}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Clave interbancaria"
              placeholderTextColor={"white"}
              style={styles.input}
              onChangeText={(text) => {
                handleChange("claveInterB", text);
              }}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Titular de la cuenta"
              placeholderTextColor={"white"}
              style={styles.input}
              onChangeText={(text) => {
                handleChange("titularCuenta", text);
              }}
            />
            <TextInput
              placeholder="Banco"
              placeholderTextColor={"white"}
              style={styles.input}
              onChangeText={(text) => {
                handleChange("banco", text);
              }}
            />
          </View>
          <View style={styles.viewMap}>
            <Button
              title={"Guardar"}
              containerStyle={styles.containerSaveMapBtn}
              buttonStyle={styles.saveMapBtn}
              onPress={() => {
                let aux = validarDatosNumRegistro(
                  userInfo.idpersonafk.telefono,
                  persona.numcuenta,
                  persona.claveInterB,
                  userInfo.idpersonafk.edad
                );
                if (
                  persona.numcuenta === "" ||
                  persona.claveInterB === "" ||
                  persona.titularCuenta === "" ||
                  persona.banco === ""
                ) {
                  setMessageE("Rellene el campo");
                } else if (aux !== null) {
                  setMessageE(aux);
                } else {
                  setNumCModalVisible(false);
                  setshowAlert(true);
                }
              }}
            />
            <Button
              title={"Cancelar"}
              containerStyle={styles.containerCancelMapBtn}
              buttonStyle={styles.cancelMapBtn}
              onPress={() => {
                setMessageE("");
                setNumCModalVisible(false);
              }}
            />
          </View>
        </ScrollView>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setshowAlertContraseña(true);
        }}
      >
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      {/* Modal para cambio de contraseña */}
      <Modal isVisible={contraseñaMVisible} setVisible={setcontraseñaMVisible}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.fontTitle}>
              Se le envio un correo con un código,por favor escribalo a
              continuación
            </Text>
            <Text style={styles.warningText}>{messageE}</Text>
            <TextInput
              placeholder="Codigo"
              placeholderTextColor={"white"}
              style={styles.input}
              onChangeText={(text) => {
                setCodigo({ ["codigo"]: text });
              }}
            />
            <Text style={styles.fontTitle}>Escriba su nueva contraseña</Text>
            <Text style={styles.warningText}>{messageErrorC}</Text>
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
                onChangeText={(text) => setContraseña(text)}
              />
              <View style={styles.wrapperIcon}>
                <TouchableOpacity onPress={() => setSeePass(!seePass)}>
                  {seePass ? (
                    <Ionicons name={"eye-outline"} size={30} color="white" />
                  ) : (
                    <Ionicons
                      name={"eye-off-outline"}
                      size={30}
                      color="white"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.viewMap}>
            <Button
              title={"Guardar"}
              containerStyle={styles.containerSaveMapBtn}
              buttonStyle={styles.saveMapBtn}
              onPress={() => {
                if (codigo.codigo === "") {
                  setMessageE("Rellene el campo");
                }
                let checkPass = validarContraseña(contraseña);
                if (checkPass) {
                  setmessageErrorC(checkPass);
                } else {
                  setcontraseñaMVisible(false);
                  setshowAlertContraseñaConfrim(true);
                }
              }}
            />
            <Button
              title={"Cancelar"}
              containerStyle={styles.containerCancelMapBtn}
              buttonStyle={styles.cancelMapBtn}
              onPress={() => {
                setMessageE("");
                setmessageErrorC("");
                setcontraseñaMVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setshowAlertSesion(true);
        }}
      >
        <Text style={styles.buttonText}>Cerrar sesion</Text>
      </TouchableOpacity>

      {/* Alertas para confirmar cambios */}
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="¿Estas seguro de cambiar sus datos bancarios?"
        message="Los cambios se realizaran pero para que pueda verlos tiene que volver a iniciar sesion"
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
          setMessageE("");
        }}
        onConfirmPressed={() => {
          usuario.idpersonafk = persona;
          cambiarNumeroCuenta(usuario).then(() => {
            setMessageE("");
            setshowAlert(false);
          });
        }}
      />
      <AwesomeAlert
        show={showAlertImage}
        showProgress={false}
        title="Cambio de imagen"
        message="Se realizara el cambio de imagen pero para mostrarlo tendra que iniciar sesión de nuevo"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Si, estoy de acuerdo"
        confirmButtonColor="#105293"
        cancelButtonColor="red"
        contentContainerStyle={{ backgroundColor: "#1E262E" }}
        contentStyle={{ backgroundColor: "#1E262E" }}
        titleStyle={{ color: "white", textAlign: "center" }}
        messageStyle={{ color: "white", textAlign: "center" }}
        onConfirmPressed={() => {
          setshowAlertImage(false);
        }}
      />
      <AwesomeAlert
        show={showAlertContraseña}
        showProgress={false}
        title="¿Estás seguro de cambiar tu contraseña?"
        message="Al confirmar se te enviara un correo con un código para realizar el cambio"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="No,cancelar"
        confirmText="Si,estoy de acuerdo"
        confirmButtonColor="#105293"
        cancelButtonColor="red"
        contentContainerStyle={{ backgroundColor: "#1E262E" }}
        contentStyle={{ backgroundColor: "#1E262E" }}
        titleStyle={{ color: "white", textAlign: "center" }}
        messageStyle={{ color: "white", textAlign: "center" }}
        onCancelPressed={() => {
          setshowAlertContraseña(false);
        }}
        onConfirmPressed={() => {
          enviarCorreo(userInfo.usuario);
          setshowAlertContraseña(false);
          setcontraseñaMVisible(true);
        }}
      />
      <AwesomeAlert
        show={showAlertContraseñaConfrim}
        showProgress={false}
        title="Estás seguro de cambiar su contraseña?"
        message="Los cambios se realizarán pero para que pueda verlos tiene que volver a iniciar sesión"
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
          setMessageE("");
          setmessageErrorC("");
        }}
        onConfirmPressed={async () => {
          cambiarContraseña(usuario, codigo).then((status) => {
            setCode(status);
            setshowAlertContraseñaConfrim(false);
          });
        }}
        onDismiss={() => {
          if (code !== 200) {
            Alert.alert("Código incorrecto");
            setcontraseñaMVisible(true);
          }
        }}
      />
      <AwesomeAlert
        show={showAlertSesion}
        showProgress={false}
        title="¿Estas seguro de cerrar su sesión?"
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
          setshowAlertSesion(false);
        }}
        onConfirmPressed={() => {
          setshowAlertSesion(false);
          sleep(500).then(() => {
            logout();
          });
        }}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1E262E",
    flex: 1,
  },
  containerInfo: {
    width: "100%",
    borderColor: "#818E9C",
    borderWidth: 2,
    alignItems: "center",
    paddingBottom: 5,
    borderRadius: 10,
    marginBottom: 15,
  },
  font: {
    fontSize: 17,
    color: "#ffffff",
  },
  fontTitle: {
    color: "#ffffff",
    fontSize: 20,
    paddingBottom: 4,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#105293",
    width: "70%",
    height: 25,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: "center",
    height: 32,
    marginBottom: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    paddingTop: 4,
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
  input: {
    marginTop: 10,
    width: "80%",
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "gray",
    height: 35,
    color: "#ffffff",
    padding: 5,
    textalign: "center",
    borderRadius: 5,
  },
  wrapperIcon: {
    position: "absolute",
    right: 0,
    top: 5,
    padding: 7,
  },
  image: {
    width: wp("50"),
    height: hp("25"),
    borderRadius: 20,
    marginVertical: 20,
  },
  warningText: {
    color: "red",
    fontSize: 15,
    marginTop: 0,
  },
});
