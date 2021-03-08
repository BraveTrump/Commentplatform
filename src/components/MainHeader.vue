<template>
  <header class="main-header">
    <el-dialog
      title="评分"
      :visible.sync="askModelVisible"
      :modal-append-to-body="false"
    >
      <ask-model @change-ask-model-visible="changeAskModelVisible" />
    </el-dialog>
    <div class="header-content">
      <router-link class="m-r-20" :to="{ name: 'home' }">
        <img src="./../assets/imgs/logo.png" alt="" class="logo" />
      </router-link>
      <el-menu
        :default-active="activeIndex"
        class="m-r-20"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1"></el-menu-item>
        <el-menu-item index="2"></el-menu-item>
        <el-menu-item index="3"></el-menu-item>
        <el-menu-item index="4"></el-menu-item>
        <el-menu-item index="5"></el-menu-item>
      </el-menu>
      <el-input
        size="small"
        class="search m-r-10"
        placeholder="请输入内容"
        v-model="keywords"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="primary" @click="askModelVisible = true">
        光速打分
      </el-button>
    </div>
  </header>
</template>

<script>
import AskModel from "./AskModel.vue";

export default {
  components: { AskModel },
  data() {
    return {
      activeIndex: "1",
      keywords: "",
      name: "yyc",
      askModelVisible: false
    };
  },
  mounted() {
    this.checkLogin();
  },
  methods: {
    handleSelect(key) {
      console.log(key);
    },
    changeAskModelVisible(status) {
      this.askModelVisible = status;
    }
  }
};
</script>
