<template>
    <div class="orderList">
        <yd-navbar slot="navbar" fixed title="订单提交" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-flexbox class="address" @click.native="GetAddress" v-if="address!=''">
            <div class="address_left">
                <h3 class="font25">{{address.ShipTo}}</h3>
                <i class="moren">默认</i>
            </div>
            <yd-flexbox-item>
                <div class="address_right">
                    <h3 class="font25">{{address.ShipPhone}}</h3>
                    <p>{{address.Province}}{{address.CityName}}{{address.AreaName}}{{address.Address}}</p>
                </div>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox class="address" style="font-size:.3rem" @click.native="GetAddress" v-if="address==''">
            请添加地址
        </yd-flexbox>

        <div>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">商品金额</span>
                    <span slot="right">￥{{GoodsList.Amount}}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">运费</span>
                    <span slot="right">￥{{GoodsList.ExpressAmount}}</span>
                </yd-cell-item>
            </yd-cell-group>
            <!-- 支付方式 -->
            <yd-cell-group title="支付方式">
                <yd-cell-item type="radio" v-for="(PayListitem, index) in PayList" :key="index">
                    <span slot="left">{{PayListitem.payName}}</span>
                    <input slot="right" type="radio" :value=PayListitem.payType v-model="picked" />
                </yd-cell-item>

                <!-- <yd-cell-item type="radio">
                    <span slot="left">单选二</span>
                    <input slot="right" type="radio" value="Lucy" v-model="picked" />
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">选中的值：</span>
                    <span slot="right">{{picked}}</span>
                </yd-cell-item> -->
            </yd-cell-group>

        </div>

        <div v-for="(item,index) in GoodsList.rows" :key="index">
            <yd-flexbox>
                <yd-flexbox-item class="GroupTitle">{{item.GroupId?item.GroupTitle:'普通商品'}}</yd-flexbox-item>
            </yd-flexbox>
            <yd-flexbox class='goodsListOrder' v-for="(items,index) in item.LstProduct" :key="index">
                <img :src="items.ProductImg" alt="">
                <yd-flexbox-item>
                    <p class="goodstitle">
                        <span>{{items.ProductTitle}}</span>
                        <span>&nbsp;x{{items.BuyNum}}</span>
                    </p>
                    <div class="goodstitle">&nbsp;</div>
                    <span class="dough">￥{{items.SalePrice}}</span>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>

        <yd-cell-item class="bomBtnOrder">
            <span slot="left">合计:
                <i class="c-red">￥{{GoodsList.Amount}}</i>
            </span>
            <button slot="right" class="BuyCart" type="button" @click="GoBuySometing">提交订单</button>
        </yd-cell-item>
    </div>
</template>
<script>
import { GoBuySometing, LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            GoodsList: [],
            address: [],
            picked: "",
            PayList: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: { orderType: this.$route.params.sid },
            url: this.$server.serverUrl + "/order/getorderconfirm",
            responseType: "json"
        }).then(response => {
            LOGIN_SUCCESS(response.data.success);
            if (response.data.success == 200) {
                this.GoodsList = response.data;
                this.orderType;
                console.log(response.data);
            }
        });
        //获取支付地址
        this.$axios({
            method: "POST",
            data: {
                Client: 0
            },
            url: this.$server.serverUrl + "/Paying/GetPayType",
            responseType: "json"
        }).then(response => {
            LOGIN_SUCCESS(response.data.success);
            if (response.data.success == 200) {
                this.PayList = response.data.list;
                console.log(response.data);
            }
        });

        //获取收获地址
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/order/getaddress",
            responseType: "json"
        }).then(response => {
            LOGIN_SUCCESS(response.data.success);
            if (response.data.success == 200) {
                for (const iterator of response.data.rows) {
                    if (this.$route.params.address_GetId) {
                        console.log(this.$route.params.address_GetId);
                        if (
                            iterator.AddressId ==
                            this.$route.params.address_GetId
                        ) {
                            this.address = iterator;
                            return;
                        }
                    }
                    console.log(iterator.IsDefault == 1);

                    iterator.IsDefault == 1 ? (this.address = iterator) : "";
                    iterator.IsDefault == 1
                        ? (this.AddressId = iterator.AddressId)
                        : "";
                }
                console.log(response.data);
            }
        });
    },
    methods: {
        GoHistory(sid) {
            // console.log(sid);
            this.$router.push("/cart");
        },
        GetAddress() {
            this.$router.push({ name: "selectAddress" });
        },
        GoBuySometing() {
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
            this.$axios({
                method: "POST",
                data: {
                    addressid: this.address.AddressId,
                    orderType: this.$route.params.sid
                },
                url: this.$server.serverUrl + "/order/addorder",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data.success);
                if (response.data.success == 200) {
                    this.$dialog.toast({
                        mes: "提交成功",
                        timeout: 1500,
                        icon: "success",
                        callback: () => {
                            GoBuySometing();
                            this.h5axiox(
                                response.data.GroupOrderIdList,
                                response.data.OrderIdList
                            );
                            this.$dialog.confirm({
                                title: "支付信息",
                                mes: "是否已支付完成？",
                                opts: [
                                    {
                                        txt: "取消",
                                        color: false,
                                        callback: () => {
                                            this.$dialog.toast({
                                                mes: "取消支付",
                                                timeout: 1000
                                            });
                                        }
                                    },
                                    {
                                        txt: "确定",
                                        color: true,
                                        callback: () => {
                                            this.$router.push({
                                                name: "MyInfo"
                                            });
                                        }
                                    }
                                ]
                            });

                            // this.$router.push({ name: "SuccessOrder" });
                        }
                    });
                }
                if (response.data.success == 300) {
                    this.$dialog.toast({
                        mes: "请选择地址",
                        timeout: 1500,
                        icon: "error"
                    });
                }
                if (response.data.success == 400) {
                    this.$router.push({
                        name: "SignIn",
                        query: { Good_name: "2" }
                    });
                }
               
            });
        },
        //提交支付
        h5axiox(tc, pt) {
            window.location.href =
                this.$server.serverUrl +
                "/Paying/GoPay?Client=0&GroupOrderIdList=" +
                tc +
                "&OrderIdList=" +
                pt +
                "&payType=" +
                this.picked;
        }
    }
};
</script>
<style lang="scss">
.GroupTitle {
    color: #cccccc;
    padding: 0.1rem 0.3rem 0;
    // background: #ffffff;
    // margin-top: 0.2rem;
    // font-size: 0.2rem;
}
.orderList {
    margin: 1rem 0;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
}
.bomBtnOrder {
    border-top: 1px solid #f2f2f2;
    position: fixed !important;
    display: flex;
    background: #fff;
    left: 0;
    bottom: 0rem;
    height: 1rem;
    width: 100%;
    align-self: center;
    justify-content: flex-end;
    .BuyCart {
        border-radius: 20px;
        background: #ff5f17;
        font-size: 0.26rem;
        color: #f2f2f2;
        border: #ff5f17 1px solid;
        width: 2rem;
        align-self: center;
        height: 0.8rem;
        text-align: center;
    }
}

.address {
    background: #fffced;
    padding: 0.3rem;
    margin-bottom: 0.2rem;

    .address_left {
        width: 1rem;
        text-align: center;
        font-size: 0.26rem;
    }
    .address_right {
        padding: 0 0.5rem;
        font-size: 0.26rem;
    }
    .moren {
        border: 1px solid;
        color: #ff5f17;
        padding: 0.02rem 0.04rem;
    }
}

.font25 {
    font-size: 0.3rem;
}

.goodsListOrder {
    display: flex;
    border-bottom: 1px solid #cccc;
    padding: 0.3rem;
    background: #fff;
    > img {
        width: 1.5rem;
        height: 1.5rem;
    }
    .goodstitle {
        font-size: 0.25rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
    }
    .dough {
        padding: 0 0.3rem;
        font-size: 0.26rem;
        color: #ff5f17;
    }
}
</style>
