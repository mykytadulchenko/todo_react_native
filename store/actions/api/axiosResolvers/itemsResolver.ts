import axios from 'axios'
import axiosAuthResolver from './authResolver'
import AsyncStorage from '@react-native-async-storage/async-storage'

const axiosItemsResolver = axios.create({
  baseURL: 'http://192.168.50.123:3030/api/items',
  headers: { 'Content-Type': 'application/json' },
})

axiosItemsResolver.interceptors.request.use(async (request) => {
  const authToken = await AsyncStorage.getItem('auth_token')
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`
  }
  return request
})

axiosItemsResolver.interceptors.response.use(null, async (error) => {
  if (error.response?.status === 403) {
    const request = error.config
    const response = await axiosAuthResolver.get('/api/auth')
    if (response.status !== 200) return response
    await AsyncStorage.setItem('auth_token', response.headers.authorization.split(' ')[1])
    const requestResult = await axiosItemsResolver(request)
    return requestResult
  }
  return error
})

export default axiosItemsResolver
