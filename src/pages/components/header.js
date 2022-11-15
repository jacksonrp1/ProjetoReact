import React, { useState, useContext } from 'react'

import {
  View,
  Text,
  Image,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

import { AuthContext } from '../../contexts/auth'
import { Entypo } from '@expo/vector-icons'

const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64

export default function Header() {
  const { dadosUser, saldoUser } = useContext(AuthContext)
  const [showValue, setShowValue] = useState(false)
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
      <View style={styles.content}>
        <View>
          <Text style={styles.username}>{`Olá ${dadosUser.nome}`}</Text>

          <View style={styles.wallet}>
            <Entypo
              onPress={() => {
                setShowValue(!showValue)
              }}
              name="wallet"
              size={26}
              color="#fff"
            />

            <Text style={styles.dinheiro}>
              R$ {showValue ? saldoUser.valor : '****'}
            </Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser}>
          <Image
            style={styles.ImageBigHead}
            source={require('../perfil/bighead.jpg')}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 30,
    backgroundColor: '#d65a31'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50
  },
  username: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Inter_500Medium'
  },
  wallet: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginRight: 14
  },
  dinheiro: {
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter_900Black',
    color: '#fff'
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2
  },
  ImageBigHead: {
    height: 50,
    width: 50,
    borderRadius: 50
  }
})
