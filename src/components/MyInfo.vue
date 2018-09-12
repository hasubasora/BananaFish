<template>
    <div class="myinfo">
        <yd-flexbox direction="vertical">
            <yd-flexbox-item class="GroupSetLink">
                <img src="../assets/Img/set.png" alt="" class="SetLink">
            </yd-flexbox-item>
            <yd-flexbox-item class="GroupSetInfo">
                <yd-flexbox>
                    <div class="InfoPic">
                        <img src="../assets/Img/bkc.jpg" alt="">
                    </div>
                    <yd-flexbox-item>
                        <span class="UserName">名字名字名字</span>
                        <div class="UserInfo">分红指数</div>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <strong class="UserMoney">0.00</strong>
                        <span class="MoneyTitle">我的余额（元）</span>
                    </yd-flexbox-item>
                    <div class="withdrawal">
                        提现
                    </div>
                </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <p class="VipTime">
                    <img src="../assets/Img/VIP3x.png" alt="">本期积分收益以开放领取，立即领取
                </p>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-flexbox class="MyIntegral">
                    <yd-flexbox-item>
                        <span class="IntegralMsg">0000</span>
                        <span class="IntegralTitle">我的积分</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <span class="IntegralMsg borderccc">0.000</span>
                        <span class="IntegralTitle borderccc">我的收益</span>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-cell-group>
                    <yd-cell-item arrow>
                        <span slot="left">订单管理</span>
                        <span slot="right">查看全部</span>
                    </yd-cell-item>
                </yd-cell-group>
            </yd-flexbox-item>
            <yd-flexbox-item class="IconList">
                <yd-flexbox>
                    <yd-flexbox-item>
                        <img src="../assets/Img/dfk.png" alt="" class="IconImg">
                        <span class="IconName">待付款</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <img src="../assets/Img/dfh.png" alt="" class="IconImg">
                        <span class="IconName">待发货</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <img src="../assets/Img/dsh.png" alt="" class="IconImg">
                        <span class="IconName">待收货</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <img src="../assets/Img/dpj.png" alt="" class="IconImg">
                        <span class="IconName">待评价</span>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <img src="../assets/Img/sh.png" alt="" class="IconImg">
                        <span class="IconName">售后</span>
                    </yd-flexbox-item>
                </yd-flexbox>
                <yd-cell-group class="TopGroup">
                    <yd-cell-item arrow>
                        <span slot="left" class="TopGroupBack">我的头筹订单</span>
                        <span slot="right">查看全部</span>
                    </yd-cell-item>
                    <div class="TopGroupClass">
                        <yd-flexbox>
                            <yd-flexbox-item>
                                <div class="TopGoodsList">
                                    <img src="../assets/Img/shop2.png" alt="" class="TopGoodsImg">
                                    <span class="TopGoodsPug">即将开奖</span>
                                </div>
                                <p class="TopGoodsTitle">Apple/苹果Mac..</p>
                                <div class="TopGoodsTitle">标号4021856450</div>
                            </yd-flexbox-item>
                            <yd-flexbox-item>
                                <div class="TopGoodsList">
                                    <img src="../assets/Img/shop2.png" alt="" class="TopGoodsImg">
                                    <span class="TopGoodsPug">即将开奖</span>
                                </div>
                                <p class="TopGoodsTitle">Apple/苹果Mac..</p>
                                <div class="TopGoodsTitle">标号4021856450</div>
                            </yd-flexbox-item>
                            <yd-flexbox-item>
                                <div class="TopGoodsList">
                                    <img src="../assets/Img/shop2.png" alt="" class="TopGoodsImg">
                                    <span class="TopGoodsPug">即将开奖</span>
                                </div>
                                <p class="TopGoodsTitle">Apple/苹果Mac..</p>
                                <div class="TopGoodsTitle">标号4021856450</div>
                            </yd-flexbox-item>
                        </yd-flexbox>

                    </div>
                </yd-cell-group>
            </yd-flexbox-item>
            <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
            <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.myinfo {
    height: 100%;
    width: 100%;
    background: url(../assets/Img/bg.png) no-repeat;
    position: relative;
    background-size: 100%;
    padding: 0.2rem;
    .yd-cell-box {
        margin-bottom: 0;
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
            font-size: 0.16rem;
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
        .borderccc {
            border-left: 1px solid #ccc;
        }
    }
    .IconList {
        background: #fff;
        font-size: 0.1rem;
        padding: 0.3rem 0;
        .IconImg {
            width: 0.5rem;
            margin: auto;
            display: block;
        }
        .IconName {
            display: block;
            text-align: center;
            line-height: 0.6rem;
            font-size: .18rem;
        }
        .TopGroup {
            margin: 0.1rem;
            .yd-cell {
                background: #f6f6f6;
                .yd-cell-item {
                    padding: 0;
                }
                .yd-cell-right {
                    min-height: .8rem;
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
                .TopGoodsList {
                    position: relative;
                    text-align: center;
                    margin-top: .2rem;
                    .TopGoodsImg {
                        width: 1rem;
                        height: 1rem;
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
                }
            }
        }
    }
}
</style>
