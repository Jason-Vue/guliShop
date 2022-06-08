<!-- 头部 -->
<template>
  <div>
    <!-- 头部 -->
    <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>尚品汇欢迎您！</p>
            <!-- 没有登录 -->
            <p v-if="!userName">
              <span>请</span>
              <!-- <a href="###">登录</a>
              <a href="###"
                 class="register">免费注册</a> -->
              <router-link to="/login">登录</router-link>
              <router-link to="/register"
                           class="register">免费注册</router-link>
            </p>
            <!-- 已经登录 -->
            <p v-else>
              <a>{{userName}}</a>
              <a class="register"
                 @click="logOut">退出登录</a>
            </p>
          </div>
          <div class="typeList">
            <a href="###">我的订单</a>
            <a href="###">我的购物车</a>
            <a href="###">我的尚品汇</a>
            <a href="###">尚品汇会员</a>
            <a href="###">企业采购</a>
            <a href="###">关注尚品汇</a>
            <a href="###">合作招商</a>
            <a href="###">商家后台</a>
          </div>
        </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link to="/home"
                       class="logo"
                       title="尚品汇">
            <img src="./images/logo.png"
                 alt="">
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="###"
                class="searchForm">
            <input type="text"
                   id="autocomplete"
                   class="input-error input-xxlarge"
                   v-model="kw" />
            <button class="sui-btn btn-xlarge btn-danger"
                    type="button"
                    @click="goSearch()">搜索</button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 搜索关键词
      kw: ''
    }
  },
  computed: {
    userName () {
      return this.$store.state.UserAbout.userInfo.name
    }
  },
  methods: {
    // 1.搜索页面
    goSearch () {
      let location = {
        name: "search",
        params: {
          keyword: this.kw || undefined
        }
      }
      // 判断路由里面是否有query参数,没有的话给它添加到location里
      if (this.$route.query) {
        location.query = this.$route.query
      }
      // 编程式导航
      console.log(location);
      this.$router.push(location)
    },
    // 2.退出登录
    async logOut () {
      /* 退出登录逻辑：
      1. 通知后端服务器退出登录(清除一些数据)
      2. 清除项目中的一些信息[userInfo, token] */
      try {
        await this.$store.dispatch("UserLogOut")
        // 如果退出成功，应该回到首页
        this.$router.push("/home")
      } catch (error) {
        alert(error.message)
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    this.$bus.$on("removeKw", () => {
      this.kw = ''
    })
  }
}
</script>
<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>