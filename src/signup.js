import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Button, Input, Icon } from '@rneui/themed'
import { View, Text, StyleSheet } from 'react-native'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
export default function SignUp() {
  // ------------para trocar o tipo da senha para text
  const [typePass, setTypePass] = useState(true)
  const [eye, setEye] = useState('eye-off')
  // ------------para pegar os dados para cadastro
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
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
        <Text style={styles.h1Style}>Create Account :)</Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder={'Enter Email Id'}
          onChangeText={email => {
            setUserEmail(email)
          }}
        />

        <Input
          placeholder={'Create Username'}
          onChangeText={username => {
            setUserName(username)
          }}
        />

        <View>
          <Input
            placeholder="Password"
            secureTextEntry={typePass}
            onChangeText={password => {
              setUserPass(password)
            }}
          />

          <View style={{ position: 'absolute', right: 10, top: 10, zIndex: 1 }}>
            <Icon
              type="feather"
              name={eye}
              onPress={() => validationTypePass()}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ backgroundColor: '#F25719', borderRadius: 25 }}
          title="Sign Up"
          titleStyle={{ fontWeight: '500', fontSize: 23, marginHorizontal: 51 }}
          containerStyle={{
            width: 229,
            marginBottom: 18
          }}
          onPress={() => {
            createUser(
              JSON.stringify({
                username: userName,
                password: userPass,
                email: userEmail
              })
            )
          }}
        />
      </View>
    </View>
  )
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
  async function createUser(user) {
    let req = await fetch(`http://192.168.1.100:8000/cadastro`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: user
    })
    let res = await req.text()
    console.log(res)
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
