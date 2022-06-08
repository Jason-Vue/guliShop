<!-- 主页 -->
<template>
  <div>
    <Nav-type></Nav-type>
    <Swiper></Swiper>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <!-- 这里有两个楼层，不是我们引入了两次楼层，是下面遍历的结果，mock数据里有两个对象 -->
    <Floor v-for="(floor,index) in floorList"
           :key="floor.id"
           :floor="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from "@/pages/Home/Swiper"
import Like from "@/pages/Home/Like"
import Rank from "@/pages/Home/Rank"
import Floor from "@/pages/Home/Floor"
import Recommend from "@/pages/Home/Recommend"
import Brand from "@/pages/Home/Brand"

export default {
  data () {
    return {

    }
  },
  components: {
    Swiper,
    Like,
    Rank,
    Floor,
    Recommend,
    Brand
  },
  computed: {
    ...mapState({
      floorList: state => state.HomeAbout.floorList
    })
  },
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {
    // 获取首页楼层信息
    this.$store.dispatch('getFloorList');
    // 派发获取用户信息
    this.$store.dispatch("getUserInfo")
  }
}
</script>
<style scoped>
</style>