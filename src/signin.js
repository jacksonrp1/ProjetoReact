import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Icon } from '@rneui/themed'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

export default function SignIn({ navigation }) {
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [typePass, setTypePass] = useState(true)
  const [eye, setEye] = useState('eye-off')
  const [txt, setTxt] = useState(null)
  const [color, setColor] = useState('#FF1E00')
  const [Label, setLabel] = useState([
    { size: 14, top: '25%', left: 20 },
    { size: 14, top: '25%', left: 20 }
  ])

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
      <View style={styles.headerContainer}>
        <Text style={styles.h1Style}>Bem vindo de volta!</Text>
        <Text style={styles.h4Style}>Digite seu Login e Senha</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={[styles.Input]}>
          <Text
            style={{
              position: 'absolute',
              color: '#a8a8a8',
              backgroundColor: '#F7F5F2',
              top: Label[0].top,
              left: Label[0].left,
              fontSize: Label[0].size,
              fontFamily: 'Inter_500Medium'
            }}
          >
            Login
          </Text>
          <TextInput
            style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
            onChangeText={username => {
              setUserName(username)
              StyleLabel(username, 0)
            }}
            placeholder=""
            placeholderTextColor="#a8a8a8"
          />
        </View>
        <View style={styles.Input}>
          <Text
            style={{
              position: 'absolute',
              color: '#a8a8a8',
              backgroundColor: '#F7F5F2',
              top: Label[1].top,
              left: Label[1].left,
              fontSize: Label[1].size,
              fontFamily: 'Inter_500Medium'
            }}
          >
            Senha
          </Text>
          <TextInput
            style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
            onChangeText={password => {
              setUserPass(password)
              StyleLabel(password, 1)
            }}
            placeholder=""
            placeholderTextColor="#a8a8a8"
            secureTextEntry={typePass}
          />
          <View style={{ position: 'absolute', right: 10, top: 8, zIndex: 1 }}>
            <Icon
              type="feather"
              name={eye}
              onPress={() => validationTypePass()}
            />
          </View>
        </View>
        {/* TEXT PARA VALIDAÇÃO */}
        <Text style={{ color: color, fontWeight: 'bold' }} value={txt}>
          {txt}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={{ backgroundColor: '#F25719', borderRadius: 25 }}
          title="Conecte-se"
          titleStyle={{ fontWeight: '500', fontSize: 23, marginHorizontal: 51 }}
          containerStyle={{
            marginBottom: 18
          }}
          onPress={() => {
            if (ValidateFields()) {
              validationUser()
            }
          }}
        />
        <Text style={styles.h2Style}>Esqueceu a senha?</Text>
        <Text
          onPress={() => {
            navigation.navigate('SignUp')
          }}
          style={styles.h5Style}
        >
          Ou crie uma nova conta
        </Text>
      </View>

      <StatusBar style="auto" />
    </View>
  )
  //style title label
  function StyleLabel(input, index) {
    if (input === '' || input === null) {
      setTxt('')
      Label[index].top = '25%'
      Label[index].size = 14
    } else {
      Label[index].top = -10
      Label[index].size = 12
    }
  }
  function ValidateFields() {
    if (userName == '' || userName == null) {
      setTxt('Informe o Login.')
      return false
    } else if (userPass == '' || userPass == null) {
      setTxt('Informe a Senha.')
      return false
    } else {
      return true
    }
  }
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
      // INTERVALO PARA DAR TEMPO DE LER A MSG DE "LOGADO COM SUCESSO"
      // setInterval(() => {
      navigation.navigate('Routes')
      // }, 2000)
      // clearInterval()
    }
  }
  //Validação de login
  function validationLogin(res) {
    if (userName === null || userName === '') {
      setTxt(
        <Text style={{ color: '#FF1E00', fontWeight: 'bold' }}>
          Login inválido.
        </Text>
      )
      return false
    } else if (userPass === null || userPass === '') {
      setTxt(
        <Text style={{ color: '#FF1E00', fontWeight: 'bold' }}>
          Senha inválida.
        </Text>
      )
      return false
    } else if (res.bol) {
      setColor('#5FD068')
      setTxt(res.res)
      return true
    } else if (!res.bol) {
      setTxt(res.res)
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
  },
  Input: {
    // height: 42,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#a8a8a8',
    paddingHorizontal: 20,
    width: '100%'
  }
})
