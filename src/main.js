import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router/index"
import store from "@/store/index.js"

// 全局组件
import NavType from "@/components/NavType"
Vue.component('Nav-type', NavType)

// import {
//   reqCategoryList
// } from "@/api"
// reqCategoryList()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store: store
}).$mount('#app')