<template>
    <div class="BankCard">
        <yd-navbar fixed slot="navbar" title="设置银行卡" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/WithdrawDeposit" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">姓名：</span>
                <yd-input slot="right" required v-model="uName" max="20" placeholder="请输入姓名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">身份证：</span>
                <yd-input slot="right" required v-model="DrawIdCardNo" max="18" placeholder="请输入身份证"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号：</span>
                <yd-input slot="right" v-model="telNum" regex="mobile" placeholder="请输入银行预留手机号码"></yd-input>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">银行卡号：</span>
                <yd-input slot="right" v-model="cardNum" regex="bankcard" placeholder="请输入银行卡号"></yd-input>
            </yd-cell-item>
            <yd-cell-item @click.native="show2 = true">
                <span slot="left">开户银行：</span>
                <yd-input slot="right" v-model="cardName" readonly required placeholder="选择银行"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <yd-popup v-model="show2" position="bottom" height="60%">
            <!-- <yd-button type="warning" style="margin: 30px;" @click.native="show2 = false">Close Bottom Popup</yd-button> -->
            <yd-cell-group>
                <yd-cell-group title="银行列表">
                    <yd-cell-item type="radio" v-for="(item, index) in CardList" :key="index">
                        <span slot="left">{{item.name}}</span>
                        <input slot="right" type="radio" :value=item.name @change="cabCard(item.id)" v-model="cardName" />
                    </yd-cell-item>

                    <!-- <yd-cell-item>
                        <span slot="left">选中的值：</span>
                        <span slot="right">{{cardName}}</span>
                    </yd-cell-item> -->
                </yd-cell-group>
            </yd-cell-group>
        </yd-popup>
        <div class="bc_button">
            <button type="button" @click="SaveCard">保存</button>
        </div>
    </div>
</template>
<script>
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            uName: "",
            telNum: "",
            cardNum: "",
            cardName: "",
            DrawIdCardNo: "",
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
                    mes: "输入银行绑定的手机号",
                    timeout: 1000
                });
                return;
            }
            if (!this.DrawIdCardNo) {
                this.$dialog.toast({
                    mes: "输入身份证",
                    timeout: 1000
                });
                return;
            }

            if (!this.cardNum) {
                this.$dialog.toast({ mes: "输入银行卡号", timeout: 1000 });
                return;
            }
            if (!this.cardName) {
                this.$dialog.toast({ mes: "选择开户银行", timeout: 1000 });
                return;
            }

            this.$axios({
                method: "POST",
                data: {
                    DrawType: 1, //	支付宝0，银行卡1
                    DrawRealName: this.uName, //	真是姓名
                    DrawAccount: this.cardNum, //账号
                    DrawIdCardNo: this.DrawIdCardNo, //身份证
                    DrawAttribute: this.picked //银行ID
                },
                url:
                    this.$server.serverUrl +
                    "/UserCenter/SaveMemberDrawAccount",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data);
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
