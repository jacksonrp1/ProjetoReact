import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'
import TextInputComp from '../components/TextInput.js'
import { AuthContext } from '../../contexts/auth.js'
import { AntDesign } from '@expo/vector-icons'
import { useState, useContext } from 'react'
import { url } from '../../../config.js'
import { Button } from '@rneui/themed'

export default function Actions() {
  const [saqueDeposito, setatualizarsaqueDeposito] = useState('Depositar')
  const [atualizarValor, setatualizarValor] = useState('')
  const { dadosUser, getSaldo } = useContext(AuthContext)
  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <ScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setatualizarsaqueDeposito('Depositar')
          }}
        >
          <View style={styles.areaButton}>
            <AntDesign name="addfolder" size={26} color="#000" />
          </View>
          <Text style={styles.labelButton}>Deposito</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            setatualizarsaqueDeposito('Saque')
          }}
        >
          <View style={styles.areaButton}>
            <AntDesign name="tagso" size={26} color="#000" />
          </View>
          <Text style={styles.labelButton}>Saque</Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ marginHorizontal: 10, paddingTop: 50 }}>
          <TextInputComp
            setValue={setatualizarValor}
            label={saqueDeposito == 'Depositar' ? 'Depositar' : 'Sacar'}
            teclado={'numeric'}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.btnStyle}
            titleStyle={styles.btnTitleStyle}
            containerStyle={{
              marginBottom: 18,
              marginTop: 20
            }}
            title={saqueDeposito == 'Depositar' ? 'Depositar' : 'Sacar'}
            onPress={() => {
              atualizarCarteira(
                dadosUser.id,
                saqueDeposito == 'Depositar' ? atualizarValor : -atualizarValor
              )
              getSaldo(dadosUser.id)
            }}
          />
        </View>
      </View>
    </ScrollView>
  )

  async function atualizarCarteira(idUser, ValorCart) {
    let req = await fetch(`${url}/financeiro`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        vlrSaldo: ValorCart,
        id: idUser
      })
    })
    let res = await req.json()
    getSaldo(dadosUser.id)
    alert(res.resp)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 100,
    marginVertical: 14,
    paddingHorizontal: 14
  },
  actionButton: {
    alignItems: 'center',
    margin: 10
  },
  areaButton: {
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 30,
    height: 60,
    width: 60,
    justifyContent: 'center'
  },
  labelButton: {
    marginTop: 4,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  buttonContainer: {
    justifyContent: 'center',
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
    paddingHorizontal: 30
  }
})
