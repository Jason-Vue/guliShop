import axios from "./ajax"

// 首页三级分离
export const reqCategoryList = () => {
  // 结果返回Promise对象
  return axios({
    methods: 'get',
    url: '/product/getBaseCategoryList'
  })
}