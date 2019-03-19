<template>
    <div class="GeneralOrderDetails">
        <yd-navbar title="订单详情" fixed>
            <router-link to="/MyFreeList" @click.native="GoShopGoodsList" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
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
        <yd-cell-group title="支付方式" v-if="OrderIdList.OrderStatus==0">
            <yd-cell-item type="radio" v-for="(PayListitem, index) in PayList" :key="index" @click.native="GetType(PayListitem.isBrowser)">
                <span slot="left">{{PayListitem.payName}}</span>
                <input slot="right" type="radio" :value="PayListitem.payType" v-model="picked" />
            </yd-cell-item>
        </yd-cell-group>
        <div class="OrderList" v-for="(item, index) in OrderIdList.LstProduct" :key="index">
            <yd-flexbox>
                <img class="OrderImg" :src="item.ProductImg" alt="" width="60">
                <yd-flexbox-item>
                    <p class="OrderGoodTitle">{{item.ProductTitle}}</p>
                    <span class="AttValueName">{{item.AttValueName}}&nbsp;</span>

                    <div class="Integral">
                        <div class="IntegralText"> <span>积分奖励{{item.Integral}}分</span></div>
                    </div>
                </yd-flexbox-item>
                <div class="OrderPrice">
                    <span>￥{{item.BuyPrice}}</span>
                    <span>x{{item.BuyNumber}}</span>
                    <button class="orderBtn grayBtn" v-if="item.OrderItemStatus==0 && OrderIdList.OrderStatus==2" @click="SalesReturnApplyFor(item.OrderItemId,item)" type="button">申请退货</button>
                    <button class="orderBtn grayBtn" v-if="item.OrderItemStatus==1" type="button">{{item.OrderItemStatusStr}}</button>
                    <button class="orderBtn grayBtn" v-if="item.OrderItemStatus==2" type="button">{{item.OrderItemStatusStr}}</button>
                </div>
            </yd-flexbox>
        </div>
        <yd-flexbox-item>
            <yd-preview :buttons="btns">
                <yd-preview-item v-if="allIntegral!=0">
                    <div slot="left">总获得积分奖励</div>
                    <div slot="right">{{allIntegral}}</div>
                </yd-preview-item>
                <yd-preview-item>
                    <div slot="left">商品总金额</div>
                    <div slot="right">¥{{allPrice}}</div>
                </yd-preview-item>
                <yd-preview-item>
                    <div slot="left">运费</div>
                    <div slot="right">￥{{OrderIdList.ExpressAmount}}</div>
                </yd-preview-item>
                <yd-preview-header class="headerPrice">
                    <div slot="left">应付金额</div>
                    <div slot="right">¥{{allPrice+OrderIdList.ExpressAmount}}</div>
                </yd-preview-header>
            </yd-preview>
        </yd-flexbox-item>

        <yd-flexbox direction="vertical" class="OrderListMsg">
            <yd-flexbox-item>订单编号：{{OrderIdList.OrderId}}</yd-flexbox-item>
            <yd-flexbox-item>下单时间：{{OrderIdList.CreateTime}}</yd-flexbox-item>
            <yd-flexbox-item>支付方式：{{OrderIdList.PaymentType}}</yd-flexbox-item>
        </yd-flexbox>

        <yd-preview :buttons="btns" class="OrderSetBtn">
            <yd-preview-item>
                <div slot="left"></div>
                <div slot="right">
                    <button class="orderBtn grayBtn" v-if="OrderIdList.OrderStatus==2" @click="OrderLogistics(OrderIdList.OrderId)" type="button">物流信息</button>
                    <button class="orderBtn grayBtn" v-if="OrderIdList.OrderStatus==0" @click="closeOrder(OrderIdList.OrderId)" type="button">取消订单</button>
                    <button class="orderBtn orangeBtn" @click="GoBuySometingfn(OrderIdList.OrderId)" v-if="OrderIdList.OrderStatus==0" type="button">立即付款</button>
                    <button class="orderBtn orangeBtn" v-if="OrderIdList.OrderStatus==3" type="button">评价</button>
                    <button class="orderBtn orangeBtn" v-if="OrderIdList.OrderStatus==2" type="button">确认收货</button>
                </div>
            </yd-preview-item>
        </yd-preview>
    </div>
</template>
<style lang="scss">
.GeneralOrderDetails {
    padding: 1rem 0;
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
            // height: 0.5rem;
            font-size: 0.2rem;
            color: #ccc;
        }
        .Integral {
            display: flex;
            width: 100%;
            text-align: left;
            .IntegralText {
                flex: 1;
                span {
                    background: #ffe1df;
                    color: #ea3f32;
                    padding: 0.02rem 0.1rem;
                    font-size: 0.2rem;
                }
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
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }
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
    .OrderListMsg {
        background: #fff;
        padding: 0.3rem;
    }
}
</style>
<script>
import { GoBuySometing, GetPay, LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            OrderIdList: [],
            btns: [],
            PayList: [],
            allIntegral: 0,
            picked: "",
            allPrice: 0,
            GetTypePay: ""
        };
    },

    created() {
        this.$axios({
            method: "POST",
            data: {
                orderId: this.$route.query.OrderId
            },
            url: this.$server.serverUrl + "/account/getmyorderDetail",
            responseType: "json"
        }).then(response => {
            LOGIN_SUCCESS(response.data)
            if (response.data.success == 200) {
                this.OrderIdList = response.data.rows;
                console.log(response.data);
                for (const iterator of this.OrderIdList.LstProduct) {
                    this.allIntegral += iterator.Integral;
                    this.allPrice += iterator.BuyPrice;
                }
            }
        });
        this.$axios({
            method: "POST",
            data: {
                Client: 0
            },
            url: this.$server.serverUrl + "/Paying/GetPayType",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.PayList = response.data.list;
                console.log(response.data);
            }
        });
    },
    methods: {
        GetType(e) {
            this.GetTypePay = e;
        },
        SalesReturnApplyFor(id, obj) {
            this.$store.commit("increment", obj); //触发
            this.$router.push({
                name: "SalesReturnApplyFor",
                query: {
                    oid: this.$route.query.OrderId,
                    bid: id
                }
            });
        },
        OrderLogistics(oid) {
            this.$router.push({
                name: "OrderLogistics",
                query: { Good_id: oid }
            });
        },
        //关闭订单
        closeOrder(id) {
            this.$axios({
                method: "POST",
                data: {
                    orderId: id
                },
                url: this.$server.serverUrl + "/account/closemygrouporder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.$dialog.toast({
                        mes: "取消成功",
                        timeout: 1500,
                        icon: "success",
                        callback: () => {
                            this.GetGoodsList(0);
                            setTimeout(e => {
                                this.items[Number(0)].content = this.GoodsHtml;
                                this.tab2 = Number(0);
                            }, 1000);
                        }
                    });
                }
            });
        },
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
            GoBuySometing("", OrderID, this.picked, this.GetTypePay);
            // window.location.href =
            //     this.$server.serverUrl +
            //     "/Paying/GoPay?Client=0&GroupOrderIdList=&OrderIdList=" +
            //     OrderID +
            //     "&payType=" +
            //     this.picked;
        },
        GoShopGoodsList() {
            this.$router.push({ name: "ShopGoodsList", query: { plan: 0 } });
        }
    }
};
</script>
