import { View, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium
} from '@expo-google-fonts/inter'

export default function BotaoRoleta({ txtBtn, setValue, color }) {
  const [nmr, setNmr] = useState(parseInt(txtBtn))
  const aposta = {
    Par: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
    Impar: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35],
    Red: [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3],
    Black: [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26],
    Duzia1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    Duzia2: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    Duzia3: [25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
    Alta: [
      19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
    ],
    Baixa: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  }

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View>
      <Button
        buttonStyle={[styles.btnStyle, { backgroundColor: color }]}
        title={txtBtn}
        titleStyle={styles.btnTitleStyle}
        containerStyle={{}}
        onPress={() => {
          if (txtBtn == '1º Duzia') {
            setValue(aposta.Duzia1)
          } else if (txtBtn == '2º Duzia') {
            setValue(aposta.Duzia2)
          } else if (txtBtn == '3º Duzia') {
            setValue(aposta.Duzia3)
          } else if (txtBtn == '1 - 18') {
            setValue(aposta.Baixa)
          } else if (txtBtn == '19 - 36') {
            setValue(aposta.Alta)
          } else if (txtBtn == 'RED') {
            setValue(aposta.Red)
          } else if (txtBtn == 'BLACK') {
            setValue(aposta.Black)
          } else if (txtBtn == 'Par') {
            setValue(aposta.Par)
          } else if (txtBtn == 'Impar') {
            setValue(aposta.Impar)
          } else {
            setValue(nmr)
          }
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnStyle: {
    width: 70,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnTitleStyle: {
    fontFamily: 'Inter_500Medium',
    fontSize: 11
  }
})
