import { View, Text, StyleSheet } from "react-native";
import React from "react";

const Notificaciones = () => {
  return (
    <View style={styles.container}>
      <Text>Notificaciones</Text>
    </View>
  );
};

export default Notificaciones;

const styles = new StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E262E",
  },
});
