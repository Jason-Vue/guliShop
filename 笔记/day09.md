#交易页面

## 1.同意的登录账号 13700000000 111111

## 2.获取交易页面的地址前提是:需要登录后，才能看到

## 3.展示trade页面数据
   ### 1.用户地址接口
   ### 2.订单信息


   # 12.交易(Trade)页面

## 一.交易完成页面

![screencapture-localhost-8010-2022-07-19-00_50_00](12.交易页面.assets/screencapture-localhost-8010-2022-07-19-00_50_00.png)

## 二.获取用户地址信息接口

url

```
/api/user/userAddress/auth/findUserAddressList
```

method

```
get
```

![image-20220719005851230](12.交易页面.assets/image-20220719005851230.png)

### 2.1 ==是否勾选默认收件人和是否显示默认地址==

```
<div
        class="address clearFix"
        v-for="(address, index) in addressInfo"
        :key="address.id"
      >
        <span class="username" :class="{ selected: address.isDefault == 1 }">{{
          address.consignee
        }}</span>
        <p @click="changeDefault(address, addressInfo)">
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-show="address.isDefault == 1">默认地址</span>
        </p>
      </div>
```

### 2.2 将来要提交的地址显示

![image-20220719010155908](12.交易页面.assets/image-20220719010155908.png)

```
 computed: {
    ...mapState({
      addressInfo: (state) => state.TradeAbout.addressInfo,
      orderInfo: (state) => state.TradeAbout.orderInfo,
    }),
    // 1.将来提交的地址
    userDefaultAddress() {
      return this.addressInfo.find((item) => item.isDefault == 1) || {};
    },
  },
```

### 2.3 更改默认事件

![GIF 2022-7-19 星期二 1-10-14](12.交易页面.assets/GIF 2022-7-19 星期二 1-10-14.gif)

==采用排他思想解决==

```
methods: {
    // 1.修改默认地址(排他性思想)
    changeDefault(address, addressInfo) {
      //1.1 全部的item.isDefault=0
      addressInfo.forEach((element) => {
        return (element.isDefault = 0);
      });
      //1.2 你点的那个才为一
      address.isDefault = 1;
    },
  },
```

## 三.请求用户订单信息

### 3.1接口

url

```
/api/order/auth/trade
```

method

```
get
```

返回数据

```
{
    "code": 200,
    "message": "成功",
    "data": {
       "totalAmount": 23996,
       "userAddressList": [
            {
                "id": 2,
                "userAddress": "北京市昌平区2",
                "userId": 2,
                "consignee": "admin",
                "phoneNum": "15011111111",
                "isDefault": "1"
            }
        ],
        "tradeNo": "1b23c1efc8144bfc83e51807f4e71d3a",
        "totalNum": 1,
        "detailArrayList": [
            {
                "id": null,
                "orderId": null,
                "skuId": 4,
                "skuName": "Apple iPhone 11 移动联通电信4G手机 双卡双待",
                "imgUrl": "http://192.168.200.128:8080/RLOAElEmAATrIT-1J9Q110.jpg",
                "orderPrice": 5999,
                "skuNum": 4,
                "hasStock": null
            }
        ]
    },
    "ok": true
}
```

### 3.2 用户订单信息展示

![image-20220719011440927](12.交易页面.assets/image-20220719011440927.png)

## 四.用户留言

![image-20220719011634954](12.交易页面.assets/image-20220719011634954.png)

## 五.将要提交的信息

![image-20220719011659956](12.交易页面.assets/image-20220719011659956.png)

提交的信息要展示，这都是接口返回的数据，不用自己计算