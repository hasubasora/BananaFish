<template>

    <div class="page-tabbar">
        <!-- tabcontainer -->
        <!-- 轮播图 -->
        <div class="home">
            <div class="bannerTop">
                <div class="">
                    <div class="classify">
                        <router-link to="productList"><img class="classlei" src="../assets/Img/classify.png" alt=""></router-link>
                    </div>
                    <div class="search">
                        <router-link to="/SearchList">
                            <label for="search" class="searchlabel"><img src="../assets/Img/search.png" alt=""><input type="search" disabled id="search" placeholder="请输入商品名称"></label>
                        </router-link>
                    </div>
                    <div class="massage">
                        <router-link to="/MessageQueue">
                        <img src="../assets/Img/massage.png" alt="">
                        </router-link>
                    </div>

                </div>
                <swipe></swipe>
            </div>
            <!-- 连接新闻 -->
            <div class="navbarcompont">
                <navbar></navbar>
            </div>
            <!-- 积分等 -->
            <div class="participationInProfit">
                <participationInProfit></participationInProfit>
            </div>
            <!-- 商品列表 -->
            <div class="showtime">





             
                <showtime TimeSrc='1'></showtime>
                <!-- 广告 -->
                <div class="bannerPad">
                    <img src="../assets/Img/banner.png" alt="广告">
                    <GoodsList :post-title="TopObjectList"></GoodsList>
                </div>
                <showtime TimeSrc='2'></showtime>
                <!-- 广告 -->
                <div class="bannerPad">
                    <img src="../assets/Img/banner.png" alt="广告">
                    <GoodsList2 :post-head="IsTopObjectList"></GoodsList2>
                </div>
                <showtime TimeSrc='3'></showtime>
                <!-- 广告 -->
                <div class="bannerPad">
                    <img src="../assets/Img/banner.png" alt="广告">
                    <GoodsList3 :recommend-product="InTopObjectList"></GoodsList3>
                </div>
            </div>
            <p class="bottomLink">———— 我是有底线的 ————</p>
        </div>

    </div>
</template>
 
<script>
export default {
    name: "page-tabbar",
    data() {
        return {
            selected: "home",
            timesrc: require("../assets/Img/fhyp.png"),
            productNum: 0,
            TopObjectList: [],
            IsTopObjectList: [],
            InTopObjectList: []
        };
    },
    methods: {
        shale() {
            console.log(12313123);
        }
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/IndexProduct",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                console.log(response.data);
                this.TopObjectList = response.data.data.integralProduct;
                this.IsTopObjectList = response.data.data.headProduct;
                this.InTopObjectList = response.data.data.recommendProduct;
            }
        });

        this.$axios({
            method: "GET",
            params: {
                type: "m",
                mobile: "13660392096"
            },
            url: "http://39.108.86.81:8090/login/getSmsCode",
            responseType: "json"
        }).then(response => {
            console.log(response.data);
            if (response.data.code == 12000) {
                _this.msg = response.data.object.NoticeContent;
            }
        });
        var params = new URLSearchParams();
        params.append("mobile", 13660392096);
        params.append("password", 13660392096);
        params.append("smsCode", 996582);
        this.$axios({
            method: "POST",
            data: params,
            url: "http://39.108.86.81:8090/member/registerMember "
        }).then(response => {
            console.log(response.data);
            if (response.data.code == 12000) {
                _this.msg = response.data.object.NoticeContent;
            }
        });
    },
    components: {
        swipe: swipe => require(["@/components/swipe"], swipe),
        navbar: navbar => require(["@/components/navbar"], navbar),
        participationInProfit: participationInProfit =>
            require([
                "@/components/participationInProfit"
            ], participationInProfit),
        showtime: showtime => require(["@/components/showtime"], showtime),
        GoodsList: GoodsList => require(["@/components/GoodsList"], GoodsList),
        GoodsList2: GoodsList2 =>
            require(["@/components/GoodsList2"], GoodsList2),
        GoodsList3: GoodsList3 =>
            require(["@/components/GoodsList3"], GoodsList3),
        UserInfo: UserInfo => require(["@/components/UserInfo"], UserInfo),
        cart: cart => require(["@/components/cart"], cart),
        ProductGroupList: ProductGroupList =>
            require(["@/components/ProductGroupList"], ProductGroupList)
    }
};
</script>
 
<style lang='scss'>

._badge {
    position: relative;
    .badge {
        position: absolute;
        top: 0rem;
    }
}
.bottomLink {
    text-align: center;
    color: #cccccc;
}
.IconList {
    font-size: 0.5rem;
    margin-bottom: 0.1rem;
    display: block;
}
.mint-tab-item {
    color: #888;
    // .mint-tab-item-label {
    //   color: #ff5f17;
    // }
}
.mint-tabbar > .mint-tab-item.is-selected {
    color: #ff5f17;
}

.page-tabbar {
    height: 100vh;
    overflow: scroll;
    padding-bottom: 2rem;
}

.page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
}
.bannerTop {
    position: relative;
    .bannerCenter {
        z-index: 2;
        display: flex;
        position: absolute;
        width: 100%;
        padding-top: 0.2rem;
        .classify {
            padding: 0.1rem;
            img {
                width: 0.7rem;
                // height: auto;
                height: 0.7rem;
            }
        }
        .search {
            flex: 1;
            text-align: center;
            .searchlabel {
                position: relative;
                img {
                    position: absolute;
                    left: 0.3rem;
                    top: -0.07rem;
                    height: 0.4rem;
                    width: 0.4rem;
                }
            }
        }
        .massage {
            padding: 0.1rem;
            img {
                width: 0.7rem;
                // height: auto;
                height: 0.7rem;
            }
        }
    }
}
.home {
    // background: #f2f2f2;
    // margin-bottom: 1rem;
}
#search {
    border: none;
    outline: none;
    border-radius: 15rem;
    width: 5rem;
    height: 0.6rem;
    text-indent: 1rem;
    background-color: #fff;
}

//第二部分连接处
.navbarcompont {
    margin: 0 0.2rem 0.2rem;
}
//积分准备

.participationInProfit {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 0 0 0.2rem;
}

//广告
.bannerPad {
    margin: 0.2rem;
    > img {
        width: 100%;
    }
}

.yd-badge{
  padding: 2px 4px;
}
</style>
