import Vue from "vue"
import Router from "vue-router"
import routes from "./routes"
import store from "@/store/index"
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

// 前置路由守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  /* 
  to:获取要跳转的路由信息
  from:获取从哪个路由跳转过来的信息
  next:next()|next(path)放行
  */
  next()
  // console.log(store);
  // 获取仓库中的token-可以确定用户是否登录了
  let token = store.state.UserAbout.token
  // 获取仓库中的userInfo,但是它是一个对象。对象不管为不为空，布尔值都是true.所以拿它里面的name
  let name = store.state.UserAbout.userInfo.name;
  // console.log(token);
  // 1.用户登录
  if (token) {
    // 1.1 用户已经登录还想去登录
    if (to.path == '/login' || to.path == "/register") {
      next('/')
    } else {
      // 1.2 用户已经登录，放行，但是前提得是已经获取用户信息--确保userInfo有值，能获取用户信息
      if (name) {
        // 1.2.1 获取到name，说明仓库里面有userInfo,直接放行
        next()
      } else {
        // 1.2.2 没有获取到name,先获取用户信息，再放行
        // 1.2.2.1 在路由跳转之前获取用户信息，在放行
        try {
          await store.dispatch('getUserInfo');
          next()
        } catch (error) {
          // 1.2.2.2 token失效了，需要重新登录。--需要退出登录
          await store.dispatch('UserLogOut');
          next('/login')
        }
      }
    }
  } else {
    // 2.用户未登录
    next()
  }
})

export default router