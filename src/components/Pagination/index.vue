<template>
  <div class="pagination">
    <!-- 上一页这个按钮不是什么时候都能点击，当当前页为第一页的时候，那么就应该禁用不能点击 -->
    <button :disabled="pageNo==1"
            @click="changeNum(pageNo-1)">上一页</button>
    <!-- 1这个按钮不是永远显示的，因为下面会显示连续页码,如果连续页码为1-5，那么这个1就不要了，要不就重复了-->
    <!-- 不等于1就是大于1 -->
    <button v-if="startAndEnd.start>1"
            @click="changeNum(1)">1</button>
    <!--三个点也不是永远可以现实的,...是大于二的时候永远显示-->
    <button v-if="startAndEnd.start>2">···</button>
    <!-- 这里是用来显示连续页码 -->
    <!-- v-for不仅可以遍历一个数组，还可以遍历一个数字 -->
    <!-- v-if和v-for可以同时使用,v-for比v-if的优先级高 （面试题原题）-->
    <button v-for="(page,index) in startAndEnd.end"
            :key="index"
            v-if="page>=startAndEnd.start"
            :class="{active:pageNo==page}"
            @click="changeNum(page)">{{page}}</button>

    <button v-if="startAndEnd.end<totalPage-1"
            @click="changeNum(page)">···</button>
    <button v-if="startAndEnd.end<totalPage"
            @click="changeNum(totalPage)">{{totalPage}}</button>
    <button :disabled="pageNo===totalPage"
            @click="changeNum(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{total}}条</button>
    {{startAndEnd.start}}--{{startAndEnd.end}}--{{pageNo}}-{{pageSize}}
  </div>
</template>

<script>
/* 
一.分页器需要哪些数据？
  1.total:数据总条数，父组件给
  2.pageSize:每页展示多少条？父组件给
  3.totalPage:总共是多少页面。可以根据total和pageSize算出来
  4.pageNo:当前是第几页？父组件给
  5.continueNum:连续页码。父组件给
二.除了总页数可以自己算出来，其余四项必须父组件给

*/
export default {
  data () {
    return {

    }
  },
  props: ['pageNo', 'total', 'pageSize', 'continueNum', 'totalPage'],
  computed: {
    // 1.总共页码数(其实后台已经给了totalPage的接口数据，不用我们自己在这里算出来)
    // totalPage () {
    //   return Math.ceil(this.total / this.pageSize)
    // },
    // 2.计算continueNum的起始和结束
    startAndEnd () {
      let { pageNo, continueNum, totalPage } = this;
      console.log("当前页码" + pageNo, '连续页' + continueNum);
      let start = 0, end = 0;
      start = pageNo - Math.floor(continueNum / 2);
      end = pageNo + Math.floor(continueNum / 2);
      // 1.当连续页就比总页数大时
      if (continueNum >= totalPage) {
        start = 1;
        end = totalPage
      } else {
        // 2.连续页不比总页数大
        // 2.1 情况正常时
        start = pageNo - Math.floor(continueNum / 2);
        end = pageNo + Math.floor(continueNum / 2);
        // 2.2 当起始页码小于等于一时
        if (start <= 1) {
          console.log('我走了');
          start = 1;
          end = continueNum
        }
        // 2.3 当结束页码大于等于totalPage时
        if (end >= totalPage) {
          console.log('我也走了');
          end = totalPage;
          start = totalPage - continueNum + 1
        }
      }
      console.log(start, end);
      return { start, end }
    }
  },
  methods: {
    // 1.改变页码点击事件
    changeNum (page) {
      this.$emit('changePageNum', page)
    }
  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>