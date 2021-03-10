<template>
  <div class="wrapper">
    <div class="icon-item normal-btn" v-if="exists.indexOf('question') >= 0">
      <router-link :to="{ name: 'editor' }">
        <i class="el-icon-tickets big-icon"></i>
        <p>水一水</p>
      </router-link>
    </div>
    <div class="icon-item normal-btn" v-if="exists.indexOf('article') >= 0">
      <router-link :to="{ name: 'courseEditor' }">
        <i class="el-icon-edit-outline big-icon"></i>
        <p>发评价</p>
      </router-link>
    </div>
    <div class="icon-item normal-btn" v-if="exists.indexOf('thinking') >= 0">
      <span class="el el-icon-thinking big-icon"></span>
      <p>优推荐</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "IconButtons",
  props: ["exists"]
};
</script>
