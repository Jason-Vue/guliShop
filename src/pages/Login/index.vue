<!-- 登录页 -->
<template>
  <div>
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0;">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
              <el-form-item prop="phone">
                <el-input prefix-icon="el-icon-phone" placeholder="手机号" v-model="ruleForm.phone"></el-input>
              </el-form-item>

              <el-form-item prop="password">
                <el-input prefix-icon="el-icon-user" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
              </el-form-item>

              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>

              <el-button class="btn" @click.prevent="userLogin">登&nbsp;&nbsp;录</el-button>

            </el-form>

            <!-- <form>
              <div class="input-text clearFix">
                <i></i>
                <input type="text" placeholder="手机号" v-model="phone">
                <span class="error-msg">错误提示信息</span>
              </div>

              <div class="input-text clearFix">
                <i class="pwd"></i>
                <input type="text" placeholder="请输入密码" v-model="password">
                <span class="error-msg">错误提示信息</span>
              </div>

              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="userLogin">登&nbsp;&nbsp;录</button>
            </form> -->

            <div class="call clearFix">
              <ul>
                <!-- <li><img src="images/qq.png" alt=""></li>
                <li><img src="images/sina.png" alt=""></li>
                <li><img src="images/ali.png" alt=""></li>
                <li><img src="images/weixin.png" alt=""></li> -->
              </ul>
              <a href="##" class="register">立即注册</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    // 定义手机号的自定义校验规则
    const checkMobile = (rule, value, cb) => {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value)) {
        cb()
      } else {
        cb(new Error('手机号码格式不正确'))
      }
    }
    return {
      // password: '',
      // phone: '',
      ruleForm: {
        password: '111111',
        phone: '13700000000',
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6到 15个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 1.用户登录
    // 使用了element-ui表单验证
    userLogin() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let { password, phone } = this.ruleForm;
          try {
            (password && phone) && await this.$store.dispatch("userLogin", { password, phone });
            // 登录成功,跳转到首页
            // this.$router.push('/home')
            // 登录的组件:看其中是否包含query参数,有:调到query参数指定的路由,没有:调到home
            console.log(this.$route.query.redirect);
            let toPath = this.$route.query.redirect || '/home';
            this.$router.push(toPath)
          } catch (error) {
            alert(error.message)
          }
        } else {
          this.$message.warning("登录表单验证没通过,请重新登录")
        }
      })

    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
}
</script>
<style lang="less" scoped>
.login-wrap {
  height: 487px;
  background-color: #e93854;

  .login {
    width: 1200px;
    height: 487px;
    margin: 0 auto;
    background: url(~@/assets/images/loginbg.png) no-repeat;
  }

  .loginform {
    width: 420px;
    height: 406px;
    box-sizing: border-box;
    background: #fff;
    float: right;
    top: 45px;
    position: relative;
    padding: 20px;

    .tab {
      li {
        width: 50%;
        float: left;
        text-align: center;

        a {
          width: 100%;
          display: block;
          height: 50px;
          line-height: 50px;
          font-size: 20px;
          font-weight: 700;
          color: #333;
          border: 1px solid #ddd;
          box-sizing: border-box;
          text-decoration: none;
        }

        .current {
          border-bottom: none;
          border-top-color: #28a3ef;
          color: #e1251b;
        }
      }
    }

    .content {
      width: 380px;
      height: 316px;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-top: none;
      padding: 18px;

      form {
        margin: 15px 0 18px 0;
        font-size: 12px;
        line-height: 18px;

        .input-text {
          margin-bottom: 22px;
          position: relative;

          i {
            float: left;
            width: 37px;
            height: 32px;
            border: 1px solid #ccc;
            background: url(~@/assets/images/icons.png) no-repeat -10px -201px;
            box-sizing: border-box;
            border-radius: 2px 0 0 2px;
          }

          .pwd {
            background-position: -72px -201px;
          }

          input {
            width: 302px;
            height: 32px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-left: none;
            float: left;
            padding-top: 6px;
            padding-bottom: 6px;
            font-size: 14px;
            line-height: 22px;
            padding-right: 8px;
            padding-left: 8px;

            border-radius: 0 2px 2px 0;
            outline: none;
          }

          .error-msg {
            position: absolute;
            top: 100%;
            left: 40px;
            color: red;
          }
        }

        .setting {
          label {
            float: left;
          }

          .forget {
            float: right;
          }
        }

        .btn {
          background-color: #e1251b;
          padding: 6px;
          border-radius: 0;
          font-size: 16px;
          font-family: 微软雅黑;
          word-spacing: 4px;
          border: 1px solid #e1251b;
          color: #fff;
          width: 100%;
          height: 36px;
          margin-top: 25px;
          outline: none;
        }
      }

      .call {
        margin-top: 30px;

        ul {
          float: left;

          li {
            float: left;
            margin-right: 5px;
          }
        }

        .register {
          float: right;
          font-size: 15px;
          line-height: 38px;
        }

        .register:hover {
          color: #4cb9fc;
          text-decoration: underline;
        }
      }
    }
  }
}

.copyright {
  width: 1200px;
  margin: 0 auto;
  text-align: center;
  line-height: 24px;

  ul {
    li {
      display: inline-block;
      border-right: 1px solid #e4e4e4;
      padding: 0 20px;
      margin: 15px 0;
    }
  }
}
</style>