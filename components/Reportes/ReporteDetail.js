import { View, Button, Text,Image } from "react-native";
import React, { useState, useEffect } from "react";
import { getReporte } from "../../functions/api";
import { useIsFocused } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import Layout from "../Layout";

const ReporteDetail = ({ route, navigation }) => {
  const [reporte, setReporte] = useState([]);
  const [fecha, setFecha] = useState("");
  const isFocused = useIsFocused();

  const loadReporte = async () => {
    const data = await getReporte(route.params.id);
    setReporte(data);
    console.log(data)
    setFecha(data["fecha"].substr(0, 10));
  };

  useEffect(() => {
    loadReporte();
  }, [isFocused]);

  return (
    <Layout>
      <View style={styles.principal}>
        <Text style={styles.fontTitle}>Fecha</Text>
        <View style={styles.container}>
          <Text style={styles.font}>{fecha}</Text>
        </View>
        <Text style={styles.fontTitle}>Direccion</Text>
        <View style={styles.container}>
        <Text style={styles.font}>{reporte["direccion"]}</Text>
        </View>
        <Text style={styles.fontTitle}>Descripcion</Text>
        <View style={styles.container}>
        <Text style={styles.font}>{reporte["descripcion"]}</Text>
        </View>
        <Text style={styles.fontTitle}>Estatus</Text>
        <View style={styles.container}>
        <Text style={styles.font}>{reporte["estatus"]}</Text>
        </View>
        <Text style={styles.fontTitle}>Evidencia</Text>
        <View style={styles.container}>
        <Image source={{uri:"http://192.168.1.75:8080/images?file="+reporte.evidencia}} alt="react logo" style={styles.imagen}/>
        </View>
      </View>
      <View>
        <Button
          title="Regresar"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
    </Layout>
  );
};

const styles = new StyleSheet.create({
  principal: {
    textAlign:"left",
    borderWidth:1,
    borderRadius:5,
  },
  container: {
    width: "100%",
    borderColor: "#818E9C",
    borderWidth: 2,
    alignItems:"center",
    paddingBottom:5,
    borderRadius:10,
  },
  font: {
    fontSize: 17,
    color: "#ffffff",
  },
  fontTitle: {
    color: "#ffffff",
    fontSize: 20,
    paddingBottom:5
  },
  imagen: {
    width: 200,
    height: 200,
  },
});

export default ReporteDetail;
