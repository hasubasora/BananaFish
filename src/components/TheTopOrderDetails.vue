<template>
    <div class="TheTopOrderDetails">
        <yd-navbar title="订单详情" fixed class="titleColor" color="#fff">
            <router-link to="" @click.native="GoShopGoodsList" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <yd-preview-header class="GroupProduct" v-if="OrderIdList.GroupProduct">
            <div slot="left" class="GroupProduct_text">
                <div class="Product_text">头筹奖品</div>
                <span>期号:{{OrderIdList.GroupProduct.CurrentPeriod}}</span>
                <span>{{OrderIdList.WinnerStr}}</span>
            </div>

            <div slot="left" style="text-align: center;">
                <img :src="OrderIdList.GroupProduct.ProductImg" class="GoodsPic" alt="" width="100">
                <p class="ProductTitle">
                    {{OrderIdList.GroupProduct.ProductTitle}}
                </p>
                <span class="red">价值￥{{OrderIdList.GroupProduct.SalePrice}} </span>
                <yd-progressbar class="progress" type="line" :progress="progress4" trail-width="4" trail-color="#FE5D51"></yd-progressbar>
                <p style="margin-bottom:.3rem;font-size:.24rem;">总需{{this.OrderIdList.GroupProduct.TotalNum}}人次 还差 {{this.OrderIdList.GroupProduct.TotalNum-this.OrderIdList.GroupProduct.RemainNum}} 人次</p>

            </div>
        </yd-preview-header>
        <yd-cell-group title="支付方式">
            <yd-cell-item type="radio" v-for="(PayListitem, index) in PayList" :key="index">
                <span slot="left">{{PayListitem.payName}}</span>
                <input slot="right" type="radio" :value=PayListitem.payType v-model="picked" />
            </yd-cell-item>
        </yd-cell-group>
        <div class="OrderTitle">
            <span class="OrderTitle_text">{{OrderIdList.OrderStatusStr}}</span>
        </div>
        <div class="OrderAddress">
            <div><img src="../assets/Img/address.png" alt=""></div>
            <div class="address_text">
                <span>{{OrderIdList.ShipTo}}{{OrderIdList.ShipPhone}}</span>
                <p>{{OrderIdList.ShipAddress}}</p>
            </div>
        </div>
        <div class="OrderList" v-for="(item, itemIndex) in OrderIdList.LstProduct" :key="itemIndex">
            <yd-flexbox>
                <img class="OrderImg" :src="item.ProductImg" alt="" width="60">
                <yd-flexbox-item>
                    <p class="OrderGoodTitle">{{item.ProductTitle}}</p>
                    <span class="AttValueName">{{item.AttValueName}}&nbsp;</span>
                    <div class="Integral" v-if="OrderIdList.LuckerNumber">
                        <span>开奖号码 {{OrderIdList.LuckerNumber.split(",")[itemIndex+1]}}</span>
                    </div>
                </yd-flexbox-item>
                <div class="OrderPrice">
                    <span>￥{{item.BuyPrice}}</span>
                    <span>x{{item.BuyNumber}}</span>
                </div>
            </yd-flexbox>
        </div>
        <yd-flexbox-item>
            <yd-preview :buttons="btns">

                <yd-preview-item>
                    <div slot="left">商品总金额</div>
                    <div slot="right">¥{{allPrice}}</div>
                </yd-preview-item>
                <yd-preview-item>
                    <div slot="left">运费</div>
                    <div slot="right">￥{{OrderIdList.ExpressAmount}}</div>
                </yd-preview-item>
                <yd-preview-header class="headerPrice">
                    <div slot="left">实付金额</div>
                    <div slot="right" class="c-red">¥{{allPrice+OrderIdList.ExpressAmount}}</div>
                </yd-preview-header>
            </yd-preview>
        </yd-flexbox-item>

        <yd-flexbox direction="vertical" class="OrderListMsg">
            <yd-flexbox-item>本期开奖获得者：{{OrderIdList.WinnerUserName}}</yd-flexbox-item>
            <yd-flexbox-item>订单编号：{{OrderIdList.OrderId}}</yd-flexbox-item>
            <yd-flexbox-item>下单时间：{{OrderIdList.CreateTime}}</yd-flexbox-item>
            <yd-flexbox-item>支付方式：{{OrderIdList.PaymentType}}</yd-flexbox-item>
        </yd-flexbox>

        <yd-preview :buttons="btns" class="OrderSetBtn">
            <yd-preview-item>
                <div slot="left"></div>
                <div slot="right">
                    <button class="orderBtn grayBtn" v-if="OrderIdList.OrderStatus==1" type="button">退款</button>
                    <button class="orderBtn grayBtn" v-if="OrderIdList.OrderStatus==2" type="button">物流信息</button>
                    <button class="orderBtn grayBtn" v-if="OrderIdList.OrderStatus==0" type="button">取消订单</button>
                    <button class="orderBtn orangeBtn" @click="GoBuySometingfn(OrderIdList.OrderId)" v-if="OrderIdList.OrderStatus==0" type="button">立即付款</button>
                    <button class="orderBtn orangeBtn" v-if="OrderIdList.OrderStatus==3" type="button">评价</button>
                    <button class="orderBtn orangeBtn" v-if="OrderIdList.OrderStatus==2" type="button">确认收货</button>
                </div>
            </yd-preview-item>
        </yd-preview>
    </div>
</template>
<style lang="scss">
.TheTopOrderDetails {
    padding: 1rem 0;
    .GroupProduct {
        background: #fff;
        height: 4.5rem;
        margin: 0;
        padding-top: 0.5rem;
        > img {
            width: 2rem;
        }
        .ProductTitle {
            font-size: 0.24rem;
            white-space: normal;
            word-wrap: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            border-bottom: #f2f2f2 1px solid;
            padding-bottom: 0.1rem;
        }
        .red {
            color: #ea3f32;
        }
        .GroupProduct_text {
            position: absolute;
            top: 0.1rem;
            left: 0.1rem;
            .Product_text {
                background: linear-gradient(
                    -90deg,
                    rgba(234, 63, 50, 1),
                    rgba(237, 121, 71, 1)
                );
                border-bottom-right-radius: 50px;
                border-top-right-radius: 50px;
                padding: 0 0.2rem;
                width: 1.5rem;
                color: #fff;
            }
        }
    }
    .progress {
        width: 4rem;
        margin: auto;
        svg {
            border-radius: 50px;
        }
    }
    .OrderTitle {
        background: url(../assets/Img/ddtb.png) no-repeat;
        background-size: 100%;
        height: 1.8rem;
        border: 1px solid transparent;
        .OrderTitle_text {
            margin: 0.5rem 1rem;
            color: #fff;
            font-size: 0.36rem;
            display: block;
        }
    }
    .OrderAddress {
        display: flex;
        background: #fff;
        img {
            width: 0.8rem;
            margin: 0.2rem 0.3rem 0.2rem;
        }
        .address_text {
            padding: 0.3rem;
        }
        margin-bottom: 0.2rem;
    }
    .OrderList {
        padding: 0.3rem;
        background: #fff;
        .OrderImg {
            width: 1.5rem;
            margin-right: 0.2rem;
        }
        .OrderPrice {
            width: 1.3rem;
            text-align: right;
            height: 1.5rem;
            > span {
                display: block;
                &:nth-child(1) {
                    color: #ea3f32;
                    font-size: 0.26rem;
                }
            }
        }
        .OrderGoodTitle {
            background: #fff;
            height: 0.7rem;
            font-size: 0.24rem;
        }
        .AttValueName {
            display: block;
            height: 0.5rem;
            font-size: 0.2rem;
            color: #ccc;
        }
        .Integral {
            text-align: left;
            > span {
                background: #ffe1df;
                color: #ea3f32;
                padding: 0.02rem 0.1rem;
                font-size: 0.2rem;
            }
        }
    }
    .yd-preview:before {
        top: 0;
        border-top: none;
    }
    .headerPrice {
        color: #555;
        border-top: 1px solid #ccc;
    }
    .OrderSetBtn {
        border-top: 1px solid #ccc;
        position: fixed;
        bottom: 0;
        left: 0;
        height: 1rem;
        width: 100%;
        .orderBtn {
            height: 0.5rem;
            width: 1.4rem;
            border: none;
            border-radius: 5px;
            outline: none;
            margin-top: 0.3rem;
        }
        .orangeBtn {
            color: #fff;
            background: linear-gradient(
                -90deg,
                rgba(234, 63, 50, 1),
                rgba(237, 121, 71, 1)
            );
        }
        .grayBtn {
            background: #fff;
            border: 1px solid;
            color: #555;
        }
    }
    .OrderListMsg {
        background: #fff;
        padding: 0.3rem;
    }
    .GoodsPic {
        width: 2.3rem;
    }
}
</style>
<script>
export default {
    data() {
        return {
            OrderIdList: [],
            btns: [],
            PayList: [],
            allIntegral: 0,
            picked: "",
            allPrice: 0,
            progress4: 0.01
        };
    },

    created() {
        this.$axios({
            method: "POST",
            data: {
                Client: 0
            },
            url: this.$server.serverUrl + "/Paying/GetPayType",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.PayList = response.data.list;
                console.log(response.data);
            }
        });
        this.$axios({
            method: "POST",
            data: {
                orderId: this.$route.query.OrderId
            },
            url: this.$server.serverUrl + "/account/getmygrouporderDetail",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.OrderIdList = response.data.rows;
                console.log(response.data);
                this.progress4 =
                    this.OrderIdList.GroupProduct.RemainNum /
                    this.OrderIdList.GroupProduct.TotalNum;
                for (const iterator of this.OrderIdList.LstProduct) {
                    this.allIntegral += iterator.Integral;
                    this.allPrice += iterator.BuyPrice;
                }
            }
        });
    },
    methods: {
        GoBuySometingfn(OrderID) {
            if (!this.picked) {
                this.$dialog.toast({
                    mes: "请选择支付方式",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        // this.$router.push({ name: "SuccessOrder" });
                    }
                });
                return;
            }
            window.location.href =
                this.$server.serverUrl +
                "/Paying/GoPay?Client=0&GroupOrderIdList=" +
                OrderID +
                "&OrderIdList=&payType=" +
                this.picked;
        },
        GoShopGoodsList() {
            this.$router.push({ name: "ShopGoodsList", query: { plan: 0 } });
        }
    }
};
</script>
