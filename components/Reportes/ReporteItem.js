import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React,{useState,useEffect} from "react";
import {useNavigation} from "@react-navigation/native";

const ReporteItem = ({ reporte,handleDelete}) => {
  const [fecha, setFecha] = useState("");

  useEffect(() => {
    setFecha(reporte["fecha"].substr(0, 10)); 
  }, []); 
  
  const navigation=useNavigation();
    

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={()=> navigation.navigate('ReporteDetail',{id:reporte.idreporte})} style={{width:"80%"}} >
        <Text style={styles.itemTitle}>Reporte hecho el {fecha} </Text>
        <Text style={styles.itemTitle}>{reporte.direccion}</Text>
      </TouchableOpacity>
      <Text style={reporte.estatus==='Revisión' ? styles.itemStatusRev : (reporte.estatus==='Aceptado' ? styles.itemStatusAceptado : styles.itemStatusRechazado)}>{reporte.estatus}</Text>
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
