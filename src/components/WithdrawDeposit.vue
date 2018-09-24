<template>
    <div class="WithdrawDeposit">
        <yd-navbar fixed slot="navbar" title="余额提出" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/RemainingSum" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <div class="wd_back">
            <span class="wd_back_txt">提现金额</span>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left" style="font-size:1rem;">￥</span>
                    <yd-input slot="right" class="wd_input" v-model="input6" regex="^\d{3,12}$" :placeholder='shabi+""' required></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        <p class="wd_back_price">可提现余额 ￥{{shabi}}</p>
                    </span>
                    <span slot="right" @click="GetAllPrice" class="c-red">全部提现</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <yd-cell-group title="提现方式">
            <yd-cell-item type="radio" v-for="(item, index) in PayList" :key="index" v-if="PayNumber!=''">
                <span slot="left" >{{item.name}}（{{PayNumber[index].DrawAccount?PayNumber[index].DrawAccount:''}}）</span>
                <input slot="right" type="radio" :value=item.type v-model="picked" @change="GetCardInfo(index)" />
            </yd-cell-item>

            <!-- <yd-cell-item>
                <span slot="left">选中的值：</span>
                <span slot="right">{{picked}}</span>
            </yd-cell-item> -->
        </yd-cell-group>

        <div class="wd_button">
            <button type="button" @click="ToCard">提现</button>
        </div>
    </div>
</template>
<style lang="scss">
.WithdrawDeposit {
    padding-top: 1rem;
    .wd_back {
        background: #fff;
        height: 3.2rem;
        margin: 0 0.2rem 0.2rem;
        // text-align: center;
        border-radius: 5px;
        padding: 0.2rem;
        .wd_back_txt {
            font-size: 0.24rem;
            display: block;
        }
        .yd-cell:after {
            border: none;
        }
        .wd_input {
            margin-top: 0.2rem;
            > input {
                font-size: 0.7rem;
            }
        }
        .wd_back_price {
            // display: block;
            // font-weight: bold;
            font-size: 0.24rem;
            // color: #ff6143;
            // margin-bottom: 0.2rem;
        }
        .wd_back_btn {
            width: 4rem;
            font-size: 0.26rem;
            border: 1px solid #ff6143;
            border-radius: 60px;
            color: #ff6143;
            padding: 0.2rem;
        }
    }
    .wd_button {
        text-align: center;
        [type="button"] {
            width: 4rem;
            margin: 0 auto;
            color: #fff;
            font-size: 0.26rem;
            border: none;
            border-radius: 60px;
            display: block;
            background: linear-gradient(
                -90deg,
                rgba(234, 63, 50, 1),
                rgba(237, 121, 71, 1)
            );
            padding: 0.2rem;
        }
    }
}
</style>
 
 <script>
export default {
    data() {
        return {
            shabi: "",
            input6: "",
            picked: "",
            CardID: "",
            CardNumber: "",
            PayNumber: [],
            PayList: []
        };
    },
    created() {
        this.GetCard();
        this.GetPrice();
        this.GetWithdrawType();
    },
    methods: {
        GetCardInfo(dataIndex) {
            switch (dataIndex) {
                case 0:
                    if (this.PayNumber == "") {
                        this.$router.push({ name: "PayCard" });
                    }
                    break;
                case 1:
                    if (this.PayNumber == "") {
                        this.$router.push({ name: "BankCard" });
                    }
                    break;
                default:
                    break;
            }
        },
        GetCard(dataIndex) {
            this.$axios({
                method: "POST",
                data: {},
                url:
                    this.$server.serverUrl + "/UserCenter/GetMemberDrawAccount",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data.list);
                    this.PayNumber=response.data.list;
                }
            });
        },
        GetWithdrawType() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/GetWithdrawType",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.PayList = response.data.Draw;
                }
            });
        },
        GetPrice() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/GetBalance",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.shabi = Number(response.data.balance);
                }
            });
        },
        GetAllPrice() {
            this.input6 = this.shabi;
        },
        ToCard() {
            if (!this.input6) {
                this.$dialog.toast({
                    mes: "请输入提现金额",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            if (this.input6.length < 3) {
                this.$dialog.toast({
                    mes: "请输入整数提现金额",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            if (this.input6 > this.shabi) {
                this.$dialog.toast({
                    mes: "余额不足",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            if (!this.picked) {
                this.$dialog.toast({
                    mes: "选择提现方式",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            this.$axios({
                method: "POST",
                data: {
                    DrawId: this.picked,
                    DrawAmount: this.input6
                },
                url: this.$server.serverUrl + "/UserCenter/Withdraw",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.price = response.data.balance;
                    this.$dialog.toast({
                        mes: "提现成功",
                        timeout: 1500,
                        icon: "success",
                        callback: () => {
                            return;
                        }
                    });
                }
            });
        }
    }
};
</script>
 