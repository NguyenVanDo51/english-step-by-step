import { AppNotifycation } from "@/components/level1/antd/AppNotification"
import { notification } from "antd"
import axios, { AxiosError, AxiosInstance } from "axios"

const httpClient: AxiosInstance = axios.create({
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
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
      AppNotifycation.error({
        description: "Too many request",
        message: "Error",
      })
    }

    if (!status || status >= 500) {
      AppNotifycation.error({
        description: "Something went wrong. Please try again.",
        message: "Server error",
      })
    }
    return Promise.reject(error)
  }
)

export { httpClient }
