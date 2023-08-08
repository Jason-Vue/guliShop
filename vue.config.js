const {
  defineConfig
} = require('@vue/cli-service')

module.exports = defineConfig({
  //基本路径
  // publicPath: './',
  //默认的'/'是绝对路径，如果不确定在根路径，改成相对路径'./'
  // 输出文件目录
  // outputDir: 'dist',
  // assetsDir: 'src',
  // indexPath: 'index.html',

  transpileDependencies: true,
  // 关闭Eslint
  lintOnSave: false,
  // 配置跨域代理
  devServer: {
    proxy: {
      '/api': { // 只对请求路由以/api开头的请求进行代理转发
        // target: 'http://api.atguigu.cn', // 转发的目标url
        target: 'http://gmall-h5-api.atguigu.cn', // 转发的目标url
        changeOrigin: true, // 支持跨域
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
})