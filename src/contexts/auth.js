import React, { createContext, useState } from 'react'
import { url } from '../../config.js'
import storage from '../services/storage.js'
import { useNavigation } from '@react-navigation/native'

export const AuthContext = createContext({})

function AuthProvider({ children }) {
  const [userName, setUserName] = useState()
  const [userPass, setUserPass] = useState()
  const [dadosUser, setDadosUser] = useState({})
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
        let res = await req
          .json()
          .then(resp => {
            //SE RESPOSTA FOR TRUE
            if (resp.auth) {
              //ARMAZENA O TOKEN NO STORAGE
              storage
                .storageSet(resp.token)
                .then(user => {})
                .catch(err => {})
              //LOGA O USUÁRIO
              setValue('')
              navigation.navigate('Routes')
              setDadosUser(resp.dadosUser)
            } else {
              setValue('Login ou senha inválido.')
            }
          })
          .catch(err => {})
      }
    }
  }

  return (
    <AuthContext.Provider value={{ ValidateFields, dadosUser, navigation }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
