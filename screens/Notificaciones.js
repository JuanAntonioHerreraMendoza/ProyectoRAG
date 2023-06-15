import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  getConductor,
  getMultasConductor,
  getMultasPersona,
} from "../functions/api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Notificaciones = () => {
  const { userInfo } = useContext(AuthContext);
  const [multas, setMultas] = useState(null);
  const [multasPropias, setMultasPropias] = useState({});

  const loadMultas = async (persona) => {
    const data = await getMultasPersona(persona);
    setMultas(data);
  };

  const LoadMultasPropias = async () => {
    const conductor = await getConductor(userInfo.idpersonafk);
    const data = await getMultasConductor(conductor?.idconductor);
    setMultasPropias(data);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{marginTop:10,marginRight:10}}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.font}>{item.idmulta}</Text>
          <Text style={styles.font}>{item.razon}</Text>
          <Text style={styles.font}>{item.monto}</Text>
          <Text style={styles.font}>
            {item.estatus === true ? "Pagado" : "Sin pago"}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    loadMultas(userInfo.idpersonafk);
    if (userInfo.tipousuariofk.idtipousuario === 2) LoadMultasPropias();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.fontTitle}>Multas</Text>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Text style={styles.column}>ID</Text>
          <Text style={styles.column}>Razon</Text>
          <Text style={styles.column}>Monto</Text>
          <Text style={styles.column}>Estatus</Text>
        </View>
        {multas?.length > 0 ? (
          <>
            <FlatList
              style={{ width: "100%", height: "50%" }}
              data={multas}
              keyExtractor={(item) => item.idmulta}
              renderItem={renderItem}
              scrollEnabled
            />
          </>
        ) : (
          <Text style={styles.fontTitle}>
            No se encontraron multas aceptadas aun
          </Text>
        )}
        {userInfo.tipousuariofk.idtipousuario === 2 ? (
          <>
            <Text style={styles.fontTitle}>Multas Propias</Text>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text style={styles.column}>ID</Text>
              <Text style={styles.column}>Razon</Text>
              <Text style={styles.column}>Monto</Text>
              <Text style={styles.column}>Estatus</Text>
            </View>
            {multasPropias?.length > 0 ? (
              <>
                <FlatList
                  style={{ width: "100%", height: "50%" }}
                  data={multasPropias}
                  keyExtractor={(item) => item.idmulta}
                  renderItem={renderItem}
                  scrollEnabled
                />
              </>
            ) : (
              <Text style={styles.fontTitle}>
                Felicidades no cuenta con una multa actual
              </Text>
            )}
          </>
        ) : (
          <></>
        )}
      </View>
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
  font: {
    fontSize: hp("2"),
    color: "#ffffff",
    textAlign: "center",
    width: "20%",
    marginHorizontal: 10,
  },
  fontTitle: {
    color: "#ffffff",
    fontSize: hp("2.5"),
    paddingBottom: 5,
    marginVertical: 5,
    textAlign: "center",
  },
  column: {
    color: "white",
    width: "16%",
    fontSize: hp(2.3),
    marginBottom: 3,
    marginHorizontal: wp(5),
    textAlign: "center",
  },
});
