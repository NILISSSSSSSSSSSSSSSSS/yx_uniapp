import Vue from 'vue';
import App from './App';
import { ImChart } from "./utils/ImChart.js";
import {CheckUserStatus} from "./utils/common";
import collectFormId from "./components/collectFormId.vue";
import { DifferenceApi } from "./utils/DifferenceApi.js";
import scrollLoading from "./components/scrollLoading.vue";
import showModal from "./components/showModal.vue";

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.component("collectFormId", collectFormId);
Vue.component("scrollLoading", scrollLoading);
Vue.component("showModal", showModal);

// 全局im聊天方法
Vue.prototype.ImChart = ImChart;

// 全局检查用户状态方法
Vue.prototype.CheckUserStatus = CheckUserStatus;

// 差异性的接口api方法重定义
Vue.prototype.DifferenceApi = new DifferenceApi();

const app = new Vue({
    ...App
});
app.$mount();
