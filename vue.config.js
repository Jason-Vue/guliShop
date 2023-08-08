const {
  defineConfig
} = require('@vue/cli-service')

const path = require('path') //导入路径插件
// production 生产环境   development 本地环境
let isProduction = process.env.NODE_ENV == 'production',  //判断当前的环境
  baseUrl; //定义baseUrl
if (isProduction) {
  // 生产环境
  baseUrl = process.env.VUE_APP_URL  //当前就是生产环境baseUrl的地址
} else {
  baseUrl = process.env.VUE_APP_URL //当前就是开发环境baseUrl的地址
}


module.exports = defineConfig({
  //基本路径
  // publicPath: './',
  //默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
  // 输出文件目录
  // outputDir: 'dist',
  // assetsDir: 'src',
  // indexPath: 'index.html',

  publicPath: './', //./：相对路径，history.pushState时避免使用相对路径
  // 当前配置就是打包后输出的文件夹，以便区分，所以做如下配置
  outputDir: process.env.NODE_ENV == "development" ? "test" : "dist", // 打包生成目录

  transpileDependencies: true,
  // 关闭Eslint
  lintOnSave: false,
  // 配置跨域代理
  devServer: {
    proxy: {
      '^/api': { // 只对请求路由以/api开头的请求进行代理转发 // '^/api'别名（你的接口是以什么开头的就更换成什么，例如：^/orrce）
        // target: 'http://api.atguigu.cn', // 转发的目标url
        // target: 'http://gmall-h5-api.atguigu.cn', // 转发的目标url
        target: baseUrl,
        WS: true,// 是否允许跨域
        changeOrigin: true, // 支持跨域
        // pathRewrite: {
        //   '^/api': ''
        // },
        hot: true, //保存实时刷新
      }
    }
  }
})