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
   
6.在search页面首页把SearchParams参数对象整理好，使用的方法时**Object.assign()**整理好参数
7.==从home页面可以通过点击三级分类或直接搜索按钮到search页面，但是在search页面不能再搜索了？==
  答：
  **1.因为我们在search页面里是在mounted()里面发的请求，在beforeMounted里面整理的数据，这两个生命周期都只能执行一次。
  2.我们观察每次点击路由都在发生变化，所以我们用watch监视路由发生变化，在WACTH里整理数据和发送请求**

8. 通过Vuex里面search模块将tradeMarkList和attrsList给searchSelector组件，将数据遍历渲染在组件上
9. 将平台属性展示到面包屑上
10. 
 