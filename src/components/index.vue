<template>
    <div class="homePage">
        <keep-alive>
            <router-view @changeCartNum="changeCartNum"></router-view>
        </keep-alive>

        <!-- <yd-tabbar fixed active-color="#aaa">
            <yd-tabbar-item title="首页" link="/" active>
                <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
            
            <yd-tabbar-item title="头筹" link="ProductGroupList" active>
                <span slot="icon" class="iconfont IconList icon-touchou-copy"></span>
            </yd-tabbar-item>
            <yd-tabbar-item title="购物车" link="cart" active>
                <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
                <yd-badge slot="badge" type="danger" v-if="productNum">{{productNum}}</yd-badge>
            </yd-tabbar-item>
            <yd-tabbar-item title="我的" link="MyInfo" active>
                <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar> -->
        <div class="tabbar">
            <router-link to="/" class="tabbar-item" exact>
                <div class="icon all-icon"></div>
                <div>首页</div>
            </router-link>
            <router-link to="/productList" class="tabbar-item" exact>
                <div class="icon1 all-icon"></div>
                <div>搜索</div>
            </router-link>
            <router-link to="/FreeOfCharge" class="tabbar-item" exact>
                <div class="icon2 all-icon"></div>
                <div>免单接龙</div>
            </router-link>
            <router-link to="cart" class="tabbar-item cart" exact>
                <div class="icon3 all-icon"></div>
                <div>购物车</div>
                <yd-badge type="danger" class="badge" v-if="productNum">{{productNum}}</yd-badge>
            </router-link>
            <router-link to="MyInfo" class="tabbar-item" exact>
                <div class="icon4 all-icon"></div>
                <div>我的</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productNum: 0,
            NavPage: [],
            activeted: 0,
            checked: false
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
        changeCartNum() {
            this.GetShoppingCartNum()
        },
        GetShoppingCartNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getshoppingcartnum",
                responseType: "json"
            }).then(response => {
                
                if (response.data.success == 200) {
                    this.productNum = response.data.object.productNum;
                    console.log(response.data);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.homePage {
    .tabbar {
        display: flex;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1rem;
        padding: 0.1rem 0;
        background: #fff;
        z-index: 999;
        .all-icon {
            width: 0.4rem;
            height: 0.4rem;
        }
        .icon {
            background: url("../assets/Img/home2.png") no-repeat;
            background-size: 100% 100%;
        }
        .icon1 {
            background: url("../assets/Img/classify2.png") no-repeat;
            background-size: 100% 100%;
        }
        .icon2 {
            background: url("../assets/Img/touchou2.png") no-repeat;
            background-size: 100% 100%;
        }
        .icon3 {
            background: url("../assets/Img/car2.png") no-repeat;
            background-size: 100% 100%;
        }
        .icon4 {
            background: url("../assets/Img/my2.png") no-repeat;
            background-size: 100% 100%;
        }
        .tabbar-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            padding-top: 0.1rem;
            img {
                width: 0.5rem;
                margin-bottom: 0.1rem;
            }
            .badge {
                position: absolute;
                top: 0;
                right: 50%;
                margin-right: -0.5rem;
            }
        }
        .router-link-active {
            color: #FF273B;
            >.icon {
                background: url("../assets/Img/home1.png") no-repeat;
                background-size: 100% 100%;
            }
            >.icon1 {
                background: url("../assets/Img/classify1.png") no-repeat;
                background-size: 100% 100%;
            }
            >.icon2 {
                background: url("../assets/Img/touchou1.png") no-repeat;
                background-size: 100% 100%;
            }
            >.icon3 {
                background: url("../assets/Img/car1.png") no-repeat;
                background-size: 100% 100%;
            }
            >.icon4 {
                background: url("../assets/Img/my1.png") no-repeat;
                background-size: 100% 100%;
            }
        }
    }
}
.IconList {
    font-size: 0.6rem;
}
</style>
