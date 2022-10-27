import { StatusBar } from 'expo-status-bar'
import React, { useState, useContext } from 'react'
import { Button } from '@rneui/themed'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Checkbox from 'expo-checkbox'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'
import ModalTerms from './pages/components/ModalTerms.js'
import querry from './services/querry.js'
import { url } from '../config.js'
import TextInputComp from './pages/components/TextInput.js'
import TextInputMaskComp from './pages/components/TextInputMask.js'
import Genders from './pages/components/Gender.js'
import { AuthContext } from './contexts/auth.js'

export default function SignUp() {
  const [typePass, setTypePass] = useState(true)
  const [Name, setName] = useState(null)
  const [userCPF, setUserCPF] = useState(null)
  const [Genre, setGenre] = useState('')
  const [BirthDate, setBirthDate] = useState(null)
  const [userPhone, setUserPhone] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [authRes, setAuthRes] = useState(false)

  const { ValidateFields } = useContext(AuthContext)

  const [terms, setTerms] = useState(false)
  const [screenTerms, setScreenTerms] = useState(false)

  const [txt, setTxt] = useState(null)

  let regexEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')
  let regexCPF = new RegExp('^([0-9]){3}.([0-9]){3}.([0-9]){3}-([0-9]){2}$')

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <SafeAreaProvider>
      <ScrollView
        contentContainerStyle={{
          minHeight: '100%'
        }}
      >
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.h1Style}>Criar Conta :)</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInputComp label={'Nome'} setValue={setName} />

            <TextInputMaskComp
              label={'CPF'}
              mask={'999.999.999-99'}
              setValue={setUserCPF}
            />

            <Genders value={Genre} setValue={setGenre} />

            <TextInputMaskComp
              label={'Data de Nascimento'}
              mask={'99/99/9999'}
              setValue={setBirthDate}
            />

            <TextInputMaskComp
              label={'Telefone'}
              mask={'(99) 99999-9999'}
              setValue={setUserPhone}
            />

            <TextInputComp label={'E-mail'} setValue={setUserEmail} />

            <TextInputComp label={'Login'} setValue={setUserName} />

            <TextInputComp
              label={'Senha'}
              setValue={setUserPass}
              tipo={typePass}
              display="flex"
            />
          </View>

          <View style={styles.containerCheckBox}>
            <Checkbox
              style={styles.checkBox}
              value={terms}
              onValueChange={setTerms}
              color={terms ? '#F25719' : undefined}
            />
            <Text
              style={{
                fontFamily: 'Inter_300Light',
                textDecorationLine: 'underline'
              }}
              onPress={() => setScreenTerms(true)}
            >
              Li e aceito os termos
            </Text>
          </View>

          <ModalTerms
            screenTermsVisible={screenTerms}
            SetScreenTermsVisible={setScreenTerms}
            setTermBoolean={setTerms}
          />

          <Text
            style={{
              color: !authRes ? '#FF1E00' : '#5FD068',
              fontFamily: 'Inter_500Medium'
            }}
          >
            {txt}
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={styles.btnStyle}
              title="inscrever-se"
              titleStyle={styles.btnTitleStyle}
              onPress={() => {
                if (ValidateField()) {
                  let body = JSON.stringify({
                    name: Name,
                    cpf: userCPF,
                    genero: Genre,
                    birth: BirthDate,
                    phone: userPhone,
                    email: userEmail,
                    username: userName,
                    password: userPass
                  })
                  // querry.addUser(dados).then(user => {
                  //   console.log(user)
                  // })
                  createUser(body)
                }
              }}
            />
          </View>
          <StatusBar style="auto" />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  )
  // Validação de idade
  function ValidadAge(birth) {
    var df = new Date(birth)
    var dt = new Date(formatDataUSA(new Date().toLocaleDateString()))
    var allYears = dt.getFullYear() - df.getFullYear()
    var partialMonths = dt.getMonth() - df.getMonth()
    if (partialMonths < 0) {
      allYears--
      partialMonths = partialMonths + 12
    }
    return allYears < 18 ? false : true
  }
  //formata data para padrão USA
  function formatDataUSA(txt) {
    let day = txt.substring(0, 2)
    let month = txt.substring(3, 5)
    let year = txt.substring(6)
    return year + '/' + month + '/' + day
  }
  function ValidateField() {
    if (Name.length === 0) {
      setTxt('Nome inválido.')
      return false
    } else if (!regexCPF.test(userCPF)) {
      setTxt('CPF inválido.')
      return false
    } else if (Genre.length === 0) {
      setTxt('Sexo inválido.')
      return false
    } else if (BirthDate.length != 10) {
      setTxt('Data de aniversário inválido.')
      return false
    } else if (!ValidadAge(BirthDate)) {
      setTxt('Não aceitamos menores de 18 anos.')
      return false
    } else if (userPhone.length != 15) {
      setTxt('Telefone inválido.')
      return false
    } else if (userEmail.length === 0 || !regexEmail.test(userEmail)) {
      setTxt('E-mail inválido.')
      return false
    } else if (userName.length === 0) {
      setTxt('Login inválido.')
      return false
    } else if (userPass.length === 0) {
      setTxt('Senha inválida.')
      return false
    } else if (!terms) {
      setTxt('É preciso aceitar os termos.')
      return false
    } else {
      setTxt('')
      return true
    }
  }

  async function createUser(body) {
    let req = await fetch(`${url}/cadastro`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: body
    })
    let res = await req
      .json()
      .then(resp => {
        setAuthRes(resp.auth)
        if (resp.auth) {
          ValidateFields(userName, userPass, setTxt)
        } else {
          setTxt(resp.resp)
        }
      })
      .catch(err => {})
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    width: '100%',
    backgroundColor: '#F7F5F2',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 30
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
  },
  containerCheckBox: {
    flexDirection: 'row'
  },
  checkBox: {
    marginRight: 10,
    alignSelf: 'center',
    borderRadius: 25,
    height: 20,
    width: 20,
    borderColor: '#a8a8a8',
    borderWidth: 1,
    color: '#F25719',
    height: 16,
    width: 16,
    marginRight: 5
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
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
