import {
  reqCartList,
  reqDeleteShopById,
  reqUpdateCheckedById
} from "@/api/index"
const state = {
  cartList: []
}

const mutations = {
  GETSHOPCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  async getShopCartList({
    commit
  }) {
    const result = await reqCartList();
    // console.log(result);
    if (result.code == 200) {
      commit("GETSHOPCARTLIST", result.data)
    }
  },
  async deleteShopList({
    commit
  }, skuId) {
    const result = await reqDeleteShopById(skuId);
    if (result.code == 200) {
      return "删除购物车数据成功"
    } else {
      return Promise.reject(new Error('购物车删除失败'))
    }
  },
  // 3.修改购物车的某一个商品的选中状态
  async updateCheckedById({
    commit
  }, {
    skuId,
    isChecked
  }) {
    const result = await reqUpdateCheckedById(skuId, isChecked);
    if (result.code == 200) {
      return "购物车修改某一个商品选中状态成功"
    } else {
      return Promise.reject(new Error('购物车修改某一商品的选中状态失败'))
    }
  }
}

const getters = {
  cartList(state) {
    //给一个空对象避免是undefined
    return state.cartList[0] || {}
  }
}

const shopCartAbout = {
  state,
  mutations,
  actions,
  getters
}

export default shopCartAbout