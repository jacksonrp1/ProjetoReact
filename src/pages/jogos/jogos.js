import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'
import AppIntroSlider from 'react-native-app-intro-slider'
import Header from '../components/header.js'

const imgSlides = [
  {
    key: 1,
    title: 'Roleta',
    text: 'Jogue Agora!',
    image: require('./img/roulette.jpg')
  },
  {
    key: 2,
    title: 'BlackJack',
    text: 'Jogue Agora!',
    image: require('./img/21.jpg')
  },
  {
    key: 3,
    title: 'Dados',
    text: 'Jogue Agora!',
    image: require('./img/dados.jpg')
  }
]
// estilo de components
export default function Jogos() {
  function renderSlides({ item }) {
    return (
      <View style={{ flex: 1, marginTop: '10%' }}>
        <Image
          source={item.image}
          style={{
            resizeMode: 'cover',
            height: '70%',
            width: '100%'
          }}
        />
        <Text style={styles.playNow}>{item.title}</Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.playNow, { fontSize: 20 }]}>{item.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }
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
      <Header />
      <AppIntroSlider
        renderItem={renderSlides}
        data={imgSlides}
        activeDotStyle={{
          backgroundColor: '#d65a31',
          width: 40,
          height: 10
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  playNow: {
    fontSize: 40,
    fontFamily: 'Inter_900Black',
    color: '#d65a31',
    textAlign: 'center'
  }
})
