import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// ROUTES
import Home from './pages/Home'
import Notification from './pages/Notification'
import Games from './pages/Games'
import Wallet from './pages/Wallet'
import Profile from './pages/Profile'

// IMPORT COMPONENTS
import ButtonGame from './pages/components/ButtonGame.js'

// IMPORT ICONS
import { Entypo, FontAwesome5, Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Routes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { height: 0 },
        tabBarStyle: {
          backgroundColor: '#121212',
          borderTopColor: 'transparent',
          paddingBottom: 20,
          // paddingTop: 10,
          height: 70
        },
        tabBarActiveTintColor: '#fff'
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="home" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Entypo name="notification" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Games"
        component={Games}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused, size }) => (
            <ButtonGame size={size} focused={focused} />
          )
        }}
      />

      <Tab.Screen
        name="Wallet"
        component={Wallet}
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="wallet" size={size} color={color} />
          )
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Octicons name="person" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#777'
  }
})
