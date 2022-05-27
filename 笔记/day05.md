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

##3.注意详情页里面的放大镜效果和轮播图

##4.销售属性点击选中事件

##5.加入购物车的加减事件


##6.消除控制台报错，虽然不解决也不影响，但是还是这样写解决错误
//当请求的数据回来skuInfo才会是真正的对象
    //当请求的数据没回来skuInfo就是undefined
    //这里或一个{}，目的就是为了不给组件传递undefined,否则使用skuInfo.xxx就会报错
    //因此我们这里或一个{}, 即使数据没获取回来，但是我们给组件的不是undefined，保证不会出错
```
// 为简化数据而生
const getters = {
  categoryView(state) {
    // 因为下面的state.detailList读取的可能是个空对象，就不能读取categoryView这个属性。所以至少给个空对象
    return state.detailList.categoryView || {}
  },
  skuInfo(state) {
    return state.detailList.skuInfo || {}
  },
  //3.计算出售卖属性
  spuSaleAttrList(state) {
    return state.detailList.spuSaleAttrList || []
  }
};
```