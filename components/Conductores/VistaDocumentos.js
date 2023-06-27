import { View, Image, StyleSheet,Dimensions} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { API } from "../../functions/api";

const VistaDocumentos = ({ route }) => {
  const [width, setWidth] = useState(0);
  const [heigth, setHeigth] = useState(0)

  useEffect(() => {
    setWidth(Dimensions.get('window').width-10);
    setHeigth(Dimensions.get('window').height);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: API+"images/" + route.params.imagen+"?path=documentos"
        }}
        alt="react logo"
        style={{ width: heigth, height: width, transform: [{ rotate: "90deg" }] }}
      />
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 5,
    borderRadius: 10,
  },
  imagen: {
    width: {},
    height: 300,
    transform: [{ rotate: "90deg" }],
  },
});

export default VistaDocumentos;
