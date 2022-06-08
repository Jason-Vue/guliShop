// 对外暴露一个函数
// 设置存储token
export const setToken = (token) => {
  return localStorage.setItem("TOKEN", token)
}

// 获取token
export const getToken = () => {
  return localStorage.getItem("TOKEN")
}

// 移除token
export const removeToken = () => {
  return localStorage.removeItem("TOKEN")
}