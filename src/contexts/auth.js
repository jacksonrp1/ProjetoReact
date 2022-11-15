import React, { createContext, useState } from 'react'
import { url } from '../../config.js'
import storage from '../services/storage.js'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [dadosUser, setDadosUser] = useState({})
  const [extratoUser, setExtratoUser] = useState({})
  const [saldoUser, setSaldoUser] = useState({})
  const navigation = useNavigation()

  async function validationUser(login, senha, setValue) {
    let req = await fetch(`${url}/login`, {
      cache: 'default',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        username: login,
        password: senha
      })
    })
    let res = await req.json()
    //SE RESPOSTA FOR TRUE
    if (res.auth) {
      //ARMAZENA O TOKEN NO STORAGE
      storage
        .storageSet(res.token)
        .then(user => {})
        .catch(err => {})
      //LOGA O USUÁRIO
      setValue({ auth: true, resp: '' })

      //Pega todos os dados do usuário
      setDadosUser(res.dadosUser)

      //Pega Extrato do usuário
      getExtrato(res.dadosUser.id)

      //Pega Saldo do usuário
      getSaldo(res.dadosUser.id)

      navigation.navigate('Routes')
    } else {
      setValue({ auth: true, resp: 'Login ou senha inválido.' })
    }
  }

  async function getSaldo(idUser) {
    const req = await fetch(`${url}/financeiroAtualiza/${idUser}`)
    const res = await req.json()
    setSaldoUser(res.resp)
  }
  async function getExtrato(idUser) {
    const req = await fetch(`${url}/carteira/${idUser}`)
    const res = await req.json()
    setExtratoUser(res.ext)
  }

  return (
    <AuthContext.Provider
      value={{
        validationUser,
        dadosUser,
        saldoUser,
        extratoUser,
        navigation,
        getSaldo,
        getExtrato
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
