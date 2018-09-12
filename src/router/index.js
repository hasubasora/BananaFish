import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Vue.prototype.$Router = Router;

export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: index => require(["@/components/index"], index),
      children: [{ //购物车
          path: '/',
          name: 'Home',
          component: Home => require(["@/components/Home"], Home),
        },
        {
          path: '/ProductGroupList',
          name: 'ProductGroupList',
          component: ProductGroupList => require(["@/components/ProductGroupList"], ProductGroupList),
        },
        { //购物车
          path: '/cart',
          name: 'cart',
          component: cart => require(["@/components/cart"], cart),
        }, { //个人信息
          path: '/UserInfo',
          name: 'UserInfo',
          component: UserInfo => require(["@/components/UserInfo"], UserInfo),
        },
      ]
    }, { //一级目录
      path: '/productList',
      name: 'productList',
      component: productList => require(["@/components/productList"], productList),
    },
    { //三级目录
      path: '/menuThree/:Group_id',
      name: 'menuThree',
      component: menuThree => require(["@/components/menuThree"], menuThree),
    },
    { //商品详细
      path: '/ItemDescription/:ItemGood_id',
      name: 'ItemDescription',
      component: ItemDescription => require(["@/components/ItemDescription"], ItemDescription),
    },
    { //商品详细
      path: '/GeneralItemDescription/:Good_id',
      name: 'GeneralItemDescription',
      component: GeneralItemDescription => require(["@/components/GeneralItemDescription"], GeneralItemDescription),
    }, { //登陆
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn => require(["@/components/SignIn"], SignIn),
    }, { //提交订单
      path: '/cartOrder/:address_GetId',
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
      path: '/SuccessOrder',
      name: 'SuccessOrder',
      component: SuccessOrder => require(["@/components/SuccessOrder"], SuccessOrder),
    }, { //pingtaijifen
      path: '/RedData',
      name: 'RedData',
      component: RedData => require(["@/components/RedData"], RedData),
    }, { //我的积分
      path: '/MyRedData',
      name: 'MyRedData',
      component: MyRedData => require(["@/components/MyRedData"], MyRedData),
    }, { //订单
      path: '/ShopGoodsList',
      name: 'ShopGoodsList',
      component: ShopGoodsList => require(["@/components/ShopGoodsList"], ShopGoodsList),
    }, { //普通订单
      path: '/TopGoodsList',
      name: 'TopGoodsList',
      component: TopGoodsList => require(["@/components/TopGoodsList"], TopGoodsList),
    }, { //设置
      path: '/Seting',
      name: 'Seting',
      component: Seting => require(["@/components/Seting"], Seting),
    }, { //设置
      path: '/Description/:ItemGood_id',
      name: 'Description',
      component: Description => require(["@/components/Description"], Description),
    }, { //设置
      path: '/selectAddress',
      name: 'selectAddress',
      component: selectAddress => require(["@/components/selectAddress"], selectAddress),
    }, { //我的
      path: '/MyInfo',
      name: 'MyInfo',
      component: MyInfo => require(["@/components/MyInfo"], MyInfo),
    },
  ]
})
