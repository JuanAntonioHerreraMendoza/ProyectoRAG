import { View, Image, StyleSheet,Dimensions} from "react-native";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

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
          uri: "http://192.168.1.75:8080/images/" + route.params.imagen,
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
