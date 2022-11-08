import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import querry from '../../services/querry.js'
import storage from '../../services/storage.js'
import { AuthContext } from '../../contexts/auth.js'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

// IMPORT ICONS
import { FontAwesome5, Fontisto } from '@expo/vector-icons'

export default function Profile() {
  const [userOnline, setUserOnline] = useState([])
  const [userId, setUserId] = useState(null)
  const { dadosUser, navigation } = useContext(AuthContext)

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
      <View style={styles.containerPerfil}>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <View style={styles.ViewHeader2}>
            <Image
              style={styles.ImageBigHead}
              source={require('./bighead.jpg')}
            />
          </View>
          <Text
            style={[
              styles.valuesText,
              { color: '#323232', paddingVertical: 15 }
            ]}
          >{`Olá ${dadosUser.nome}, \nseja bem-vindo(a)!`}</Text>
        </View>
        <View style={styles.ViewMidDadosUser}>
          <View style={styles.values}>
            <Fontisto name="email" size={20} color={'#ffffff'} />
            <Text style={styles.valuesText}>{dadosUser.email}</Text>
          </View>
          <View style={styles.values}>
            <Fontisto name="phone" size={20} color={'#ffffff'} />
            <Text style={styles.valuesText}>{dadosUser.celular}</Text>
          </View>
          <View style={styles.values}>
            <FontAwesome5 name="id-card" size={20} color={'#ffffff'} />
            <Text style={styles.valuesText}>{dadosUser.cpf}</Text>
          </View>
        </View>
        <View style={styles.ButtonView1}>
          <View style={styles.ButtonView2}>
            <Text
              style={styles.ButtonText}
              onPress={() => {
                navigation.navigate('SignIn')
              }}
            >
              Sair
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d65a31'
  },
  values: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#323232',
    marginVertical: 5,
    padding: 5,
    borderRadius: 3,
    width: '90%'
  },
  valuesText: {
    paddingLeft: 10,
    color: '#ffffff',
    fontFamily: 'Inter_500Medium'
  },
  containerPerfil: {
    height: '70%',
    width: '90%',
    backgroundColor: '#f1f1f1',
    borderRadius: 15,
    justifyContent: 'space-evenly',
    borderColor: 'black',
    borderWidth: 1
  },
  ViewHeader2: {
    borderWidth: 10,
    borderColor: '#323232',
    borderRadius: 100
  },
  ImageBigHead: {
    height: 100,
    width: 100,
    borderRadius: 100
  },
  ViewMidDadosUser: {
    alignItems: 'flex-start',
    width: '100%',
    alignItems: 'center'
  },
  ButtonView1: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  ButtonView2: {
    backgroundColor: '#d65a31',
    borderRadius: 25
  },
  ButtonText: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    color: '#ffffff',
    fontFamily: 'Inter_500Medium'
  }
})
