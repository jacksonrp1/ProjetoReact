import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// ROUTES
import Investimento from './pages/investimento/Investimento.js'
import Extrato from './pages/extrato/extrato.js'
import Jogos from './pages/jogos/jogos.js'
import Perfil from './pages/perfil/perfil.js'

// IMPORT COMPONENTS
import ButtonGame from './pages/components/ButtonTabBar.js'

// IMPORT ICONS
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

export default function Routes() {
  return (
    <Tab.Navigator initialRouteName="Jogos" screenOptions={styles.ScreenOpt}>
      <Tab.Screen
        name="Investimento"
        component={Investimento}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonGame
              size={size}
              focused={focused}
              icone={
                <FontAwesome5
                  name="donate"
                  size={!focused ? 30 : 40}
                  color={color}
                />
              }
            />
          )
        }}
      />

      <Tab.Screen
        name="Extrato"
        component={Extrato}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonGame
              size={size}
              focused={focused}
              icone={
                <FontAwesome5
                  name="money-check-alt"
                  size={!focused ? 30 : 40}
                  color={color}
                />
              }
            />
          )
        }}
      />

      <Tab.Screen
        name="Jogos"
        component={Jogos}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonGame
              size={size}
              focused={focused}
              icone={
                <MaterialCommunityIcons
                  name="cards-playing-spade"
                  size={!focused ? 30 : 40}
                  color={color}
                />
              }
            />
          )
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <ButtonGame
              size={size}
              focused={focused}
              icone={
                <FontAwesome5
                  name="user-tie"
                  size={!focused ? 30 : 40}
                  color={color}
                />
              }
            />
          )
        }}
      />
    </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#777'
  },
  ScreenOpt: {
    headerStyle: { height: 0 },
    tabBarStyle: {
      backgroundColor: '#121212',
      borderTopColor: 'transparent',
      paddingBottom: 20,
      height: 75
    },
    tabBarActiveTintColor: '#fff'
  }
})
