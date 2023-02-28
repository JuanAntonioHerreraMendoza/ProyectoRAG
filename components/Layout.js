import { View, Text, StyleSheet,StatusBar } from "react-native";
import React from "react";

const Layout = ({ children }) => {
  return <View style={styles.container}>
    {children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#222f3e",
    padding: 20,
    flex: 1,
  },
});

export default Layout;
