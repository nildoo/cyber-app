import { tokenState } from './cache'
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwt_decode from 'jwt-decode'
import dayjs from 'dayjs'

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('@cyber-app-token', token)
  tokenState(token)
}

export const token = async () => {
  const tk = await AsyncStorage.getItem('@cyber-app-token')
  if (tk) {
    const decoded: any = jwt_decode(tk)
    const exp = dayjs(decoded.date).unix()
    const currentDay = dayjs().unix()
    if (currentDay >= exp) {
      return ''
    }
  }

  return tk
}

export const removeToken = async () => {
  await AsyncStorage.removeItem('@cyber-app-token')
}
