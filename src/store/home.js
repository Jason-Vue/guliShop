import {
  reqCategoryList,
  reqBannerList
} from "@/api"

const state = {
  // 存储首页三级分类
  typeNavList: [],
  // 首页轮播数据
  bannerList: []
}

const actions = {
  async getCategoryList(context) {
    const result = await reqCategoryList();
    if (result.code == 200) {
      context.commit("GETCATEGORYLIST", result.data)
    }
  },
  async getBannerList({
    commit
  }) {
    const result = await reqBannerList();
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  }
}

const mutations = {
  GETCATEGORYLIST(state, data) {
    state.typeNavList = data
  },
  GETBANNERLIST(state, data) {
    state.bannerList = data
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