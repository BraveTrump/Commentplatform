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
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
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
      title: "", // 标题
      content: "", // 富文本
      contentText: "", // 纯文本
      placeHolder: "请输入正文",
      course: "",
      courseList: [],
      state: "",
      imgUrl: "", // 题图url
      options: [
        {
          value: "选项1",
          label: "操作系统2"
        },
        {
          value: "选项2",
          label: "Java程序设计"
        },
        {
          value: "选项3",
          label: "数据库原理1"
        },
        {
          value: "选项4",
          label: "软件工程"
        },
        {
          value: "选项5",
          label: "使用计算机英语"
        }
      ]
    };
  },
  mounted() {
    if (parseFloat(this.$route.params.articleId) !== 0) {
      this.getArticleInfo();
    }
  },

  methods: {
    /* 跳转并传值 */
    handleIconClick(ev) {
      console.log(ev);
    }
  },
  uploadSuc(response) {
    this.imgUrl = `${imgDec}${response.fileName}`;
  },
  updateContent(content, contentText) {
    this.content = content;
    this.contentText = contentText;
  },
  releaseArticles() {
    if (parseFloat(this.$route.params.articleId) !== 0) {
      this.updateArticle();
    } else {
      this.createArticle();
    }
  },
  async createArticle() {
    await request.post("/course", {
      person: 1,
      score: this.score,
      courseId: getCookies("courseName")
    });
    //更新课程分数
    await request
      .post("/articles", {
        content: this.content,
        excerpt: this.contentText.slice(0, 100),
        title: this.title,
        imgUrl: this.imgUrl,
        userId: getCookies("id")
      })
      .then(res => {
        if (res.data.status === 201) {
          this.$message.success("新建成功！");
          this.$router.push({
            path: `/article/${res.data.id}`
          });
        } else {
          this.$message.error(res.error);
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
        content: this.content,
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
};
</script>

<style></style>
