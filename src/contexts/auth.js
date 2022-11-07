import React, { createContext, useState } from 'react'
import { url } from '../../config.js'
import storage from '../services/storage.js'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [userName, setUserName] = useState()
  const [userPass, setUserPass] = useState()
  const [dadosUser, setDadosUser] = useState({})
  const [extratoUser, setExtratoUser] = useState({})
  const navigation = useNavigation()

  function ValidateFields(userName, userPass, setValue) {
    if (userName == '' || userName == null) {
      setValue('Login inválido.')
    } else if (userPass == '' || userPass == null) {
      setValue('Senha inválida.')
    } else {
      setUserName(userName)
      setUserPass(userPass)
      validationUser()
      async function validationUser() {
        let req = await fetch(`${url}/login`, {
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
        //SE RESPOSTA FOR TRUE
        if (res.auth) {
          //ARMAZENA O TOKEN NO STORAGE
          storage
            .storageSet(res.token)
            .then(user => {})
            .catch(err => {})
          //LOGA O USUÁRIO
          setValue('')
          setDadosUser(res.dadosUser)

          getExtrato(res.dadosUser.id)
          navigation.navigate('Routes')
        } else {
          setValue('Login ou senha inválido.')
        }
      }
    }
  }
  async function getExtrato(idUser) {
    const req = await fetch(`${url}/carteira/${idUser}`)
    const res = await req.json()
    setExtratoUser(res.ext)
  }

  return (
    <AuthContext.Provider
      value={{ ValidateFields, dadosUser, extratoUser, navigation }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
