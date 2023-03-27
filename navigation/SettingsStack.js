import { View, Text } from 'react-native'
import React from 'react'
import Settings from '../screens/Settings'
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const SettingStack = createNativeStackNavigator();

const SettingsStack = () => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Settings" component={Settings} options={{headerTitle:"Opciones",headerTintColor:"white",headerStyle:{backgroundColor:"#222f3e"}}} />
    </SettingStack.Navigator>
  )
}

export default SettingsStack