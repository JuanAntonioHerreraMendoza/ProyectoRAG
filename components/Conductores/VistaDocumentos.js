import { View, Image,StyleSheet} from 'react-native'
import React from 'react'

const VistaDocumentos = ({route}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri:"http://192.168.1.75:8080/images?file="+route.params.imagen}}  alt="react logo" style={styles.imagen}/>
    </View>
  )
}

const styles = new StyleSheet.create({
  container: {
    width: "100%",
    borderColor: "#818E9C",
    borderWidth: 2,
    alignItems:"center",
    paddingBottom:5,
    borderRadius:10,
  },
  imagen: {
    width: 400,
    height: 200,
  },
})

export default VistaDocumentos