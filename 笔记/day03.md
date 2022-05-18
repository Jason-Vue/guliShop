##.1.使用mock.js为首页轮播图提供数据
   1.1 首先在src文件夹下创建mock文件夹，
   1.2 第二步准备JSON数据(mock文件夹创建相应的JSON文件)--别留有空格，需要格式化一下
   1.3 书写mockServer.js,通过mock.js模拟数据
   1.4 在入口文件main.js中引入，至少需要调用一次

##2.使用swiper插件完善首页轮播图
    2.1 安装swiper插件
    2.2 引入样式
    2.3 在mounted里面new Swiper({})  
    2.4 数据通过mock.js方法获取

##3. 轮播图显示不正常？
     1.解决办法一:settimeout(()=>{})   
     2.解决办法二：watch+$nextTick(()=>{}),将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。

##4.完成floor页面的开发
    因为floor在home里面是存在两次（之前我们是引用两次）
    现在floor.json里面给了两个floor的对象
    我们需要遍历出来两个object给floor，这样我们不能在floor组件里进行遍历
    应该在Home页面里请求数据，然后通过floor子组件进行遍历，再通过props方法传给floor子组件
    (v-for不仅可以在li,div,dt上进行遍历，也可以在自定义组件上进行遍历)
    
##5.可以将轮播图组件抽出来做成一个全局组件使用，这样轮播图就不用重复写了
    (未完成)    
    