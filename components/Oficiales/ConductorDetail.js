import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";

const ConductorDetail = ({ route }) => {
  return (
    <ScrollView style={styles.layout}>
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
    </ScrollView>
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
    fontSize: 17,
    color: "#ffffff",
  },
  fontTitle: {
    color: "#ffffff",
    fontSize: 20,
    paddingBottom: 5,
  },
});

export default ConductorDetail;
