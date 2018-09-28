<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="支付信息" height='.8rem' color="#f2f2f2" class="titleColor">
            <router-link to="" slot="left">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <div class="SuccessOrder">
            <p class="iconfont icon-gou3"></p>
            <div class="text">支付已完成</div>

        </div>
        <div class="btmPrimary">
            <yd-button size="large" type="primary" @click.native="GoHome('Home')">首页</yd-button>
            <yd-button size="large" type="warning" @click.native="GoHome('MyInfo')">个人中心</yd-button>
        </div>

    </yd-layout>
</template>
<style lang="scss">
.btmPrimary{
    padding: 1rem;
}
.SuccessOrder {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    > .iconfont {
        font-size: 3rem;
        color: #2ec139;
    }
    > .text {
        font-size: 0.5rem;
    }
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