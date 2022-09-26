import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Button, Icon } from '@rneui/themed'
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet
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
import { AntDesign } from '@expo/vector-icons'
import { MaskedTextInput } from 'react-native-mask-text'

export default function SignUp() {
  // ------------para trocar o tipo da senha para text
  const [typePass, setTypePass] = useState(true)
  const [eye, setEye] = useState('eye-off')
  // ------------para pegar os dados para cadastro
  const [Name, setName] = useState(null)
  const [userCPF, setUserCPF] = useState(null)
  const [GenreM, setSelectedGenreM] = useState(false)
  const [GenreF, setSelectedGenreF] = useState(false)
  const [BirthDate, setBirthDate] = useState(null)
  const [userPhone, setUserPhone] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userName, setUserName] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [Label, setLabel] = useState([
    { size: 14, top: '25%', left: 20 },
    { size: 14, top: '25%', left: 20 },
    { size: 14, top: '25%', left: 20 },
    { size: 14, top: '25%', left: 20 },
    { size: 14, top: '25%', left: 20 },
    { size: 14, top: '25%', left: 20 },
    { size: 14, top: '25%', left: 20 }
  ])

  //Modal
  const [terms, setTerms] = useState(false)
  const [screenTerms, setScreenTerms] = useState(false)
  //validação
  const [txt, setTxt] = useState(null)
  const [color, setColor] = useState('#FF1E00')

  // VALIDAÇÃO EMAIL
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
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{
          minHeight: '100%'
        }}
      >
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.h1Style}>Criar Conta :)</Text>
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
                Nome
              </Text>
              <TextInput
                style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
                placeholderTextColor="#a8a8a8"
                placeholder=""
                onChangeText={name => {
                  setName(name)
                  StyleLabel(name, 0)
                }}
                value={Name}
              />
            </View>

            <View style={[styles.Input]}>
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
                CPF
              </Text>
              <MaskedTextInput
                style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
                mask="999.999.999-99"
                placeholder=""
                placeholderTextColor="#a8a8a8"
                onChangeText={(cpf, rawText) => {
                  setUserCPF(cpf)
                  StyleLabel(cpf, 1)
                  //setUserCPF(rawText) para pegar o valor sem mascara
                }}
                // style={styles.input}
                keyboardType="numeric"
                value={userCPF}
              />
            </View>
            <View
              style={[
                {
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  paddingVertical: Platform.OS === 'ios' ? 11 : 8
                },
                styles.Input
              ]}
            >
              <Text
                style={{
                  position: 'absolute',
                  color: '#a8a8a8',
                  backgroundColor: '#F7F5F2',
                  top: -10,
                  left: 20,
                  fontSize: 12,
                  fontFamily: 'Inter_500Medium'
                }}
              >
                Sexo
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Checkbox
                  style={[
                    styles.checkBox,
                    { height: 16, width: 16, marginRight: 5 }
                  ]}
                  onValueChange={() => {
                    setSelectedGenreM(true)
                    setSelectedGenreF(false)
                  }}
                  value={GenreM}
                  color={GenreM ? '#F25719' : undefined}
                />
                <Text
                  onPress={() => {
                    setSelectedGenreM(true)
                    setSelectedGenreF(false)
                  }}
                  style={{ fontFamily: 'Inter_300Light', fontSize: 14 }}
                >
                  Masculino
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Checkbox
                  style={[
                    styles.checkBox,
                    { height: 16, width: 16, marginRight: 5 }
                  ]}
                  onValueChange={() => {
                    setSelectedGenreF(true)
                    setSelectedGenreM(false)
                  }}
                  value={GenreF}
                  color={GenreF ? '#F25719' : undefined}
                />
                <Text
                  onPress={() => {
                    setSelectedGenreF(true)
                    setSelectedGenreM(false)
                  }}
                  style={{ fontFamily: 'Inter_300Light', fontSize: 14 }}
                >
                  Feminino
                </Text>
              </View>
            </View>

            <View style={[styles.Input]}>
              <Text
                style={{
                  position: 'absolute',
                  color: '#a8a8a8',
                  backgroundColor: '#F7F5F2',
                  top: Label[2].top,
                  left: Label[2].left,
                  fontSize: Label[2].size,
                  fontFamily: 'Inter_500Medium'
                }}
              >
                Data de Nascimento
              </Text>

              <MaskedTextInput
                style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
                placeholderTextColor="#a8a8a8"
                mask="99/99/9999"
                placeholder=""
                onChangeText={(Birth, rawText) => {
                  setBirthDate(Birth)
                  StyleLabel(Birth, 2)
                  //setUnmaskedValue(rawText) para pegar o valor sem mascara
                }}
                // style={styles.input}
                keyboardType="numeric"
                value={BirthDate}
              />
            </View>

            <View style={[styles.Input]}>
              <Text
                style={{
                  position: 'absolute',
                  color: '#a8a8a8',
                  backgroundColor: '#F7F5F2',
                  top: Label[3].top,
                  left: Label[3].left,
                  fontSize: Label[3].size,
                  fontFamily: 'Inter_500Medium'
                }}
              >
                Telefone
              </Text>

              <MaskedTextInput
                style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
                placeholderTextColor="#a8a8a8"
                mask="(99) 99999-9999"
                placeholder=""
                onChangeText={phone => {
                  setUserPhone(phone)
                  StyleLabel(phone, 3)
                }}
                keyboardType="numeric"
                value={userPhone}
              />
            </View>

            <View style={[styles.Input]}>
              <Text
                style={{
                  position: 'absolute',
                  color: '#a8a8a8',
                  backgroundColor: '#F7F5F2',
                  top: Label[4].top,
                  left: Label[4].left,
                  fontSize: Label[4].size,
                  fontFamily: 'Inter_500Medium'
                }}
              >
                E-mail
              </Text>

              <TextInput
                style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
                placeholderTextColor="#a8a8a8"
                placeholder=""
                onChangeText={email => {
                  setUserEmail(email)
                  StyleLabel(email, 4)
                }}
                value={userEmail}
              />
            </View>

            <View style={[styles.Input]}>
              <Text
                style={{
                  position: 'absolute',
                  color: '#a8a8a8',
                  backgroundColor: '#F7F5F2',
                  top: Label[5].top,
                  left: Label[5].left,
                  fontSize: Label[5].size,
                  fontFamily: 'Inter_500Medium'
                }}
              >
                Login
              </Text>

              <TextInput
                style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
                placeholderTextColor="#a8a8a8"
                placeholder=""
                onChangeText={username => {
                  setUserName(username)
                  StyleLabel(username, 5)
                }}
                value={userName}
              />
            </View>

            <View style={[styles.Input]}>
              <Text
                style={{
                  position: 'absolute',
                  color: '#a8a8a8',
                  backgroundColor: '#F7F5F2',
                  top: Label[6].top,
                  left: Label[6].left,
                  fontSize: Label[6].size,
                  fontFamily: 'Inter_500Medium'
                }}
              >
                Senha
              </Text>
              <TextInput
                style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
                placeholderTextColor="#a8a8a8"
                placeholder=""
                secureTextEntry={typePass}
                onChangeText={password => {
                  setUserPass(password)
                  StyleLabel(password, 6)
                }}
                value={userPass}
              />

              <View
                style={{
                  position: 'absolute',
                  right: 10,
                  top: 9,
                  zIndex: 1
                }}
              >
                <Icon
                  type="feather"
                  size={22}
                  name={eye}
                  onPress={() => validationTypePass()}
                />
              </View>
            </View>
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
          {/* MOTAL TERMO */}
          <ModalTerms
            screenTermsVisible={screenTerms}
            SetScreenTermsVisible={setScreenTerms}
            setTermBoolean={setTerms}
          />
          {/* TEXT PARA VALIDAÇÃO */}
          <Text
            style={{
              color: color,
              fontFamily: 'Inter_500Medium'
            }}
            value={txt}
          >
            {txt}
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              buttonStyle={{ backgroundColor: '#F25719', borderRadius: 25 }}
              title="inscrever-se"
              titleStyle={{
                fontFamily: 'Inter_900Black',
                fontSize: 23,
                marginHorizontal: 51
              }}
              onPress={() => {
                if (ValidateFields()) {
                  createUser(
                    JSON.stringify({
                      name: Name,
                      cpf: userCPF,
                      genero: GenreM ? 'Masculino' : 'Feminino',
                      birth: BirthDate,
                      phone: userPhone,
                      email: userEmail,
                      username: userName,
                      password: userPass
                    })
                  )
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  )
  //style title label
  function StyleLabel(input, index) {
    if (input === '' || input === null) {
      Label[index].top = '25%'
      Label[index].size = 14
    } else {
      Label[index].top = -10
      Label[index].size = 12
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
  function ValidateFields() {
    if (Name == null || Name == '') {
      setTxt('Nome inválido.')
      return false
    } else if (!regexCPF.test(userCPF)) {
      setTxt('CPF inválido.')
      return false
    } else if (!GenreF && !GenreM) {
      setTxt('Sexo inválido.')
      return false
    } else if (BirthDate.length != 10) {
      setTxt('Data de aniversário inválido.')
      return false
    } else if (!ValidadAge(BirthDate)) {
      setTxt('Não aceitamos menores de 18 anos.')
      return false
    } else if (userPhone == null || userEmail == '' || userPhone.length != 15) {
      setTxt('Telefone inválido.')
      return false
    } else if (
      userEmail == null ||
      userEmail == '' ||
      !regexEmail.test(userEmail)
    ) {
      setTxt('E-mail inválido.')
      return false
    } else if (userName == null || userName == '') {
      setTxt('Login inválido.')
      return false
    } else if (userPass == null || userPass == '') {
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
    let res = await req.json()
    validationRegistration(res)
  }
  function validationRegistration(response) {
    if (response.bol == true) {
      setColor('#5FD068')
      setTxt(response.resp)

      setName(null)
      setUserCPF(null)
      setSelectedGenreM(false)
      setSelectedGenreF(false)
      setBirthDate(null)
      setUserPhone(null)
      setUserEmail(null)
      setUserName(null)
      setUserPass(null)
      setTerms(false)
    } else if (response.bol == false) {
      setColor('#FF1E00')
      setTxt(response.resp)
    }
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
    color: '#F25719'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center'
  },
  Input: {
    // height: 42,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#a8a8a8',
    paddingHorizontal: 20
  }
})
