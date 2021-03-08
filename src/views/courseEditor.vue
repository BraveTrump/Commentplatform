<template>
  <div class="editor">
    <editor-header @release-articles="releaseArticles" />
    <div class="content m-t-50">
      <el-input
        v-model="title"
        class="m-b-15"
        size="medium"
        placeholder="请输入标题（最多50个字）"
      />
      <el-select v-model="course" filterable placeholder="请选择课程">
        <el-option
          v-for="option in options"
          :key="option.courseID"
          :label="option.courseName"
          :value="option"
        >
        </el-option>
      </el-select>
      <rich-text-editor
        ref="textEditor"
        :content="content"
        :placeHolder="placeHolder"
        @update-content="updateContent"
      />
    </div>
  </div>
</template>

<script>
import EditorHeader from "../components/EditorHeader.vue";
import RichTextEditor from "../components/RichTextEditor.vue";
import request from "@/service";
import { getCookies } from "@/lib/utils";
import { imgDec } from "@/lib/config.js";

export default {
  components: { EditorHeader, RichTextEditor },
  data() {
    return {
      name: "",
      id: 0,
      isLogin: true,
      title: "", // 标题
      content: "", // 富文本
      contentText: "", // 纯文本
      placeHolder: "请输入正文",
      course: [],
      courseList: [],
      state: "",
      imgUrl: "", // 题图url
      options: []
    };
  },
  mounted() {
    this.checkLogin();
    this.list();
    if (parseFloat(this.$route.params.articleId) !== 0) {
      this.getArticleInfo();
    }
  },

  methods: {
    checkLogin: function() {
      this.$axios.get("/users/checkLogin").then(res => {
        if (res.data.status === 200) {
          this.name = res.data.data.userName;
          this.id = res.data.data.userID;
          this.isLogin = true;
        } else {
          this.$router.push({ name: "signup" });
          this.isLogin = false;
        }
      });
    },
    list: function() {
      this.$axios.get("/courseInfo").then(res => {
        this.options = res.data;
      });
    },
    /* 跳转并传值 */
    handleIconClick(ev) {
      console.log(ev);
    },

    uploadSuc(response) {
      this.imgUrl = `${imgDec}${response.fileName}`;
    },
    updateContent(content, contentText) {
      this.content = content;
      this.contentText = contentText;
    },
    releaseArticles() {
      // if (parseFloat(this.$route.params.articleId) !== 0) {
      //   this.updateArticle();
      // } else {
      this.createArticle();
      // }
    },
    createArticle: function() {
      this.$axios.post("/articleMarked", {
        title: this.title,
        course: { courseName: this.course.courseName },
        content: this.contentText,
        score: 0,
        user: { userID: this.id },
        likes: 0,
        hates: 0,
        thanks: 0
      });
      //更新课程分数
      this.$axios
        .post("/updateCourse", {
          courseID: this.course.courseID,
          courseName: this.course.courseName,
          totalScore: 10,
          person: 10,
          average: 10
        })
        .then(res => {
          if (res.data.status === 200) {
            this.$message.success("新建成功！");
            this.$router.push({
              path: `/article/${res.data.id}`
            });
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    async getArticleInfo() {
      await request
        .get("/articles", {
          articleId: this.$route.params.articleId
        })
        .then(res => {
          if (res.data.status === 200) {
            const articleInfo = res.data.content;
            this.content = articleInfo.content;
            this.imgUrl = articleInfo.cover;
            this.title = articleInfo.title;
            this.$refs.textEditor.updateContent(this.content);
          } else {
            this.$message.error("获取失败，请稍后再试");
            this.$router.go(-1);
          }
        });
    },
    async updateArticle() {
      await request
        .put("/articles", {
          articleId: this.$route.params.articleId,
          content: this.contentT,
          excerpt: this.contentText.slice(0, 100),
          title: this.title,
          imgUrl: this.imgUrl,
          userId: getCookies("id")
        })
        .then(res => {
          if (res.data.msg === [0]) {
            this.$message.error("修改失败，请稍后再试");
          } else {
            this.$message.success("修改成功");
            this.$router.push({
              path: `/people/${getCookies("id")}/articles`
            });
          }
        });
    }
  }
};
</script>

<style></style>
