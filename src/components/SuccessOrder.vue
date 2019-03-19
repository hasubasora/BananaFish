<template>
    <yd-layout>
        <!-- <yd-navbar slot="navbar" title="支付信息" height='.8rem' color="#f2f2f2" class="titleColor">
            <router-link to="" slot="left">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar> -->

        <div class="SuccessOrder" v-if="this.$route.query.Isok==1">
            <p class="iconfont icon-gou3"></p>
            <div class="text">支付已完成!</div>
        </div>

        <div class="SuccessOrder" v-if="this.$route.query.Isok==2">
            <yd-icon name="error ipicon" size="3rem"></yd-icon>
            <div class="text">支付取消!</div>
        </div>

        <p class="ppp">支付完成后自行返回商城查看！</p>
        <div class="btmPrimary">
            <yd-button size="large" type="primary" @click.native="GoHome('Home')">首页</yd-button>
            <yd-button size="large" type="warning" @click.native="GoHome('MyInfo')">我的中心</yd-button>
        </div>

    </yd-layout>
</template>
<style lang="scss">
.btmPrimary {
    padding: 1rem;
}
.SuccessOrder {
    padding: 1rem 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    > .iconfont {
        font-size: 3rem;
        color: #2ec139;
    }
    > .ipicon {
        font-size: 3rem;
        color: #f72f21;
    }
    > .text {
        font-size: 0.5rem;
    }
}
.ppp {
    text-align: center;
    font-size: 0.3rem;
}
</style>

<script>
export default {
    name: "SuccessOrder",
    methods: {
        GoHome(url) {
            this.$router.push({ name: url });
        }
    }
};
</script>