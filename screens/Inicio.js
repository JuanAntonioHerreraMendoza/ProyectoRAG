import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import { AuthContext } from "../context/AuthContext";
import React, { useEffect, useState, useContext } from "react";
import { getReportes } from "../functions/api";
import { useIsFocused } from "@react-navigation/native";
import ReporteItem from "../components/Reportes/ReporteItem";

export function Home({ navigation }) {
  const { userInfo, isLoading, logout } = useContext(AuthContext);
  const [reportes, setReportes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const loadReportes = async () => {
    const data = await getReportes(userInfo.id);
    setReportes(data);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadReportes();
    setRefreshing(false);
  });

  useEffect(() => {
    loadReportes();
  }, [isFocused]);

  const renderItem = ({ item }) => {
    return <ReporteItem reporte={item}></ReporteItem>;
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1E262E",
      }}
    >
      <Text style={{ color: "white",fontSize:20,paddingTop:10 }}>Bienvenido {userInfo.idpersonafk.nombres}</Text>
      {/* <FlatList
        style={{ width: "100%" }}
        data={reportes}
        keyExtractor={(item) => item.idreporte + ""}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#78e08f"]}
            onRefresh={onRefresh}
            progressBackgroundColor="0a3d62"
          />
        }
      /> */}
      <TouchableOpacity
        style={styles.locationB}
        onPress={() => {
          navigation.navigate("ReporteForm");
        }}
      >
        <View style={styles.fab}>
          <Text style={styles.text}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = new StyleSheet.create({
  locationB: {
    position: "absolute",
    bottom: 30,
    right: 40,
  },
  fab: {
    backgroundColor: "#E1EC2F",
    width: 50,
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    alignSelf: "center",
    fontWeight: "bold",
  },
});
