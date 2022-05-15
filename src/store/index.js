import Vue from "vue"
import Vuex from "vuex"
import HomeAbout from "./home.js"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    HomeAbout
  }
})

export default store