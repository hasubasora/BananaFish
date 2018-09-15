<template>
    <div class="homePage">

        <router-view :todo='GetShoppingCartNum'></router-view>
        <keep-alive>
            <yd-tabbar fixed active-color="#aaa">
                <yd-tabbar-item title="首页" link="/" active>
                    <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
                </yd-tabbar-item>
                <yd-tabbar-item title="头筹" link="ProductGroupList" active>
                    <span slot="icon" class="iconfont IconList icon-touchou-copy"></span>
                </yd-tabbar-item>
                <yd-tabbar-item title="购物车" link="cart" active>
                    <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
                    <yd-badge slot="badge" type="danger">{{storeText?storeText:this.productNum}}</yd-badge>
                </yd-tabbar-item>
                <yd-tabbar-item title="个人中心" link="MyInfo" active>
                    <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
                </yd-tabbar-item>

            </yd-tabbar>
        </keep-alive>

    </div>
</template>

<script>
export default {
    data() {
        return {
            productNum: 0,
            NavPage: [
              
            ]
        };
    },
    created() {
        this.GetShoppingCartNum();
    },
    computed: {
        storeText() {
            //计算 返回数据中心的数据 1
            return this.$store.state.counts;
            // 设置了getters 就可以直接用
            //  return this.$store.getters.getTotal
        }
    },

    methods: {
        GetShoppingCartNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getshoppingcartnum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.productNum = response.data.object.productNum;
                    console.log(this.productNum);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.homePage {
    margin-bottom: 1.8rem;
    .router-link-active {
        color: #ff5f17;
    }
}
.IconList {
    font-size: 0.6rem;
}
</style>
