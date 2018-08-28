<template>
  <yd-layout>
    <yd-navbar slot="navbar" title="支付信息" height='.8rem' color="#f2f2f2" bgcolor="#ff5f17">
      <router-link to="" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <div class="SuccessOrder">
      <p class="iconfont icon-gou3"></p>
      <div class="text">支付已完成</div>
    </div>

    <yd-button size="large" type="primary" @click.native="GoHome">回去首页</yd-button>
    <yd-button size="large" type="primary" @click.native="GoHome">我的账号</yd-button>

  </yd-layout>
</template>
<style lang="scss">
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
        GoHome() {
            this.$router.push("/");
        }
    }
};
</script>