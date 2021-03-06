<template>
  <div class="people" v-loading="userLoading">
    <el-dialog
      :title="editorAnswer.question.title"
      :visible.sync="editorShow"
      :modal-append-to-body="false"
    >
      <rich-text-editor
        class="with-border m-t-10"
        ref="answerEditor"
        :content="editorAnswer.content"
        :placeHolder="editorPlaceholder"
        @update-content="updateContent"
      />
      <div class="footer m-t-10">
        <el-button @click="editorShow = false">取消</el-button>
        <el-button type="primary" @click="updateAnswer">确定</el-button>
      </div>
    </el-dialog>
    <el-card class="profile">
      <div class="profile-header-cover">
        <img
          src="https://pic1.zhimg.com/80/v2-a15344fdf6d4824656f47a4bc1c8e29d_r.jpg"
          alt=""
        />
      </div>
      <div class="profile-header-wrapper">
        <avatar-upload
          field="file"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          url="/imgs/upload"
          img-format="png"
          v-model="imgUploadShow"
          :with="300"
          :height="300"
        />
        <div
          class="avatar"
          @click="activeUser ? (imgUploadShow = true) : ''"
          v-show="!imgUploadShow"
        >
          <img :src="userInfo.avatarUrl" alt="" />
          <p class="img-hover-tip hidden" v-if="activeUser">
            <i class="el-icon-edit"></i>单击更改图片
          </p>
        </div>
        <div class="content">
          <p class="username">{{ userInfo.name }}</p>
          <div class="content-header" v-show="!userInfoEditorShow">
            <p class="introduce">{{ userInfo.headline }}</p>
          </div>
          <ul class="content-edit clearfix" v-show="userInfoEditorShow">
            <li>
              <span>我的简介：</span>
              <el-input type="text" v-model="newHeadLine" maxlength="150" />
            </li>
          </ul>
          <div class="btn-group">
            <div
              class="activeUserShow"
              v-show="activeUser && !userInfoEditorShow"
            >
              <el-button type="primary" @click="userInfoEditorShow = true">
                编辑个人信息
              </el-button>
            </div>
            <div
              class="activeUserEditor"
              v-show="activeUser && userInfoEditorShow"
            >
              <el-button type="dafault" @click="userInfoEditorShow = false">
                取消
              </el-button>
              <el-button
                type="primary"
                @click="updateUserInfo('headline', newHeadLine)"
              >
                保存
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <div class="profile-main">
      <div class="profile-content">
        <main-list-nav :type="'people'" />
        <el-card v-show="listInfo.length > 0">
          <router-view
            v-for="(item, index) in listInfo"
            :key="index"
            :item="item"
            :showPart="['title', 'creator', 'votes']"
            :type="item.type"
            :activeUser="activeUser"
            @get-list="getList"
            @editor-show-fuc="editorShowFuc"
          />
        </el-card>
        <el-card v-show="listInfo.length === 0">当前没有数据</el-card>
      </div>
      <div class="profile-sidebar">
        <sidebar-footer />
      </div>
    </div>
  </div>
</template>

<script>
import SidebarFooter from "../components/SidebarFooter.vue";
import request from "@/service";
import { getCookies } from "@/lib/utils";
import AvatarUpload from "vue-image-crop-upload";
import { imgDec } from "@/lib/config";
import MainListNav from "../components/MainListNav.vue";
import RichTextEditor from "../components/RichTextEditor.vue";
import _ from "lodash";

export default {
  components: { SidebarFooter, AvatarUpload, MainListNav, RichTextEditor },
  data() {
    return {
      userInfo: {},
      userLoading: false,
      detailsShow: false,
      userInfoEditorShow: false,
      newHeadLine: "",
      imgUploadShow: false,
      listLoading: false,
      listInfo: [],
      routerTrans: {
        // 路由请求地址转换对象
        peopleMain: "/answers/creator",
        peopleArticles: "/articles/creator",
        peopleAsks: "/questions/creator"
      },
      editorAnswer: {
        question: { title: "" },
        content: ""
      },
      editorPlaceholder: "修改回答",
      editorShow: false
    };
  },
  computed: {
    activeUser() {
      return this.userInfo.id === parseFloat(getCookies("id"));
    }
  },
  watch: {
    $route: function() {
      if (this.$route.params.id !== this.userInfo.id) {
        this.getUser(); // 路由发生变化时，要重新获取用户数据
      }
      this.getList();
    }
  },
  mounted() {
    this.getList();
    this.getUser();
  },
  methods: {
    async getUser() {
      this.userLoading = true;
      await request
        .get("/users", {
          userId: this.$route.params.id
        })
        .then(res => {
          if (res.data.status === 200) {
            this.userInfo = res.data.content;
            this.newHeadLine = this.userInfo.headline;
            this.userLoading = false;
          } else {
            this.$message.error("获取用户信息失败，请稍后再试");
            this.$router.push({ name: "home" });
          }
        });
    },
    async updateUserInfo(key, value) {
      this.userLoading = true;
      await request
        .put("/users", {
          id: parseFloat(getCookies("id")),
          colName: key,
          value
        })
        .then(res => {
          if (res.data.content === [0]) {
            this.$message.error("修改失败，请稍后再试");
          } else {
            this.$message.success("修改成功");
            this.userInfo[key] = value;
          }
          this.userInfoEditorShow = false;
        });
      this.userLoading = false;
    },
    cropUploadSuccess(res) {
      this.updateUserInfo("avatarUrl", `${imgDec}${res.fileName}`);
      this.imgUploadShow = false;
    },
    cropUploadFail() {
      this.$message.error("上传失败，请稍后再试");
    },
    async getList() {
      this.listLoading = true;
      this.listInfo = [];
      await request
        .get(this.routerTrans[this.$route.name], {
          creatorId: this.$route.params.id
        })
        .then(res => {
          if (res.data.status === 200) {
            this.listInfo = res.data.list;
            this.listLoading = false;
          } else {
            this.$message.error("请求个人信息失败，请稍后再试");
            this.$router.push({ name: "home" });
          }
        });
    },
    async editorShowFuc(id) {
      this.editorAnswer = Object.assign(
        {},
        _.find(this.listInfo, item => item.id === id)
      );
      this.editorShow = true;
      // placeHoder 在这个失效了？
      await this.waittingForRender(0);
      this.$refs.answerEditor.updateContent(this.editorAnswer.content);
    },
    updateContent(content, contentText) {
      this.editorAnswer.content = content;
      this.editorAnswer.excerpt = contentText.slice(0, 100);
    },
    waittingForRender(ms) {
      if (!this.$refs.answerEditor) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      return null;
    },
    async updateAnswer() {
      await request
        .put("/answers", {
          creatorId: getCookies("id"),
          answerId: this.editorAnswer.id,
          content: this.editorAnswer.content,
          excerpt: this.editorAnswer.excerpt
        })
        .then(res => {
          if (res.data.msg === [0]) {
            this.$message.error("修改失败，请稍后再试");
          } else {
            this.$message.success("修改成功");
            this.getList();
          }
          this.editorShow = false;
        });
    }
  }
};
</script>
