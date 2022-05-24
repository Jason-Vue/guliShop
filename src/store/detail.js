import {
  reqDetailList
} from "@/api/index"

const state = {
  detailList: {}
};

const mutations = {
  GETDETAILLIST(state, data) {
    // console.log(state, data);
    state.detailList = data
  }
};

const actions = {
  async getDetailList(context, skuid) {
    const result = await reqDetailList(skuid);
    if (result.code == 200) {
      context.commit("GETDETAILLIST", result.data);
    }
  }
};

// 为简化数据而生
const getters = {
  categoryView(state) {
    // 因为下面的state.detailList读取的可能是个空对象，就不能读取categoryView这个属性。所以至少给个空对象
    return state.detailList.categoryView || {}
  },
  skuInfo(state) {
    return state.detailList.skuInfo || {}
  },
  //3.计算出售卖属性
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || []
  }
};

const DetailAbout = {
  state,
  mutations,
  actions,
  getters
}

export default DetailAbout