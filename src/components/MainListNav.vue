<template>
  <el-card class="list-nav-card">
    <el-menu class="listNav" :default-active="activeIndex" mode="horizontal">
      <el-menu-item index="1" v-if="type === 'main'">
        <router-link :to="{ name: 'home' }">推荐</router-link>
      </el-menu-item>
      <el-menu-item index="2" v-if="type === 'main'">
        <router-link :to="{ name: 'hot' }">热榜</router-link>
      </el-menu-item>
      <el-menu-item
        index="5"
        v-if="type === 'people'"
        @click="$router.push({ name: 'peopleArticles' })"
      >
        我的帖子
      </el-menu-item>
      <el-menu-item
        index="6"
        v-if="type === 'people'"
        @click="$router.push({ name: 'peopleArticles' })"
      >
        收藏夹
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      routerNametoIndex: {
        home: "1",
        hot: "2",
        peopleMain: "3",
        peopleAsks: "4",
        peopleArticles: "5"
      },
      activeIndex: "1"
    };
  },
  mounted() {
    this.activeIndex = this.routerNametoIndex[this.$route.name];
  }
};
</script>

<style></style>
