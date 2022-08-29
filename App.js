import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Input } from '@rneui/themed'
import Started from './src/getStarted'
import SignIn from './src/signin'
import SignUp from './src/signup'
import Home from './src/home'

const Tab = createStackNavigator()

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="signup"
          screenOptions={{
            headerStyle: { height: 0 }
          }}
        >
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
              headerTintColor: 'red',
              headerLeft: props => <Text></Text>
            }}
          />
          <Tab.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: '', headerTintColor: '#F25719' }}
          />
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              title: '',
              headerLeft: props => <Text></Text>
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
