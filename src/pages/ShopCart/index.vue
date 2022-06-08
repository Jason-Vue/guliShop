<template>
  <div>
    <Nav-type></Nav-type>
    <div class="cart">
      <h4>全部商品</h4>
      <div class="cart-main">
        <div class="cart-th">
          <div class="cart-th1">全部</div>
          <div class="cart-th2">商品</div>
          <div class="cart-th3">单价（元）</div>
          <div class="cart-th4">数量</div>
          <div class="cart-th5">小计（元）</div>
          <div class="cart-th6">操作</div>
        </div>
        <div class="cart-body">

          <ul class="cart-list"
              v-for="(cart,index) in cartInfoList"
              :key="cart.id">
            <li class="cart-list-con1">
              <input type="checkbox"
                     name="chk_list"
                     :checked="cart.isChecked==1"
                     @change="updateCheck(cart,$event)">
            </li>
            <li class="cart-list-con2">
              <img :src="cart.imgUrl">
              <div class="item-msg">{{cart.skuName}}</div>
            </li>

            <li class="cart-list-con4">
              <span class="price">{{cart.cartPrice}}.00</span>
            </li>
            <li class="cart-list-con5">
              <a href="javascript:void(0)"
                 class="mins"
                 @click="handler('minus',-1,cart)">-</a>
              <input autocomplete="off"
                     type="text"
                     :value="cart.skuNum"
                     minnum="1"
                     class="itxt"
                     @change="handler('change',$event.target.value*1,cart)">
              <a href="javascript:void(0)"
                 class="plus"
                 @click="handler('add',1,cart)">+</a>
            </li>
            <li class="cart-list-con6">
              <span class="sum">{{cart.skuNum*cart.cartPrice}}</span>
            </li>
            <li class="cart-list-con7">
              <a class="sindelet"
                 @click="deleteShopList(cart)">删除</a>
              <br>
              <a href="#none">移到收藏</a>
            </li>
          </ul>

        </div>
      </div>
      <div class="cart-tool">
        <div class="select-all">
          <input class="chooseAll"
                 type="checkbox"
                 :checked="isAllChecked&&cartInfoList.length>0"
                 @change="checkAll">
          <span>全选</span>
        </div>
        <div class="option">
          <a @click="deleteCheckAll">删除选中的商品</a>
          <a href="#none">移到我的关注</a>
          <a href="#none">清除下柜商品</a>
        </div>
        <div class="money-box">
          <div class="chosed">已选择
            <span>0</span>件商品
          </div>
          <div class="sumprice">
            <em>总价（不含运费):</em>
            <i class="summoney">{{totalPrice}}</i>
          </div>
          <div class="sumbtn">
            <!-- <a class="sum-btn"
               target="_blank"
               @click="$router.push('/trade')">结算</a> -->
            <router-link class="sum-btn"
                         to="/trade">结算</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import throttle from 'lodash/throttle'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['cartList']),
    // 1.返回cartInfoList，处理下返回数组
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    // 2.计算商品的总价
    totalPrice () {
      // 也可以使用数组reduce方法
      let sum = 0;
      this.cartInfoList.forEach(cart => {
        sum += cart.skuNum * cart.cartPrice
      });
      return sum
    },
    // 3.判断多选框是否全部勾选或者不勾
    isAllChecked () {
      // 遍历全部的数组里面的元素的isChecked属性都是1==>返回true;只要有一个不为1,返回false
      return this.cartInfoList.every((item) => {
        return item.isChecked == 1
      })
    }
  },
  methods: {
    // 1.获取购物车数据
    getShopData () {
      this.$store.dispatch("getShopCartList");
    },
    // 2.处理购物车里的商品数量增加或减少事件
    handler: throttle(async function (type, disNum, cart) {
      // type:为了区分三个元素
      // disNum:目前disNum形参代表: +(变化量),-(变化量),input传入的量(并不是变化量)
      // cart:哪一个产品身上有ID
      // console.log(type, disNum, cart);
      // 2.1 向服务器发送请求，修改数量
      switch (type) {
        case "add":
          disNum = 1;
          break;
        case "minus":
          // 如果购物车里的商品数量大于一,disNum为1;如果是小于等于一，disNum为0(原封不动)
          // if (cart.skuNum > 1) {
          //   disNum = -1;
          // } else {
          //   disNum = 0
          // }
          disNum = cart.skuNum > 1 ? -1 : 0
          break;
        case "change":
          // 如果传过来的数值是非法的，或者disNum<0;那么disNum就是0,不变化
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0
          } else {
            // 传过来的disNum是正数，但是有可能是小数，所以需要处理下
            // disNum应该是传过来的数值减去数据库里面的skuNum才是最终的值
            disNum = parseInt(disNum) - cart.skuNum
          }
          break;
      }
      // 2.2 派发actions
      try {
        // 2.3 代表修改成功
        const result = await this.$store.dispatch("addOrUpdateShopCart", { skuId: cart.skuId, skuNum: disNum });
        // console.log(result);
        // 2.4 再一次获取服务器最新的数据进行展示
        this.getShopData()
      } catch (error) {
        alert(error.message)
      }
    }, 1000),
    // async handler (type, disNum, cart) {
    //   // type:为了区分三个元素
    //   // disNum:目前disNum形参代表: +(变化量),-(变化量),input传入的量(并不是变化量)
    //   // cart:哪一个产品身上有ID
    //   // console.log(type, disNum, cart);
    //   // 2.1 向服务器发送请求，修改数量
    //   switch (type) {
    //     case "add":
    //       disNum = 1;
    //       break;
    //     case "minus":
    //       // 如果购物车里的商品数量大于一,disNum为1;如果是小于等于一，disNum为0(原封不动)
    //       // if (cart.skuNum > 1) {
    //       //   disNum = -1;
    //       // } else {
    //       //   disNum = 0
    //       // }
    //       disNum = cart.skuNum > 1 ? -1 : 0
    //       break;
    //     case "change":
    //       // 如果传过来的数值是非法的，或者disNum<0;那么disNum就是0,不变化
    //       if (isNaN(disNum) || disNum < 1) {
    //         disNum = 0
    //       } else {
    //         // 传过来的disNum是正数，但是有可能是小数，所以需要处理下
    //         // disNum应该是传过来的数值减去数据库里面的skuNum才是最终的值
    //         disNum = parseInt(disNum) - cart.skuNum
    //       }
    //       break;
    //   }
    //   // 2.2 派发actions
    //   try {
    //     // 2.3 代表修改成功
    //     const result = await this.$store.dispatch("addOrUpdateShopCart", { skuId: cart.skuId, skuNum: disNum });
    //     // console.log(result);
    //     // 2.4 再一次获取服务器最新的数据进行展示
    //     this.getShopData()
    //   } catch (error) {
    //     alert(error.message)
    //   }
    // },
    // 3.删除购物车数据
    async deleteShopList (cart) {
      try {
        // 如果请求成功，再次发请求
        // 这里删除的是skuId不是id，别搞错了
        const result = await this.$store.dispatch("deleteShopList", cart.skuId);
        // console.log(result);
        this.getShopData()
      } catch (error) {
        // 请求失败
        alert(error.message)
      }
    },
    // 4.修改购物车选中状态
    async updateCheck (cart, event) {
      try {
        // console.log(cart, event.target.checked);
        // 因为isChecked带给服务器的是字符串1或者0
        let isChecked = event.target.checked ? "1" : "0"
        const result = await this.$store.dispatch("updateCheckedById", { skuId: cart.skuId, isChecked: isChecked });
        // 请求成功，再次请求数据
        this.getShopData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 6.删除多个购物车数据
    async deleteCheckAll () {
      try {
        await this.$store.dispatch("deleteAllCheckedCart")
        this.getShopData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 7.购物车全选
    async checkAll (event) {
      try {
        await this.$store.dispatch("checkAll", event.target.checked);
        this.getShopData()
      } catch (error) {
        alert(error.message)
      }
    }

  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.getShopData()
  }
}
</script>
<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        // .cart-list-con3 {
        //   width: 2%;
        //   .item-txt {
        //     text-align: center;
        //   }
        // }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }
          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }
        .cart-list-con6 {
          width: 10%;
          .sum {
            font-size: 16px;
          }
        }
        .cart-list-con7 {
          width: 13%;
          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;
    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;
      span {
        vertical-align: middle;
      }
      input {
        vertical-align: middle;
      }
    }
    .option {
      padding: 10px;
      overflow: hidden;
      float: left;
      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }
    .money-box {
      float: right;
      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }
      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;
        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }
      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>