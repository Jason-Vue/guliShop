import {
  reqDetailList,
  reqAddOrUpdateShopCart
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
  // 1.获取详情页信息
  async getDetailList(context, skuid) {
    const result = await reqDetailList(skuid);
    if (result.code == 200) {
      context.commit("GETDETAILLIST", result.data);
    }
  },
  // 2.详情页添加到购物车
  async addOrUpdateShopCart({
    commit
  }, {
    skuNum,
    skuId
  }) {
    // console.log(skuNum, skuId);
    // 加入购物车前端带一些数据给服务器【服务器存储一些数据】，不需要三连环，没有返回数据
    const result = await reqAddOrUpdateShopCart(parseInt(skuId), parseInt(skuNum));
    // console.log(result);
    // async返回的一定是一个Promise(要么成功，要么失败)
    if (result.code == 201) {
      return "加入购物车ok"
    } else {
      return Promise.reject(new Error("加入购物车fail"))
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