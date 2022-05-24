import Vue from "vue"
import Router from "vue-router"

import routes from "./routes"

Vue.use(Router)


const router = new Router({
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return {
      x: 0,
      y: 0
    }
  },
})

export default router