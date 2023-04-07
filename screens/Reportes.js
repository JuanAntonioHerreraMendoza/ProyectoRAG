import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import ReportesList from "../components/Reportes/ReportesList";

const Reportes = () => {
  return (
    <ScrollView>
      <ReportesList></ReportesList>
    </ScrollView>
  )
}

export default Reportes