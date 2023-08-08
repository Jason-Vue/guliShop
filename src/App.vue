<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="!$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
// import { typeNavData } from "@/api/index.js"
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // console.log(typeNavData());
    this.$store.dispatch("getCategoryList");
    // 派发获取用户信息
    // this.$store.dispatch("getUserInfo")
  },
};
</script>

<style></style>
