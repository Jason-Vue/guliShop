#加入购物车成功页面

##1. 点击加入购物车是跳转到购物车成功页面
1.1 正常的情况下:我们可以通过编程式导航的query参数的形式携带参数
```
this.$router.push({
  name: 'addCartSuccess', query: {
    skuNum: this.skuNum,
    skuInfo: this.skuInfo
  }
})
```
但是问题就在这个skuInfo上面，因为它是一个对象，我们通过query的形式传递参数时，在地址栏里面看不到参数的本来样子
虽然这样写参数是可以传过去的

1.2 我们一般不这样写：我们可以使用本地存储或者会话存储的方式来传递
这里我们使用sessionStorage的方式存储:因为这个skuInfo只需要使用一次，会话结束就可以销毁。
```
 sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo))
  this.$router.push({
    name: 'addCartSuccess', query: {
      skuNum: this.skuNum,
      // skuInfo: this.skuInfo
    }
  })
```

## 2.2  从详情页向加入购物车成功页面跳转的数据请求

#### 2.2.1 这个请求的特殊之处在于请求成功了,后台返回的data里面是null,它并不像其余的接口返回数据，然后我们需要在vuex里面进行三连环

#### 2.2.2 那这个接口是如何工作的呢？

- *发请求--将产品加入到数据库*
- *服务器存储成功---路由跳转*
- *失败，给用户进行提示*

#### 2.2.3 我们如何判断加入购物车成功或者失败呢？

可以通过请求方法返回的Promise状态决定

成功的话：Promise成功状态，路由跳转，路由传参

失败的话:promise失败:reject，抛出错误

detail.js

```
 // 2.详情页添加到购物车
  async addOrUpdateShopCart({
    commit
  }, {
    skuNum,
    skuId
  }) {
    // console.log(skuNum, skuId);
    // 加入购物车前端带一些数据给服务器【服务器存储一些数据】，不需要三连环，没有返回数据
    const result = await reqAddOrUpdateShopCart(parseInt(skuId), parseInt(skuNum));
    // console.log(result);
    // async返回的一定是一个Promise(要么成功，要么失败)
    if (result.code == 201) {
      return "加入购物车ok"
    } else {
      return Promise.reject(new Error("加入购物车fail"))
    }
  }
};
```

detail.vue里面的methods

```
 //3.点击或者更新购物车事件
    async addOrUpdateShopCart () {
      /* 
      1.发请求--将产品加入到数据库
      2.服务器存储成功---路由跳转
      3.失败，给用户进行提示
      */
      //  一.再点击加入购物车之前，做的第一件事情：就是将参数带给服务器(发请求),通知服务器加入购物车的产品是谁
      // await this.$store.dispatch("addOrUpdateShopCart", { skuNum: this.skuNum, skuId: this.$route.params.skuid })
      // 二.你需要知道这次请求是否成功还是失败，如果成功进行路由跳转，如果失败，需要给用户提示
      try {
        await this.$store.dispatch("addOrUpdateShopCart", { skuNum: this.skuNum, skuId: this.$route.params.skuid })
        // 成功
        // 三.路由跳转，路由传参
        // 3.1 本来可以通过这种query的方式将需要的参数带过去，但是skuInfo是对象，它在地址栏里面的显示看不到参数
        // 3.2 使用回话存储技术:一般存储的就是字符串
        // sessionStorage.setItem("SKUINFO", JSON.stringify(this.skuInfo))
        this.$router.push({
          name: 'addCartSuccess', query: {
            skuNum: this.skuNum,
            // skuInfo: this.skuInfo
          }
        })
      } catch (error) {
        // 失败
        alert(error.message)
      }
    }
```

