<template>
    <div class="SalesReturnApplyFor">
        <yd-navbar title="退货申请" fixed>
            <router-link to="/ShopGoodsList/?plan=0" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <div @click="ReturnApplication" slot="right">
                提交
            </div>
        </yd-navbar>
        <div class="SalesGroup">
            <!-- <p class="SalesStatus">退款状态</p> -->
            <div class="SalesGroupText" v-if="address">
                <div>收货人：{{address.SysReceiver}}</div>
                <div>联系方式：{{address.SysPhone}}</div>
                <div>退货地址：{{address.SysAddress}}</div>
                <div>退货附言：{{address.SysReceiver}}</div>
                <div>退货快递：{{Expressage?Expressage:'未填写'}}</div>
                <div class="DangerGroup">
                    <yd-button type="danger" v-if="sBtn" class="titleColor" @click.native="setFocusHander">填写物流单号</yd-button>
                    <yd-button type="danger" v-if="sBtn2" class="titleColor" @click.native="SaveExpressage">保存</yd-button>
                    <yd-button type="danger" v-if="sBtn3" class="titleColor" @click.native="SelectExpressage">修改</yd-button>
                </div>
            </div>
            <div class="Expressage" v-if="sBtn2">
                <yd-cell-item arrow type="label">
                    <span slot="left">快递公司：</span>
                    <select slot="right" v-model="ExpressageSelect" @change="ExpressageSelects">
                        <option value=""></option>
                        <option :value=index v-if="lsLogisticsCompany" v-for="(item, index) in lsLogisticsCompany" :key="index">{{item.LogisticsCompanyName}}</option>
                    </select>
                </yd-cell-item>
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">快递单号：</span>
                        <yd-input slot="right" v-model="input10" ref="input10" placeholder="请输入内容"></yd-input>
                    </yd-cell-item>
                </yd-cell-group>
            </div>

            <div class="SalesGroupText">
                <div>
                    <h5>退款信息</h5>
                </div>
                <div class="GoodId"><img :src="GoodId.ProductImg" alt="" srcset=""><span>{{GoodId.ProductTitle}}</span></div>
                <!-- <yd-cell-item arrow type="label" class="GoodIdItem">
                    <span slot="left">退款原因：</span>
                    <select slot="right" v-model="buxih">
                        <option value="0">不喜欢</option>
                        <option value="1">不喜欢</option>
                        <option value="2">不喜欢</option>
                        <option value="3">不喜欢</option>
                    </select>
                </yd-cell-item> -->
                <div>退款金额：￥{{GoodId.BuyPrice}}</div>
                <div>申请件数：{{GoodId.BuyNumber}}</div>
                <div>申请时间：{{new Date().toLocaleDateString()}}{{new Date().toLocaleTimeString()}}</div>
                <yd-cell-group>
                    <yd-cell-item>
                        <yd-textarea v-model="ExpMsg" slot="right" placeholder="请输入您的退货原因" maxlength="50"></yd-textarea>
                    </yd-cell-item>
                </yd-cell-group>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.SalesGroup {
    margin-top: 1rem;
    font-size: 0.26rem;
    line-height: 0.5rem;
    .DangerGroup {
        text-align: center;
    }
    .SalesStatus {
        background: #fff;
        padding: 0.2rem;
        text-align: center;
        font-size: 0.28rem;
        border-bottom: 1px solid #f2f2f2;
    }
    .SalesGroupText {
        padding: 0.3rem;
        background: #fff;
        margin-bottom: 0.2rem;
    }
    .GoodIdItem {
        padding: 0;
        line-height: 0.1rem;
        .yd-cell-item {
            &:after {
                border: none;
            }
        }
        .yd-cell-left {
        }
        .yd-cell-right {
            padding: 0;
            select {
                height: 0.5rem;
            }
        }
    }
    .Expressage {
        background: #fff;
    }
    .GoodId {
        img {
            width: 1rem;
            // border: 1px solid;
            vertical-align: top;
        }
        span {
            width: 5rem;
            margin-left: 0.1rem;
            // border: 1px solid;
            display: inline-block;
        }
    }
}
</style>
<script>
export default {
    data() {
        return {
            input10: "",
            address: [],
            lsLogisticsCompany: [],
            sBtn: true,
            sBtn2: false,
            sBtn3: false,
            Expressage: "",
            ExpressageSelect: "",
            OrderIdList: "",
            GoodId: "",
            ExpMsg: "",
            buxih: ""
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                orderId: this.$route.query.oid
            },
            url: this.$server.serverUrl + "/account/getmyorderDetail",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.OrderIdList = response.data.rows;
                console.log(response.data);

                if (this.OrderIdList.OrderId == this.$route.query.oid) {
                    for (const iterator of this.OrderIdList.LstProduct) {
                        this.GoodId = iterator;
                        break;
                    }
                }
            }
        });
        //退货申请
        // this.ReturnApplication();
        //获取退货地址信息
        this.GetReturnAddress();
    },
    methods: {
        ExpressageSelects(e) {
            console.log(e);
            console.log(this.ExpressageSelect);
        },
        ReturnApplication() {
            console.log(this.$route.query.oid);
            console.log(this.$route.query.bid);
            console.log(this.ExpressageSelect);
            console.log(this.Expressage);
            console.log(this.ExpMsg);

            if (!this.input10) {
                this.$dialog.toast({
                    mes: "未输入订单号",
                    timeout: 1500,
                    icon: "error"
                    // callback: () => {
                    //     this.$dialog.alert({ mes: "给你一次重来的机会！" });
                    // }
                });
                return;
            }

            if (!this.ExpressageSelect) {
                this.$dialog.toast({
                    mes: "未选择快递公司",
                    timeout: 1500,
                    icon: "error"
                });
                return;
            }
            return;
            this.$axios({
                method: "POST",
                data: {
                    OrderId: this.$route.query.oid,
                    OrderItemId: this.$route.query.bid,
                    ShipmentName: this.ExpressageSelect,
                    ShipmentNumber: this.Expressage,
                    RefundInstruction: this.ExpMsg
                },
                url: this.$server.serverUrl + "/order/ReturnApplication",
                responseType: "json"
            }).then(response => {});
        },
        GetReturnAddress() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/GetReturnAddress",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.address = response.data.address;
                    this.lsLogisticsCompany = response.data.lsLogisticsCompany;
                }
            });
        },
        setFocusHander() {
            this.sBtn = false;
            this.sBtn2 = true;
            // this.$refs.input10.setFocus();
        },
        SaveExpressage() {
            if (!this.input10) {
                this.$dialog.toast({
                    mes: "未输入订单号",
                    timeout: 1500,
                    icon: "error"
                    // callback: () => {
                    //     this.$dialog.alert({ mes: "给你一次重来的机会！" });
                    // }
                });
                return;
            }
            if (!this.ExpressageSelect) {
                this.$dialog.toast({
                    mes: "未选择快递公司",
                    timeout: 1500,
                    icon: "error"
                });
                return;
            }
            this.sBtn2 = false;
            this.sBtn3 = true;
            this.Expressage = this.input10;
        },
        SelectExpressage() {
            this.sBtn2 = true;
            this.sBtn3 = false;
        }
    }
};
</script>
