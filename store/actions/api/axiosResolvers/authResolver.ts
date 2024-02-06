import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

const axiosAuthResolver = axios.create({
  baseURL: 'http://192.168.50.123:3030',
  headers: { 'Content-Type': 'application/json' },
})

axiosAuthResolver.interceptors.request.use(async (request) => {
  const authToken = await AsyncStorage.getItem('auth_token')
  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`
  }
  return request
})

axiosAuthResolver.interceptors.response.use(null, (error) => error)

export default axiosAuthResolver
