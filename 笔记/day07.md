#购物车页面

##1.布局购物车页面，修改下购物车页面布局
调整css让各个项目对齐:删除第三项，15 35 10 17 10 13

##2.请求购物车的数据
### 2.1 购物车请求数据，vuex里面三连环
发请求没有数据？因为服务器不知道我是谁，获取不到购物车里面的数据

### 2.2 UUID临时游客身份
       封装utils里面的UUID
       localstorage持久化存储

### 2.3 动态展示购物车
       数据格式不完美，需要在getters或者computed里面处理数据格式.

##3.修改产品的个数需要用到【节流】

##4.删除购物车的某一个数据

##5.勾选购物车中选中状态的事件

##6.删除所有选中的购物车数据

##7.勾选多选框

