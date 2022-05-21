import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router/index"
import store from "@/store/index.js"

// 全局组件
import NavType from "@/components/NavType"
import Pagination from "@/components/Pagination"
Vue.component('Nav-type', NavType)
Vue.component('Pagination', Pagination)

// 引入mock.js
import "@/mock/mockServer"
// 引入首页轮播图样式
import "swiper/css/swiper.css"

// import "@/api/test"

// import {
//   reqSearchList
// } from "@/api/index"
// console.log(reqSearchList());

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')