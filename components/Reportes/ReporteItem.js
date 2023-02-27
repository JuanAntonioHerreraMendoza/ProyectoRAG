import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";

const ReporteItem = ({ reporte,handleDelete}) => {
    const navigation=useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Text style={styles.itemTitle}>{reporte.fecha}</Text>
        <Text style={styles.itemTitle}>{reporte.direccion}</Text>
      </TouchableOpacity>
      <Text style={reporte.status==='Revision' ? styles.itemStatusRev : (reporte.status==='Aceptado' ? styles.itemStatusAceptado : styles.itemStatusRechazado)}>{reporte.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#333333",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center'
  },
  itemTitle: {
    color: "#ffffff",
  },
  itemStatusRev:{
    color:'#ffffff',
    fontWeight:'bold'
  },
  itemStatusAceptado:{
    color:'green',
    fontWeight:'bold'
  },
  itemStatusRechazado:{
    color:'red',
    fontWeight:'bold'
  }
});

export default ReporteItem;
