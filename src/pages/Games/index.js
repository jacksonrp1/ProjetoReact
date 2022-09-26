import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Games() {
  return (
    <View style={styles.container}>
      <Text>Games</Text>
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
