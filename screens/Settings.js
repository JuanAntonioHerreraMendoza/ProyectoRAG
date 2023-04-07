import { Image, StyleSheet, Text, View } from "react-native";
import { Modal } from "../components/Modal";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { TextInput } from "react-native";
import { Button } from "@rneui/themed";
import { ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwesomeAlert from "react-native-awesome-alerts";
import { cambiarContraseña, cambiarNumeroCuenta } from "../functions/api";

const Settings = () => {
  const { logout, userInfo } = useContext(AuthContext);
  const [showAlert, setshowAlert] = useState(false);
  const [showAlertContraseñaConfrim, setshowAlertContraseñaConfrim] =
    useState(false);
  const [showAlertContraseña, setshowAlertContraseña] = useState(false);
  const [seePass, setSeePass] = useState(true);
  const [infoVisible, setinfoVisible] = useState(false);
  const [NumCModalVisible, setNumCModalVisible] = useState(false);
  const [contraseñaMVisible, setcontraseñaMVisible] = useState(false);
  const [numCuenta, setnumCuenta] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [codigo, setCodigo] = useState({ codigo: "" });

  let usuario = { usuario: userInfo.usuario, contraseña: contraseña };

  return (
    <View style={styles.container}>
      <View style={{ alignItems:"center" }}>
        <Image
          source={{
            uri: "https://i.pinimg.com/originals/6f/57/76/6f57760966a796644b8cfb0fbc449843.png",
          }}
          style={styles.image}
        />
        <Text style={styles.fontTitle}>
          {userInfo.idpersonafk.nombres +
            " " +
            userInfo.idpersonafk.apellidop +
            " " +
            userInfo.idpersonafk.apellidom}
        </Text>
        <Text style={styles.fontTitle}>Numero de cuenta: {userInfo.idpersonafk.numcuenta}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setinfoVisible(true);
        }}
      >
        <Text style={styles.buttonText}>Ver mi informacion</Text>
      </TouchableOpacity>
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
            <Text style={styles.fontTitle}>Telefono</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.telefono}</Text>
            </View>
            <Text style={styles.fontTitle}>Correo</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.correo}</Text>
            </View>
            <Text style={styles.fontTitle}>Numero de cuenta</Text>
            <View style={styles.containerInfo}>
              <Text style={styles.font}>{userInfo.idpersonafk.numcuenta}</Text>
            </View>
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
        <Text style={styles.buttonText}>Cambiar num de cuenta</Text>
      </TouchableOpacity>
      <Modal isVisible={NumCModalVisible} setVisible={setNumCModalVisible}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.fontTitle}>
              Escriba el nuevo numero de cuenta para realizar la actualizacion
            </Text>
            <TextInput
              placeholder="Nuevo numero de cuenta"
              placeholderTextColor={"white"}
              style={styles.input}
              onChangeText={(text) => {
                setnumCuenta(text);
              }}
              keyboardType="numeric"
            />
          </View>
          <View style={styles.viewMap}>
            <Button
              title={"Guardar"}
              containerStyle={styles.containerSaveMapBtn}
              buttonStyle={styles.saveMapBtn}
              onPress={() => {
                setNumCModalVisible(false);
                setshowAlert(true);
              }}
            />
            <Button
              title={"Cancelar"}
              containerStyle={styles.containerCancelMapBtn}
              buttonStyle={styles.cancelMapBtn}
              onPress={() => setNumCModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setshowAlertContraseña(true);
        }}
      >
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>
      <Modal isVisible={contraseñaMVisible} setVisible={setcontraseñaMVisible}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.fontTitle}>
              Se le envio un correo con un codigo,porfavor escribalo a
              continuacion
            </Text>
            <TextInput
              placeholder="Codigo"
              placeholderTextColor={"white"}
              style={styles.input}
              onChangeText={(text) => {
                setCodigo({ ["codigo"]: text });
              }}
            />
            <Text style={styles.fontTitle}>Escriba su nueva contraseña</Text>
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
                setcontraseñaMVisible(false);
                setshowAlertContraseñaConfrim(true);
              }}
            />
            <Button
              title={"Cancelar"}
              containerStyle={styles.containerCancelMapBtn}
              buttonStyle={styles.cancelMapBtn}
              onPress={() => setcontraseñaMVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <Button
        title="Cerrar sesion"
        containerStyle={styles.containerCancelMapBtn}
        buttonStylestyle={styles.cancelMapBtn}
        onPress={logout}
      />
      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="¿Estas seguro de cambiar su numero de cuenta?"
        message="Al confirmar se cerrara su sesion para realizar los cambios"
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
          setshowAlert(false);
        }}
        onConfirmPressed={() => {
          cambiarNumeroCuenta(usuario, numCuenta).then(() =>
            setshowAlert(false)
          );
        }}
        onDismiss={logout}
      />
      <AwesomeAlert
        show={showAlertContraseña}
        showProgress={false}
        title="¿Estas seguro de cambiar tu contraseña?"
        message="Al confirmar se le enviara un correo con un codigo para realizar el cambio"
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
          setshowAlertContraseña(false);
        }}
        onDismiss={() => {
          setcontraseñaMVisible(true);
        }}
      />
      <AwesomeAlert
        show={showAlertContraseñaConfrim}
        showProgress={false}
        title="¿Estas seguro de cambiar su contraseña?"
        message="Al confirmar se cerrara su sesion para realizar los cambios"
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
          setshowAlert(false);
        }}
        onConfirmPressed={() => {
          cambiarContraseña(usuario, codigo).then(() =>
            setshowAlertContraseñaConfrim(false)
          );
        }}
        onDismiss={logout}
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
    width: 200,
    height: 200,
    borderRadius: 20,
    marginVertical: 20,
  },
});
