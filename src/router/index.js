import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
Vue.prototype.$Router = Router;

export default new Router({
  routes: [{
      path: '/',
      // name: 'index',
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
      path: '/GeneralItemDescription',
      name: 'GeneralItemDescription',
      component: GeneralItemDescription => require(["@/components/GeneralItemDescription"], GeneralItemDescription),
    }, { //登陆
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn => require(["@/components/SignIn"], SignIn),
    }, { //提交订单
      path: '/cartOrder/',
      name: 'cartOrder',
      component: cartOrder => require(["@/components/cartOrder"], cartOrder),
    }, { //保存地址
      path: '/setAddress',
      name: 'setAddress',
      component: setAddress => require(["@/components/setAddress"], setAddress),
    }, { //地址列表
      path: '/address/:address_id',
      name: 'address',
      component: address => require(["@/components/address"], address),
    }, { //成功页面
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
    }, { //我的收益
      path: '/MyIncome',
      name: 'MyIncome',
      component: MyIncome => require(["@/components/MyIncome"], MyIncome),
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
    }, { //我的团队
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
    }, //HTML
    {
      path: '/helpApp',
      name: 'helpApp',
      component: helpApp => require(["@/components/helpApp"], helpApp),
    }, { //退款详情
      path: '/SalesReturnApplyFor',
      name: 'SalesReturnApplyFor',
      component: SalesReturnApplyFor => require(["@/components/SalesReturnApplyFor"], SalesReturnApplyFor),
    }, { //落地页
      path: '/LandingPage',
      name: 'LandingPage',
      component: LandingPage => require(["@/components/LandingPage"], LandingPage),
    }, {
      path: '/shareProfit',
      name: 'shareProfit',
      component: shareProfit => require(["@/components/shareProfit"], shareProfit),
    }, {
      path: '/Invite',
      name: 'Invite',
      component: Invite => require(["@/components/Invite"], Invite),
    }, {
      path: '/Activities',
      name: 'Activities',
      component: Activities => require(["@/components/Activities"], Activities),
    }, {//天使会员规则
      path: '/ActivityRules',
      name: 'ActivityRules',
      component: ActivityRules => require(["@/components/ActivityRules"], ActivityRules),
    }, {//天使会员介绍
      path: '/AngelActivity',
      name: 'AngelActivity',
      component: AngelActivity => require(["@/components/AngelActivity"], AngelActivity),
    }, {//分享页面
      path: '/SharePage',
      name: 'SharePage',
      component: SharePage => require(["@/components/SharePage"], SharePage),
    }, {//头筹规则
      path: '/TCRuler',
      name: 'TCRuler',
      component: TCRuler => require(["@/components/TCRuler"], TCRuler),
    }, {//积分规则
      path: '/integralRuler',
      name: 'integralRuler',
      component: integralRuler => require(["@/components/integralRuler"], integralRuler),
    }, {//分佣规则
      path: '/Commission',
      name: 'Commission',
      component: Commission => require(["@/components/Commission"], Commission),
    }, {//筛选
      path: '/sock',
      name: 'sock',
      component: sock => require(["@/components/sock"], sock),
    }, {//提现记录
      path: '/WithdrawalRecord',
      name: 'WithdrawalRecord',
      component: WithdrawalRecord => require(["@/components/WithdrawalRecord"], WithdrawalRecord),
    }, {//新人绑定手机号码
      path: '/Binding',
      name: 'Binding',
      component: Binding => require(["@/components/Binding"], Binding),
    }, {//新人绑定手机号提现
      path: '/TheCoupleWithdrawal',
      name: 'TheCoupleWithdrawal',
      component: TheCoupleWithdrawal => require(["@/components/TheCoupleWithdrawal"], TheCoupleWithdrawal),
    }, {//免单接龙
      path: '/FreeOfCharge',
      name: 'FreeOfCharge',
      component: FreeOfCharge => require(["@/components/FreeOfCharge/FreeOfCharge"], FreeOfCharge),
    }, {//我的免单
      path: '/MyFreeList',
      name: 'MyFreeList',
      component: MyFreeList => require(["@/components/FreeOfCharge/MyFreeList"], MyFreeList),
    }, {//我的免单
      path: '/FreeDetail',
      name: 'FreeDetail',
      component: FreeDetail => require(["@/components/FreeOfCharge/FreeDetail"], FreeDetail),
    }, {//免单的订单详情页
      path: '/FreeOrderDetail',
      name: 'FreeOrderDetail',
      component: FreeOrderDetail => require(["@/components/FreeOfCharge/FreeOrderDetail"], FreeOrderDetail),
    }, {//免单的购物车支付页
      path: '/FreeCartOrder',
      name: 'FreeCartOrder',
      component: FreeCartOrder => require(["@/components/FreeOfCharge/FreeCartOrder"], FreeCartOrder),
    }, {//免单-成功下单
      path: '/Confirmation',
      name: 'Confirmation',
      component: Confirmation => require(["@/components/FreeOfCharge/Confirmation"], Confirmation),
    }, {//幸运双拼
      path: '/LuckyDouble',
      name: 'LuckyDouble',
      data: function () {
        var _this = this;
        // 返回同一个位置
        var scrollTop = sessionStorage.getItem("scrollTop");
        if (scrollTop) {
            _this.$nextTick(function () {
            document.querySelector('.LuckyDouble')[0].scrollTop(scrollTop);
          });
        }
      },
      component: LuckyDouble => require(["@/components/LuckyDouble/LuckyDouble"], LuckyDouble),
    }, {//推广中心
      path: '/PromotionCenter',
      name: 'PromotionCenter',
      component: PromotionCenter => require(["@/components/PromotionCenter/PromotionCenter"], PromotionCenter),
    }, {//幸运双拼订单详情
      path: '/LuckyOrderDetail',
      name: 'LuckyOrderDetail',
      component: LuckyOrderDetail => require(["@/components/LuckyOrderDetail/LuckyOrderDetail"], LuckyOrderDetail),
    }, {//幸运双拼分享页面
      path: '/LuckyDoubleShare',
      name: 'LuckyDoubleShare',
      component: LuckyDoubleShare => require(["@/components/LuckyDoubleShare/LuckyDoubleShare"], LuckyDoubleShare),
    }, {//幸运双拼下单成功页面
      path: '/LuckyShareConfirm',
      name: 'LuckyShareConfirm',
      component: LuckyShareConfirm => require(["@/components/LuckyShareConfirm/LuckyShareConfirm"], LuckyShareConfirm),
    }, {//申请代理
      path: '/ApplicationForAgency',
      name: 'ApplicationForAgency',
      component: ApplicationForAgency => require(["@/components/ApplicationForAgency/ApplicationForAgency"], ApplicationForAgency),
    }, {//申请代理
      path: '/MaterialCircle',
      name: 'MaterialCircle',
      component: MaterialCircle => require(["@/components/MaterialCircle/MaterialCircle"], MaterialCircle),
    }, {//申请代理
      path: '/MaterialCircleArticle',
      name: 'MaterialCircleArticle',
      component: MaterialCircleArticle => require(["@/components/MaterialCircleArticle/MaterialCircleArticle"], MaterialCircleArticle),
    }
  ],
  saveScrollPosition: true
})
