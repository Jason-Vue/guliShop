<!-- 注册页面 -->
<template>
  <div>
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="registerForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="PhoneCode">
          <el-input v-model="registerForm.PhoneCode" style="width:200px"></el-input>
          <el-button type="success" @click="getPhoneCode">获取验证码</el-button>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password1">
          <el-input v-model="registerForm.password1"></el-input>
        </el-form-item>
        <el-form-item>
          <input name="m1" type="checkbox" v-model="registerForm.agree">
          <span>同意协议并注册《尚品汇用户协议》</span>
          <span class="error-msg">错误提示信息</span>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="finishRegister">完成注册</el-button>
        </el-form-item>
      </el-form>
      <!-- <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="PhoneCode">
        <button style="width:100px;height:38px" @click="getPhoneCode">获取验证码</button>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="password1">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="agree">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="finishRegister">完成注册</button>
      </div> -->
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
    let checkPhone = (rule, value, callback) => {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback('手机号码格式不对')
      }
    };
    // 自定义检测密码
    let checkPassword = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.password !== '') {
          // 局部检测某个字段
          this.$refs.registerForm.validateField('checkPassword');
        }
        callback()
      }
    };
    // 再次检测密码
    let checkPasswordAgain = (rule, value, callback) => {
      if (value == '') {
        callback(new Error('请再次输入密码'))
      } else if (value != this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    };
    return {
      // 1.element-ui表单验证数据
      registerForm: {
        // 手机号
        phone: '',
        // 验证码
        PhoneCode: '',
        // 密码
        password: '',
        // 再次密码
        password1: '',
        // 是否同意
        agree: true
      },
      // 2.验证规则
      registerRules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6到 15个字符', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ],
        password1: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { validator: checkPasswordAgain, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 1.获取验证码
    async getPhoneCode() {
      const { phone } = this.registerForm;
      try {
        phone && await this.$store.dispatch('getPhoneCode', phone);
        // 获取验证码成功的话，直接将验证码填进去
        this.registerForm.PhoneCode = this.$store.state.UserAbout.code
      } catch (error) {
        alert(error.message)
      }
    },
    // 2.完成注册
    finishRegister() {
      const { phone, PhoneCode, password, password1 } = this.registerForm;
      // 表单校验
      this.$refs.registerForm.validate(async (valid) => {
        if (valid) {
          console.log(valid);
          // 发送请求前简单判断
          try {
            // let res = (phone && PhoneCode && password == password1) && await this.$store.dispatch("finishRegister", { phone, password, code: PhoneCode })
            let res = await this.$store.dispatch("finishRegister", { phone, password, code: PhoneCode })
            // console.log(res);
            if (res == '用户注册成功') {
              // 如果注册成功,路由跳转登录页
              this.$router.push('/login')
            }
          } catch (error) {
            alert(error.message)
          }
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
.register {
  width: 1200px;
  height: 500px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  // div:nth-of-type(1) {
  //   margin-top: 40px;
  // }


  .el-form-item {
    margin-top: 20px;
    width: 1100px
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
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