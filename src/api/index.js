import axios from "./ajax"
// 引入mockjs封装的ajax请求
import mockRequest from "./ajaxMock"

// 1.首页三级分离
export const reqCategoryList = () => {
  // 结果返回Promise对象
  return axios({
    methods: 'get',
    url: '/product/getBaseCategoryList'
  })
}

// 2.首页轮播图的资源
export const reqBannerList = () => mockRequest.get('/banner')

// 3.首页floor的资源
export const reqFloorList = () => mockRequest.get('/floor')