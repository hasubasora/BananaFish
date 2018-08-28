<template>
    <yd-layout>
        <yd-navbar slot="navbar" title="地址管理" height='.8rem'>
            <router-link to="#" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-flexbox class="address">
            <div class="address_left">
                <h3 class="font25">kk</h3>
                <i class="moren">默认</i>
            </div>
            <yd-flexbox-item>
                <div class="address_center">
                    <h3 class="font25">1333333333</h3>
                    <p>广东省 广州市 天河区 珠江新城华强路1号广东省 广州市 天河区 珠江新城华强路1号</p>
                </div>
            </yd-flexbox-item>
            <div class="address_right">
                <span class="iconfont icon-tianxie"></span>
            </div>
        </yd-flexbox>

    </yd-layout>
</template>
<script>
export default {};
</script>
<style lang="scss">
.address {
    background: #fffced;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    .address_left {
        width: 1rem;
        text-align: center;
        font-size: 0.26rem;
    }
    .address_right {
        text-align: center;
        font-size: 0.26rem;
    }
    .address_center {
        padding: 0 0.5rem;
        font-size: 0.26rem;
    }
    .moren {
        border: 1px solid;
        color: #ff5f17;
        padding: 0.02rem 0.04rem;
    }
}
</style>
