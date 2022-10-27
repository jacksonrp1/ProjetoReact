import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from '@rneui/themed'
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter'
export default function Started({ navigation }) {
  let [fotsLoaded] = useFonts({
    Inter_900Black
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.h1Style}>Vamos começar</Text>
        <Text style={styles.h5Style}>Crescer juntos</Text>
      </View>
      <Button
        buttonStyle={styles.btnStyle}
        titleStyle={btnTitleStyle}
        containerStyle={{
          marginVertical: 48
        }}
        onPress={() => {
          navigation.navigate('SignIn')
        }}
        title="ENTRAR"
      />
      <StatusBar style="auto" />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F5F2',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  h1Style: {
    fontFamily: 'Inter_900Black',
    color: '#F25719',
    fontSize: 75
  },
  h5Style: {
    fontFamily: 'Inter_900Black',
    color: '#F25719',
    fontSize: 15,
    fontWeight: 'light'
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
