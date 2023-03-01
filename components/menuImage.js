import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import ButtonCamera from "./ButtonCamera";

const menuImage = (props, logout, userInfo) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: 20,
            marginBottom: 20,
            backgroundColor: "#222f3e",
            borderBottomWidth: 2,
            borderColor: "gray",
          }}
        >
          <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              borderWidth: 2,
              borderColor: "gray",
            }}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "white",
            }}
          >
            {userInfo.nombre}
          </Text>
          <Text style={{ color: "white" }}>Texto 2</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
        <ButtonCamera title={"Cerrar sesion"} icon={"log-out"} onPress={logout}/>
    </View>
  );
};

export default menuImage;
