import { View, Text, TextInput, StyleSheet, Platform } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/auth.js'
import { Button } from '@rneui/themed'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import BotaoRoleta from './ButtonRoleta.js'
import { url } from '../../../config.js'

var result = -1
const PegaNumero = num => {
  result = parseInt(num)
}
const CarteiraRoleta = () => {
  const { dadosUser, getExtrato, saldoUser, getSaldo } = useContext(AuthContext)
  const [valorApostado, setValorApostado] = useState(0)
  const [carteira, setCarteira] = useState(saldoUser.valor)
  const [bloquear, setBloquear] = useState(true)
  const [valorAposta, setValorAposta] = useState(0)
  // ---Carteira
  const [nmr, setNmr] = useState(null)
  const colors = { red: '#921', black: '#000', green: '#161' }
  const [res, setRes] = useState('')

  // -------------
  const resultCarteira = (carteira, aposta, multiplicador, userId) => {
    let resultAposta = parseFloat(aposta) * multiplicador

    let dados = {
      id: userId,
      vlrAposta: aposta,
      vlrGanho: resultAposta,
      vlrSaldo: aposta > resultAposta ? aposta * -1 : resultAposta - aposta
    }
    return dados
  }
  const Grava = async dados => {
    if (dados !== '') {
      const options = {
        cache: 'default',
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(dados)
      }
      const reqRodadas = await fetch(`${url}/rodadas`, options)
      const resRodadas = await reqRodadas.json()
      console.log(resRodadas.resp)

      let reqFinanceiro = await fetch(`${url}/financeiro`, options)
      let resFinanceiro = await reqFinanceiro.json()
      console.log(resFinanceiro.resp)

      getSaldo(dadosUser.id)

      getExtrato(dadosUser.id)
    }
  }
  useEffect(() => {
    if (nmr !== null) {
      let dados = {}
      let res = 'você perdeu'

      if (nmr.length == 12) {
        nmr.forEach(numero => {
          if (numero == result) {
            dados = resultCarteira(carteira, valorAposta, 3, dadosUser.id)
            res = 'você ganhou'
          }
        })
        if (res != 'você ganhou') {
          dados = resultCarteira(carteira, valorAposta, 0, dadosUser.id)
        }
      } else if (nmr.length > 12) {
        nmr.forEach(numero => {
          if (numero == result) {
            dados = resultCarteira(carteira, valorAposta, 2, dadosUser.id)
            res = 'você ganhou'
          }
        })
        if (res != 'você ganhou') {
          dados = resultCarteira(carteira, valorAposta, 0, dadosUser.id)
        }
      } else if (nmr) {
        if (nmr == result) {
          dados = resultCarteira(carteira, valorAposta, 35, dadosUser.id)
        } else {
          dados = resultCarteira(carteira, valorAposta, 0, dadosUser.id)
        }
      } else {
        dados = resultCarteira(carteira, valorAposta, 0, dadosUser.id)
      }
      Grava(dados)

      setCarteira(carteira + dados.vlrGanho)
      setNmr(null)
      setValorAposta(0)
    }
    result !== -1 ? setRes(result) : setRes('')
  }, [result])

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View>
      <View style={styles.container}>
        <View>
          <Text style={styles.saldo}>R$ {carteira}</Text>
          <View
            style={{
              width: 130,
              borderWidth: 1,
              borderRadius: 10,
              paddingLeft: 5
            }}
          >
            <TextInput
              keyboardType="numeric"
              placeholder="Aposta"
              placeholderTextColor={'gray'}
              value={valorApostado}
              style={{
                paddingVertical: Platform.OS === 'ios' ? 10 : 2,
                fontFamily: 'Inter_500Medium',
                fontSize: 12
              }}
              onChangeText={valor => {
                if (carteira - valor >= 0) {
                  setValorApostado(parseFloat(valor))
                  if (valor !== '') {
                    setBloquear(false)
                  } else {
                    setBloquear(true)
                  }
                } else {
                  setBloquear(true)
                }
              }}
            />
          </View>
        </View>
        <View>
          <Text style={styles.saldo}>Aposta: {valorAposta}</Text>
          <Button
            disabled={bloquear}
            buttonStyle={styles.btnStyle}
            title="Apostar"
            titleStyle={styles.btnTitleStyle}
            containerStyle={{}}
            onPress={() => {
              if (valorApostado !== 0) {
                setCarteira(carteira - valorApostado)
                setValorAposta(valorAposta + valorApostado)
                setValorApostado('')
                setBloquear(true)
              }
            }}
          />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 1º Duzia , 1-18,Par*/}
          <View>
            <BotaoRoleta
              color={colors.green}
              txtBtn={'1º Duzia'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'1 - 18'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'Par'}
              setValue={setNmr}
            />
          </View>
          <View>
            {/* 0 */}
            <View
              style={{
                justifyContent: 'center',
                flexDirection: 'row'
              }}
            >
              <BotaoRoleta
                txtBtn={'0'}
                setValue={setNmr}
                color={colors.green}
              />
            </View>

            {/* 1 a 12*/}
            <View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'1'}
                  setValue={setNmr}
                  color={colors.red}
                />
                <BotaoRoleta
                  txtBtn={'2'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'3'}
                  setValue={setNmr}
                  color={colors.red}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'4'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'5'}
                  setValue={setNmr}
                  color={colors.red}
                />
                <BotaoRoleta
                  txtBtn={'6'}
                  setValue={setNmr}
                  color={colors.black}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'7'}
                  setValue={setNmr}
                  color={colors.red}
                />
                <BotaoRoleta
                  txtBtn={'8'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'9'}
                  setValue={setNmr}
                  color={colors.red}
                />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <BotaoRoleta
                  txtBtn={'10'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'11'}
                  setValue={setNmr}
                  color={colors.black}
                />
                <BotaoRoleta
                  txtBtn={'12'}
                  setValue={setNmr}
                  color={colors.red}
                />
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 2º Duzia , RED, BLACK*/}
          <View>
            <BotaoRoleta
              color={colors.green}
              txtBtn={'2º Duzia'}
              setValue={setNmr}
            />
            <BotaoRoleta color={colors.red} txtBtn={'RED'} setValue={setNmr} />
            <BotaoRoleta
              color={colors.black}
              txtBtn={'BLACK'}
              setValue={setNmr}
            />
          </View>

          {/* 13 a 24*/}
          <View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'13'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'14'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'15'}
                setValue={setNmr}
                color={colors.black}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'16'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'17'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'18'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'19'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'20'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'21'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'22'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'23'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'24'}
                setValue={setNmr}
                color={colors.black}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {/* 3º Duzia , Impar, 19-36*/}
          <View>
            <BotaoRoleta
              color={colors.green}
              txtBtn={'3º Duzia'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'Impar'}
              setValue={setNmr}
            />
            <BotaoRoleta
              color={colors.green}
              txtBtn={'19 - 36'}
              setValue={setNmr}
            />
          </View>

          {/* 25 a 36*/}
          <View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'25'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'26'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'27'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'28'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta
                txtBtn={'29'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'30'} setValue={setNmr} color={colors.red} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta
                txtBtn={'31'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'32'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'33'}
                setValue={setNmr}
                color={colors.black}
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <BotaoRoleta txtBtn={'34'} setValue={setNmr} color={colors.red} />
              <BotaoRoleta
                txtBtn={'35'}
                setValue={setNmr}
                color={colors.black}
              />
              <BotaoRoleta txtBtn={'36'} setValue={setNmr} color={colors.red} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
    width: '100%',
    paddingHorizontal: 20
  },
  saldo: {
    color: 'gray',
    paddingVertical: 8,
    paddingLeft: 5,
    width: 130,
    borderRadius: 10,
    borderWidth: 1,
    fontFamily: 'Inter_500Medium',
    fontSize: 12,
    marginVertical: 10
  },
  btnStyle: {
    backgroundColor: '#000',
    color: '#fff',
    width: 130,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000'
  },
  btnTitleStyle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 12
  }
})

export default { CarteiraRoleta, PegaNumero }
