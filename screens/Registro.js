import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { saveUsuario } from "../functions/api";
import { uploadImagesReg } from "../functions/apiImage";
import {
  validarContraseña,
  validarEmail,
  validarDatosNumRegistro,
} from "../functions/Validaciones";
import * as ImagePicker from "expo-image-picker";
import { Modal } from "../components/Modal";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import AwesomeAlert from "react-native-awesome-alerts";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Registro = () => {
  //Funcion para navegar
  const navigation = useNavigation();
  //Variables
  const [modalTerm, setModalTerm] = useState(true);
  const [showAlert, setshowAlert] = useState(false);
  const [showAlert2, setshowAlert2] = useState(false);
  const [message, setMessage] = useState("");
  const [inputsValidate, setinputsValidate] = useState(false);
  const [emailValidate, setemailValidate] = useState(false);
  const [passValidate, setpassValidate] = useState(false);
  const [imageValidate, setimageValidate] = useState(false);
  const [seePass, setSeePass] = useState(true);
  const [checked, setChecked] = useState(0);
  const [checkedTerms, setCheckedTerms] = useState(false);
  const [messageE, setMessageE] = useState("");
  const [image, setImage] = useState(null);

  const [persona, setPersona] = useState({
    nombres: "",
    apellidop: "",
    apellidom: "",
    edad: "",
    calle: "",
    colonia: "",
    municipio: "",
    codigopostal: "",
    telefono: "",
    numcuenta: "",
    claveInterB: "",
    titularCuenta: "",
    banco: "",
    correo: "",
    usuario: "",
    contraseña: "",
    imagen1: "",
    imagen2: "",
    tipousuariofk: {},
    datoconductor: "",
  });

  const [tipoUser, setTipoUser] = useState({
    idtipousuario: "",
  });

  const validarInputs = (persona) => {
    if (Object.values(persona).includes("")) {
      return true;
    }
  };
  const handleChangeP = (name, value) => {
    setPersona({ ...persona, [name]: value });
  };

  const handleSubmmit = async (persona, tipousuario) => {
    setemailValidate(false);
    setpassValidate(false);
    setinputsValidate(false);
    setimageValidate(false);

    persona.usuario = persona.correo;

    if (image === null) {
      return setimageValidate(true);
    }
    persona.imagen1 = image[0].uri.split("/").pop();
    persona.imagen2 = image[1].uri.split("/").pop();

    if (checked === 0) {
      persona.datoconductor = "null";
    }

    if (validarInputs(persona)) {
      return setinputsValidate(true);
    }

    let alertaDatosBancarios = validarDatosNumRegistro(
      persona.telefono,
      persona.numcuenta,
      persona.claveInterB,
      persona.edad
    );

    if (alertaDatosBancarios !== null) {
      setMessage(alertaDatosBancarios);
      return setshowAlert(true);
    }

    if (!validarEmail(persona.usuario)) {
      setemailValidate(true);
      let checkPass = validarContraseña(persona.contraseña);
      if (checkPass) {
        setMessageE(checkPass);
        setpassValidate(true);
        return;
      }
      return;
    }

    checked === 0
      ? (tipousuario.idtipousuario = "1")
      : (tipousuario.idtipousuario = "2");

    persona.tipousuariofk = tipousuario;
    await saveUsuario(persona)
      .then(uploadImagesReg(image))
      .catch((error) => {
        setMessage("Ha sucedido un error.Intentelo de nuevo mas tarde");
        return setshowAlert(true);
      });
    setMessage(
      "Se ha registrado su peticion de registro, se le notificara cuando su usuario sea aceptado o rechazado."
    );
    setshowAlert2(true);
  };

  //Funcion para elegir imagenes de la biblioteca
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: true,
      selectionLimit: 2,
    });

    if (!result.canceled) {
      setImage(result.assets);
    }
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
          Rellene los campos a continuación para realizar su registro
        </Text>
        <View style={{ flexDirection: "row", width: "80%" }}>
          <CheckBox
            containerStyle={{ backgroundColor: "#1E262E", width: "40%" }}
            textStyle={{ color: "white", fontSize: hp("2") }}
            center
            checked={checked === 0}
            onPress={() => setChecked(0)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Agente cívico"
            style={{ marginHorizontal: 0, paddingHorizontal: 0 }}
          />
          <CheckBox
            containerStyle={{ backgroundColor: "#1E262E", width: "50%" }}
            center
            textStyle={{ color: "white", fontSize: hp("2") }}
            checked={checked === 1}
            onPress={() => setChecked(1)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Conductor"
          />
        </View>
        <View style={styles.form}>
          {inputsValidate ? (
            <Text style={styles.warningText}>Rellene todos los campos</Text>
          ) : (
            <></>
          )}
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <TouchableOpacity onPress={pickImage} style={styles.buttonImg}>
              <Text style={styles.buttonText}>Seleccionar imagen...</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: image[0].uri }}
                style={{ width: 200, height: 200 }}
              />
            )}
            {imageValidate ? (
              <Text style={styles.warningText}>
                Seleccione una imagen para validar su registro
              </Text>
            ) : (
              <></>
            )}
          </View>
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
            maxLength={2}
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
            placeholder="Codigo postal"
            keyboardType="numeric"
            maxLength={5}
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("codigopostal", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            keyboardType="numeric"
            maxLength={10}
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("telefono", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Número de cuenta"
            keyboardType="numeric"
            maxLength={11}
            placeholderTextColor={"white"}
            onChangeText={(text) => handleChangeP("numcuenta", text)}
          />
          <TextInput
            placeholder="Clave interbancaria"
            maxLength={18}
            placeholderTextColor={"white"}
            style={styles.input}
            onChangeText={(text) => {
              handleChangeP("claveInterB", text);
            }}
            keyboardType="numeric"
          />
          <TextInput
            placeholder="Titular de la cuenta"
            placeholderTextColor={"white"}
            style={styles.input}
            onChangeText={(text) => {
              handleChangeP("titularCuenta", text);
            }}
          />
          <TextInput
            placeholder="Banco"
            placeholderTextColor={"white"}
            style={styles.input}
            onChangeText={(text) => {
              handleChangeP("banco", text);
            }}
          />
          {emailValidate ? (
            <Text style={styles.warningText}>Formato de email incorrecto</Text>
          ) : (
            <></>
          )}
          <TextInput
            style={styles.input}
            placeholder="Correo"
            placeholderTextColor={"white"}
            onChangeText={(text) => {
              handleChangeP("correo", text);
            }}
          />
          {passValidate ? (
            <Text style={styles.warningText}>{messageE}</Text>
          ) : (
            <></>
          )}
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
              onChangeText={(text) => handleChangeP("contraseña", text)}
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
          {checked === 1 ? (
            <>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="No. licencia o tarjeta circulacion"
                placeholderTextColor={"white"}
                onChangeText={(text) => {
                  handleChangeP("datoconductor", text);
                }}
              />
            </>
          ) : (
            <></>
          )}
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: wp(70),
            }}
          >
            <CheckBox
              containerStyle={{ backgroundColor: "#1E262E", paddingRight: 0 }}
              center
              checked={checkedTerms}
              onPress={() => setCheckedTerms(!checkedTerms)}
              title={"Estoy de acuerdo con los"}
              textStyle={{ color: "white" }}
            />
            <Text
              onPress={() => {
                setModalTerm(!modalTerm);
              }}
              style={{
                color: "white",
                fontWeight: "bold",
                marginBottom: 20,
                textDecorationLine: "underline",
              }}
            >
              Términos y condiciones
            </Text>
          </View>
          <Modal isVisible={modalTerm} setVisible={setModalTerm}>
            <ScrollView style={{ height: hp("70") }}>
              <Text style={{ color: "white" }}>
                Los términos y condiciones ("Términos") son un conjunto de
                términos legales definidos por el propietario de una página web.
                Establecieron los términos y condiciones que rigen las
                actividades de los visitantes de la página web en dicho sitio
                web y la relación entre los visitantes del sitio y el
                propietario del sitio web. Los términos deben definirse de
                acuerdo con las necesidades específicas y la naturaleza de cada
                página web. Por ejemplo, una página web que ofrece productos a
                clientes en transacciones de comercio electrónico requiere
                términos que son diferentes de los términos de una página web
                que solo proporciona información. Los Términos son un acuerdo
                entre el propietario del sitio web y los usuarios de la página
                web; detallan las políticas y procedimientos realizados por el
                sitio web. En muchos sentidos, los Términos brindan al
                propietario de la página web la posibilidad de protegerse de una
                posible exposición legal. Además, existen obligaciones legales
                para notificar a los usuarios de página web de tales
                actividades, y en muchos casos los Términos son el lugar
                indicado para hacerlo. Por lo tanto, es muy importante y muy
                recomendable que las páginas web tengan términos claros y
                completos que se ajusten y adapten al sitio web específico y a
                tus actividades. Importante: Las explicaciones y la información
                proporcionadas en este documento son solo explicaciones
                generales y de alto nivel, información y muestras. No debes
                confiar en este artículo como asesoramiento legal o como
                recomendaciones con respecto a lo que realmente debes hacer. Te
                recomendamos que busques asesoramiento legal para ayudarte a
                comprender y ayudarte a crear tus Términos.
              </Text>
            </ScrollView>
            <View style={styles.viewMap}>
              <Button
                title={"Cerrar"}
                containerStyle={styles.containerCancelMapBtn}
                buttonStyle={styles.cancelMapBtn}
                onPress={() => setModalTerm(false)}
              />
            </View>
          </Modal>
          <TouchableOpacity
            onPress={() => handleSubmmit(persona, tipoUser)}
            disabled={!checkedTerms}
            style={checkedTerms ? styles.buttonSave : styles.buttonSaveD}
          >
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Alerta"
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Entendido"
        confirmButtonColor="#105293"
        cancelButtonColor="red"
        contentContainerStyle={{ backgroundColor: "#1E262E" }}
        contentStyle={{ backgroundColor: "#1E262E" }}
        titleStyle={{ color: "white", textAlign: "center" }}
        messageStyle={{ color: "white", textAlign: "center" }}
        onConfirmPressed={() => {
          setshowAlert(false);
        }}
      />
      <AwesomeAlert
        show={showAlert2}
        showProgress={false}
        title="Alerta"
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Entendido"
        confirmButtonColor="#105293"
        cancelButtonColor="red"
        contentContainerStyle={{ backgroundColor: "#1E262E" }}
        contentStyle={{ backgroundColor: "#1E262E" }}
        titleStyle={{ color: "white", textAlign: "center" }}
        messageStyle={{ color: "white", textAlign: "center" }}
        onConfirmPressed={() => {
          setshowAlert(false);
          navigation.navigate("Login");
        }}
        onDismiss={() => {
          navigation.navigate("Login");
        }}
      />
    </ScrollView>
  );
};

const styles = new StyleSheet.create({
  container: {
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
  buttonImg: {
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "#105293",
    width: 200,
    marginVertical: 10,
  },
  buttonSaveD: {
    paddingTop: 5,
    paddingBottom: 10,
    borderRadius: 15,
    backgroundColor: "gray",
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
  viewMap: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  containerCancelMapBtn: {
    paddingLeft: 5,
  },
  cancelMapBtn: { backgroundColor: "red" },
});

export default Registro;
