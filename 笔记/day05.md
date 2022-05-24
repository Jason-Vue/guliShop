#详情页(Detail组件)
##1.处理详情页的步骤
  1.1 拆分详情页静态组件
  1.2 在api里请求详情页的数据资源
  1.3 在vuex里三步骤
  1.4 在search里面dispath触发事件

## 2.在路由里处理滚动行为
```
const router = new VueRouter({
  routes: routes,
  // 配置路由跳转滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})  
```

##3.
