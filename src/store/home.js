import {
  reqCategoryList
} from "@/api"

const state = {
  // 存储首页三级分类
  typeNavList: []
}

const actions = {
  async getCategoryList(context) {
    const result = await reqCategoryList();
    // console.log(result);
    if (result.code == 200) {
      context.commit("GETCATEGORYLIST", result.data)
    }
  }
}

const mutations = {
  GETCATEGORYLIST(state, data) {
    // console.log(state, data);
    state.typeNavList = data
  }
}

const getters = {

}

const HomeAbout = {
  // namespaced: true,
  state,
  actions,
  mutations,
  getters
}

export default HomeAbout