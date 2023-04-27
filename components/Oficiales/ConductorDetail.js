import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import React, { useState, useEffect } from "react";

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
        <Text style={styles.font}>{item.infraccion}</Text>
      </View>
    );
  };

  useEffect(() => {
    loadInfracciones();
  }, []);

  return (
    <View style={styles.layout}>
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

      <View>
        <Button title="Realizar reporte" onPress={()=>{navigation.navigate("ReporteForm")}}/>
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
