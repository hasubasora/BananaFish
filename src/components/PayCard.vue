<template>
    <div class="BankCard">
        <yd-navbar fixed slot="navbar" title="设置支付宝" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/WithdrawDeposit" slot="left" >
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">账户名：</span>
                <yd-input slot="right" required v-model="uName" max="20" placeholder="请输入账户名"></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">手机号：</span>
                <yd-input slot="right" v-model="telNum" regex="mobile" placeholder="请输入手机号码"></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">支付宝账号：</span>
                <yd-input slot="right" v-model="cardNum" required  placeholder="请输入支付宝账号："></yd-input>
            </yd-cell-item>
           
        </yd-cell-group>
     
        <div class="bc_button">
            <button type="button" @click="SaveCard">保存</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            uName: "",
            telNum: "",
            cardNum: "",
            cardName: "",
            show2: false,
            CardList: [],
            picked: 0
        };
    },
    created() {
        this.GetCard();
    },
    methods: {
        SaveCard() {
            if (!this.uName) {
                this.$dialog.toast({ mes: "输入账户名", timeout: 1000 });
                return;
            }
            if (!this.telNum) {
                this.$dialog.toast({
                    mes: "输入手机号",
                    timeout: 1000
                });
                return;
            }
            if (!this.cardNum) {
                this.$dialog.toast({ mes: "输入支付宝号", timeout: 1000 });
                return;
            }
         

            this.$axios({
                method: "POST",
                data: {
                    DrawType: 0, //	支付宝0，银行卡1
                    DrawRealName: this.uName, //真是姓名
                    DrawAccount: this.cardNum, //账号
                    // DrawAttribute: this.picked //银行ID
                },
                url:
                    this.$server.serverUrl +
                    "/UserCenter/SaveMemberDrawAccount",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.$dialog.toast({
                        mes: "保存成功",
                        timeout: 1500,
                        icon: "success",
                        callback: () => {
                           this.$router.push({ name: "WithdrawDeposit" });
                        }
                    });
                }
                if (response.data.success == 300) {
                    this.$dialog.alert({ mes: response.data.msg });
                }
            });
        },
        cabCard(id) {
            this.picked = id;
            console.log(id);
        },
        GetCard() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/GetBank",
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
        }
    }
};
</script>
<style lang="scss">
.BankCard {
    padding-top: 1rem;
    .bc_button {
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
