import axios, { AxiosError, AxiosInstance } from 'axios'
import Toast from 'react-native-root-toast'

const httpClient: AxiosInstance = axios.create({
  timeout: 30000,
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
})

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.validateStatus = function (status) {
      return status < 500 // Resolve only if the status code is less than 500
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
httpClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error: AxiosError) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response?.status
    if (status === 429) {
      Toast.show('Too many request')
    }

    if (!status || status >= 500) {
      Toast.show('Something went wrong. Please try again.')
    }
    return Promise.reject(error)
  }
)

export { httpClient }
