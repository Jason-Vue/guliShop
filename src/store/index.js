import Vue from "vue"
import Vuex from "vuex"
import HomeAbout from "./home.js"
import SearchAbout from "./search"
import DetailAbout from "./detail"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    HomeAbout,
    SearchAbout,
    DetailAbout
  }
})

export default store