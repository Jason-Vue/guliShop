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