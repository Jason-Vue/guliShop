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
  },
  // 4.删除全部勾选的商品
  deleteAllCheckedCart({
    dispatch,
    getters
  }) {
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch("deleteShopList", item.skuId) : ''
      // 将每一次返回的promise结果放进数组里
      promiseAll.push(promise)
    });
    // 只要全部的p1|p2...都成功，返回结果就是成功，只要有一个失败就是失败
    return Promise.all(promiseAll)
  },
  // 5.购物车全选事件
  checkAll(context, isChecked) {
    isChecked = isChecked == true ? '1' : '0';
    let promiseAll = [];
    context.getters.cartList.cartInfoList.forEach((item) => {
      let promise = context.dispatch("updateCheckedById", {
        skuId: item.skuId,
        isChecked: isChecked
      })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
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