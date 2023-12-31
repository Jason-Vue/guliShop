import Vue from "vue"
import Vuex from "vuex"
import HomeAbout from "./home.js"
import SearchAbout from "./search"
import DetailAbout from "./detail"
import ShopCartAbout from "./shopCart"
import UserAbout from "./user"
import TradeAbout from "./trade"
import CenterAbout from "./center"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    HomeAbout,
    SearchAbout,
    DetailAbout,
    ShopCartAbout,
    UserAbout,
    TradeAbout,
    CenterAbout
  }
})

export default store