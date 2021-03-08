<template>
  <el-row gutter="20">
    <el-col :span="8">
      <el-select
        v-model="value"
        filterable
        placeholder="请选择课程"
        @command="HandleCourse"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :labelCourse="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="12">
      <el-select v-model="score" placeholder="请选择分数">
        <el-option :score="1" value="1分">1分</el-option>
        <el-option :score="2" value="2分">2分</el-option>
        <el-option :score="3" value="3分">3分</el-option>
        <el-option :score="4" value="4分">4分</el-option>
        <el-option :score="5" value="5分">5分</el-option>
      </el-select>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" round v-on:click="submit">提交</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      score: 0,
      labelCourse: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      scores: [
        { value: 1 },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5 }
      ]
    };
  },
  methods: {
    submit() {
      this.$emit();
    }
  }
};
</script>

<style scoped></style>
