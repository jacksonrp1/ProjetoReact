import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

export default function Body({ saldo, perdas, ganhos }) {
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
      <View>
        <Text style={styles.itemTitle}>Saldo</Text>
        <View style={styles.content}>
          <Text style={styles.currencySymbol}>R$</Text>
          <Text style={styles.saldo}>{saldo}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    marginHorizontal: 14,
    borderBottomWidth: 1.5,
    borderBottomColor: '#e74c3c'
  },
  itemTitle: {
    fontSize: 18,
    fontFamily: 'Inter_900Black'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'Inter_500Medium'
  },
  currencySymbol: {
    marginRight: 6,
    fontFamily: 'Inter_500Medium'
  },
  saldo: {
    fontSize: 16,
    color: '#2ecc71',
    fontFamily: 'Inter_500Medium'
  }
})
