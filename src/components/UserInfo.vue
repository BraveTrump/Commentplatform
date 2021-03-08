<template>
  <div>
    <el-card class="card-wrapper no-padding m-b-15">
      <div class="avatar-wrapper">
        <div v-if="isLogin" class="avatar">
          <img :src="avatarUrl ? avatarUrl : def" />
        </div>

        <div v-else class="avatar">
          <img :src="def" alt="" />
        </div>
      </div>
      <div v-if="isLogin" class="user-info">
        <span class="user-name">username</span>
        <span class="introduce">student from shu</span>
        <div class="others">
          <user-item
            v-for="(n, index) in num"
            :key="index"
            :exists="['number']"
            :num="n"
            :description="desc[index]"
            :to="mypath[0]"
          />
        </div>
        <div class="footer">
          <user-item
            v-for="(i, index) in icons"
            :key="index"
            :exists="['icon']"
            :icon="i"
            :description="mydesc[index]"
            :to="mypath[index]"
            @logout="logout"
          >
          </user-item>
        </div>
      </div>
      <div v-else class="info">请先<a href="/signup">登录/注册</a></div>
    </el-card>
  </div>
</template>

<script>
import UserItem from "./UserItem";
import icon_home from "../../public/data/imgs/icons/icon_home.png";
import icon_message from "../../public/data/imgs/icons/icon_message.png";
import icon_setting from "../../public/data/imgs/icons/icon_setting.png";
import icon_exit from "../../public/data/imgs/icons/icon_exit.png";

export default {
  data() {
    return {
      isLogin: false,
      avatarUrl: "",
      userId: "",
      num: [30, 30, 30, 30],
      desc: ["关注者", "关注了", "收藏", "帖子"],
      icons: [icon_home, icon_message, icon_setting, icon_exit],
      mydesc: ["我的主页", "消息", "设置", "退出"],
      mypath: ["/people/" + this.userId, "/message", "/settings", "exit"],
      def: require("../../public/data/imgs/default.png")
    };
  },
  mounted() {
    this.checkLogin();
  },
  components: {
    UserItem
  },
  methods: {
    checkLogin: function() {
      this.$axios.get("/users/checkLogin").then(res => {
        if (res.data.status === 200) {
          this.userId = res.data.userId;
          this.name = res.data.data.userName;
          this.avatarUrl = res.data.avatarUrl;
          this.isLogin = true;
        } else {
          this.$router.push({ name: "signup" });
          this.isLogin = false;
        }
      });
    },
    logout: function() {
      this.name = "";
      this.avatarUrl = "";
      this.isLogin = false;
    }
  }
};
</script>
