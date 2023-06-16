import { StyleSheet, View, FlatList, RefreshControl, Text } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getReportes } from "../../functions/apiReportes";
import { useIsFocused } from "@react-navigation/native";
import ReporteItem from "./ReporteItem";

const ReportesList = () => {
  const [reportes, setReportes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const { userInfo } = useContext(AuthContext);

  const loadReportes = async () => {
    const data = await getReportes(userInfo.idpersonafk.idpersona);
    setReportes(data);
  };

  const renderItem = ({ item }) => {
    return <>
    <ReporteItem reporte={item}></ReporteItem>
    </>
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadReportes();
    setRefreshing(false);
  });

  useEffect(() => {
    loadReportes();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={reportes}
        keyExtractor={(item) => item.idreporte }
        renderItem={renderItem}
        scrollEnabled={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#78e08f"]}
            onRefresh={onRefresh}
            progressBackgroundColor="0a3d62"
          />
        }
      />
    </View>
  );
};

export default ReportesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E262E",
  },
});
