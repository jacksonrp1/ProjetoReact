import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import { Button } from '@rneui/themed'
import TextInputComp from './pages/components/TextInput.js'
import { url } from '../config.js'

export default function ReplacePassword({ navigation }) {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [typePass, setTypePass] = useState(true)
  const [response, setResponse] = useState('')

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mude sua senha</Text>
      <View style={styles.inputContainer}>
        <TextInputComp label={'Token'} setValue={setToken} />

        <TextInputComp
          label={'Senha'}
          setValue={setPassword}
          tipo={typePass}
          display="flex"
        />
        <Text
          style={{
            fontFamily: 'Inter_500Medium',
            color: '#FF1E00',
            textAlign: 'center'
          }}
        >
          {response}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Confirmar"
            buttonStyle={styles.btnStyle}
            titleStyle={styles.btnTitleStyle}
            containerStyle={{
              marginBottom: 18
            }}
            onPress={() => {
              ReplacePass()
            }}
          />
        </View>
      </View>
    </View>
  )
  async function ReplacePass() {
    const req = await fetch(`${url}/replacePassword`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'x-access-token': token
      },
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({ password, token })
    })
    const res = await req.json().then(resp => {
      if (resp.auth) {
        setResponse('')
        navigation.navigate('SignIn')
      } else {
        setResponse('Token inválido.')
      }
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontFamily: 'Inter_900Black',
    fontSize: 20,
    marginBottom: 20
  },
  inputContainer: {
    width: '85%'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20
  },
  btnStyle: {
    backgroundColor: '#F25719',
    borderRadius: 25,
    paddingHorizontal: 25
  },
  btnTitleStyle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 23,
    marginHorizontal: 51
  }
})
