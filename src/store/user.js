import {
  reqRegisterPhoneCode,
  reqRegister
} from "@/api";

const state = {
  code: ''
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
    console.log(result);
    if (result.code == 200) {
      return "用户注册成功"
    } else {
      return Promise.reject(new Error('用户注册失败'))
    }
  }
};

const mutations = {
  GETPHONECODE(state, code) {
    state.code = code
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