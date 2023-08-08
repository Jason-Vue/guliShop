import Vue from "vue";
import App from "./App.vue";
// 引入路由
import router from "@/router/index";
import store from "@/store/index.js";

// 引入element-ui
import "@/utils/element";

// 全局组件
import NavType from "@/components/NavType";
import Pagination from "@/components/Pagination";
Vue.component("Nav-type", NavType);
Vue.component("Pagination", Pagination);

// 引入mock.js
import "@/mock/mockServer";
// 引入首页轮播图样式
import "swiper/css/swiper.css";

// 统一接口API文件夹里面的全部请求函数
import * as API from "@/api/index.js";

// 使用懒加载
import VueLazyload from "vue-lazyload";
import time from "@/assets/timg.png";
Vue.use(VueLazyload, {
  loading: time,
});

// import "@/api/test"
// import {
//   reqSearchList
// } from "@/api/index"
// console.log(reqSearchList());

Vue.config.productionTip = false;

// console.log('当前地址', process.env.VUE_APP_URL)

new Vue({
  render: (h) => h(App),
  router: router,
  store: store,
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
}).$mount("#app");
