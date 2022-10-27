import { View, Text, StyleSheet } from 'react-native'
import Checkbox from 'expo-checkbox'
import React, { useState, useEffect } from 'react'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

export default function Genders({ value, setValue }) {
  const [Gender, setGender] = useState(value)

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.Input}>
      <Text style={styles.TextTitle}>Sexo</Text>
      <View style={styles.viewCheck}>
        <Checkbox
          style={styles.checkBox}
          onValueChange={() => {
            setGender('Masculino')
            setValue('Masculino')
          }}
          value={Gender === 'Masculino' ? true : false}
          color={Gender === 'Masculino' ? '#F25719' : undefined}
        />
        <Text
          onPress={() => {
            setGender('Masculino')
            setValue('Masculino')
          }}
          style={styles.textCheck}
        >
          Masculino
        </Text>
      </View>
      <View style={styles.viewCheck}>
        <Checkbox
          style={styles.checkBox}
          onValueChange={() => {
            setGender('Feminino')
            setValue('Feminino')
          }}
          value={Gender === 'Feminino' ? true : false}
          color={Gender === 'Feminino' ? '#F25719' : undefined}
        />
        <Text
          onPress={() => {
            setGender('Feminino')
            setValue('Feminino')
          }}
          style={styles.textCheck}
        >
          Feminino
        </Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  Input: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#a8a8a8',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Platform.OS === 'ios' ? 11 : 8
  },
  TextTitle: {
    position: 'absolute',
    color: '#a8a8a8',
    backgroundColor: '#F7F5F2',
    top: -10,
    left: 20,
    fontSize: 12,
    fontFamily: 'Inter_500Medium'
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
  viewCheck: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textCheck: {
    fontFamily: 'Inter_300Light',
    fontSize: 14
  }
})
