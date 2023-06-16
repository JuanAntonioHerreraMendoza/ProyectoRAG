import { View, Button, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getReporte } from "../../functions/apiReportes";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { ResizeMode, Video } from "expo-av";
import { TouchableOpacity } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const ReporteDetail = ({ route, navigation }) => {
  const [reporte, setReporte] = useState([]);
  const [fecha, setFecha] = useState("");
  const [archivo, setArchivo] = useState("")
  const isFocused = useIsFocused();

  const loadReporte = async () => {
    const data = await getReporte(route.params.id);
    setReporte(data);
    setFecha(data["fecha"].substr(0, 10));
    setArchivo(data['evidencia'].split(".")[1])
  };

  useEffect(() => {
    loadReporte();
  }, [isFocused]);

  return (
    <View style={styles.layout}>
      <View style={styles.principal}>
        <Text style={styles.fontTitle}>Fecha</Text>
        <View style={styles.container}>
          <Text style={styles.font}>{fecha}</Text>
        </View>
        <Text style={styles.fontTitle}>Dirección</Text>
        <View style={styles.container}>
          <Text style={styles.font}>{reporte["direccion"]}</Text>
        </View>
        <Text style={styles.fontTitle}>Descripción</Text>
        <View style={styles.container}>
          <Text style={styles.font}>{reporte["descripcion"]}</Text>
        </View>
        <Text style={styles.fontTitle}>Estatus</Text>
        <View style={styles.container}>
          <Text style={styles.font}>{reporte["estatus"]}</Text>
        </View>
        <Text style={styles.fontTitle}>Evidencia</Text>
        <View style={styles.container}>
          {archivo=== "mov" || archivo=== "mp4"?
          <Video source={{uri:"http://192.168.1.75:8080/images/" + reporte.evidencia+"?path=reportes"}} useNativeControls resizeMode={ResizeMode.COVER} style={styles.video} />:
          <Image
            source={{
              uri: "http://192.168.1.75:8080/images/" + reporte.evidencia+"?path=reportes"
            }}
            style={styles.imagen}
          />
          }
        </View>
      </View>
      <View style={{alignItems:"center"}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.buttonSave}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  layout: {
    backgroundColor: "#222f3e",
    padding: 20,
    paddingTop:0,
    flex: 1,
  },
  principal: {
    textAlign: "left",
  },
  container: {
    width: "100%",
    borderColor: "#818E9C",
    borderWidth: 2,
    alignItems: "center",
    paddingBottom: 5,
    borderRadius: 10,
  },
  buttonSave: {
    borderRadius: 15,
    backgroundColor: "red",
    width: "40%",
    height: hp("4"),
    marginVertical: 10,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: hp("2"),
  },
  font: {
    fontSize: hp("2.1"),
    color: "#ffffff",
  },
  fontTitle: {
    color: "#ffffff",
    fontSize: hp("2"),
    paddingBottom: 5,
  },
  imagen: {
    width: wp("70"),
    height: hp("30"),
  },
  video: {
    width: wp("70"),
    height: hp("30"),
  },
});

export default ReporteDetail;
