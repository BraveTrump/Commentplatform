<template>
  <div>
    <el-card class="no-padding m-b-15">
      <icon-buttons :exists="['question', 'article', 'thinking']" />
    </el-card>
    <el-card class="no-padding m-b-15">
      <icon-buttons :exists="['live', 'book', 'desk', 'expert', 'consult']" />
    </el-card>
    <el-card class="no-padding m-b-15">
      <div class="nav-link">
        <a href="#">
          <span class="text">
            <i class="el-icon-star-on middle-icon"></i>
            我的收藏
          </span>
        </a>
      </div>
      <div class="nav-link">
        <a href="#">
          <span class="text">
            <span class="el el-icon-question middle-icon"></span>
            我关注的问题
          </span>
          <span class="num">320</span>
        </a>
      </div>
      <div class="nav-link">
        <a href="#">
          <span class="text">
            <span class="el el-icon-add-person-fill middle-icon" />
            我的邀请
          </span>
          <span class="num">21</span>
        </a>
      </div>
      <div class="nav-link">
        <a href="#">
          <span class="text">
            <span class="el el-icon-xiaoxi-control middle-icon"></span>
            站务中心
          </span>
        </a>
      </div>
    </el-card>
    <sidebar-footer />
  </div>
</template>

<script>
import IconButtons from "./IconButtons.vue";
import SidebarFooter from "./SidebarFooter.vue";

export default {
  components: {
    IconButtons,
    SidebarFooter
  }
};
</script>
