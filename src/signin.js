import React, { useState, useContext } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button } from '@rneui/themed'
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import { AuthContext } from './contexts/auth.js'
import TextInputComp from './pages/components/TextInput.js'

export default function SignIn({ navigation }) {
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [txt, setTxt] = useState(null)
  const { ValidateFields } = useContext(AuthContext)

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.h1Style}>Bem vindo de volta!</Text>
        <Text style={styles.h4Style}>Digite seu Login e Senha</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInputComp label={'Login'} tipo={false} setValue={setUserName} />

        <TextInputComp
          label={'Senha'}
          tipo={true}
          setValue={setUserPass}
          display="flex"
        />

        <Text
          style={{
            color: '#FF1E00',
            fontFamily: 'Inter_500Medium'
          }}
        >
          {txt}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          buttonStyle={styles.btnStyle}
          title="Conecte-se"
          titleStyle={styles.btnTitleStyle}
          containerStyle={{
            marginBottom: 18
          }}
          onPress={() => {
            ValidateFields(userName, userPass, setTxt)
            // querry.selListUsers().then(user => {
            //   console.log(user)
            // })
          }}
        />
        <Text
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.h2Style}
        >
          Esqueceu a senha?
        </Text>
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
    </KeyboardAvoidingView>
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
    width: '85%'
  },
  h1Style: {
    fontFamily: 'Inter_900Black',
    color: '#F25719',
    fontWeight: '700',
    fontSize: 32
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
  inputContainer: {
    width: '85%'
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
