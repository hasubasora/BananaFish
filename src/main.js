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
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
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



export const LOGIN_SUCCESS = (success) => {
  switch (success) {
    case 200:
      console.log('获取成功！');
      break;
    case 300:
      console.log('请求错误，请刷新重试！');

      break;
    case 400:
      console.log('你还没有登陆，请登陆！');
      router.push({
        name: "SignIn",
        query: {
          Good_name: "2"
        }
      });
      break;
    case 401:
      console.log('请绑定手机号！');
      router.push({
        name: "SignIn",
        query: {
          Good_name: "1"
        }
      });
      break;
    default:
      break;
  }
}


export const GetUnTime = (d, n) => {
  var date3 = d * 1000; //时间差的毫秒数
  //------------------------------
  //计算出相差天数
  var days = Math.floor(date3 / (24 * 3600 * 1000));
  //计算出小时数
  var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
  var hours = Math.floor(leave1 / (3600 * 1000));
  let _hours = hours.toString().length < 2 ? +'0' + hours.toString() : hours
  //计算相差分钟数
  var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
  var minutes = Math.floor(leave2 / (60 * 1000));
  let _minutes = minutes.toString().length < 2 ? +'0' + minutes.toString() : minutes

  //计算相差秒数
  var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
  var seconds = Math.round(leave3 / 1000);
  let _seconds = seconds.toString().length < 2 ? +'0' + seconds.toString() : seconds
  if (n == 1) {
    return (
      _hours +
      ": " +
      _minutes +
      ":" +
      _seconds
    );
  } else {
    return (
      " 距结束 " +
      days +
      "天 " +
      _hours +
      ": " +
      _minutes +
      ":" +
      _seconds
    );
  }

}


export const GoBuySometing = (tc, pt, picked) => {

  window.location.href = serverUrl.serverUrl + "/Paying/GoPay?Client=0&GroupOrderIdList=" + tc + "&OrderIdList=" + pt + "&payType=" + picked;
}
//获取支付方式
export const GetPay = () => {
  //获取支付地址
  let PayList = []
  axios({
    method: "POST",
    data: {
      Client: 0
    },
    url: serverUrl.serverUrl + "/Paying/GetPayType",
    responseType: "json"
  }).then(response => {
    if (response.data.success == 400) {
      this.$router.push({
        name: "SignIn"
      });
    }
    if (response.data.success == 200) {
      PayList = response.data.list;
      console.log(PayList);

      return PayList
    }
  });
}

export const getNum = () => axios.post(serverUrl.serverUrl + "/order/getshoppingcartnum", {

  })
  .then(function (response) {
    CartNum = response.data.object.productNum
    store.commit('increment', CartNum)
    console.log(response.data.object.productNum);
  })
  .catch(function (error) {
    console.log(error);
  });
export let CartNum



// 实例化
const store = new Vuex.Store({
  state: { //需要储存的数据
    counts: 0,
    phoneSizeId: ''
  },
  //getters
  getters: { //获取状态及里面的数据
    getTotal(state) { //拿状态集里面的数据
      return state.counts
    }
  },
  // commit
  mutations: { //动作 只能同步操作数据 不能做接口
    // this.$store.commit('increment', this.price) //触发
    increment(state, price) { //state 来改变 cound
      // 变更状态
      state.counts = price
    },

    decrement() {
      state.counts -= price
    }
  },
  //dispatch
  actions: { //能在这里进行异步的操作 跟后端API接口放这里
    //  this.$store.dispatch('increase', this.price) //触发
    increase(context, price) { //做个中介再去执行
      context.commit('increment', price)
    }
  }
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,

  components: {
    App
  },
  template: '<App/>'
})
