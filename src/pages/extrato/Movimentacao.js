import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

export default function Movimentacao({ data }) {
  const [showValue, setShowValue] = useState(false)
  const saldo = parseFloat(data.vlrGanho) - parseFloat(data.vlrAposta)
  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => setShowValue(!showValue)}
    >
      <Text style={styles.date}>{data.dtHr}</Text>

      <View style={styles.content}>
        <Text styles={styles.label}>{data.jogo}</Text>

        {showValue ? (
          <Text style={data.tipo === 1 ? styles.value : styles.expenses}>
            {data.tipo === 1
              ? `R$ ${saldo.toFixed(2)}`
              : `R$ ${saldo.toFixed(2)}`}
          </Text>
        ) : (
          <View style={styles.skeleton}></View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 24,
    borderBottomWidth: 0.5
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 2,
    fontFamily: 'Inter_500Medium'
  },
  date: {
    fontFamily: 'Inter_900Black'
  },
  label: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium'
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#2ecc71'
  },
  expenses: {
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    color: '#e74c3c'
  },
  skeleton: {
    marginTop: 6,
    width: 80,
    height: 10,
    backgroundColor: '#DADADA',
    borderRadius: 8
  }
})
