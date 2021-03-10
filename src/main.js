import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/styles/main.scss";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import CommentList from "@/components/CommentList";
// import "./mock/target";

// 设置反向代理，前端请求默认发送到 http://localhost:3000/comment_platform
var axios = require("axios");
axios.defaults.baseURL = "http://192.168.3.5:3000/comment_platform";
//跨域请求携带cookie
axios.defaults.withCredentials = true;
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.component("CommentList", CommentList);

Vue.config.productionTip = false; // 关闭生产环境提示

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
