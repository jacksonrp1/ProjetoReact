import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

import { AntDesign } from '@expo/vector-icons'

export default function Actions() {
  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.areaButton}>
          <AntDesign name="addfolder" size={26} color="#000" />
        </View>
        <Text style={styles.labelButton}>Deposito</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <View style={styles.areaButton}>
          <AntDesign name="tagso" size={26} color="#000" />
        </View>
        <Text style={styles.labelButton}>Saque</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 70,
    marginVertical: 14,
    paddingHorizontal: 14
  },
  actionButton: {
    alignItems: 'center',
    margin: 10
  },
  areaButton: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center'
  },
  labelButton: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  }
})
