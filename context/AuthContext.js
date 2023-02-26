import react, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loginuser } from "../functions/api";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = async (user) => {
    setIsLoading(true);
    if (user.pass === "" || user.user === "") {
      setIsLoading(false);
      Alert.alert("Rellene ambos campos");
    } else {
      try {
        let userInfo = await loginuser(user);
        if (userInfo.id === undefined) {
          Alert.alert("Usuario o contraseña incorrecto");
          setIsLoading(false);
        } else {
          setUserInfo(userInfo);
          AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setIsLoading(false);
        }
      } catch (error) {
        Alert.alert(error);
        setIsLoading(false);
      }
    }
  };

  const logout = () => {
    try {
      AsyncStorage.removeItem("userInfo");
      setUserInfo({});
      setIsLoading(false);
      console.log("Logout correcto");
    } catch (error) {
      console.log(`logout error ${error}`);
      setIsLoading(false);
    }
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem("userInfo");
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, userInfo, splashLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
