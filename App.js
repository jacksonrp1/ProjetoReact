import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Started from './src/getStarted'
import SignIn from './src/signin'
import SignUp from './src/signup'
import Routes from './src/routes.js'

const Tab = createStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Started"
          screenOptions={{
            headerStyle: { height: 0 }
          }}
        >
          <Tab.Screen
            name="Routes"
            component={Routes}
            options={{ title: '', headerLeft: () => null }}
          />
          <Tab.Screen
            name="Started"
            component={Started}
            options={{ title: '' }}
          />
          <Tab.Screen
            name="SignIn"
            component={SignIn}
            options={{
              title: '',
              headerLeft: () => null
            }}
          />
          <Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{
              title: '',
              headerTintColor: '#F25719',
              headerLeftContainerStyle: {
                borderRadius: 50,
                width: 50,
                height: 40,
                left: 10
              }
            }}
          />
        </Tab.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
})
