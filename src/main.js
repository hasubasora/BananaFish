// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
// import "../static/rem.js"
/**
 * mint-ui组件
 */
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Mint);

/**
 * YDUI
 */
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

Vue.use(YDUI);

/**
 * 请求组件
 */
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios) //告诉vue 要用这个插件
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

import Vuex from "vuex"
Vue.use(Vuex);

import serverUrl from "../static/temper.js"
Vue.prototype.$server = serverUrl;

/**
 * VCharts
 */
import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
