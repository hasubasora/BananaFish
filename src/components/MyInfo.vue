<template>
    <div class="myinfo" v-if="UserInfo.currentUser">
        <yd-flexbox direction="vertical">
            <yd-flexbox-item class="GroupSetLink">
                <router-link to="/Seting"> <img src="../assets/Img/set.png" alt="" class="SetLink"></router-link>

            </yd-flexbox-item>
            <yd-flexbox-item class="GroupSetInfo">
                <yd-flexbox>
                    <div class="InfoPic">
                        <!-- <img v-if="!UserInfo.currentUser" src="../assets/Img/bkc.jpg" alt=""> -->
                        <img v-if="UserInfo.currentUser" :src="UserInfo.currentUser.UserIcon" alt="">
                    </div>
                    <yd-flexbox-item @click.native="GoRedData">
                        <span class="UserName">{{UserInfo.currentUser.NickName}}</span>
                        <div class="UserInfo">分红指数</div>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <router-link to="/RemainingSum">
                            <strong class="UserMoney">{{UserInfo.balance}}</strong>
                            <span class="MoneyTitle">我的余额（元）</span>
                        </router-link>
                    </yd-flexbox-item>
                    <div class="withdrawal" @click="ToLink('WithdrawDeposit',new Date())">
                        提现
                    </div>
                </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <p class="VipTime">
                    <img src="../assets/Img/VIP3x.png" alt="">本期积分收益已开放领取，立即领取
                </p>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-flexbox class="MyIntegral">
                    <yd-flexbox-item @click.native="ToLink('MyPoints',new Date())">
                        <span class="IntegralMsg">{{UserInfo.integral}}</span>
                        <span class="IntegralTitle">我的积分</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item @click.native="GoMyEarnings">
                        <span class="IntegralMsg borderccc">{{UserInfo.profit}}</span>
                        <span class="IntegralTitle borderccc">我的收益</span>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-cell-group class="OrderList" @click.native="ToLink('ShopGoodsList',0)">
                    <yd-cell-item arrow>
                        <span slot="left">订单管理</span>
                        <span slot="right">查看全部</span>
                    </yd-cell-item>
                </yd-cell-group>
            </yd-flexbox-item>
            <!-- 订单栏目 -->
            <yd-flexbox-item class="navList">
                <yd-flexbox>
                    <yd-flexbox-item v-for="(item, index) in ListOne" :key="index" @click.native="ToLink(item.Link,index+1)" class="badge">
                        <yd-badge type="danger" v-if="index==0&&PendingPayment!=0" class="danger">{{PendingPayment}}</yd-badge>
                        <yd-badge type="danger" v-if="index==1&&PendingDelivery!=0" class="danger">{{PendingDelivery}}</yd-badge>
                        <yd-badge type="danger" v-if="index==2&&PendingReceived!=0" class="danger">{{PendingReceived}}</yd-badge>
                        <yd-badge type="danger" v-if="index==3&&PendingEvaluated!=0" class="danger">{{PendingEvaluated}}</yd-badge>
                        <yd-badge type="danger" v-if="index==4&&AfterSale!=0" class="danger">{{AfterSale}}</yd-badge>
                        <img :src="item.imgUrl" alt="" class="IconImg">
                        <span class="IconName"> {{item.iconName}}</span>

                    </yd-flexbox-item>
                </yd-flexbox>
                <yd-cell-group class="TopGroup">
                    <yd-cell-item arrow class="arrow" @click.native="ToLink('TopGoodsList',0)">
                        <span slot="left" class="TopGroupBack">我的头筹订单</span>
                        <span slot="right">查看全部</span>
                    </yd-cell-item>
                    <div class="TopGroupClass" v-if="TopGoodList.length>0">
                        <yd-flexbox>
                            <yd-flexbox-item v-for="(item, index) in TopGoodList" :key="index">
                                <div class="TopGoodsList">
                                    <img :src=item.ImgUrl alt="" class="TopGoodsImg">
                                    <span class="TopGoodsPug">{{item.WinnerStr}}</span>
                                </div>
                                <p class="TopGoodsTitle">{{item.OrderTitle}}</p>
                                <div class="TopGoodsTitle">标号{{item.LuckerNumber}}</div>
                            </yd-flexbox-item>

                        </yd-flexbox>

                    </div>
                </yd-cell-group>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-cell-group class="OrderList">
                    <yd-cell-item>
                        <span slot="left">合伙人中心</span>
                    </yd-cell-item>
                </yd-cell-group>
            </yd-flexbox-item>
            <yd-flexbox-item class="navList_two">
                <yd-flexbox class=" invite">
                    <yd-flexbox-item>
                        <router-link to="/Invitations">
                            <div class="inviteImg">
                                <img src="../assets/Img/yq.png" alt="">
                                <span>邀请有奖</span>
                            </div>
                        </router-link>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <div class="inviteImg borderccc" @click="GoMyAgent">
                            <img src="../assets/Img/td.png" alt="">
                            <span>我的团队</span>
                        </div>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-cell-group class="OrderList">
                    <yd-cell-item>
                        <span slot="left">实用工具</span>
                    </yd-cell-item>
                </yd-cell-group>
            </yd-flexbox-item>
            <!-- 工具栏 -->
            <yd-flexbox-item class="navList " style="margin-bottom:1rem;">
                <yd-flexbox>
                    <yd-flexbox-item v-for="(itemt, index) in ListTwo" :key="index" @click.native="ToLink(itemt.Link)">
                        <img :src="itemt.imgUrl" alt="" class="IconImg">
                        <span class="IconName">{{itemt.iconName}}</span>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>
<script>
export default {
    data() {
        return {
            PendingPayment: 0, // 呆付款 是
            PendingDelivery: 0, //  待发货 是
            PendingReceived: 0, //  待收货 是
            PendingEvaluated: 0, //  待评价 是
            AfterSale: 0, // 收货 是
            ListOne: [
                {
                    iconName: "待付款",
                    imgUrl: require("../assets/Img/dfk.png"),
                    Link: "ShopGoodsList"
                },
                {
                    iconName: "待发货",
                    imgUrl: require("../assets/Img/dfh.png"),
                    Link: "ShopGoodsList"
                },
                {
                    iconName: "待收货",
                    imgUrl: require("../assets/Img/dsh.png"),
                    Link: "ShopGoodsList"
                },
                {
                    iconName: "待评价",
                    imgUrl: require("../assets/Img/dpj.png"),
                    Link: "ShopGoodsList"
                },
                {
                    iconName: "售后",
                    imgUrl: require("../assets/Img/sh.png"),
                    Link: "ShopGoodsList"
                }
            ],
            ListTwo: [
                {
                    iconName: "收货地址",
                    imgUrl: require("../assets/Img/shdz.png"),
                    Link: "selectAddress"
                },
                {
                    iconName: "客服",
                    imgUrl: require("../assets/Img/kf.png"),
                    Link: "Though"
                },
                {
                    iconName: "帮助",
                    imgUrl: require("../assets/Img/bz.png"),
                    Link: "help"
                },
                {
                    iconName: "商务合作",
                    imgUrl: require("../assets/Img/swhz.png"),
                    Link: "Though"
                },
                {
                    iconName: "服务协议",
                    imgUrl: require("../assets/Img/jrwm.png"),
                    Link: "Though"
                }
            ],
            UserInfo: [],
            TopGoodList: []
        };
    },
    created() {
        this.GetUserInfo();
        this.Getbadge();


        

         this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/index/GetConfig",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    // this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    // console.log(response.data);
                   
                }
            });
    },
    methods: {
        ToLink(url, num, tit) {
            console.log(num);
            this.$router.push({ name: url, query: { plan: num, Titles: tit } });
        },
        GoMyAgent() {
            this.$router.push({ name: "MyAgent" });
        },
        GoMyEarnings() {
            this.$router.push({ name: "MyEarnings" });
        },
        GetUserInfo() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/index",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    // this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    // console.log(response.data);
                    this.UserInfo = response.data;
                    this.TopGoodList = response.data.orderList;
                }
            });
        },
        GoRedData() {
            this.$router.push({ name: "RedData" });
        },
        Getbadge() {
            //小红点
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Order/GetOrderNum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    // this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data.orderNum.AfterSale);
                    let badge = response.data.orderNum;
                    this.PendingPayment = badge.PendingPayment; // 呆付款 是
                    this.PendingDelivery = badge.PendingDelivery; //  待发货 是
                    this.PendingReceived = badge.PendingReceived; //  待收货 是
                    this.PendingEvaluated = badge.PendingEvaluated; //  待评价 是
                    this.AfterSale = badge.AfterSale; // 收货 是
                }
            });
        }
    }
};
</script>
<style lang="scss">
.myinfo {
    margin-bottom: 1rem;
    height: 100%;
    width: 100%;
    background: url(../assets/Img/bg.png) no-repeat;
    position: relative;
    background-size: 100%;
    padding: 0.2rem;
    .yd-cell-box {
        margin-bottom: 0;
        border-top-right-radius: 10px;
        border-top-left-radius: 10px;
    }
    .GroupSetLink {
        height: 0.5rem;
        .SetLink {
            height: 0.4rem;
            width: 0.4rem;
            position: absolute;
            top: 0.2rem;
            right: 0.2rem;
        }
    }
    .OrderList {
        .yd-cell {
            border-top-right-radius: 10px;
            border-top-left-radius: 10px;
        }
    }
    .GroupSetInfo {
        height: 1rem;

        .InfoPic {
            width: 1.2rem;
            margin-right: 0.2rem;
            border-radius: 50px;
            overflow: hidden;
            height: 1.2rem;
            > img {
                width: 100%;
            }
        }
        .UserName {
            font-size: 0.26rem;
            color: aliceblue;
            height: 0.45rem;
            display: block;
        }
        .UserInfo {
            background: rgba(1, 1, 1, 0.4);
            color: #ffffff;
            text-align: center;
            padding: 0.05rem;
            border-radius: 15px;
            border: 1px solid #913131;
            width: 1.6rem;
            &::after {
                content: "\27A7";
                margin-left: 0.1rem;
            }
        }
        .UserMoney {
            font-size: 0.5rem;
            color: #ffffff;
            display: block;
            text-align: right;
        }
        .MoneyTitle {
            @extend .UserMoney;
            font-size: 0.26rem;
        }
        .withdrawal {
            text-align: center;
            line-height: 0.7rem;
            font-size: 0.26rem;
            width: 1.3rem;
            height: 0.7rem;
            background: url(../assets/Img/qianbg.png) no-repeat;
            background-size: 100%;
        }
    }
    .VipTime {
        margin: 0.4rem 0;
        padding: 0.05rem;
        background: rgba(251, 251, 251, 0.4);
        color: #fff;
        > img {
            width: 1.42rem;
            vertical-align: middle;
            margin-right: 0.1rem;
        }
    }
    .MyIntegral {
        background: #fff;
        height: 1.5rem;
        border-radius: 5px;
        margin-bottom: 0.2rem;
        .IntegralMsg {
            display: block;
            font-size: 0.5rem;
            text-align: center;
            font-weight: 600;
            color: #ea4735;
        }
        .IntegralTitle {
            display: block;
            text-align: center;
            &::after {
                content: ">";
                margin-left: 0.1rem;
            }
        }
    }
    .navList {
        //小点
        .badge {
            position: relative;
            top: 0;
            left: 0;
            .danger {
                position: absolute;
                right: 0.2rem;
            }
        }
        background: #fff;
        font-size: 0.1rem;
        margin-bottom: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        padding-top: 0.2rem;
        .IconImg {
            width: 0.5rem;
            margin: auto;
            display: block;
        }
        .IconName {
            display: block;
            text-align: center;
            line-height: 0.6rem;
            font-size: 0.26rem;
        }
        .TopGroup {
            margin: 0.1rem;
            .yd-cell {
                background: #f6f6f6;
                border-radius: 8px;
                &::after {
                    border: none;
                }
                .yd-cell-item {
                    padding: 0;
                }
                .yd-cell-right {
                    min-height: 0.8rem;
                }
            }
            .arrow {
                &::after {
                    border: none;
                }
            }
            .TopGroupBack {
                background: url(../assets/Img/tcddbg.png) no-repeat;
                background-size: 100%;
                color: #fff;
                font-size: 0.2rem;
                width: 2rem;
                height: 0.37rem;
                line-height: 0.4rem;
                text-indent: 0.1rem;
            }
            .TopGroupClass {
                height: 2rem;
                width: 6.8rem;
                .TopGoodsList {
                    width: 2.3rem;
                    position: relative;
                    text-align: center;
                    margin-top: 0.2rem;
                    .TopGoodsImg {
                        width: 1rem;
                        height: 1rem;
                        background: #fff;
                    }
                    .TopGoodsPug {
                        position: absolute;
                        top: 0;
                        right: 0;
                        display: block;
                        border-radius: 50px;
                        color: red;
                        padding: 0 0.01rem;
                        font-size: 0.12rem;
                        border: 1px solid red;
                        text-align: center;
                    }
                }
                .TopGoodsTitle {
                    text-align: center;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    width: 2rem;
                }
            }
        }
    }
    .navList_two {
        background: #fff;
        font-size: 0.1rem;
        padding-bottom: 0.2rem;
        margin-bottom: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }
    .inviteImg {
        text-align: center;
        > img {
            width: 0.7rem;
            vertical-align: middle;
        }
        > span {
            font-size: 0.26rem;
        }
    }
    .borderccc {
        border-left: 1px solid #ccc;
    }
}
</style>
