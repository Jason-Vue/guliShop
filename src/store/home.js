import {
  reqCategoryList,
  reqBannerList,
  reqFloorList
} from "@/api"

const state = {
  // 存储首页三级分类
  typeNavList: [],
  // 首页轮播数据
  bannerList: [],
  // 首页floor数据
  floorList: []
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
  },
  async getFloorList({
    commit
  }) {
    const result = await reqFloorList();
    if (result.code == 200) {
      commit("GETFLOORLIST", result.data)
    }
  }
}

const mutations = {
  GETCATEGORYLIST(state, data) {
    state.typeNavList = data
  },
  GETBANNERLIST(state, data) {
    state.bannerList = data
  },
  GETFLOORLIST(state, data) {
    state.floorList = data
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