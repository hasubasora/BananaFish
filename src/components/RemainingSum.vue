<template>
    <div class="RemainingSum">
        <yd-navbar fixed slot="navbar" title="余额" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/MyInfo" slot="left" >
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>
            <router-link to="" slot="right" @click.native="GoBankCard('TouchBalance')">
               <span class="c-white"> 余额明细</span>
            </router-link>
        </yd-navbar>
        <div class="wd_back">
            <span class="wd_back_txt">账户余额</span>
            <p class="wd_back_price">￥{{price}}</p>
            <button type="button" class="wd_back_btn" @click="GoBankCard('SetBankCard')">银行卡</button>
        </div>
        <div class="wd_button">
            <router-link type="button" to="/WithdrawDeposit">提现</router-link>
        </div>
    </div>
</template>
<style lang="scss">
.RemainingSum {
    padding-top: 1rem;
    .wd_back {
        background: #fff;
        height: 3.3rem;
        margin: 0 0.2rem 0.2rem;
        text-align: center;
        border-radius: 10px;
        padding: 0.8rem;
        .wd_back_txt {
            font-size: 0.24rem;
            display: block;
        }
        .wd_back_price {
            display: block;
            font-weight: bold;
            font-size: 0.5rem;
            color: #ff6143;
            margin-bottom: 0.2rem;
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
            price: 0
        };
    },
    created() {
        this.GetPrice();
    },
    methods: {
        GoBankCard(url) {
            this.$router.push({ name: url });
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
                    this.price = response.data.balance;
                }
            });
        }
    }
};
</script>
 