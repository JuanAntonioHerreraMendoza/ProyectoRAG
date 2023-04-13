import react, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getConductor, loginuser } from "../functions/api";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [Conductor, setConductor] = useState({})
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const login = async (user) => {
    setIsLoading(true);
    let userInfo = await loginuser(user);
    if (userInfo === undefined) {
      setIsLoading(false);
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
      console.log("Logout correcto");
    } catch (error) {
      console.log(`logout error ${error}`);
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
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, userInfo, splashLoading, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  );
};
