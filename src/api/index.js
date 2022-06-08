import axios from "./ajax"
// 引入mockjs封装的ajax请求
import mockRequest from "./ajaxMock"

// 1.首页三级分离
export const reqCategoryList = () => {
  // 结果返回Promise对象
  return axios({
    method: 'get',
    url: '/product/getBaseCategoryList'
  })
}

// 2.首页轮播图的资源
export const reqBannerList = () => mockRequest.get('/banner')

// 3.首页floor的资源
export const reqFloorList = () => mockRequest.get('/floor')

// 4.请求搜索页search数据
// 这里调用reqSearchList方法时必须要传递对象（ 或者是空对象， 不然请求会出错）
export const reqSearchList = (params) => {
  return axios({
    // 就因为这里的method写成了methods,找bug找了一个小时
    method: "post",
    url: '/list',
    data: params || {}
  })
}

// 5.请求详情页的Detail数据
export const reqDetailList = (skuId) => {
  return axios({
    method: 'get',
    url: `/item/${ skuId }`
  })
}


// 6.详情页加入购物车的接口(购物车获取更新某一个产品的的个数)
// /api/cart/addToCart/{ skuId }/{ skuNum }     post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  // console.log(skuId, skuNum);
  return axios({
    url: `/cart/addToCart/${ skuId }/${ skuNum }`,
    method: "post"
  })
}


// 7.获取购物车数据接口
// /api/cart/cartList   get
export const reqCartList = () => {
  return axios({
    url: "/cart/cartList",
    method: 'get'
  })
}


// 8.删除一条购物车的数据 
// /api/cart/deleteCart/{skuId}  delete
export const reqDeleteShopById = (skuId) => {
  return axios({
    method: 'delete',
    url: `/cart/deleteCart/${skuId}`
  })
}

// 9.修改购物车选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqUpdateCheckedById = (skuID, isChecked) => {
  return axios({
    method: 'get',
    url: `cart/checkCart/${skuID}/${isChecked}`
  })
}


// 10.注册获取验证码
// /api/user/passport/sendCode/{phone}    get
export const reqRegisterPhoneCode = (phone) => axios({
  method: 'get',
  url: `/user/passport/sendCode/${phone}`
})

// 11.注册用户
// /api/user/passport/register    post     
// phone
// password
// code
export const reqRegister = (user) => axios({
  method: 'post',
  url: '/user/passport/register',
  data: user
})


// 12.用户登录
// /api/user/passport/login   post
// phone
// password
export const reqUserLogin = (data) => axios({
  method: 'post',
  url: '/user/passport/login',
  data: data
})


// 13.获取用户信息
// 修改的：
// 添加了token校验获取用户登录信息， 用户登录只保存用户的token
// token校验
// http: //182.92.128.115/api/user/passport/auth/getUserInfo
export const reqUserInfo = () => axios({
  method: 'get',
  url: 'user/passport/auth/getUserInfo'
})


// 14.退出登录
// /api/user/passport/logout   get
export const reqLoginOut = () => {
  return axios({
    method: 'get',
    url: '/user/passport/logout'
  })
}