import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'

import Roulette from 'react-native-casino-roulette'
import wheel from './images/wheel.png'
import marker from './images/marker.png'
import CarteiraRoleta from '../../components/CarteiraRoleta.js'
//Roulette numbers

const numbers = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24,
  16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
]
const options = numbers.map(o => ({ index: o })) // este é o random, pega um index no map de numbers

class App extends Component {
  stateaposta = {
    aposta: 0
  }

  constructor(props) {
    super(props)
    this.onRotate = this.onRotate.bind(this)
    this.onRotateChange = this.onRotateChange.bind(this)
    this.onRotateCustom = this.onRotateCustom.bind(this)
    this.onRotateCustomChange = this.onRotateCustomChange.bind(this)
    this.resultadoRoleta = this.resultadoRoleta.bind(this)

    this.state = {
      option: '',
      optionCustom: 'Option selected:',
      rouletteState: 'stop',
      rouletteCustomState: 'stop',
      resultadoRoleta: -1
    }
  }
  render() {
    const {
      option,
      rouletteState,
      optionCustom,
      rouletteCustomState,
      resultadoRoleta
    } = this.state

    //Quando a roleta parar, manda para carteira o número que resultou
    if (option !== '' && rouletteState === 'stop') {
      CarteiraRoleta.PegaNumero(option)
    }
    return (
      <SafeAreaView style={{ minHeight: '100%' }}>
        <ScrollView style={{ minHeight: '100%' }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              backgroundColor: '#F7F5F2'
            }}
          >
            <Roulette
              center
              enableUserRotate={rouletteState == 'stop' ? true : false}
              background={wheel}
              onRotate={this.onRotate}
              onRotateChange={this.onRotateChange}
              marker={marker}
              options={options}
              markerWidth={30}
            />
            <View style={{ width: '100%' }}>
              <CarteiraRoleta.CarteiraRoleta />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

  resultadoRoleta(state) {
    this.setState({
      resultadoRoleta: state
    })
  }
  onRotateChange(state) {
    this.setState({
      rouletteState: state
    })
  }

  onRotate(option) {
    this.setState({
      option: option.index
    })
  }

  onRotateCustomChange(state) {
    this.setState({
      rouletteCustomState: state
    })
  }

  onRotateCustom(option) {
    this.setState({
      optionCustom: option.props.index
    })
  }
}
const Result = result => {
  CarteiraRoleta.PegaNumero(result)
}

const styles = StyleSheet.create({})

export default { App, Result }
