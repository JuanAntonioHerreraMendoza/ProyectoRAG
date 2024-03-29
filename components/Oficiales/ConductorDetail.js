import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const ConductorDetail = ({ route,navigation }) => {
  const [infracciones, setInfracciones] = useState(null);

  const loadInfracciones = () => {
    const data = route.params?.multas;
    setInfracciones(data);
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.font}>{item.idmulta}</Text>
        <Text style={styles.font}>{item.razon}</Text>
        <Text style={styles.font}>{item.estatus===true?"Pagado":"Sin pago"}</Text>
      </View>
    );
  };

  useEffect(() => {
    loadInfracciones();
  }, []);

  return (
    <View style={styles.layout}>
      <SafeAreaView>
      <Text style={styles.fontTitle}>Nombre</Text>
      <View style={styles.container}>
        <Text style={styles.font}>
          {route.params.datos.idpersonafk.nombres}
        </Text>
      </View>
      <Text style={styles.fontTitle}>Apellido Paterno</Text>
      <View style={styles.container}>
        <Text style={styles.font}>
          {route.params.datos.idpersonafk.apellidop}
        </Text>
      </View>
      <Text style={styles.fontTitle}>Apellido Materno</Text>
      <View style={styles.container}>
        <Text style={styles.font}>
          {route.params.datos.idpersonafk.apellidom}
        </Text>
      </View>
      <Text style={styles.fontTitle}>Licencia</Text>
      <View style={styles.container}>
        <Text style={styles.font}>{route.params.datos.noLicencia}</Text>
      </View>
      <Text style={styles.fontTitle}>Tipo de licencia</Text>
      <View style={styles.container}>
        <Text style={styles.font}>{route.params.datos.tipoLicencia}</Text>
      </View>
      <Text style={styles.fontTitle}>Tarjeta de circulación</Text>
      <View style={styles.container}>
        <Text style={styles.font}>{route.params.datos.tarjetaCirculacion}</Text>
      </View>
      <Text style={styles.fontTitle}>Placas</Text>
      <View style={styles.container}>
        <Text style={styles.font}>{route.params.datos.numplacas}</Text>
      </View>
      </SafeAreaView>
      <Text style={styles.fontTitle}>Incidencias</Text>
      {route.params?.multas.length === 0 ? (
        <Text style={styles.font}>Este conductor no presenta alguna multa</Text>
      ) : (
        <View>
          <FlatList
            style={{ width: "100%" }}
            data={infracciones}
            keyExtractor={(item) => item.idmulta}
            renderItem={renderItem}
          />
        </View>
      )}
      <View style={{alignItems:"center",marginTop:10}}>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("ReporteForm")}}>
        <Text style={styles.buttonText}>Realizar reporte</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  layout: {
    backgroundColor: "#222f3e",
    padding: 20,
    flex: 1,
  },
  principal: {
    textAlign: "left",
    borderWidth: 1,
    borderRadius: 5,
  },
  container: {
    width: "100%",
    borderColor: "#818E9C",
    borderWidth: 2,
    alignItems: "center",
    paddingBottom: 5,
    borderRadius: 10,
  },
  font: {
    fontSize: hp("2"),
    color: "#ffffff",
  },
  fontTitle: {
    color: "#ffffff",
    fontSize: hp("2"),
    paddingBottom: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#E1EC2F",
    width: "70%",
    height: 25,
    borderRadius: 10,
    marginVertical: 10,
    textAlign: "center",
    height: 32,
    marginBottom: 15,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    paddingTop: 4,
    fontWeight:"bold"
  },
});

export default ConductorDetail;
