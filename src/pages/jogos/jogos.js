import React, { useState, Component, useContext } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import {Entypo} from '@expo/vector-icons'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'
import { AuthContext } from '../../contexts/auth.js'
import AppIntroSlider from 'react-native-app-intro-slider'

const imgSlides =[
    {
      key: 1,
      title: 'Roleta',
      text: 'Jogue Agora!',
      image: require('./img/roulette.jpg')
    },
    {
      key: 2,
      title: 'BlackJack',
      text: 'Jogue Agora!',
      image: require('./img/21.jpg')
    },
    {
      key: 3,
      title: 'Dados',
      text: 'Jogue Agora!',
      image: require('./img/dados.jpg')
    },
]
// estilo de components
export default function Jogos() {
  const [mostrarSaldo, setmostrarSaldo] = useState(false);
  const { dadosUser} = useContext(AuthContext)
  function renderSlides({item}){
    return(
      <View style={{flex:1, marginTop:'10%'}}>
        <Image
        source={item.image}
        style={{
          resizeMode: 'cover',
          height: '70%',
          width: '100%',     
        }}
        />
        <Text style={styles.playNow}>
          {item.title}
        </Text >
        <TouchableOpacity onPress={()=>{}}>
        <Text style={[styles.playNow,{fontSize: 20}]}>
          {item.text}
        </Text>
        </TouchableOpacity> 
      </View>
    )
  }
  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.content}>
            <Text style={{fontSize: 16, color:'#FFF', fontFamily:'Inter_900Black'}}>{`Olá ${dadosUser.nome}`}</Text>
            <ImageBackground source={require('../perfil/bighead.jpg')} style={{width:35, height:35}} imageStyle={{borderRadius:25}}/>
          </View>
          <View style={styles.wallet}>
          <Entypo
           name='wallet'
           size={25}
           color='#FFF'
           onPress={()=>setmostrarSaldo(!mostrarSaldo)}
            />
          <Text style={{fontSize: 16,color:'#FFF', marginLeft:5, fontFamily:'Inter_500Medium'}}>R${ mostrarSaldo ? (dadosUser.valor===null ? '0,00': dadosUser.valor ) : '*****'}</Text>
           </View>
        </View>
         <AppIntroSlider
          renderItem={renderSlides}
          data={imgSlides}
          activeDotStyle={{
            backgroundColor: '#d65a31',
            width: 40,
            height: 10
          }}
          
         />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex:1
  },
  header:{
    backgroundColor: '#d65a31',
    paddingTop: 40,
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  content:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 5
  },
  wallet:{
    flexDirection:'row', 
    alignItems: 'center',
    paddingBottom: 20
  },
  roullet:{
    flexDirection:'row',
    marginTop: 5,
    justifyContent:'space-between',
    width: 100
  },
  text:{
    fontSize: 16,
    color:'#d65a31', 
    fontFamily:'Inter_900Black'
  },
  playNow:{
    fontSize: 40 ,
    fontFamily:'Inter_900Black', 
    color: '#d65a31', 
    textAlign: 'center'
  }

})
