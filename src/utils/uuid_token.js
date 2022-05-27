import {
  v4 as uuidv4
} from 'uuid';
// 要生成一个随机的字符串，且每次不能变化，游客身份要持久化存储
export const getUUID = () => {
  // 1.首先从本地获取UUID(看下本地存储里面是否有)
  // 如果没有返回的是null
  let uuid_token = localStorage.getItem("UUIDTOKEN");
  // 2.如果没有我生成
  if (!uuid_token) {
    // 生成游客临时身份
    uuid_token = uuidv4();
    // 本地存储
    localStorage.setItem("UUIDTOKEN", uuid_token)
  }
  return uuid_token
}