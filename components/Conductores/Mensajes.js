import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";

const Mensajes = () => {
  const countries = [
    {
      id: "1",
      name: "Caos por lluvias",
      mensaje:
        "¡Toma tus precauciones! Lluvia deja inundaciones y caos vial en la CDMX",
    },
    {
      id: "2",
      name: "Periférico Oriente: Caos vial permanente",
      mensaje:
        "Los comercios ambulantes que ahí se colocan provocan largas filas de autos; sólo dejan un carril y no hay presencia policial en la zona",
    },
    {
      id: "3",
      name: "Rodada motociclista termina en bloqueo sobre Reforma; reportan detenidos",
      mensaje:
        "Cientos de motociclistas llegaron desde Ciudad Universitaria y generaron caos vial; hasta el momento reportan 29 motocicletas incautadas y 26 conductores detenidos",
    },
    {
      id: "4",
      name: "Socavón causa caos vial en inmediaciones del Distribuidor Vial Alfredo del Mazo",
      mensaje:
        "El socavón derivó de una fuga de agua que se registró y que impidió el tránsito vehícular por varias horas en esta ruta",
    },
    {
      id: "5",
      name: "Socavón causa caos vial en inmediaciones del Distribuidor Vial Alfredo del Mazo",
      mensaje:
        "El socavón derivó de una fuga de agua que se registró y que impidió el tránsito vehícular por varias horas en esta ruta",
    },
  ];
  const Item = ({ name, mensaje }) => {
    return (
      <View style={styles.item}>
        <TouchableOpacity>
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
            {name}
          </Text>
          <Text style={{ color: "white" }}>{mensaje}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const renderItem = ({ item }) => (
    <Item name={item.name} mensaje={item.mensaje} />
  );
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1E262E",
      }}
    >
      <FlatList
        style={styles.lista}
        data={countries}
        keyExtractor={countries.id}
        renderItem={renderItem}
        scrollEnabled
      />
    </View>
  );
};
const styles = StyleSheet.create({
  lista: {
    marginTop: "5%",
    width: "95%",
  },
  container: {
    marginTop: 30,
    padding: 2,
  },
  item: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});

export default Mensajes;
