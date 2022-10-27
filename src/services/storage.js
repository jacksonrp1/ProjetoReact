import AsyncStorage from '@react-native-async-storage/async-storage'

const storageSet = async value => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('idUser', jsonValue)
  } catch (error) {
    console.error(error)
  }
}
const storageGet = async value => {
  try {
    const jsonValue = await AsyncStorage.getItem(value)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.error(error)
  }
}
export default { storageSet, storageGet }
