<template>
  <div>
    <main-list-nav :type="type" />
    <div v-show="showCourse">
      <el-col>
        <el-row :span="8" v-for="item in courseInfo" :key="item.name">
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <el-row>
                <el-col :span="20" class="courseCardTitle">
                  {{ item.name }}</el-col
                >
                <el-col :span="4" class="courseCardScore">{{
                  item.score
                }}</el-col>
              </el-row>
              <el-divider></el-divider>
              <span>{{ item.content }}</span>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </div>
    <div v-show="!showCourse">
      <el-col>
        <el-row
          :span="8"
          v-for="item in articleInfo"
          :key="item"
          :offset="index > 0 ? 2 : 0"
        >
          <el-card :body-style="{ padding: '0px' }">
            <div style="padding: 14px;">
              <el-row>
                <el-col :span="20" class="courseCardTitle">{{
                  item.title
                }}</el-col>
              </el-row>
              <el-row
                >作者：<span>{{ item.author }}</span></el-row
              >
              <span>{{ item.content }}</span>
            </div>
            <div style="padding: 14px">
              <div class="actions">
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-caret-top"
                  @click="updateStatus('voteUp')"
                >
                  赞同 {{ item.voteUp }}
                </el-button>
                <el-button
                  size="small"
                  type="primary"
                  icon="el-icon-caret-bottom"
                  @click="updateStatus('voteDown')"
                ></el-button>
                <el-button
                  class="btn-text-gray m-l-25"
                  size="medium"
                  type="text"
                  @click="displayComments"
                >
                  <span class="el el-icon-comment"></span>{{ item.comment }}评论
                </el-button>
                <el-button
                  class="btn-text-gray m-l-25"
                  size="medium"
                  type="text"
                  icon="el-icon-star-on"
                >
                  收藏
                </el-button>
              </div>
            </div>
          </el-card>
        </el-row>
      </el-col>
    </div>
  </div>
</template>

<script>
import MainListNav from "./MainListNav.vue";
import request from "../service";

export default {
  components: { MainListNav },
  data() {
    return {
      type: "main",
      courseInfo: [],
      articleInfo: [],
      loading: false,
      showCourse: false
    };
  },
  watch: {
    $route: "fetchData"
  },
  beforeMounted() {
    this.Info = []; // 解决 home 和 hot 按钮之间切换时，由于数据结构不一致导致的报错
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.Info = [];
      if (this.$route.name === "home") {
        this.getNormalList();
        this.loading = false;
        this.showCourse = false;
      } else if (this.$route.name === "hot") {
        this.getCourseList();
        this.loading = false;
        this.showCourse = true;
      } else {
        this.getNormalList();
        this.loading = false;
      }
    },
    async getNormalList() {
      await request.get("/articles/list").then(res => {
        if (res.data.status === 200) {
          this.Info = res.data.list;
        }
      });
    },
    getCourseList() {
      this.courseInfo = [
        { name: "OS", score: "4.6", content: "666" },
        { name: "Java", score: "4.3", content: "牛逼" }
      ];
    }
  }
};
</script>
