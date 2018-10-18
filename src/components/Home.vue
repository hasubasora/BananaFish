<template>
    <div class="home">
        <div class="bannerTop">
            <div class="bannerCenter">
                <div class="classify">
                    <router-link to="productList"><img src="../assets/Img/classify.png" alt=""></router-link>
                </div>
                <div class="search">
                    <router-link to="/SearchList">
                        <label for="search" class="searchlabel"><img src="../assets/Img/search.png" alt=""><input type="search" disabled id="search" placeholder="头筹商品...."></label>
                    </router-link>
                </div>
                <div class="massage">
                    <router-link to="/MessageQueue"><img src="../assets/Img/massage.png" alt=""></router-link>
                    <yd-badge type="danger" style="position:absolute;top:0;right:0">{{MessageNum}}</yd-badge>
                </div>

            </div>
            <keep-alive>
                <swipe :banners='banners'></swipe>
            </keep-alive>

        </div>
        <keep-alive>

            <div class="GroupList">
                <div class="navbarcompont">
                    <navbar :headNews='headNews'></navbar>
                </div>
                <!-- 积分等 -->
                <div class="participationInProfit">
                    <participationInProfit :InProfit='InProfit'></participationInProfit>
                </div>
                <div class="showtime" v-for="(item, index) in TopObjectList" :key="index">
                    <showtime :TimeSrc="item"></showtime>
                    <div class="bannerPad" v-if="item.RecommendType==0">
                        <img :src=item.productAd[0].Src alt="广告">
                        <GoodsList :post-title="item"></GoodsList>
                    </div>
                    <div class="bannerPad" v-if="item.RecommendType==1">
                        <img :src=item.productAd[0].Src alt="广告">
                        <GoodsList2 :post-head="item"></GoodsList2>
                    </div>
                </div>
            </div>
        </keep-alive>

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
            banners: [],
            headNews: [],
            InProfit: [],
            MessageNum:0
        };
    },
    methods: {
        GetMyMessageNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Account/GetMyMessageNum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.MessageNum=response.data.num
                    console.log(response.data.num);
                }
            });
        }
    },
    created() {
        this.GetMyMessageNum()
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/IndexProduct",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                console.log(response.data.data.IndexProductLst);
                this.TopObjectList = response.data.data.IndexProductLst;
                this.banners = response.data.data.broadcastAd;
                this.headNews = response.data.data.headNews;
                this.InProfit = [
                    ...response.data.data.bonusSuperiorAd,
                    ...response.data.data.headDetonatingAd
                ];
                console.log(this.InProfit);
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
            require(["@/components/GoodsList2"], GoodsList2)
    }
};
</script>

<style lang="scss">
.home {
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
                    width: 0.8rem;
                    height: auto;
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
                    #search {
                        border: none;
                        opacity: 1;
                        outline: none;
                        border-radius: 15rem;
                        width: 5rem;
                        height: 0.6rem;
                        text-indent: 1rem;
                        background-color: #fff;
                    }
                }
            }
            .massage {
                padding: 0.1rem;
                position: relative;
                img {
                    width: 0.8rem;
                    height: auto;
                }
            }
        }
    }
    .GroupList {
        padding: 0 0.2rem 1rem;
    }
    .participationInProfit {
        // height: 3rem;
        // border: 1px solid red;
        margin-top: 0.2rem;
    }
}
</style>
