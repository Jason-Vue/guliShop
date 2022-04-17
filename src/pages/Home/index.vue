<!-- 主页 -->
<template>
  <div>
    <Nav-type></Nav-type>
    <Swiper></Swiper>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor></Floor>
    <Floor></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
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
  //生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>