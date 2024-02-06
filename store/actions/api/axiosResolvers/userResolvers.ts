import axios from 'axios'

const axiosUsersResolver = axios.create({
  baseURL: 'http://192.168.50.123:3030/api/users',
  headers: { 'Content-Type': 'application/json' },
})

axiosUsersResolver.interceptors.response.use(null, error => {
  return error
})

export default axiosUsersResolver
