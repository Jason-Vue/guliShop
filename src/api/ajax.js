import axios from 'axios';
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

import store from "@/store/index.js"

const instance = axios.create({
  baseURL: '/api',
  timeout: 3000,
})

// 请求拦截器
instance.interceptors.request.use((config) => {
  // 如果uuid_token存在
  if (store.state.DetailAbout.uuid_token) {
    // 在请求头里添加一个字段:(userTempId),和后台老师商量好的，不能随便乱加
    config.headers.userTempId = store.state.DetailAbout.uuid_token
  }
  // 需要携带token带给服务器
  if (store.state.UserAbout.token) {
    config.headers.token = store.state.UserAbout.token
  }
  // 进度条开始
  nprogress.start()
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use((config) => {
  // 进度条结束
  nprogress.done()
  return config.data
}, (error) => {
  return Promise.reject(error)
})

export default instance