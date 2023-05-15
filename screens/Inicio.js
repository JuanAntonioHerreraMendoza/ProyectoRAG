import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";
import { getConteos, getUltimoReporte } from "../functions/api";
import { useIsFocused } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ReporteItem from "../components/Reportes/ReporteItem";

export function Home({ navigation }) {
  //Obtencion de contexto(Informacion de usuario)
  const { userInfo, isLoading, logout } = useContext(AuthContext);

  //Variables
  const [reportes, setReportes] = useState([]);
  const [conteoreportes, setConteoReportes] = useState([]);
  const isFocused = useIsFocused();

  const loadReportes = async () => {
    const data = await getUltimoReporte(userInfo.idpersonafk.idpersona);
    setReportes(data);
    const conteoData = await getConteos(userInfo.idpersonafk.idpersona);
    setConteoReportes(conteoData);
  };

  useEffect(() => {
    loadReportes();
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return <ReporteItem reporte={item}></ReporteItem>;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1E262E",
      }}
    >
      <Text
        style={{
          color: "white",
          fontSize: 20,
          paddingTop: 10,
          marginBottom: 30,
        }}
      >
        Bienvenido{" "}
        {userInfo.idpersonafk.nombres +
          " " +
          userInfo.idpersonafk.apellidop +
          " " +
          userInfo.idpersonafk.apellidom}
      </Text>
      <View>
        <Text style={styles.textoDatos}>
          Reportes hechos: {conteoreportes[0]}
        </Text>
        <Text style={styles.textoDatos}>
          Reportes en revision: {conteoreportes[1]}
        </Text>
        <Text style={styles.textoDatos}>
          Reportes aceptados: {conteoreportes[2]}
        </Text>
        <Text style={styles.textoDatos}>
          Reportes rechazados: {conteoreportes[3]}
        </Text>
      </View>
      <FlatList
        style={{ width: wp("100"), marginVertical: 30 }}
        data={reportes}
        keyExtractor={(item) => item.idreporte + ""}
        renderItem={renderItem}
        scrollEnabled={false}
      />
      <TouchableOpacity
        style={styles.locationB}
        onPress={() => {
          navigation.navigate("ReporteForm");
        }}
      >
        <View style={styles.fab}>
          <Text style={styles.text}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

//Estilos de la interfaz
const styles = new StyleSheet.create({
  locationB: {
    position: "absolute",
    bottom: 30,
    right: 40,
  },
  fab: {
    backgroundColor: "#E1EC2F",
    width: wp("12"),
    height: hp("6"),
    borderRadius: 100,
    justifyContent: "center",
  },
  textoDatos: {
    color: "white",
    fontSize: hp("2.5"),
    paddingTop: 10,
  },
  text: {
    fontSize: hp("3.5"),
    alignSelf: "center",
    fontWeight: "bold",
  },
});
