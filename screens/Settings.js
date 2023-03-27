import { StyleSheet, Text, View, Button } from 'react-native'
import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react'
import { TouchableOpacity } from 'react-native';


const Settings = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cambiar num de cuenta</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>
      <Button title="Cerrar sesion" onPress={logout} />
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    backgroundColor:"#1E262E",
    flex:1
  }
  ,
  button:{
    alignItems:'center',
    backgroundColor:"blue",
    width:"50%",
    height:25,
    borderRadius:10,
    marginVertical:10,
    textAlign:'center'
  },
  buttonText:{
    color:"white",
    fontSize:16
  }
})