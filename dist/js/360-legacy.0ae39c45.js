"use strict";(self["webpackChunkmy_gulishop"]=self["webpackChunkmy_gulishop"]||[]).push([[360],{6360:function(e,r,t){t.r(r),t.d(r,{default:function(){return c}});var s=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("div",{staticClass:"login-wrap"},[t("div",{staticClass:"login"},[t("div",{staticClass:"loginform"},[e._m(0),t("div",{staticClass:"content"},[t("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules}},[t("el-form-item",{attrs:{prop:"phone"}},[t("el-input",{attrs:{"prefix-icon":"el-icon-phone",placeholder:"手机号"},model:{value:e.ruleForm.phone,callback:function(r){e.$set(e.ruleForm,"phone",r)},expression:"ruleForm.phone"}})],1),t("el-form-item",{attrs:{prop:"password"}},[t("el-input",{attrs:{"prefix-icon":"el-icon-user",placeholder:"请输入密码"},model:{value:e.ruleForm.password,callback:function(r){e.$set(e.ruleForm,"password",r)},expression:"ruleForm.password"}})],1),t("div",{staticClass:"setting clearFix"},[t("label",{staticClass:"checkbox inline"},[t("input",{attrs:{name:"m1",type:"checkbox",value:"2",checked:""}}),e._v(" 自动登录 ")]),t("span",{staticClass:"forget"},[e._v("忘记密码？")])]),t("el-button",{staticClass:"btn",on:{click:function(r){return r.preventDefault(),e.userLogin.apply(null,arguments)}}},[e._v("登  录")])],1),t("div",{staticClass:"call clearFix"},[t("ul"),t("router-link",{staticClass:"register",attrs:{to:"/register"}},[e._v("立即注册")])],1)],1)])])]),e._m(1)])},a=[function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("ul",{staticClass:"tab clearFix"},[t("li",[t("a",{staticStyle:{"border-right":"0"},attrs:{href:"##"}},[e._v("扫描登录")])]),t("li",[t("a",{staticClass:"current",attrs:{href:"##"}},[e._v("账户登录")])])])},function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"copyright"},[t("ul",[t("li",[e._v("关于我们")]),t("li",[e._v("联系我们")]),t("li",[e._v("联系客服")]),t("li",[e._v("商家入驻")]),t("li",[e._v("营销中心")]),t("li",[e._v("手机尚品汇")]),t("li",[e._v("销售联盟")]),t("li",[e._v("尚品汇社区")])]),t("div",{staticClass:"address"},[e._v("地址：北京市昌平区宏福科技园综合楼6层")]),t("div",{staticClass:"beian"},[e._v("京ICP备19006430号 ")])])}],i=t(48534),l=(t(36133),t(74916),t(77601),t(21703),{data:function(){var e=function(e,r,t){var s=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;s.test(r)?t():t(new Error("手机号码格式不正确"))};return{ruleForm:{password:"111111",phone:"13700000000"},rules:{phone:[{required:!0,message:"请输入手机号",trigger:"blur"},{validator:e,trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:15,message:"长度在 6到 15个字符",trigger:"blur"}]}}},methods:{userLogin:function(){var e=this;this.$refs.ruleForm.validate(function(){var r=(0,i.Z)(regeneratorRuntime.mark((function r(t){var s,a,i,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!t){r.next=17;break}if(s=e.ruleForm,a=s.password,i=s.phone,r.prev=2,r.t0=a&&i,!r.t0){r.next=7;break}return r.next=7,e.$store.dispatch("userLogin",{password:a,phone:i});case 7:console.log(e.$route.query.redirect),l=e.$route.query.redirect||"/home",e.$router.push(l),r.next=15;break;case 12:r.prev=12,r.t1=r["catch"](2),alert(r.t1.message);case 15:r.next=18;break;case 17:e.$message.warning("登录表单验证没通过,请重新登录");case 18:case"end":return r.stop()}}),r,null,[[2,12]])})));return function(e){return r.apply(this,arguments)}}())}},created:function(){},mounted:function(){}}),n=l,o=t(43736),u=(0,o.Z)(n,s,a,!1,null,"3e9e0a65",null),c=u.exports}}]);
//# sourceMappingURL=360-legacy.0ae39c45.js.map