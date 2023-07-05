import react, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  editarUsuario,
  existeToken,
  getUsuario,
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
  const [logged, setlogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = async (user) => {
    setIsLoading(true);
    let userInfo = await loginuser(user);
    if (userInfo === undefined) {
      return setIsLoading(false);
    }
    if (userInfo.idpersonafk?.activo === false) {
      setIsLoading(true);
      if (
        Date.parse(userInfo.idpersonafk.fechasuspencioninicio) <
          Date.parse(Date()) &&
        Date.parse(userInfo.idpersonafk.fechasuspencion) > Date.parse(Date())
      ) {
        alert(
          "Ha sido suspendido hasta el: " +
            JSON.stringify(userInfo.idpersonafk.fechasuspencion).split("T")[0] +
            " a las " +
            JSON.stringify(userInfo.idpersonafk.fechasuspencion).split("T")[1] +
            " por infrigir las normas de uso de la aplicacion"
        );

        setIsLoading(false);
      } else {
        if (
          Date.parse(userInfo.idpersonafk.fechasuspencion) < Date.parse(Date())
        ) {
          userInfo.idpersonafk.activo = true;
          await editarUsuario(userInfo);
        }
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
    if (userInfo.usuario === null) {
      setIsLoading(false);
      return false;
    } else if (userInfo.idpersonafk?.activo === false) {
      setIsLoading(true);
      if (
        Date.parse(userInfo.idpersonafk.fechasuspencioninicio) <
          Date.parse(Date()) &&
        Date.parse(userInfo.idpersonafk.fechasuspencion) > Date.parse(Date())
      ) {
        alert(
          "Ha sido suspendido hasta el: " +
            JSON.stringify(userInfo.idpersonafk.fechasuspencion).split("T")[0] +
            " a las " +
            JSON.stringify(userInfo.idpersonafk.fechasuspencion).split("T")[1] +
            " por infrigir las normas de uso de la aplicacion"
        );

        setIsLoading(false);
      } else {
        if (
          Date.parse(userInfo.idpersonafk.fechasuspencion) < Date.parse(Date())
        ) {
          userInfo.idpersonafk.activo = true;
          await editarUsuario(userInfo);
        }
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

  const logout = () => {
    try {
      AsyncStorage.removeItem("userInfo");
      AsyncStorage.removeItem("userConductor");
      setUserInfo({});
      setlogged(false);
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
      let aux = await getUsuario(userInfo.idusuarios);
      if (
        Date.parse(aux.idpersonafk.fechasuspencioninicio) <
          Date.parse(Date()) &&
        aux.idpersonafk?.activo === false
      ) {
        try {
          alert("Estas suspendido por infringir normas");
          AsyncStorage.removeItem("userInfo");
          setUserInfo({});
          setIsLoading(false);
        } catch (error) {
          alert(`${error}`);
          setIsLoading(false);
        }
        return;
      }
      if (userInfo) {
        setUserInfo(userInfo);
        setlogged(true);
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
      value={{
        isLoading,
        userInfo,
        splashLoading,
        logged,
        login,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
