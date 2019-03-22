// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
// import "../static/rem.js"
/**
 * mint-ui组件
 */
import { Swipe, SwipeItem } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

/**
 * YDUI
 */
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
/* 使用px：import 'vue-ydui/dist/ydui.px.css'; */

Vue.use(YDUI);

//iconfont图标
import './assets/iconfont/iconfont.css'


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

/**
 * 引入 Element
 */
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import animated from 'animate.css';
Vue.use(animated)

/**
 * 
 * @param {} m 传入通用的静态ID
 */
export const TO_PAGE = (m) => {
  router.push({
    name: "HtmlApp",
    query: {
      Good_id: m
    }
  });
}
// 状态码
export const LOGIN_SUCCESS = (res) => {
  switch (res.success) {
    case 100:
      var retUrl = window.location.href
      window.location.href = serverUrl.serverUrl  + "/weixin/payOAuth?retUrl=" +  escape(retUrl)
      break;
    case 200:
      console.log('获取成功！');
      break;
    case 300:
      alert(res.msg)
      console.log('请求错误，请刷新重试！');
      break;
    case 301:
      console.log('用户已过期，请刷新重试！');
      break;
    case 400:
      // var ua = navigator.userAgent.toLowerCase();
      // if (ua.match(/MicroMessenger/i) == "micromessenger") {
          //在微信中打开
      var retUrl = window.location.href
      window.location.href = serverUrl.serverUrl + "/Index/Index?retUrl=" +  decodeURI(retUrl)
      break;
    case 401:
      console.log('请绑定手机号！');
      router.push({
        name: "SignIn",
        query: {
          Good_name: "1" //1是绑定手机 2是登陆
        }
      });
      break;
    default:
      break;
  }
}
// 封装的倒计时组件
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
  if ( n == 1) {
    return (
      _hours +
      ":" +
      _minutes +
      ":" +
      _seconds
    );
  } else {
    return (
      "距结束" +
      days +
      "天 " +
      _hours +
      ":" +
      _minutes +
      ":" +
      _seconds
    );
  }

}
export const SalesReturnApplyFor = (id) => {
  router.push({
    name: "SalesReturnApplyFor",
    query: {
      orderId: id
    }
  });
}
let Url
export const GetConfig = () => {
  axios({
    method: "POST",
    data: {},
    url: serverUrl.serverUrl + "/index/GetConfig",
    responseType: "json"
  }).then(response => {
    if (response.data.success == 200) {
      Url = response.data.data.goPayUrl
      return Url
    }
  });
}
GetConfig()
/**
 * 
 * @param {*} res 调起微信支付
 */
export const GetWeixinPay = (res) => {
  console.log(res);
  let _res = res.retData
  console.log(_res.appId);

  function onBridgeReady(_res) {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": _res.appId, //公众号名称，由商户传入     
        "timeStamp": _res.timeStamp, //时间戳，自1970年以来的秒数     
        "nonceStr": _res.nonceStr, //随机串     
        "package": _res.packageStr,
        "signType": "MD5", //微信签名方式：     
        "paySign": _res.paySign //微信签名 
      },
      function (_res) {
        console.log(_res);
        console.log('_res==================');
        if (_res.err_msg == "get_brand_wcpay_request:ok") {
          router.push({
            name: "SuccessOrder",
            query: {
              Isok: 1
            }
          });
          // 使用以上方式判断前端返回,微信团队郑重提示：SuccessOrder
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        } else {
          router.push({
            name: "SuccessOrder",
            query: {
              Isok: 2
            }
          });
        }
      });
  }
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady(_res);
  }
}
/**
 * 
 * @param {*} tc 头筹id
 * @param {*} pt 普通id
 * @param {*} picked 支付类型
 * @param {*} GetTypePay 支付跳转类型
 * @param {*} JumpPath 跳转我的订单路径
 */
export const GoBuySometing = (tc, pt, picked, GetTypePay, JumpPath) => {
  if (GetTypePay) {
    console.log("跳网页支付");
    this.h5axiox(tc, pt, picked);
  } else {
    this.weixinAip(tc, pt, picked, JumpPath);
  }
}

export const h5axiox = (tc, pt, picked) => {
  window.location.href =
    serverUrl.serverUrl +
    "/Paying/GoPay?Client=0&GroupOrderIdList=" +
    tc +
    "&OrderIdList=" +
    pt +
    "&payType=" +
    picked;
}



export const weixinAip = (tc, pt, picked, JumpPath) => {
  if (picked == 30000) {
    axios({
      method: "POST",
      url: Url,
      params: {
        Client: 0,
        GroupOrderIdList: tc,
        OrderIdList: pt,
        payType: picked
      }
    }).then(response => {
      if(response.data.success == 100) {
        window.location.href = serverUrl.serverUrl  + "/weixin/payOAuth?retUrl=" + escape(window.location.href)
      }else if (response.data.success == 200) {
        GetWeixinPay(response.data);
      }
    });
  }else if(picked == 8000) {
    axios({
      method: "POST",
      url: serverUrl.serverUrl + "/Paying/GoGoldCoinPay",
      params: {
        orderId: pt,
      }
    }).then(response => {
      if (response.data.success == 200) {
        alert(response.data.msg)
        router.push({
          name: "Confirmation",
          params: {getCoins: JumpPath}
        });
      }
      if (response.data.success == 300) {
        alert(response.data.msg)
      }
    })
  }else {
    // alert("调用余额支付")
    axios({
      method: "POST",
      url: Url,
      params: {
        Client: 0,
        GroupOrderIdList: tc,
        OrderIdList: pt,
        payType: picked
      }
    }).then(response => {
      if (response.data.success == 200) {
        if(JumpPath == 'reload') {
          return
        }else if(JumpPath === 'LuckyDouble') {
          if(sessionStorage.getItem('GoPath') === 'ShopGoodsList') {
            router.push({
              name: "ShopGoodsList",
              query: {
                plan: 2
              }
            })
          }else if(sessionStorage.getItem('GoPath') !== '') {
            route.push({
              name: "LuckyShareConfirm",
              params: {TwoPersonChipNo: sessionStorage.getItem('GoPath')}
            })
          }
        }else if(JumpPath) {
          router.push({
            name: "Confirmation",
            params: {getCoins: JumpPath}
          })
        }else {
          alert(response.data.msg)
          router.push({
            name: "ShopGoodsList",
            query: {
              plan: 2
            }
          });
        }
      }
      if (response.data.success == 300) {
        alert(response.data.msg + '，请重新选择支付方式！')
      }
    })
  }
}




// 微信分享
let shareurl = location.href.split('#')[0]; //获取锚点之前的链接
axios({
    method: "POST",
    data: {
        url: shareurl
    },
    url: serverUrl.serverUrl + "/WeiXin/GetShareConfig",
    responseType: "json"
}).then( response => {
    console.log(response.data)
    if (response.data.success == 200) {
        let res = response.data.data;
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature, // 必填，签名
            jsApiList: [
                "onMenuShareAppMessage",
                "onMenuShareTimeline"
            ] // 必填，需要使用的JS接口列表
        });
        wx.ready(() => {
            wx.onMenuShareAppMessage({ 
                title: res.shareTitle, // 分享标题
                desc: res.shareDesc, // 分享描述
                link: res.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: res.shareLogo, // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                // 设置成功
                  console.log("分享成功")
                }
            })
            wx.onMenuShareTimeline({
                title: res.shareTitle, // 分享标题
                link: res.shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: res.shareLogo, // 分享图标
                success: function () {
                // 设置成功
                },    
            })
        })
    }
})
//分享免单接龙
export const sharePage = () => {
  let shareJLurl = serverUrl.serverUrl + "/index.html#/FreeOfCharge"; //获取锚点之前的链接
  axios({
      method: "POST",
      data: {
          url: shareJLurl
      },
      url: serverUrl.serverUrl + "/WeiXin/GetShareConfig",
      responseType: "json"
  }).then(response => {
      console.log(response.data)
      if (response.data.success == 200) {
          let res = response.data.data;
          wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.appId, // 必填，公众号的唯一标识
              timestamp: res.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.nonceStr, // 必填，生成签名的随机串
              signature: res.signature, // 必填，签名
              jsApiList: [
                  "onMenuShareAppMessage",
                  "onMenuShareTimeline"
              ] // 必填，需要使用的JS接口列表
          });
          wx.ready(() => {
              wx.onMenuShareAppMessage({ 
                  title: "【邀请免单】" + res.shareTitle_solitaire, // 分享标题
                  desc: res.shareDesc_solitaire, // 分享描述
                  link: res.shareJLUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: res.shareLogo_solitaire, // 分享图标
                  type: '', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                  // 设置成功
                    console.log("分享成功")
                  }
              });
              wx.onMenuShareTimeline({
                  title: "【邀请免单】" + res.shareTitle_solitaire, // 分享标题
                  link: res.shareJlUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                  imgUrl: res.shareLogo_solitaire, // 分享图标
                  success: function () {
                  // 设置成功
                  },    
              })
          })
      }
  })
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
    phoneSizeId: '',
    SetGoods: null
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
      state.SetGoods = price
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
    App,
  },
  template: '<App/>'
})
