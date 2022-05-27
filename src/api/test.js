import axios from "axios";

// axios({
//   method: 'post',
//   url: 'http://api.atguigu.cn/api/list',
//   data: {

//   }
// }).then((res) => {
//   console.log(res.data);
// }).catch((err) => {
//   console.log(err);
// })

// axios({
//   method: 'get',
//   url: 'http://api.atguigu.cn/api/product/getBaseCategoryList',
// }).then((res) => {
//   console.log(res.data);
// }).catch((err) => {
//   console.log(err);
// })


// 测试加入购物车接口
axios({
  url: `http://gmall-h5-api.atguigu.cn/api/cart/addToCart/4/1`,
  method: "post"
}).then((res) => {
  console.log(res.data);
}).catch((err) => {
  console.log(err);
})