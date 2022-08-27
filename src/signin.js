import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input } from '@rneui/themed'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'

export default function SignIn({ navigation }) {
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
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
          onChangeText={username => setUserName(username)}
          placeholder="Username"
        />
        <Input
          onChangeText={password => setUserPass(password)}
          placeholder="Password"
        />
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
            if (validationLogin()) {
              navigation.navigate('Home')
            }
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
  function validationLogin() {
    if (userName === null || userName === '') {
      alert('Invalid login.')
      return false
    } else if (userPass === null || userPass === '') {
      alert('Invalid password.')
      return false
    } else if (userName === 'Admin' && userPass === 'Admin') {
      return true
    } else {
      alert('Incorrect login or password')
      return false
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
  }
})
