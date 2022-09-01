import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Icon } from '@rneui/themed'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'

export default function SignIn({ navigation }) {
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [txt, setTxt] = useState(null)
  const [typePass, setTypePass] = useState(true)
  const [eye, setEye] = useState('eye-off')
  const [msg, setMsg] = useState(null)

  let [fotsLoaded] = useFonts({
    Inter_900Black
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1Style}>Welcome Back!</Text>
        <Text style={styles.h4Style}>Enter Your Username & Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={username => {
            if (username === '' || username === null) {
              setTxt('')
            }
            setUserName(username)
          }}
          placeholder="Username"
        />
        <View style={styles.pass}>
          <Input
            onChangeText={password => {
              if (password === '' || password === null) {
                setTxt('')
              }
              setUserPass(password)
            }}
            placeholder="Password"
            secureTextEntry={typePass}
          />
          <View style={{ position: 'absolute', right: 10, top: 10, zIndex: 1 }}>
            <Icon
              type="feather"
              name={eye}
              onPress={() => validationTypePass()}
            />
          </View>
        </View>
        {txt}
        {/* <Text style={{ color: '#FF1E00', fontWeight: 'bold' }}>{txt}</Text> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ backgroundColor: '#F25719', borderRadius: 25 }}
          title="LOGIN"
          titleStyle={{ fontWeight: '500', fontSize: 23, marginHorizontal: 51 }}
          containerStyle={{
            width: 229,
            marginBottom: 18
          }}
          onPress={() => {
            validationUser()
          }}
        />
        <Text style={styles.h2Style}>Forgotten Passwoard?</Text>
        <Text
          onPress={() => {
            navigation.navigate('SignUp')
          }}
          style={styles.h5Style}
        >
          Or Create a New Account
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  )
  async function validationUser() {
    let req = await fetch(`http://192.168.1.100:8000/login`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: userName,
        password: userPass
      })
    })
    let res = await req.json()
    if (validationLogin(res)) {
      navigation.navigate('Home')
    }
  }
  //Validação de login basica - provisório
  function validationLogin(res) {
    if (userName === null || userName === '') {
      setTxt(
        <Text style={{ color: '#FF1E00', fontWeight: 'bold' }}>
          Invalid login.
        </Text>
      )
      return false
    } else if (userPass === null || userPass === '') {
      setTxt(
        <Text style={{ color: '#FF1E00', fontWeight: 'bold' }}>
          Invalid password.
        </Text>
      )
      return false
    } else if (res.bol) {
      setTxt(
        <Text style={{ color: '#5FD068', fontWeight: 'bold' }}>{res.res}</Text>
      )
      return true
    } else if (!res.bol) {
      setTxt(
        <Text style={{ color: '#FF1E00', fontWeight: 'bold' }}>{res.res}</Text>
      )
      return false
    }
  }
  //Validação para trocar o tipo do password para tipo texto e trocar icone do eye
  function validationTypePass() {
    if (typePass) {
      setTypePass(false)
      setEye('eye')
    } else {
      setTypePass(true)
      setEye('eye-off')
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  headerContainer: {
    width: '85%'
  },
  h1Style: {
    fontFamily: 'Inter_900Black',
    color: '#F25719',
    fontWeight: '700',
    fontSize: 32
  },
  inputContainer: {
    width: '85%'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  h4Style: {
    fontFamily: 'Inter_900Black',
    fontSize: 18,
    fontWeight: '200'
  },
  h2Style: {
    fontFamily: 'Inter_900Black',
    color: 'gray',
    fontSize: 15
  },
  h5Style: {
    fontFamily: 'Inter_900Black',
    color: '#F25719',
    fontWeight: '400',
    fontSize: 18
  },
  validationLoginTxt: {
    color: 'red',
    fontFamily: 'Inter_900Black'
    // display: 'none'
  }
})
