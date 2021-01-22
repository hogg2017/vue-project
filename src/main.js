import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./assets/css/global.css"
// 导入包
import axios from 'axios'
import "../mock/mock"

//设定根路径
// axios.defaults.baseURL=''

Vue.config.productionTip = false;
Vue.prototype.$http = axios;//在vue的原型上挂在axios
//所有vue组件都可以通过this 访问到$http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
