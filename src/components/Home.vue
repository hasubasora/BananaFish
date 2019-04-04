<template>
    <div class="home">
        <yd-tab horizontal-scroll v-model="tab1" :callback="fn" :prevent-default="false" :item-click="itemClick">
            <yd-tab-panel v-for="item in TitleList" :label="item.CateName" :key="item.CateName">
            </yd-tab-panel>
        </yd-tab>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div class="index-content" slot="list" v-if="tab1 == 0">
                <div class="home-banner">
                    <home-banner :broadcastAd = "broadcastAd"></home-banner>
                </div>
                <div class="winners-swiper">
                    <swiper :options="swiperOption"  v-if="expressNews.length">
                        <swiper-slide class="barItem" v-for="(item, index) in expressNews" :key="index">
                            <div class="text">一分钟前<span>{{item.NickName}}</span>获得<span>{{item.OrderAmount}}</span>元免单</div>
                        </swiper-slide>
                    </swiper>
                </div>
                <navbar :expressNews='expressNews' :navigationIcoAd="navigationIcoAd"></navbar>
                <div class="LD">
                    <div class="LDImg"  @click="goToNewbie(IndexProductLst)">
                        <img :src="productAd">
                    </div>
                    <div class="LDcontent">
                        <div class="LDItem" v-for="(product, index) in products" :key="index" @click="GoItemDes(product.Id)">
                            <div class="ItemImg">
                                <img :src="product.ProductImg" alt="">
                            </div>
                            <div class="ItemText">
                                <div class="num">
                                    <p class="price">￥ {{product.SalePrice}}</p>
                                    <p class="integral">{{product.Integral}}积分</p>
                                </div>
                                <div class="loot">
                                    <!-- <span>抢</span><span class="arrows"></span> -->
                                    <img src="../assets/Img/home-Q.png">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="waterfallFlow" v-for="(item, index) in goodsList" :key="index" @click="GoItemDes(item.Id)">
                    <img :src="item.ProductImg">
                    <div class="goodsDescribe">
                        <p class="goodsTitle">{{item.ProductTitle}}</p>
                        <div class="goodsBot">
                            <div class="price">
                                <div class="salePrice">￥{{item.SalePrice}}</div>
                                <div class="MarketPrice"><del>市场价{{item.MarketPrice}}</del></div>
                            </div>
                            <div class="sale">
                                <div class="sales-volume">月销{{item.SaleCount}}件</div>
                                <div class="buyBtn">立即购买</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <yd-list theme="3" slot="list" v-if="tab1 > 0" class="list">
                <div class="list-item" v-for="(item, key) in goodsTabDetail" :key="key" @click="GoItemDes(item.Id)">
                    <div class="list-img">
                        <img :src="item.ProductImg">
                    </div>
                    <p class="hideTwo title">{{item.ProductTitle}}</p>
                    <div class="price">￥{{item.SalePrice}}</div>
                    <div class="Integral">
                        <span>{{item.Integral}}积分</span>
                        <span>销量{{item.SaleCount}}件</span>
                    </div>
                    <div class="badge">
                        <img v-if="item.ProductType == 2" src="../assets/Img/JLbadge.png" alt="">
                        <img v-if="item.ProductType == 3" src="../assets/Img/SPbadge.png" alt="">
                    </div>
                </div>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.css";
    import { swiper, swiperSlide } from "vue-awesome-swiper";
    export default {
        data() {
            return {
                MessageNum: 0,
                tab1: 0,
                TitleList: [],
                RecommendType: 6,
                broadcastAd: [],
                expressNews: [],
                navigationIcoAd: [],
                products: [],
                productAd: '',
                productAdBg: '',
                IndexProductLst: [],
                goodsList: [],
                CategoryId:0,
                pageindex: 1,
                pagesize: 8,
                goodsTabDetail: [],
                swiperOption: {
                    loop: true,
                    autoplay: true
                }
            }
        },
        components: {
            //路径变量问题
            homeBanner: homeBanner => require(["@/components/homeBanner"], homeBanner),
            navbar: navbar => require(["@/components/navbar"], navbar),
            swiper,
            swiperSlide
        },
        created() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/index/getcategory_v2",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data)
                    this.TitleList = response.data.rows
                }
            })

            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/index/IndexProduct_V2",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data)
                    this.broadcastAd = response.data.data.broadcastAd
                    this.expressNews = response.data.data.expressNews
                    this.navigationIcoAd = response.data.data.navigationIcoAd
                    this.products = response.data.data.IndexProductLst[0].products
                    this.IndexProductLst = response.data.data.IndexProductLst[0].productAd[0]
                    this.productAd = response.data.data.IndexProductLst[0].productAd[0].Src
                    this.productAdBg = response.data.data.IndexProductLst[0].productAd[1].Src
                }
            })

            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.pageindex,
                    pagesize: this.pagesize
                },
                url: this.$server.serverUrl + "/index/getindexintegralproduct_v2",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.goodsList = response.data.rows
                    
                }
            })
        },
        methods: {
            goSearch() {
                this.$router.push({path: "/SearchList"})
            },
            goToNewbie(obj) {
                console.log(obj)
               if(obj.Link && obj.Link.indexOf("http")> -1) {
                    window.location.href = obj.Link
                }else if(obj.CategoryID) {
                    this.$router.push({path: "menuThree/" + obj.CategoryID})
                }else if(obj.Type) {
                        this.$router.push({path: "menuThree/0", query: {gg: obj.Type}})
                }else if(obj.ProductID > 0) {
                    this.$router.push({
                        path: "/GeneralItemDescription",
                        query: {Good_id: obj.ProductID}
                    })
                }else if(obj.SpecialAreaType === 1) {
                    this.$router.push({path: "/FreeOfCharge"})
                }else if(obj.SpecialAreaType === 2) {
                    this.$router.push({path: "/LuckyDouble"})
                }else if(obj.SpecialAreaType === 4) {
                    this.$router.push({path: "/Invitations"})
                }
            },
            GoItemDes(i) {
                this.$router.push({
                    name: "GeneralItemDescription",
                    query: { Good_id: i }
                });
            },
            itemClick(key) {
                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
                this.tab1 = key
                this.pageindex = 1
                if(this.tab1 > 0) {
                    this.$dialog.loading.open('数据加载中')
                    this.CategoryId = this.TitleList[key].CategoryId
                    this.RecommendType = this.TitleList[key].RecommendType
                    this.$axios({
                        method: "POST",
                        data: {
                            pageindex: this.pageindex,
                            pagesize: this.pagesize,
                            categoryid: this.CategoryId,
                            RecommendType: this.RecommendType
                        },
                        url: this.$server.serverUrl + "/index/getcategoryproduct",
                        responseType: "json"
                    }).then(response => {
                        if (response.data.success == 200) {
                            console.log(response.data)
                            this.goodsTabDetail = response.data.rows;
                            this.$dialog.loading.close();
                        }
                    });
                }
            },
            fn(label, key) {
            },
            loadList() {
                this.pageindex++
                if(this.tab1 == 0) {
                    this.$axios({
                        method: "POST",
                        data: {
                            pageindex: this.pageindex,
                            pagesize: this.pagesize
                        },
                        url: this.$server.serverUrl + "/index/getindexintegralproduct_v2",
                        responseType: "json"
                    }).then(response => {
                        if (response.data.success == 200) {
                            console.log(response.data)
                            const _list = response.data.rows
                            this.goodsList = [...this.goodsList, ..._list]
                            if(_list.length < this.pagesize) {
                                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                                return;
                            }
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
                        }
                    })
                }else if(this.tab1 > 0) {
                    this.$axios({
                        method: "POST",
                        data: {
                            pageindex: this.pageindex,
                            pagesize: this.pagesize,
                            categoryid: this.CategoryId,
                            RecommendType: this.RecommendType
                        },
                        url: this.$server.serverUrl + "/index/getcategoryproduct",
                        responseType: "json"
                    }).then(response => {
                        if (response.data.success == 200) {
                            const detailList = response.data.rows
                            this.goodsTabDetail = [...this.goodsTabDetail, ...detailList]
                            if(detailList.length < this.pagesize) {
                                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone')
                                return;
                            }
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad')
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .home {
        background: #fff;
        padding-bottom: 1rem;
        .yd-tab-nav-scoll .yd-tab-nav .yd-tab-nav-item {
            font-size: 0.27rem;
            padding: 0 10px;
        }
        .hideTwo {
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            height: auto;
            white-space: normal;
            word-wrap: normal;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }
        .yd-list-donetip {
            background: #f8f8f8;
            padding: 0.5rem 0;
        }
        .index-content {
            position: relative;
            .home-banner {
                width: 100%;
                height: 0;
                padding-bottom: 40%;
            }
            .winners-swiper {
                position: absolute;
                top: 0.2rem;
                left: 0.2rem;
                width: 3.4rem;
                padding-left: 0.2rem;
                height: 0.6rem;
                background: rgba($color: #fff, $alpha: 0.7);
                border-radius: 0.4rem;
                .barItem {
                    display: flex;
                    align-items: center;
                    height: 0.6rem;
                    line-height: 0.6rem;
                    .text {
                        font-size: 0.2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        span {
                            color: #FF273B;
                        }
                    }
                }
            }
            .LD {
                margin-top: 0.2rem;
                .LDImg {
                    font-size: 0;
                    img {
                        width: 100%;
                    }
                }
                .LDcontent {
                    display: flex;
                    justify-content: space-around;
                    padding: 0 0 0.4rem 0.2rem;
                    border-bottom: 0.2rem solid #F8F8F8;
                    .LDItem {
                        background: #fff;
                        width: 33%;
                        padding: 0.2rem 0;
                        margin-right: 0.2rem;
                        border-radius: 0.2rem;
                        text-align: center;
                        .ItemImg {
                            margin-left: 15%;
                            margin-bottom: 0.1rem;
                            width: 70%;
                            height: 0;
                            padding-bottom: 70%;
                            overflow: hidden;
                            background: #eee;
                            img {
                                width: 100%;
                            }
                        }
                        .ItemText {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 0 0.1rem;
                            .num {
                                .price {
                                    color: #FF273B;
                                    font-weight: bold;
                                    font-size: 0.3rem;
                                }
                                .integral {
                                    text-align: left;
                                    color: #bbb;
                                }
                            }
                            .loot {
                                color: #fff;
                                img {
                                    width: 0.7rem;
                                    height: 0.7rem;
                                }
                            }
                        }
                    }
                }
            }
            .waterfallFlow {
                border-bottom: 0.2rem solid #F8F8F8;
                &:last-child {
                    border-bottom: none;
                }
                >img {
                    width: 100%;
                }
                .goodsDescribe {
                    padding: 0.2rem 0.4rem 0.4rem;
                    .goodsTitle {
                        font-size: 0.28rem;
                        font-weight: bold;
                    }
                    .goodsIntegral {
                        margin: 0.06rem 0;
                        width: 1rem;
                        text-align: center;
                        border: 1px solid #FF273B;
                        color: #FF273B;
                        border-radius: 0.1rem;
                    }
                    .goodsBot {
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-end;
                        margin-top: 0.1rem;
                        .price {
                            display: flex;
                            justify-content: space-between;
                            align-items: flex-end;
                            .salePrice {
                                font-size: 0.32rem;
                                font-weight: bold;
                                color: #FF273B;
                                margin-right: 0.2rem;
                            }
                            .MarketPrice {
                                background: rgb(243, 243, 243);
                                border-radius: 0.4rem;
                                padding: 0 0.2rem;
                                del {
                                    color: #888;
                                    font-size: 0.28rem;
                                }
                            }
                        }
                        .sale {
                            display: flex;
                            align-items: flex-end;
                            .sales-volume {
                                color: #888;
                            }
                            .buyBtn {
                                margin-left: 0.2rem;
                                background: #F82D48;
                                border-radius: 0.4rem;
                                color: #fff;
                                padding: 0.1rem 0.2rem;
                                
                            }
                        }
                    }
                }
            }
        }
        .list {
            overflow: hidden;
            .list-item {
                width: 50%;
                float: left;
                padding: .2rem;
                position: relative;
                z-index: 0;
                background-color: #fff;
                border-right: 1px solid #eee;
                border-bottom: 1px solid #eee;
                &:nth-child(even) {
                    border-right: none;
                }
                .list-img {
                    height: 0;
                    width: 100%;
                    padding: 50% 0;
                    overflow: hidden;
                    img {
                        width: 100%;
                        margin-top: -50%;
                        border: none;
                        display: block;
                    }
                }
                .title {
                    font-size: 0.28rem;
                    font-weight: bold;
                    margin-bottom: 0.1rem;
                }
                .price {
                    color: #ee6120;
                    font-weight: 600;
                    font-size: 0.28rem;
                    // margin-bottom: 0.1rem;
                }
                .Integral {
                    display: flex;
                    justify-content: space-between;
                    color: #888;
                }
                .badge {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0.8rem;
                    height: 0.8rem;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
