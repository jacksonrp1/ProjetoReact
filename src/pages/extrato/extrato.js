import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import Header from '../components/header.js'
import ExtratoBody from './ExtratoBody.js'
import Movimentacao from './Movimentacao.js'
import { AuthContext } from '../../contexts/auth.js'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'
export default function Home() {
  const { extratoUser } = useContext(AuthContext)
  var ganho = () => {
    let total = 0
    extratoUser.forEach(item => {
      total += parseFloat(item.vlrGanho) - parseFloat(item.vlrAposta)
    })
    return total.toFixed(2)
  }
  var saida = () => {
    let total = 0
    extratoUser.forEach(item => {
      total += parseFloat(item.vlrAposta)
    })
    return total.toFixed(2)
  }
  var entrada = () => {
    let total = 0
    extratoUser.forEach(item => {
      total += parseFloat(item.vlrGanho)
    })
    return total.toFixed(2)
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

      <ExtratoBody
        style={{ fontSize: 'Inter_900Black' }}
        saldo={ganho().toString()}
        perdas={saida().toString()}
        ganhos={entrada().toString()}
      />

      <Text style={styles.title}>Movimentação</Text>

      <FlatList
        style={styles.list}
        data={extratoUser}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Movimentacao data={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  title: {
    fontSize: 18,
    fontFamily: 'Inter_900Black',
    margin: 14,
    textAlign: 'center'
  },
  list: {
    marginHorizontal: 14
  }
})
