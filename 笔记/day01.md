谷粒商城(第一天)

(1)创建my-gulishop项目

(2)因为使用css样式，安装了less less-loader

(3)jsconfig.js配置文件里配置src的别名
    vue.config.js里配置关闭ESlint

(4).要用到路由
  4.1 安装路由；npm install vue-router --save
  4.2 使用路由

(5).拆分首页(Home)页面,将Home页面拆分为很多小组件
    5.1 其中NavType组件要在Home,Search,Detail里都要用，所以注册为全局组件  
    5.2 其余组件都是Home组件独有，所以注册为局部组件

(6).axios(二次封装数据请求)
    6.1 安装axios
    6.2 使用axios.create({
          baseURL:"/api",
          timeout:1000
      })创建一个instance实例
    6.3 使用请求和响应拦截器，导出实例
    6.4 专门封装一个index.js管理数据请求，返回一个promise，在需要使用的页面里import导入使用
    6.5 尤其要主要async和await的使用：异步请求的终极办法     
    6.6 在这里要解决跨域的问题：在这里我们使用的是Vue-cli的方法，配置vue.config.js里面的devServer,里面有proxy配置

(7).使用了Nprogress进度条插件
    Nprogress.start()是开启进度条
    Nprogress.done()是进度条完成
    在请求和响应拦截器里使用

(7).使用了状态管理(Vuex)保存数据
   7.1 首先要使用模块化(modules)
   7.2 将三级分类(typeNavList)数据放到Vuex，我们先把它放到HomeAbout模块里
   7.3 请求三级分类数据将它保存到home.js里的state里，
  
(8).将请求的数据展示到typeNav组件上，首先要进行三级遍历，这里要小心，别遍历错了

(9).typeNav里移上去会添加背景颜色
   9.1 方法一：直接使用hover添加颜色
   9.2 方法二:另外再写一个cur的类，然后动态添加cur这个类，实现添加背景颜色的效果

   
    
   

