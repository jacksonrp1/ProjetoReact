import React, { useState, Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, TabView, Tab } from '@rneui/themed'
import { View, Text, Image, StyleSheet, Alert } from 'react-native'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'

export default function Home({ navigation }) {
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [index, setIndex] = useState(0)
  let [fotsLoaded] = useFonts({
    Inter_900Black
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <>
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.container}>
          <Image style={styles.logo} source={require('./img/banner.jpg')} />
        </TabView.Item>
        <TabView.Item style={styles.container}>
          <Text h1>Jogos</Text>
        </TabView.Item>
        <TabView.Item style={styles.container}>
          <Text h1>Carteira</Text>
        </TabView.Item>
        <TabView.Item style={styles.container}>
          <Text h1>Perfil</Text>
        </TabView.Item>
      </TabView>
      <Tab
        value={index}
        onChange={e => setIndex(e)}
        indicatorStyle={{
          backgroundColor: '#FFFFFF',
          height: 3
        }}
        variant="primary"
      >
        <Tab.Item
          title="Home"
          titleStyle={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}
          icon={{
            name: 'home-sharp',
            size: 25,
            type: 'ionicon',
            color: 'black'
          }}
          buttonStyle={active => ({
            backgroundColor: active ? '#D64C15' : '#F25719',
            paddingBottom: 25
          })}
        />
        <Tab.Item
          title="Jogos"
          titleStyle={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}
          icon={{
            name: 'md-game-controller',
            size: 25,
            type: 'ionicon',
            color: 'black'
          }}
          buttonStyle={active => ({
            backgroundColor: active ? '#D64C15' : '#F25719',
            paddingBottom: 25
          })}
        />
        <Tab.Item
          title="Carteira"
          titleStyle={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}
          icon={{ name: 'wallet', size: 25, type: 'ionicon', color: 'black' }}
          buttonStyle={active => ({
            backgroundColor: active ? '#D64C15' : '#F25719',
            paddingBottom: 25
          })}
        />
        <Tab.Item
          title="Perfil"
          titleStyle={{ fontSize: 12, color: 'black', fontWeight: 'bold' }}
          icon={{
            name: 'ios-person',
            size: 25,
            type: 'ionicon',
            color: 'black'
          }}
          buttonStyle={active => ({
            backgroundColor: active ? '#D64C15' : '#F25719',
            paddingBottom: 25
          })}
        />
      </Tab>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 300,
    borderRadius: 15
  }
})
