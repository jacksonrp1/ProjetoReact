import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { MaskedTextInput } from 'react-native-mask-text'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'
import { Button } from '@rneui/themed'

export default function TextInputMaskComp({
  label,
  mask,
  keyType = 'numeric',
  setValue
}) {
  const [Label, setLabel] = useState([{ size: 14, top: '25%', left: 20 }])
  //const [value, setValue] = useState()

  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
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
        {label}
      </Text>
      <MaskedTextInput
        style={{ paddingVertical: Platform.OS === 'ios' ? 11 : 5 }}
        mask={mask}
        onChangeText={value => {
          setValue(value)
          StyleLabel(value)
        }}
        keyboardType={keyType}
      />
    </View>
  )
  function StyleLabel(input) {
    if (input.length === 0) {
      Label[0].top = '25%'
      Label[0].size = 14
    } else {
      Label[0].top = -10
      Label[0].size = 12
    }
  }
}
const styles = StyleSheet.create({
  inputContainer: {
    width: '85%'
  },
  Input: {
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#a8a8a8',
    paddingHorizontal: 20,
    width: '100%'
  }
})
