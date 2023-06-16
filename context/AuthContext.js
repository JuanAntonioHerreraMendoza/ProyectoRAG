import react, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  editarUsuario,
  existeToken,
  guardarToken,
  loginuser,
  loginusergoogle,
} from "../functions/api";
import { Alert } from "react-native";
import { registerForPushNotificationsAsync } from "../functions/notificaciones";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [Conductor, setConductor] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = async (user) => {
    setIsLoading(true);
    let userInfo = await loginuser(user);
    if (userInfo === undefined) {
      setIsLoading(false);
    } else if (
      userInfo.idpersonafk.activo === false ||
      userInfo.idpersonafk.activo === null
    ) {
      setIsLoading(false);
      if (
        Date.parse(userInfo.idpersonafk.fechasuspencion) < Date.parse(Date())
      ) {
        userInfo.idpersonafk.activo = true;
        await editarUsuario(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        registerForPushNotificationsAsync().then((token) =>
          existeToken(token).then((res) => {
            if (res) {
              console.log("ya existe");
            } else {
              guardarToken(token, userInfo.usuario);
            }
          })
        );
        setIsLoading(false);
      } else {
        alert(
          "Ha sido suspendido hasta el: " +
            JSON.stringify(userInfo.idpersonafk.fechasuspencion).substring(
              1,
              11
            ) +
            " por infrigir las normas de uso de la aplicacion"
        );
      }
    } else {
      setUserInfo(userInfo);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      registerForPushNotificationsAsync().then((token) =>
        existeToken(token).then((res) => {
          if (!res) {
            guardarToken(token, userInfo.usuario);
          }
        })
      );
      setIsLoading(false);
    }
  };

  const loginGoogle = async (user) => {
    setIsLoading(true);
    let userInfo = await loginusergoogle(user);
    if (userInfo === undefined || userInfo.usuario === null) {
      setIsLoading(false);
      return false;
    } else {
      setUserInfo(userInfo);
      AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      AsyncStorage.removeItem("userInfo");
      AsyncStorage.removeItem("userConductor");
      setUserInfo({});
      setConductor({});
      setIsLoading(false);
    } catch (error) {
      alert(`logout error ${error}`);
      setIsLoading(false);
    }
  };

  function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);
      sleep(1500).then(() => {
        setSplashLoading(false);
      });

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }
    } catch (e) {
      setSplashLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, userInfo, splashLoading, login, loginGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
