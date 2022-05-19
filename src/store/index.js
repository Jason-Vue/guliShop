import Vue from "vue"
import Vuex from "vuex"
import HomeAbout from "./home.js"
import SearchAbout from "./search"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    HomeAbout,
    SearchAbout
  }
})

export default store