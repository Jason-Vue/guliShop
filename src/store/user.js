import {
  reqRegisterPhoneCode,
  reqRegister,
  reqUserLogin,
  reqUserInfo,
  reqLoginOut
} from "@/api";

import {
  setToken,
  getToken,
  removeToken
} from "@/utils/token"
const state = {
  code: '',
  // 登录的token
  token: getToken(),
  // 用户信息
  userInfo: {}
};

const actions = {
  // 1.注册获取验证码
  async getPhoneCode(context, phone) {
    const result = await reqRegisterPhoneCode(phone)
    if (result.code == 200) {
      context.commit('GETPHONECODE', result.data)
      return "注册验证码成功"
    } else {
      return Promise.reject(new Error("注册获取验证码失败"));
    }
  },
  // 2.完成注册
  async finishRegister({
    commit
  }, user) {
    const result = await reqRegister(user);
    // console.log(result);
    if (result.code == 200) {
      return "用户注册成功"
    } else {
      return Promise.reject(new Error('用户注册失败'))
    }
  },
  // 3.用户登录
  async userLogin({
    commit
  }, data) {
    const result = await reqUserLogin(data);
    console.log(result);
    if (result.code == 200) {
      commit("REQUSERLOGIN", result.data.token)
      // 持久化存储
      // localStorage.setItem("token", result.data.token)
      setToken(result.data.token)
      return "用户登录成功"
    } else {
      return Promise.reject(new Error('用户登录失败'))
    }
  },
  // 4.获取用户登录信息
  async getUserInfo({
    commit
  }) {
    const result = await reqUserInfo();
    if (result.code == 200) {
      commit("GETUSERINFO", result.data)
      return "获取用户信息成功"
    } else {
      return Promise.reject(new Error('获取用户信息失败'))
    }
  },
  // 5.退出登录
  async UserLogOut({
    commit
  }) {
    const result = await reqLoginOut();
    console.log(result);
    if (result.code == 200) {
      // 通知服务器清除信息
      commit("CLEARUSERLOGIN")
      return "退出账户成功"
    } else {
      return Promise.reject(new Error('退出账户失败'))
    }
  }
};

const mutations = {
  // 1.获取验证码
  GETPHONECODE(state, code) {
    state.code = code
  },
  // 2.用户登录
  REQUSERLOGIN(state, token) {
    state.token = token
  },
  // 3.获取用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  // 4.清除服务器登录数据
  CLEARUSERLOGIN(state) {
    // 清空state
    state.token = '';
    state.userInfo = {};
    // 本地存储清空
    removeToken()
  }
};

const getters = {};

const UserAbout = {
  state,
  actions,
  mutations,
  getters
}

export default UserAbout