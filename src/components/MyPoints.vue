<template>
    <div class="MyPoints">
        <yd-navbar fixed slot="navbar" title="我的积分" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <div class="wd_back">
            <span class="wd_back_txt">我的积分</span>
            <p class="wd_back_price">￥{{price}}</p>
            <button type="button" class="wd_back_btn" @click="GoBankCard('RedData')">分红指数</button>
        </div>
        <yd-preview :buttons="btns">
            <yd-preview-header v-if="priceList.length>0" v-for="(item, index) in priceList" :key="index">
                <div slot="left">
                    <p style="font-size:.26rem">{{item.Title}}</p>
                    <p style="font-size:.16rem">{{item.Remark}}</p>
                </div>
                <div slot="right">
                    <p style="font-size:.26rem" class="c-red">{{item.Integral}}</p>
                    <p style="font-size:.16rem" class="gray">{{item.CreateTime}}</p>
                </div>
            </yd-preview-header>
            <!-- <yd-preview-header>
                <div slot="left">付款金额</div>
                <div slot="right">¥2400.00</div>
            </yd-preview-header> -->

        </yd-preview>
    </div>
</template>
<style lang="scss">
.MyPoints {
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
}
</style>
 
 <script>
export default {
    data() {
        return {
            price: 0,
            priceList: [],
            btns: [
                // {
                //     text: "辅助操作",
                //     click: () => {
                //         alert("辅助操作");
                //     }
                // },
                // {
                //     color: "#F00",
                //     text: "跳转首页",
                //     link: { path: "/" }
                // }
            ]
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
                url: this.$server.serverUrl + "/UserCenter/GetIntegralLog",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data.list);
                    this.price = response.data.integral;
                    this.priceList = response.data.list;
                }
            });
        }
    }
};
</script>
 