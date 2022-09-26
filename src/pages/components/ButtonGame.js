import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'

export default function ButtonGame({ focused, size }) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: focused ? 'red' : '#F25719'
        }
      ]}
    >
      <FontAwesome5
        name="basketball-ball"
        size={focused ? size + 5 : size}
        color={focused ? '#fff' : '#000'}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#F25719',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
})
