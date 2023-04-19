import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Ionicons
        style={{ marginBottom: 30 }}
        name={"shield-outline"}
        size={150}
        color={"#E1EC2F"}
      />
      <Text style={styles.text}>Supervisión SuCi</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1E262E",
  },
  text: {
    color: "white",
    fontSize: 28,
  },
});

export default SplashScreen;
