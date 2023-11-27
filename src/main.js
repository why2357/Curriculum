import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import request from "./router/intercept";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router/index.js";
import { read, utils } from "xlsx"; // 引入方式
import Vuex from 'vuex'
import store from "./store/index.js";

const app = createApp(App);
app.use(router);
app.use(store);
app.config.warnHandler = () => null;
app.use(ElementPlus); //在挂载app之前使用ElementPlus
app.mount("#app");
