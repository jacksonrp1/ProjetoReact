import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default function Wallet() {
  return (
    <View style={styles.container}>
      <Text>Wallet</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1'
  }
})
