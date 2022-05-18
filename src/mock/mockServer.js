//1.先引入mockjs模块
import Mock from "mockjs";

// 2.再引入JSON数据
// 小知识点：JSON数据没有向外面暴露，但是我们可以用到(因为JSON数据，图片资源是默认向外面暴露的)
import banner from './banner.json'
import floor from './floor.json'

// 3.使用mock
Mock.mock("/mock/banner", {
  code: 200,
  data: banner
})

Mock.mock('/mock/floor', {
  code: 200,
  data: floor
})