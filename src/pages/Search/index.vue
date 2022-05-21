<!-- 搜索页 -->
<template>
  <div>
    <Nav-type></Nav-type>
    <!--list-content-->
    <div class="main">
      <div class="py-container">
        <!--bread面包屑展示和删除-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 点击三级分类，通过query参数跳转到搜索页，将categoryName展示到面包屑上 -->
            <li v-if="searchParams.categoryName"
                class="with-x">{{searchParams.categoryName}}<i @click="removeCategoryName">x</i></li>
            <!-- 点击头部搜索按钮 ，通过params方式传参跳转到搜索页，将keyword展示到面包屑上-->
            <li v-if="searchParams.keyword"
                class="with-x">{{searchParams.keyword}}<i @click="removeKeyword">x</i></li>
            <!-- 子组件searchSelector里面的点击品牌名,品牌名展示到面包屑上 -->
            <li class="with-x"
                v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">X</i>
            </li>
            <!-- 子组件searchSelector里面点击品台属性名展示在面包屑上 -->
            <li class="with-x"
                v-for="(prop,index) in searchParams.props"
                :key="index">{{prop.split(":")[1]}}<i @click="removeProp(index)">X</i></li>
          </ul>
        </div>
        <!--selector-->
        <search-selector @getTradeMark="getTradeMark"
                         @getProp="getProp"></search-selector>
        <!--details商品页-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <!-- 排序 -->
            <!-- 第二步：再用图标动态显示
            1.用啥图标
            2.图标什么时候出现:和背景色一样，谁有背景色谁就有图标
            3.图标是向上还是向下：和数据类型相关，asc和desc -->
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:isOne}"
                    @click="handleSort('1')">
                  <a>综合<i class="iconfont"
                       v-if="isOne"
                       :class="{iconup:isAsc,icondown:isDesc}"></i></a>
                </li>
                <li :class="{active:isTwo}"
                    @click="handleSort('2')">
                  <a>销量<i class="iconfont"
                       v-if="isTwo"
                       :class="{iconup:isAsc,icondown:isDesc}"></i></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品页 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5"
                  v-for="(goods,index) in goodsList"
                  :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html"
                       target="_blank"><img :src="goods.defaultImg" /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank"
                       href="item.html"
                       :title="goods.title">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html"
                       target="_blank"
                       class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);"
                       class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
        <!--hotsale-->
        <div class="clearfix hot-sale">
          <h4 class="title">热卖商品</h4>
          <div class="hot-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_01.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_03.png" />
                  </div>
                  <div class="attr">
                    <em>金属A面，360°翻转，APP下单省300！</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_04.png" />
                  </div>
                  <div class="attr">
                    <em>256SSD商务大咖，完爆职场，APP下单立减200</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4068.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有20人评价</i>
                  </div>
                </div>
              </li>
              <li class="yui3-u-1-4">
                <div class="list-wrap">
                  <div class="p-img">
                    <img src="./images/search/like_02.png" />
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>4088.00</i>
                    </strong>
                  </div>
                  <div class="commit">
                    <i class="command">已有700人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex"
import SearchSelector from "./SearchSelector.vue"
export default {
  data () {
    return {
      // 搜索参数对象
      searchParams: {
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",
        "keyword": "",
        "order": "2:asc",
        "pageNo": 1,
        "pageSize": 10,
        "props": [],
        "trademark": ""
      }
    }
  },
  components: {
    SearchSelector
  },
  computed: {
    ...mapGetters(['goodsList']),
    //1.商品排序是否是综合排序
    isOne () {
      // console.log(this.searchParams.order.split(':')[0] == 1);
      return this.searchParams.order.split(':')[0] == 1
    },
    isTwo () {
      return this.searchParams.order.split(':')[0] == 2
    },
    isAsc () {
      return this.searchParams.order.split(":")[1] == 'asc'
    },
    isDesc () {
      return this.searchParams.order.split(":")[1] == 'desc'
    }
  },
  methods: {
    // 1.发送请求搜索页数据
    getSearchData (searchParams) {
      // console.log(searchParams);
      this.$store.dispatch("getSearchList", searchParams)
    },
    // 2.移除面包屑里query参数方式展示的categoryName
    removeCategoryName () {
      // 1.将query方式的参数全部清空
      /* 
      其实这里的this.searchParams.categoryName = '';可以改为undefined,这样categoryName
      就不会成为请求的负载，根本不会出现在searchParams的参数里
      */
      this.searchParams.categoryName = '';
      this.searchParams.category1Id = '';
      this.searchParams.category2Id = '';
      this.searchParams.category3Id = '';
      // 2.发送请求
      this.getSearchData(this.searchParams);
      // 3.我们看到网址栏里面的路由不对，所以我们自己跳转自己。并且因为我们是从三级分类以query方式
      // 跳转到搜索页，所以如果路由上有params参数，我们还要保留params参数
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params });
      }
    },
    // 3.移除面包屑里params参数方式展示keyword
    removeKeyword () {
      // 1.清空关键字
      this.searchParams.keyword = '';
      // 2.发送请求
      this.getSearchData(this.searchParams);
      // 3.修改路由地址正确
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
      // 4.我们上面清空的关键字只是清空了searchParams里面的关键字，我们现在要清空的是在Header
      // 组件里面的input框里面的文字，这里因为输入不同层级的组件，这里我们使用eventbus(全局事件总线)进行通信
      this.$bus.$emit("removeKw")
    },
    // 4.向子组件searchSelector传递自定义函数
    getTradeMark (params) {
      // 1.整理searchParams
      this.searchParams.trademark = `${params.tmId}:${params.tmName}`;
      // 2.发送请求
      this.getSearchData(this.searchParams)
    },
    // 5.移除面包屑上的品牌名
    removeTradeMark () {
      // 清空关键字
      this.searchParams.trademark = undefined;
      // 发送请求
      this.getSearchData(this.searchParams);
    },
    // 6.获取平台属性回调函数
    getProp (attr, propName) {
      // 商品属性的数组: ["属性ID:属性值:属性名"]
      // ["2:6.0～6.24英寸:屏幕尺寸"]
      // console.log(attr, propName);
      let attrName = `${attr.attrId}:${propName}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(attrName) == -1) {
        this.searchParams.props.push(attrName);
      }
      this.getSearchData(this.searchParams)
    },
    // 7.移除平台属性事件
    removeProp (index) {
      // 从数据组中删除一个元素
      this.searchParams.props.splice(index, 1);
      this.getSearchData(this.searchParams)
    },
    // 8.解决综合排序和销量排序
    handleSort (sortFlag) {
      let originOrder = this.searchParams.order;
      let originSortFlag = originOrder.split(':')[0];
      let originSortType = originOrder.split(':')[1];
      // 默认排序是从高到底:"1:desc"
      let newOrder = '';
      if (originSortFlag == sortFlag) {
        newOrder = `${originSortFlag}:${originSortType == 'asc' ? 'desc' : 'asc'}`
      } else {
        // 默认order排序是:'1:desc'
        newOrder = `${sortFlag}:desc`
      }
      // 重新给order赋值
      this.searchParams.order = newOrder;
      //再次发送请求
      this.getSearchData(this.searchParams)
    }
  },
  watch: {
    /*  Bug原因分析：
       因为第一次我们从别的页面跳转到Search.vue的页面时，已经执行了一次beforeMounted和Mounted,
       而我们再一次在Search.vue里面进行搜索时，因为还是在Seacrh.vue页面里，所以没有反应
     只有URL有变化，所以我们监视watch路由的变化 */
    $route (newVal, oldVal) {
      // console.log(newVal, oldVal);
      // 需要再次整理下SearchParams,因为beforeMount()生命周期也只能执行一次，现在路由发生变化的话，再整理一次
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      // 再次调用请求数据
      this.getSearchData(this.searchParams)
      // console.log(this.searchParams);
      // 清除category1Id,category2Id,category3Id,不然它们不会清除，而是会全部累加
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined
    }
  },
  created () {

  },
  // 当组件挂载之前执行一次，将数据挂载上去
  beforeMount () {
    // 1.处理搜索的参数SearchParams(复杂写法)
    // this.searchParams.category1Id = this.$route.query.category1Id;
    // this.searchParams.category2Id = this.$route.query.category2Id;
    // this.searchParams.category3Id = this.$route.query.category3Id;
    // this.searchParams.categoryName = this.$route.query.categoryName;
    // this.searchParams.keyword = this.$route.params.keyword

    // 2.利用Object.assign()方法处理：ES6新增语法，合并对象
    // 将后面两个对象赋值给前面存在的对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    // 1.一上来就调用一次获取Search页面的请求
    this.getSearchData(this.searchParams)
  }
}
</script>
<style lang='less' scoped>
.main {
  margin: 10px 0;
  .py-container {
    width: 1200px;
    margin: 0 auto;
    .bread {
      margin-bottom: 5px;
      overflow: hidden;
      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;
        li {
          display: inline-block;
          line-height: 18px;
          a {
            color: #666;
            text-decoration: none;
            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }
      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;
        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;
          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }
          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;
      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;
        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            li {
              float: left;
              line-height: 18px;
              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }
              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }
      .goods-list {
        margin: 20px 0;
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;
            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                a {
                  color: #666;
                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }
              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                a {
                  color: #333;
                  text-decoration: none;
                }
              }
              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }
              .operate {
                padding: 12px 15px;
                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }
                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;
                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }
                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;
                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;
        .sui-pagination {
          margin: 18px 0;
          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            li {
              line-height: 18px;
              display: inline-block;
              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }
              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }
              &.prev {
                a {
                  background-color: #fafafa;
                }
              }
              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }
              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }
              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }
          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
    .hot-sale {
      margin-bottom: 5px;
      border: 1px solid #ddd;
      .title {
        font-weight: 700;
        font-size: 14px;
        line-height: 21px;
        border-bottom: 1px solid #ddd;
        background: #f1f1f1;
        color: #333;
        margin: 0;
        padding: 5px 0 5px 15px;
      }
      .hot-list {
        padding: 15px;
        ul {
          display: flex;
          li {
            width: 25%;
            height: 100%;
            .list-wrap {
              .p-img,
              .price,
              .attr,
              .commit {
                padding-left: 15px;
              }
              .p-img {
                img {
                  max-width: 100%;
                  vertical-align: middle;
                  border: 0;
                }
              }
              .attr {
                width: 85%;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
              }
              .price {
                font-size: 18px;
                color: #c81623;
                strong {
                  font-weight: 700;
                  i {
                    margin-left: -5px;
                  }
                }
              }
              .commit {
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;
              }
            }
          }
        }
      }
    }
  }
}
</style>