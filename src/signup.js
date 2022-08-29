import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, Input } from '@rneui/themed'
import { View, Text, StyleSheet } from 'react-native'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'

export default function SignUp() {

  let [fotsLoaded] = useFonts({
    Inter_900Black
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1Style}>Cria sua Conta :)</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input placeholder={'Insira seu E-mail'} />
        <Input placeholder={'Crie um Usuário'} />
        <Input placeholder={'Insira o Número de Celular'}/>
        <Input placeholder={'Crie sua Senha'} /> 
        <Input placeholder={'Confirme sua Senha'} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ backgroundColor: '#F25719', borderRadius: 25 }}
          title="Finalizar"
          titleStyle={{ fontWeight: '500', fontSize: 23, marginHorizontal: 51 }}
          containerStyle={{
            width: 229,
            marginBottom: 18
          }}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  headerContainer: {
    justifyContent: 'flex-start'
  },
  h1Style: {
    fontFamily: 'Inter_900Black',
    color: '#F25719',
    fontWeight: '700',
    fontSize: 32
  },
  inputContainer: {
    width: '85%'
  }
})
