import axios from 'axios';
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

const instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  nprogress.start()
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((config) => {
  nprogress.done()
  return config.data
}, (error) => {
  return Promise.reject(error)
})

export default instance