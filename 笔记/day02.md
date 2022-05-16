##1.首页NavType的一级分类移出事件：使用事件委派，可以在全部商品分类依然有背景颜色
##2.控制二三级分类的显示和隐藏
  2.1 方法一：使用css方法：再使用hover方法：display：block
  2.2 方法二：动态添加style方式：:style="{display:(index==currentIndex?'block':'')}"

##3.理解防抖和节流
  3.1 在这里我们使用的是lodash方法，vue原生里面已经封装了lodash，所以可以直接引入使用
  3.2 防抖：前面的所有触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次 
  3.3 节流：在规定的时间间隔范围内不会重复触发回调，只有大于这个事件间隔才会触发回调，把频繁的触发变为少量的触发

##4.点击一，二，三级分类到搜索页面
  4.1 声明式导航:第一种直接router-link写法:会导致很卡
  4.2 使用编程式导航，效率比声明式导航高每个a标签都绑定了事件，那么每个a标签都添加了函数，内存占用还是比较大，效率虽然比声明式导航强，但是还是不够好
  4.3 使用事件委派(事件委托)
    1.怎么确定就是点击的a标签？获取到当前这个事件的节点【dt,dd,h3,a】,需要带有data-categoryName
        的这个自定义属性的这样的节点
    2.即使点击的是a标签，怎么确定是一级a标签，还是二级a标签，还是三级a标签？判断categoryname为真，再根据对象的解构析值看category1id，category2id，category3id分清是一级，二级，三级
    3. 问题:参数怎么携带，要携带哪些参数？
       - 通过data-XXX自定义方法传递属性过来，然后再通过dataset接收属性
       - 定义一个location对象，里面首先放好name属性，再定义一个query对象，query对象里放categoryName属性，然后通过if判断将categoryId属性压入query里，最后再将query对象放进location对象里

##5.在search.vue页面引入NavType页面，因为NavType是全局组件，并且它会在Home和Search页面都使用，但是Home页面里它是一直显示的，而在Search页面它首先是隐藏的，但上去才是显示的。
    5.1 首先我们要显示隐藏要用到v-show或者v-if
    5.2 再者我们用this.$route.path!='/home'做判断，决定是否显示或隐藏
    5.3 我们其实也可以配置路由里面的meta，决定是否显示与隐藏

##6.我们给显示或隐藏做个过渡动画
  过渡和动画前提:组件和元素务必要有v-if|v-show指令才可以进行过渡动画 
   6.1 首先外面包个transition，然后给个name,
   6.2 xx-enter,xx-enter-to,xx-enter-active,xx-leave,xx-leave-to,xx-leave-active

##7.优化typeNav数据ajax请求次数，改变请求的位置
之前我们是在typeNav组件内部dispatch去发送ajax请求,这样的话，因为typeNav是被多个页面公用的，所以每次切换一个页面，这个组件都会重新创建，mounted都会执行，因此有几个页面公用了typeNav就会执行几次ajax请求，所以我们放到APP里面就只用执行一次，因为数据一样，没必要多次请求  

##8.合并params和query参数
   找到对应组件

点击search按钮的时候，去看看有没有query参数

点击类别选项的时候，去看看有没有params参数

注意:我们点击搜索的时候关键字使用的是params参数

        点击类别选项的时候我们的参数使用的是query参数

    

