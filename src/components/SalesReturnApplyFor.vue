<template>
    <div class="SalesReturnApplyFor">
        <yd-navbar title="退货申请" fixed>
            <router-link to="/ShopGoodsList/?plan=0" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="/ShopGoodsList/?plan=0" slot="right">
                提交
            </router-link>
        </yd-navbar>
        <div class="SalesGroup">
            <p class="SalesStatus">退款状态</p>
            <div class="SalesGroupText" v-if="address">
                <div>收货人：{{address.SysReceiver}}</div>
                <div>联系方式：{{address.SysPhone}}</div>
                <div>退货地址：{{address.SysAddress}}</div>
                <div>退货附言：{{address.SysReceiver}}</div>
                <div>退货快递：{{Expressage?Expressage:'未填写'}}</div>
                <div class="DangerGroup">
                    <yd-button type="danger" v-if="sBtn" class="titleColor" @click.native="setFocusHander">填写物流单号</yd-button>
                    <yd-button type="danger" v-if="sBtn2" class="titleColor" @click.native="SaveExpressage">保存</yd-button>
                    <yd-button type="danger" v-if="sBtn3" class="titleColor">修改</yd-button>
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
                <div><img src="" alt="" srcset=""><span>退货地址：</span></div>
                <div>退款原因： ></div>
                <div>退款金额： ></div>
                <div>申请件数：1></div>
                <div>申请时间：201810-16 12:08 ></div>
                <yd-cell-group>
                    <yd-cell-item>
                        <yd-textarea slot="right" placeholder="请输入您的银行卡卡号和密码" maxlength="50"></yd-textarea>
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
    .Expressage {
        background: #fff;
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
            ExpressageSelect: ""
        };
    },
    created() {
        //退货申请
        this.ReturnApplication();
        //获取退货地址信息
        this.GetReturnAddress();
    },
    methods: {
        ExpressageSelects(e) {
            console.log(e);
            console.log(this.ExpressageSelect);
        },
        ReturnApplication() {
            this.$axios({
                method: "POST",
                data: {
                    OrderId: "",
                    OrderItemId: "",
                    ShipmentName: "",
                    ShipmentNumber: "",
                    RefundInstruction: ""
                },
                url: this.$server.serverUrl + "/order/ReturnApplication",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.CardList = response.data.list;
                }
            });
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
            this.sBtn2 = false;
            this.sBtn3 = true;
        }
    }
};
</script>
