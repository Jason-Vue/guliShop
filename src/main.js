import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from "@/router/index"

// 全局组件
import NavType from "@/components/NavType"
Vue.component('Nav-type', NavType)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')