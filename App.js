import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Started from './src/getStarted'
import SignIn from './src/signin'
import SignUp from './src/signup'
import Routes from './src/routes.js'
import ForgotPassword from './src/ForgotPassword.js'
import ReplacePassword from './src/ReplacePassword.js'

import AuthProvider from './src/contexts/auth.js'

const Tab = createStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <AuthProvider>
          <Tab.Navigator
            initialRouteName="SignIn"
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
              name="ForgotPassword"
              component={ForgotPassword}
              options={styles.optsTab}
            />
            <Tab.Screen
              name="ReplacePassword"
              component={ReplacePassword}
              options={styles.optsTab}
            />
            <Tab.Screen
              name="SignUp"
              component={SignUp}
              options={styles.optsTab}
            />
          </Tab.Navigator>
          <StatusBar style="auto" />
        </AuthProvider>
      </NavigationContainer>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  optsTab: {
    title: '',
    headerTintColor: '#F25719',
    headerLeftContainerStyle: {
      borderRadius: 50,
      width: 50,
      height: 40,
      left: 10
    }
  }
})
