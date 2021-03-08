<template>
  <div :to="to" class="user-item" @click="clicked">
    <span class="number" v-if="exists.indexOf('number') >= 0">{{ num }}</span>
    <img class="icon" :src="icon" v-if="exists.indexOf('icon') >= 0" />
    <span class="description">{{ description }}</span>
  </div>
</template>

<script>
export default {
  props: ["exists", "num", "description", "icon", "to"],
  methods: {
    clicked() {
      if (this.to == "exit") {
        this.exit();
      } else {
        this.$router.push(this.to);
      }
    },
    exit: function() {
      this.$axios.post("/users/logout").then(res => {
        if (res.status === 200) {
          this.$message.success("注销成功");
          this.$emit("logout");
        } else {
          this.$message.error("注销失败，请稍后再试");
        }
      });
    }
  }
};
</script>
