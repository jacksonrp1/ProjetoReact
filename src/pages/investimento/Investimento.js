import React, { useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import Header from '../components/header.js'
import Body from './InvestimentoBody.js'
import Actions from './actions'
import { AuthContext } from '../../contexts/auth.js'
export default function Home() {
  const { saldoUser } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Header />
      <Body saldo={saldoUser.valor} perdas="0" ganhos="0" />
      <Actions />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  }
})
