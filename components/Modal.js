import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Overlay } from "@rneui/themed";

export const Modal = ({isVisible, setVisible, children}) => {
  return (
    <Overlay
      isVisible={isVisible}
      overlayStyle={styles.overlay}
      onBackdropPress={() => setVisible(false)}
    >
      {children}
    </Overlay>  
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: "100%",
    backgroundColor:"#1E262E"
  },
});
