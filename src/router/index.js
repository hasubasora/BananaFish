import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)
Vue.prototype.$Router = Router;
export default new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home
        }, { //一级目录
            path: '/productList',
            name: 'productList',
            component: productList => require(["@/components/productList"], productList),
        }, {
            path: '/ProductGroupList',
            name: 'ProductGroupList',
            component: ProductGroupList => require(["@/components/ProductGroupList"], ProductGroupList),
        },
        { //三级目录
            path: '/menuThree/:Group_id',
            name: 'menuThree',
            component: menuThree => require(["@/components/menuThree"], menuThree),
        },
        { //商品详细
            path: '/ItemDescription',
            name: 'ItemDescription',
            component: ItemDescription => require(["@/components/ItemDescription"], ItemDescription),
        },
        { //商品详细
            path: '/GeneralItemDescription/:Good_id',
            name: 'GeneralItemDescription',
            component: GeneralItemDescription => require(["@/components/GeneralItemDescription"], GeneralItemDescription),
        }, { //购物车
            path: '/cart',
            name: 'cart',
            component: cart => require(["@/components/cart"], cart),
        }, { //登陆
            path: '/SignIn',
            name: 'SignIn',
            component: SignIn => require(["@/components/SignIn"], SignIn),
        }, { //提交订单
            path: '/cartOrder',
            name: 'cartOrder',
            component: cartOrder => require(["@/components/cartOrder"], cartOrder),
        }, { //提交订单
            path: '/setAddress',
            name: 'setAddress',
            component: setAddress => require(["@/components/setAddress"], setAddress),
        }, { //提交订单
            path: '/address/:address_id',
            name: 'address',
            component: address => require(["@/components/address"], address),
        }, { //提交订单
            path: '/info',
            name: 'info',
            component: info => require(["@/components/info"], info),
        },
    ]
})