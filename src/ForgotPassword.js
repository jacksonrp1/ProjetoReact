import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { View, Text, StyleSheet } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import TextInputComp from './pages/components/TextInput.js'
import { url } from '../config.js'

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState()
  const [response, setResponse] = useState('')
  const [auth, setAuth] = useState(false)

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <View style={styles.Mid}>
        <Text style={{ fontFamily: 'Inter_900Black', fontSize: 20 }}>
          Esqueci minha senha
        </Text>
        <View style={styles.inputContainer}>
          <TextInputComp label={'E-mail'} setValue={setEmail} />

          <View>
            <Text
              style={{
                fontFamily: 'Inter_500Medium',
                color: auth ? '#5FD068' : '#FF1E00',
                textAlign: 'center'
              }}
            >
              {response}
            </Text>
          </View>
        </View>
        <Button
          buttonStyle={styles.btnStyle}
          title="Continuar"
          titleStyle={styles.btnTitleStyle}
          containerStyle={{
            marginBottom: 18
          }}
          onPress={() => {
            if (email !== null) {
              resetPassword()
            }
          }}
        />
      </View>
    </View>
  )
  async function resetPassword() {
    const req = await fetch(`${url}/forgotPassword`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ email: email })
    })
    const res = await req.json().then(resp => {
      setAuth(resp.auth)
      setResponse(resp.res)
      if (resp.auth) {
        navigation.navigate('ReplacePassword')
      }
    })
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  Mid: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '50%',
    width: '85%'
  },
  inputContainer: {
    width: '100%'
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
