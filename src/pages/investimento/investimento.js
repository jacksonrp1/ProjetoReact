import React, { useState, Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, TabView, Tab } from '@rneui/themed'
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

export default function Investimento() {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
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
