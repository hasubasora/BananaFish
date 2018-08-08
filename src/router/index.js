import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/productList',
      name: 'productList',
      component: productList => require(["@/components/productList"], productList),
    }, {
      path: '/ProductGroupList',
      name: 'ProductGroupList',
      component: ProductGroupList => require(["@/components/ProductGroupList"], ProductGroupList),
    }
    
  ]
})
