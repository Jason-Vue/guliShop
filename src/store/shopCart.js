import {
  reqCartList
} from "@/api/index"
const state = {

}

const mutations = {

}

const actions = {
  async getShopCartList() {
    const result = await reqCartList();
    console.log(result);
  }
}

const getters = {

}

const shopCartAbout = {
  state,
  mutations,
  actions,
  getters
}

export default shopCartAbout