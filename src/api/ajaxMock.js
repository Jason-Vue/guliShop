import axios from 'axios';
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

// 使用的是mockjs数据，所以baseURL改为/mock,
const instance = axios.create({
  baseURL: '/mock',
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