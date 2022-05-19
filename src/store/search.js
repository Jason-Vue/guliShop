import {
  reqSearchList
} from "@/api/index"

const state = {
  searchList: {}
};

const actions = {
  // 默认的params至少为空对象
  async getSearchList(context, params = {}) {
    const result = await reqSearchList(params)
    // console.log(result);
    if (result.code == 200) {
      context.commit("GETSEARCHLIST", result.data)
    }
  },
};

const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
};

const getters = {
  goodsList(state) {
    return state.searchList.goodsList
  },
  attrsList(state) {
    return state.searchList.attrsList
  },
  trademarkList(state) {
    return state.searchList.trademarkList
  }
};

const SearchAbout = {
  state,
  actions,
  mutations,
  getters
}

export default SearchAbout