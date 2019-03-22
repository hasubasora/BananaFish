<template>
    <div class="MyInfo">
        <yd-flexbox direction="vertical" class="MaInfoTop">
            <yd-flexbox-item>
                <yd-flexbox class="setting" style="justify-content:flex-end">
                    <img @click="downApp" src="../assets/Img/downApp.png" alt="">
                </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item class="GroupSetInfo">
                <yd-flexbox>
                    <div class="InfoPic">
                        <img :src="UserInfo.UserIcon" alt="">
                    </div>
                    <yd-flexbox-item class="User">
                        <span class="UserName">{{UserInfo.NickName}}</span>
                        <div class="UserInfo">ID: {{UserInfo.MemberId}}</div>
                    </yd-flexbox-item>
                    <div @click="GoGeneralize" class="attendance">
                        <img src="../assets/Img/generalize.png" alt="">
                    </div>
                </yd-flexbox>  
            </yd-flexbox-item>
            <yd-flexbox-item class="isAngel">
                <yd-flexbox>
                    <yd-flexbox-item>
                        <img v-if="balance.isAngel" src="../assets/Img/light.png" alt="">
                        <img v-else src="../assets/Img/Notlight.png" alt="">
                    </yd-flexbox-item>
                    <router-link tag="div" to="/AngelActivity" class="angelText">查看天使会员权益</router-link>
                </yd-flexbox>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox class="balance" direction="vertical">
            <yd-flexbox-item>
                <yd-flexbox class="balance-top">
                    <div>账户余额  <span @click="RemainingSum">￥{{balance.balance}}</span></div>
                    <div>我的积分 <span>{{balance.integral}}</span></div>
                    <div class="withdrawBtn" @click="drawMoney(balance.isAngel)">提现</div>
                </yd-flexbox>       
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox class="myinfo-order">
            <yd-flexbox-item class="order-item" @click.native="handleOrder(1)">
                <yd-badge type="danger" class="badge" v-if="dot.PendingPayment>0">{{dot.PendingPayment}}</yd-badge>
                <img src="../assets/Img/PendingPayment.png" alt="">
                <p>待付款</p>
            </yd-flexbox-item>
            <yd-flexbox-item class="order-item" @click.native="handleOrder(2)">
                <yd-badge type="danger" class="badge" v-if="dot.PendingDelivery>0">{{dot.PendingDelivery}}</yd-badge>
                <img src="../assets/Img/PendingDelivery.png" alt="">
                <p>待发货</p>
            </yd-flexbox-item>
            <yd-flexbox-item class="order-item" @click.native="handleOrder(3)">
                <yd-badge type="danger" class="badge" v-if="dot.PendingReceived>0">{{dot.PendingReceived}}</yd-badge>
                <img src="../assets/Img/PendingReceived.png" alt="">
                <p>待收货</p>
            </yd-flexbox-item>
            <yd-flexbox-item class="order-item" @click.native="handleOrder(4)">
                <yd-badge type="danger" class="badge" v-if="dot.PendingEvaluated>0">{{dot.PendingEvaluated}}</yd-badge>
                <img src="../assets/Img/PendingEvaluated.png" alt="">
                <p>待评价</p>
            </yd-flexbox-item>
            <yd-flexbox-item class="order-item" @click.native="handleOrder(5)">
                <yd-badge type="danger" class="badge" v-if="dot.AfterSale>0">{{dot.AfterSale}}</yd-badge>
                <img src="../assets/Img/AfterSale.png" alt="">
                <p>售后</p>
            </yd-flexbox-item>
            <yd-flexbox-item class="order-item last-order" @click.native="handleOrder(0)">
            </yd-flexbox-item>
        </yd-flexbox>
        <div class="ad-area">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(item, index) in UserCenterAd" :key="index" @click.native="GoClassify(item)">
                    <img :src="item.Src">
                    <!-- <img src="../assets/Img/1.png" alt=""> -->
                </swiper-slide>
            </swiper>
        </div>
        <yd-flexbox class="partner" direction="vertical">
            <yd-flexbox-item class="partner-title">
                <span class="title-left">实用工具</span>
            </yd-flexbox-item>
            <yd-flexbox-item class="partner-content">
                <div class="partner-list">
                    <div class="partner-item" v-for="(item, index) in tool" :key="index" @click="ToLink_bom(item.Link,index)">
                        <img :src="item.imgUrl" alt="">
                        <p>{{item.textName}}</p>
                    </div>
                </div>
            </yd-flexbox-item>
        </yd-flexbox>
        <!-- 解决ios不兼容margin-bottom -->
        <div class="marginBot"></div>
    </div>
</template>
<script>
import { TO_PAGE } from "../main.js";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
    data() {
        return {
            productNum: 0,
            UserInfo: {},
            GetConfig: [],
            status: false,
            balance: {},
            dot: {},
            UserCenterAd: [],
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            tool: [{
                imgUrl: require('../assets/Img/practical1.png'),
                textName: '收货地址',
                Link: 'selectAddress'
                }, {
                imgUrl: require('../assets/Img/coupon.png'),
                textName: '优惠券',
                Link: ''
                }, {
                imgUrl: require('../assets/Img/jinli.png'),
                textName: '锦鲤冒险',
                Link: 'HtmlApp'
                }, {
                imgUrl: require('../assets/Img/practical4.png'),
                textName: '商务合作',
                Link: 'HtmlApp'
                }, {
                imgUrl: require('../assets/Img/practical5.png'),
                textName: '服务协议',
                Link: 'HtmlApp'
                }, {
                imgUrl: require('../assets/Img/practical2.png'),
                textName: '客服',
                Link: ''
                }, {
                imgUrl: require('../assets/Img/practical3.png'),
                textName: '帮助',
                Link: 'help'
                },
            ]
        };
    },
    components: {
        swiper,
        swiperSlide
    },
    created() {
        this.GetUserInfo();
        this.GetOrderNum();
        this.GetShoppingCartNum()
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/GetConfig",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.GetConfig = response.data.data;
                console.log(this.GetConfig);
            }
        });
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/UserCenter/GetTaskLst",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.status = response.data.status;
            }
        });
    },
    methods: {
        downApp() {
            var u = navigator.userAgent;
            if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hz.mall";
            }else if (u.indexOf('iPhone') > -1) {
                window.open("https://itunes.apple.com/cn/app/%E5%A4%B4%E7%AD%B9%E8%B4%AD/id1440461607?mt=8");
            }
        },
        GetUserInfo() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/index_V2",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.balance = response.data;
                    this.UserInfo = response.data.currentUser;
                    this.UserCenterAd = response.data.UserCenterAd
                }
            });
        },
        GoClassify(obj) {
            if(obj.Link.indexOf("http") > -1) {
                window.location.href = obj.Link
            }else if(obj.CategoryID) {
                this.$router.push({path: "menuThree/" + obj.CategoryID})
            }else if(obj.Type) {
                    this.$router.push({path: "menuThree/0", query: {gg: obj.Type}})
            }else if(obj.ProductID > 0) {
                this.$router.push({
                    path: "/GeneralItemDescription",
                    query: {Good_id: obj.ProductID}
                })
            }else if(obj.SpecialAreaType === 1) {
                this.$router.push({path: "/FreeOfCharge"})
            }else if(obj.SpecialAreaType === 2) {
                this.$router.push({path: "/LuckyDouble"})
            }
        },
        RemainingSum() {
            this.$router.push({path: "/RemainingSum"})
        },
        GetOrderNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Order/GetOrderNum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data)
                    this.dot = response.data.orderNum
                }
            })
        },
        drawMoney() {
            this.$router.push({path: "WithdrawDeposit"})           
        },
        ToLink(url, num) {
            console.log(num);
            this.$router.push({
                name: url,
                query: { plan: num }
            });
        },
        ToLink_bom(url, num) {
            switch (num) {
                case 0:
                    this.$router.push({
                        name: url
                    });
                    break;
                case 1:
                    this.$dialog.toast({
                        mes: '敬请期待',
                        timeout: 1500
                    })
                    break;
                case 2:
                    //锦鲤冒险
                    this.$dialog.toast({
                        mes: '敬请期待',
                        timeout: 1500
                    })
                    break;
                case 3:
                    this.$router.push({
                        name: url,
                        query: { plan: num, Good_id: "shangwuhezuo" }
                    });
                    break;
                case 4:
                    this.$router.push({
                        name: url,
                        query: { plan: num, Good_id: "fuwuxieyi" }
                    });
                    break;
                case 5:
                    window.location.href = this.GetConfig.customerServiceUrl;
                    break;
                case 6:
                    this.$router.push({
                        name: url
                    });
                    break;
                default:
                    break;
            }
        },
        partnerDetail(i) {
            console.log(i)
            switch(i) {
                case 0:
                    this.$router.push({path: "/Invitations"})
                    break;
                case 1:
                    this.$router.push({path: "/DirectMember"})
                    break;
                case 2:
                    this.$router.push({path: "/MyEarnings"})
                    break;
                default:
                    break;
            }
        },
        handleOrder(index) {
            this.$router.push({path: "ShopGoodsList", query: {plan: index}})
        },
        GetShoppingCartNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getshoppingcartnum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.productNum = response.data.object.productNum;
                }
            });
        },
        GoGeneralize() {
            switch(this.balance.AgentReviewStatus) {
                case 0:
                    this.$router.push({
                        name: 'ApplicationForAgency'
                    })
                    break;
                case 1:
                    this.$dialog.toast({
                        mes: '待审核',
                        timeout: 1500
                    })
                    break;
                case 2:
                    this.$router.push({
                        name: 'PromotionCenter'
                    })
                    break;
                case 3:
                    this.$dialog.toast({
                        mes: '审核失败',
                        timeout: 1500
                    })
                default:
                    this.$router.push({
                        name: 'ApplicationForAgency'
                    })
                    break;
            }
        }
    }
};
</script>
<style lang="scss">
.MyInfo {
    .MaInfoTop {
        width: 100%;
        box-sizing: border-box;
        background: url(../assets/Img/bg1.png) no-repeat;
        background-size: 100%;
        padding: 0.4rem 0.2rem 0;
        .setting {
            margin-right: -0.2rem;
            img {
                width: 2rem;
            }
        }
        .GroupSetInfo {
            .InfoPic {
                width: 1.4rem;
                height: 1.4rem;
                border-radius: 50%;
                overflow: hidden;
                img {
                    width: 1.4rem;
                    height: 1.4rem;
                }
            }
            .User {
                margin-left: 0.2rem;
                margin-top: -0.1rem;
                color: #fff;
                .UserName {
                    font-size: 0.3rem;
                    font-weight: bold;
                }
                .UserInfo {
                    width: 1.6rem;
                    text-align: center;
                    border: 1px solid #fff;
                    border-radius: 0.2rem;
                    margin-top: 0.1rem;
                    padding: 0.02rem 0;
                }
            }
            .attendance {
                margin-right: -0.2rem;
                img {
                    width: 2rem;
                }
            }
        }
        .isAngel {
            background: url(../assets/Img/angleBg.png) no-repeat;
            background-size: 100% 100%;
            padding: 0.2rem;
            margin-top: 0.1rem;
            img {
                width: 2.6rem;
            }
            .angelText {
                color: #DFAF79;
            }
        }
    }
    .balance {
        background: #fff;
        margin: 0 0.2rem;
        font-size: 0.3rem;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        .balance-top {
            justify-content: space-between;
            padding: 0.3rem;
            border-bottom: 1px solid #f5f5f5;
            span {
                font-weight: bold;
            }
            .withdrawBtn {
                background: red;
                color: #fff;
                padding: 0.14rem 0.4rem;
                border-radius: 0.4rem;
                font-size: 0.28rem;
            }
        }
        .balance-center {
            padding: 0.2rem 0.4rem;
            justify-content: space-between;
            border-bottom: 1px solid #f5f5f5;
            p {
                text-align: center;
            }
            .center-item {
                border-right: 2px solid #ddd;
                &:last-child {
                    border-right: none;
                }
                .item-num {
                    font-size: 0.36rem;
                    font-weight: bold;
                    color: #333333
                }
                .item-text {
                    font-size: 0.28rem;
                    color: #888888;
                }
                .colorRed {
                    color: red;
                    img {
                        width: 0.3rem;
                    }
                }
                .colorGreen {
                    color: green;
                    img {
                        width: 0.3rem;
                    }
                }
            }
            .center-item p:first-child {
                margin-bottom: 0.1rem;
            }
        }
        .balance-bottom {
            display: flex;
            padding: 0.2rem 0.8rem;
            justify-content: space-between;
            font-size: 0.28rem;
            color: #888888;
            span {
                color: #DFAF79;
            }
        }
    }
    .myinfo-order {
        background: #fff;
        margin: 0.3rem 0.24rem 0.2rem;
        border-radius: 0.1rem;
        box-shadow: 1px 1px 1px #ddd;
        .order-item {
            position: relative;
            padding: 0.12rem 0;
            text-align: center;
            color: #888888;
            justify-content: space-between;
            box-sizing: border-box;
            .badge {
                position: absolute;
                right: 50%;
                margin-right: -0.46rem;
                top: 0.04rem;
            }
            img {
                width: 0.5rem;
            }
            p {
                margin-top: 0.1rem;
                font-size: 0.26rem;
            }  
        }
        .last-order {
            padding-top: 0;
            padding-bottom: 20%;
            background: url(../assets/Img/allOrder.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .tc-order {
        background: #fff;
        margin: 0.2rem 0.24rem 0.3rem;
        border-radius: 0.1rem;
        box-shadow: 1px 1px 1px #ddd;
        .tc-item {
            position: relative;
            width: 83.33%;
            color: #888888;
            text-align: center;
            justify-content: space-between;
            box-sizing: border-box;
            .item {
                position: relative;
                padding: 0.12rem 0;
                img {
                    width: 0.5rem;
                }
                p {
                    margin-top: 0.1rem;
                    font-size: 0.26rem;
                }
                .badge {
                    position: absolute;
                    right: 50%;
                    margin-right: -0.46rem;
                    top: 0.04rem;
                }
            }  
        }
        .last-item {
            width: 16.67%;
            padding-bottom: 20%;
            background: url(../assets/Img/alltc.png) no-repeat;
            background-size: 100% 100%;
        }
    }
    .ad-area {
        padding: 0 0.2rem; 
        margin-bottom: 0.2rem;
        img {
            width: 100%;
        }
    }
    .partner {
        background: #fff;
        margin: 0 0.24rem 0.2rem;
        border-radius: 0.1rem;
        box-shadow: 1px 1px 1px #ddd;
        color: #888888;
        .partner-title {
            display: flex;
            justify-content: space-between;
            padding: 0.16rem 0.4rem 0.16rem 0.2rem;
            border-bottom: 1px solid #f5f5f5;
            line-height: 0.4rem;
            .title-left {
                font-weight: bold;
                font-size: 0.3rem;
                color: #333333;
            }
            .title-right {
                font-size: 0.28rem;
            }
        }
        .partner-content {
            padding: 0.2rem;
            .partner-list {
                display: flex;
                flex-wrap: wrap;
                text-align: center;
                .partner-item {
                    width: 25%;
                    margin-bottom: 0.3rem;
                }
                img {
                    width: 0.6rem;
                }
            }
        }
    }
    .marginBot {
        height: 1.6rem;
    }
}
</style>
