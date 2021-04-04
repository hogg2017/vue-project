import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import "./plugins/element.js";
import "./assets/css/global.css"
// 导入包
import axios from 'axios'
import "../mock/mock"
//注册bus
import VueBus from 'vue-bus'
import store from './store/index'

//设定根路径
// axios.defaults.baseURL=''

Vue.config.productionTip = false;
//axios 拦截器
axios.interceptors.request.use(config =>{
  // console.log('打印一下request')
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  //config 必须要被返回
  return config
})
Vue.prototype.$http = axios;//在vue的原型上挂在axios
//所有vue组件都可以通过this 访问到$http
Vue.use(VueBus)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
