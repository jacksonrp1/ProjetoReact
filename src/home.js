import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input } from '@rneui/themed'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'

export default function Home({ navigation }) {
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  let [fotsLoaded] = useFonts({
    Inter_900Black
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <Text>Logado</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
