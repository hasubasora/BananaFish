import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)
Vue.prototype.$Router = Router;
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {//一级目录
      path: '/productList',
      name: 'productList',
      component: productList => require(["@/components/productList"], productList),
    }, {
      path: '/ProductGroupList',
      name: 'ProductGroupList',
      component: ProductGroupList => require(["@/components/ProductGroupList"], ProductGroupList),
    },
    {//三级目录
      path: '/menuThree',
      name: 'menuThree',
      component: menuThree => require(["@/components/menuThree"], menuThree),
    }

  ]
})
