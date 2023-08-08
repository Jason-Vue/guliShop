<!--  -->
<template>
  <div>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <div @mouseleave="deleteIndex()">
          <h2 class="all" @mouseenter="categoryShow">全部商品分类</h2>
          <!-- 过渡动画 -->
          <transition name="sort">
            <div class="sort" v-show="isShow">
              <!-- 点击搜索事件：事件委派 -->
              <div class="all-sort-list2" @click="goSearch">
                <!-- 一级分类 -->
                <div
                  class="item bo"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  @mouseenter="deliverIndex(index)"
                  :class="{ bgc: currentIndex == index }"
                >
                  <h3>
                    <a
                      href="javascript:;"
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <div
                    class="item-list clearfix"
                    :style="{ display: index == currentIndex ? 'block' : '' }"
                  >
                    <!-- 二级分类 -->
                    <div
                      class="subitem"
                      v-for="(c2, index) in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            href="javascript:;"
                            >{{ c2.categoryName }}</a
                          >
                          <!-- 三级分类 -->
                        </dt>
                        <dd>
                          <em
                            v-for="(c3, index) in c2.categoryChild"
                            :key="c3.categoryId"
                          >
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              href="javascript:;"
                              >{{ c3.categoryName }}</a
                            >
                          </em>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <nav class="nav">
          <a href="###">服装城</a>
          <a href="###">美妆馆</a>
          <a href="###">尚品汇超市</a>
          <a href="###">全球购</a>
          <a href="###">闪购</a>
          <a href="###">团购</a>
          <a href="###">有趣</a>
          <a href="###">秒杀</a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from "lodash/throttle";
export default {
  data() {
    return {
      // 为了给一级分类添加背景颜色，单独给它一个脚标
      currentIndex: -1,
      // 一二三级分类是否显示
      isShow: true,
    };
  },
  computed: {
    categoryList() {
      return this.$store.state.HomeAbout.typeNavList;
    },
  },
  methods: {
    // 1.一级分类鼠标移入显示背景事件
    // deliverIndex (index) {
    //   this.currentIndex = index;
    //   console.log(index);
    // },
    // 引入lodash里面的throttle节流
    deliverIndex: throttle(function (index) {
      this.currentIndex = index;
      // console.log(index);
    }, 50),
    // 2.一级分类鼠标移出事件隐藏背景事件(同样这也是search搜索页面移出事件隐藏一二三级分类)
    deleteIndex() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        this.isShow = false;
      }
    },
    // 3.去搜索页面
    goSearch(event) {
      /* 
      最好的解决办法:事件委派+编程式导航
      1.怎么确定就是点击的a标签？获取到当前这个事件的节点【dt,dd,h3,a】,需要带有data-categoryName
        的这个自定义属性的这样的节点
      2.即使点击的是a标签，怎么确定是一级a标签，还是二级a标签，还是三级a标签？  
      */
      let element = event.target;
      // 节点上有一个属性dataset属性，可以获取节点的自定义属性和属性值
      let node = element.dataset;
      // console.log(node);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 整理编程式导航跳转地址，下面的location里面还要一个query参数对象
      let location = { name: "search" };
      // 整理上面location需要的query参数对象
      let query = { categoryName: categoryname };
      // 一级分类，二级分类，三级分类的a标签
      // 如果身上有categoryName属性就一定就是a标签
      if (categoryname) {
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
      }
      // 将query对象放到location里面
      location.query = query;
      // 判断是否有params传参方式,没有的话把它放进location里
      if (this.$route.params) {
        location.params = this.$route.params;
      }
      console.log(location);
      // 跳转到搜索页
      this.$router.push(location);
    },
    // 4.搜索页面里面的一二三级分类显示
    categoryShow() {
      this.isShow = true;
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 1.派发事件给actions,请求navType三级分类
    // this.$store.dispatch('getCategoryList');
    //2.在NavType页面挂载完毕的时候，将isShow改为false
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
};
</script>
<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          //给一级分离添加背景
          // & :hover {
          //   background-color: #aaa0a0;
          // }

          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          //使用css方式显示二三级分类的显示和隐藏
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .bgc {
          background-color: skyblue;
        }
      }
    }

    .sort-enter,
    .sort-leave-to {
      height: 0;
    }

    .sort-enter-to,
    sort-leave {
      height: 461px;
    }

    .sort-enter-active,
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
