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
          path: '/MyInfo',
          name: 'MyInfo',
          component: MyInfo => require(["@/components/MyInfo"], MyInfo),
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
    }, { //我的收益
      path: '/MyEarnings',
      name: 'MyEarnings',
      component: MyEarnings => require(["@/components/MyEarnings"], MyEarnings),
    }, { //普通订单详情
      path: '/GeneralOrderDetails',
      name: 'GeneralOrderDetails',
      component: GeneralOrderDetails => require(["@/components/GeneralOrderDetails"], GeneralOrderDetails),
    }, { //普通订单详情
      path: '/TheTopOrderDetails',
      name: 'TheTopOrderDetails',
      component: TheTopOrderDetails => require(["@/components/TheTopOrderDetails"], TheTopOrderDetails),
    }, { //我的代理
      path: '/MyAgent',
      name: 'MyAgent',
      component: MyAgent => require(["@/components/MyAgent"], MyAgent),
    }, { //我的代理
      path: '/DirectMember',
      name: 'DirectMember',
      component: DirectMember => require(["@/components/DirectMember"], DirectMember),
    }, { //物流
      path: '/OrderLogistics',
      name: 'OrderLogistics',
      component: OrderLogistics => require(["@/components/OrderLogistics"], OrderLogistics),
    }, { //提现
      path: '/WithdrawDeposit',
      name: 'WithdrawDeposit',
      component: WithdrawDeposit => require(["@/components/WithdrawDeposit"], WithdrawDeposit),
    }, { //余额
      path: '/RemainingSum',
      name: 'RemainingSum',
      component: RemainingSum => require(["@/components/RemainingSum"], RemainingSum),
    }, { //银行卡
      path: '/BankCard',
      name: 'BankCard',
      component: BankCard => require(["@/components/BankCard"], BankCard),
    }, { //银行卡
      path: '/SetBankCard',
      name: 'SetBankCard',
      component: SetBankCard => require(["@/components/SetBankCard"], SetBankCard),
    }, { //余额明细
      path: '/TouchBalance',
      name: 'TouchBalance',
      component: TouchBalance => require(["@/components/TouchBalance"], TouchBalance),
    }, { //余额明细
      path: '/PayCard',
      name: 'PayCard',
      component: PayCard => require(["@/components/PayCard"], PayCard),
    }, { //余额明细
      path: '/Comment',
      name: 'Comment',
      component: Comment => require(["@/components/Comment"], Comment),
    }, { //我的积分
      path: '/MyPoints',
      name: 'MyPoints',
      component: MyPoints => require(["@/components/MyPoints"], MyPoints),
    }, { //邀请
      path: '/Invitations',
      name: 'Invitations',
      component: Invitations => require(["@/components/Invitations"], Invitations),
    }, { //评价列表
      path: '/TheEvaluationList/:Good_id',
      name: 'TheEvaluationList',
      component: TheEvaluationList => require(["@/components/TheEvaluationList"], TheEvaluationList),
    }, { //help
      path: '/help',
      name: 'help',
      component: help => require(["@/components/help"], help),
    }, { //搜索
      path: '/SearchList',
      name: 'SearchList',
      component: SearchList => require(["@/components/SearchList"], SearchList),
    }, { //消息
      path: '/MessageQueue',
      name: 'MessageQueue',
      component: MessageQueue => require(["@/components/MessageQueue"], MessageQueue),
    }, { //shangwuhezuo
      path: '/Though',
      name: 'Though',
      component: Though => require(["@/components/Though"], Though),
    }, { //消息
      path: '/www/:Good_id',
      name: 'www',
      component: www => require(["@/components/www"], www),
    }, { //消息
      path: '/MessageText/:Text_id',
      name: 'MessageText',
      component: MessageText => require(["@/components/MessageText"], MessageText),
    }, { //HTML
      path: '/OrderLogisticsApp',
      name: 'OrderLogisticsApp',
      component: OrderLogisticsApp => require(["@/components/OrderLogisticsApp"], OrderLogisticsApp),
    }, { //HTML
      path: '/HtmlApp',
      name: 'HtmlApp',
      component: HtmlApp => require(["@/components/HtmlApp"], HtmlApp),
    },
  ]
})
