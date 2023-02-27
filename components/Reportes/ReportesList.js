import { StyleSheet,View,FlatList,RefreshControl} from "react-native";
import React, { useEffect,useState } from "react";
import { getReportes } from "../../functions/api";
import { useIsFocused } from "@react-navigation/native";
import ReporteItem from './ReporteItem' ;

const ReportesList = () => {
  const [reportes, setReportes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused=useIsFocused();

  const loadReportes = async () => {
    const data = await getReportes();
    setReportes(data);
  };

  const renderItem = ({ item }) => {
    return <ReporteItem reporte={item}></ReporteItem>;
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
    <View>
      <FlatList
      style={{width:'100%'}}
      data={reportes}
      keyExtractor={(item)=>item.idreporte+""}
      renderItem={renderItem}
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

const styles = StyleSheet.create({});
