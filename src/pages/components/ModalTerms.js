import React from 'react'
import {
  View,
  Text,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet
} from 'react-native'
import { Button } from '@rneui/themed'
import {
  useFonts,
  Inter_900Black,
  Inter_500Medium,
  Inter_300Light
} from '@expo-google-fonts/inter'

export default function ModalTerms({
  screenTermsVisible,
  SetScreenTermsVisible,
  setTermBoolean
}) {
  let [fotsLoaded] = useFonts({
    Inter_900Black,
    Inter_500Medium,
    Inter_300Light
  })
  if (!fotsLoaded) {
    return null
  }
  return (
    <Modal visible={screenTermsVisible} animationType="fade" transparent={true}>
      <View style={styles.Modal}>
        <View style={styles.ModalMid}>
          <SafeAreaView style={styles.ModalMidSA}>
            <ScrollView>
              <Text style={styles.ModalText}>
                Where does it come from? Contrary to popular belief, Lorem Ipsum
                is not simply random text. It has roots in a piece of classical
                Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College
                in Virginia, looked up one of the more obscure Latin words,
                consectetur, from a Lorem Ipsum passage, and going through the
                cites of the word in classical literature, discovered the
                undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
                1.10.33 of "de Finibus Bonorum et Malorum" The Extremes of Good
                and Evil by Cicero, written in 45 BC. This book is a treatise on
                the theory of ethics, very popular during the Renaissance. The
                first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
                from a line in section 1.10.32. The standard chunk of Lorem
                Ipsum used since the 1500s is reproduced below for those
                interested. Sections 1.10.32 and 1.10.33 from "de Finibus
                Bonorum et Malorum" by Cicero are also reproduced in their exact
                original form, accompanied by English versions from the 1914
                translation by H. Rackham. Where does it come from? Contrary to
                popular belief, Lorem Ipsum is not simply random text. It has
                roots in a piece of classical Latin literature from 45 BC,
                making it over 2000 years old. Richard McClintock, a Latin
                professor at Hampden-Sydney College in Virginia, looked up one
                of the more obscure Latin words, consectetur, from a Lorem Ipsum
                passage, and going through the cites of the word in classical
                literature, discovered the undoubtable source. Lorem Ipsum comes
                from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
                Malorum" The Extremes of Good and Evil by Cicero, written in 45
                BC. This book is a treatise on the theory of ethics, very
                popular during the Renaissance. The first line of Lorem Ipsum,
                "Lorem ipsum dolor sit amet..", comes from a line in section
                1.10.32. The standard chunk of Lorem Ipsum used since the 1500s
                is reproduced below for those interested. Sections 1.10.32 and
                1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also
                reproduced in their exact original form, accompanied by English
                versions from the 1914 translation by H. Rackham.
              </Text>
            </ScrollView>
          </SafeAreaView>
          <View style={styles.buttons}>
            <Button
              buttonStyle={styles.btnStyle}
              titleStyle={{
                fontFamily: 'Inter_500Medium'
              }}
              onPress={() => {
                setTermBoolean(true)
                SetScreenTermsVisible(false)
              }}
            >
              Aceitar
            </Button>
            <Button
              buttonStyle={{
                backgroundColor: '#F25719',
                borderRadius: 25,
                paddingHorizontal: 25
              }}
              titleStyle={{
                fontFamily: 'Inter_500Medium'
              }}
              onPress={() => {
                setTermBoolean(false)
                SetScreenTermsVisible(false)
              }}
            >
              Recusar
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  )
}
const styles = StyleSheet.create({
  //#region MODAL ACEITE DE TEMO
  Modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ModalMid: {
    height: '80%',
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: '#F7F5F2',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  ModalMidSA: {
    backgroundColor: '#EEE',
    height: '87%',
    borderRadius: 10,
    shadowColor: '#000',
    borderWidth: 1,
    borderColor: '#e1e1e1'
  },
  ModalText: {
    padding: 10,
    textAlign: 'justify',
    fontFamily: 'Inter_500Medium'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  btnStyle: {
    backgroundColor: '#F25719',
    borderRadius: 25,
    paddingHorizontal: 25
  }
})
