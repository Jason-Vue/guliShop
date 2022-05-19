#谷粒商城
>1.已经完成了Home页面的开发，除了没有将轮播图进行封装
>2.现在开发Search页面
##1.开发search页面的步骤：
1.将静态页面拆分为合适的组件
2.找到Search页面的接口，进行接口请求
3.在Vuex里面进行三板斧
  3.1 在search里面进行dispatch操作
  3.2 actions里面引入请求数据
  3.3 mutations里面修改state数据
4.注意:api封装的axios请求：里面的method就应该是method，不是methods，因为写错了，找了半天的bug
5. this.$store.dispatch("getSearchList", {})发送搜索请求时要传一个空对象过去，才能获取后台数据
   
 