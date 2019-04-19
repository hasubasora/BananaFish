<template>
    <div class="home">
        <div class="top-poster" @click="GoDownload">
            <img src="../assets/Img/top-poster.png" alt="">
        </div>
        <div class="tab-bg" :style="{background: topBgColor}">
            <yd-tab
                horizontal-scroll
                v-model="tab1"
                :callback="fn"
                :prevent-default="false" 
                :item-click="itemClick" 
                :color="fontColor" 
                :bg-color="titleBgColor" 
                :active-color="activeColor"
            >
                <yd-tab-panel v-for="item in TitleList" :label="item.CateName" :key="item.CateName">
                </yd-tab-panel>
            </yd-tab>
        </div>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div class="index-content" slot="list" v-if="tab1 == 0">
                <div class="home-banner" :style="{background: topBgColor}">
                    <div class="swiper-wrap">
                        <yd-slider :callback="tabCallBack" :autoplay="3000" pagination-color="#fff" pagination-activecolor="#ffffff" :index="0">
                            <yd-slider-item v-for="(bannerItem, index) in broadcastAd" :key="index" @click.native="goToNewbie(bannerItem)">
                                <div class="swiper-item-content">
                                    <img :src="bannerItem.Src" alt="">
                                </div>
                            </yd-slider-item>
                        </yd-slider>
                    </div>
                </div>
                <div class="salable-product">
                    <img src="../assets/Img/salable-product.png" alt="">
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
                    <div class="LD-swiper">
                        <swiper :options="advertisingOption" v-for="(adList, index) in imgAdList" :key="index" :class="'swiper'+index">
                            <swiper-slide v-for="(adItem, key) in adList" :key="key"  @click.native="goToNewbie(adItem)" >
                                <div class="slide-img">
                                    <img :src="adItem.Src"> 
                                </div>
                            </swiper-slide>
                        </swiper>
                    </div>
                    <div class="LDcontent">
                        <div class="title-and-more">
                            <div class="title">
                                <img :src="productsAd.Src" alt="">
                            </div>
                            <div class="more" @click="goToNewbie(productsAd)">
                                <span>更多</span>
                                <img src="../assets/Img/right-arrows.png" alt="">
                            </div>
                        </div>
                        <div class="swiper-wrap">
                            <swiper :options="hotSwiperOption" v-if="products.length">
                                <swiper-slide v-for="(product, index) in products" :key="index" @click.native="GoItemDes(product.Id)">
                                    <div class="LDItem">
                                        <div class="ItemImg">
                                            <img :src="product.ProductImg" alt="">
                                        </div>
                                        <div class="item-title">{{product.ProductTitle}}</div>
                                        <div class="sale-price">￥{{product.SalePrice.toFixed(2)}}</div>
                                        <div class="badge" v-if="index < 3">
                                            <img v-if="index == 0" src="../assets/Img/badge0.png" alt="">
                                            <img v-if="index == 1" src="../assets/Img/badge1.png" alt="">
                                            <img v-if="index == 2" src="../assets/Img/badge2.png" alt="">
                                        </div>
                                    </div>
                                </swiper-slide>
                            </swiper>
                        </div>
                    </div>
                </div>
                <!-- <div class="waterfallFlow" v-for="(item, index) in goodsList" :key="index" @click="GoItemDes(item.Id)">
                    <div class="goodsImg">
                        <img :src="item.ProductImg">
                    </div>
                    <div class="goodsDescribe">
                        <p class="goodsTitle">{{item.ProductTitle}}</p>
                        <div class="goodsBot">
                            <div class="price">
                                <div class="salePrice">￥{{item.SalePrice.toFixed(2)}}</div>
                                <div class="MarketPrice"><del>市场价{{item.MarketPrice.toFixed(2)}}</del></div>
                            </div>
                            <div class="sale">
                                <div class="sales-volume">月销{{item.SaleCount}}件</div>
                                <div class="buyBtn">立即购买</div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="home-waterfall-flow">
                    <div class="waterfall-flow-title">
                        <img src="../assets/Img/recommend.png" alt="">
                    </div>
                    <waterfall-flow :goodsInfo="goodsList"></waterfall-flow>
                </div>
            </div>
            <div class="list" slot="list" v-if="tab1 > 0">
                <div class="classify-banner" @click="goToNewbie(categoryInfo)">
                    <img :src="categoryInfo.AdPicture" alt="">
                </div>
                <swiper-slides-per-view :icon="hotIconUrl" :list="hotProducts" :key="tab1"></swiper-slides-per-view>
                <div class="waterfall-flow-title">
                    <img :src="recommendIcon" alt="">
                </div>
                <waterfall-flow :goodsInfo="goodsTabDetail"></waterfall-flow>
            </div>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
        <yd-backtop right="85%" bottom="0">
            <img class="back-top-img" src="../assets/Img/backTop.png" alt="">
        </yd-backtop>
    </div>
</template>

<script>
    import "swiper/dist/css/swiper.css";
    import { swiper, swiperSlide } from "vue-awesome-swiper";
    import swiperSlidesPerView from '../comment/swiperSlidesPerView.vue'
    import waterfallFlow from '../comment/waterfallFlow.vue'
    export default {
        data() {
            return {
                MessageNum: 0,
                tab1: 0,
                topBgColor: '',
                fontColor: '#fff',
                titleBgColor: 'rgba(255,255,255,0)',
                activeColor: '#fff',
                swiperIndex: 0,
                leaveSwiperIndex: 0,
                swiperOnOff: true,
                autoplayTime: 5000,
                TitleList: [],
                RecommendType: 6,
                broadcastAd: [],
                imgAdList: [],
                expressNews: [],
                navigationIcoAd: [],
                products: [],
                productsAd: {},
                goodsList: [],
                CategoryId:0,
                pageindex: 1,
                pagesize: 8,
                goodsTabDetail: [],
                swiperOption: {
                    loop: true,
                    autoplay: {
                        delay: 3000,
                    }
                },
                hotSwiperOption: {
                    slidesPerView: 3.2
                },
                bannerSwiperOption: {
                    observer:true
                },
                advertisingOption: {

                },
                // 分类列表的数据
                categoryInfo: '',
                hotIconUrl: '',
                hotProducts: [],
                recommendIcon: ''
            }
        },
        components: {
            //路径变量问题
            homeBanner: homeBanner => require(["@/components/homeBanner"], homeBanner),
            navbar: navbar => require(["@/components/navbar"], navbar),
            swiper,
            swiperSlide,
            swiperSlidesPerView,
            waterfallFlow
        },
        activated() {
            // this.swiperIndex = this.leaveSwiperIndex
            // console.log(this.leaveSwiperIndex)
            // // this.topBgColor = this.broadcastAd[this.swiperIndex].BackgroundColor
            // this.swiperOnOff = true
            this.autoplayTime = 5000
        },
        deactivated(){
            // this.leaveSwiperIndex = this.swiperIndex
            // console.log('leaveSwiperIndex:'+this.leaveSwiperIndex)
            // this.swiperOnOff = false
            this.autoplayTime = 0
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
            this.IndexCenterData()
        },
        watch: {
            swiperIndex() {
                this.topBgColor = this.broadcastAd[this.swiperIndex].BackgroundColor
                // console.log(this.topBgColor, this.swiperIndex)
            }
        },
        methods: {
            goSearch() {
                this.$router.push({path: "/SearchList"})
            },
            goToNewbie(obj) {
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
            tabCallBack(index) {
                // console.log(index)
                // this.swiperIndex = index
                // if(this.swiperOnOff) {
                    this.swiperIndex = index
                    // console.log(this.swiperIndex+"sdf")
                // }
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
                    this.titleBgColor =  '#fff'
                    this.fontColor = '#222'
                    this.activeColor = '#000'
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
                            this.recommendIcon = response.data.hotIcon.hotIconUrl
                            this.$dialog.loading.close();
                        }
                    });
                    this.$axios({
                        method: "POST",
                        data: {
                            categoryid: this.CategoryId,
                            RecommendType: this.RecommendType
                        },
                        url: this.$server.serverUrl + "/index/getcategoryTopData",
                        responseType: "json"
                    }).then(response => {
                        if (response.data.success == 200) {
                            console.log(response.data)
                            this.categoryInfo = response.data.categoryInfo
                            this.hotIconUrl = response.data.hotIcon.hotIconUrl
                            this.hotProducts = response.data.hotProducts
                        }
                    });
                }else{
                    this.topBgColor = this.broadcastAd[0].BackgroundColor
                    this.titleBgColor =  'rgba(255,255,255,0)'
                    this.fontColor = '#fff'
                    this.activeColor = '#fff'
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
            },
            IndexCenterData() {
                this.$axios({
                    method: "POST",
                    data: {},
                    url: this.$server.serverUrl + "/Index/IndexCenterData",
                    responseType: "json"
                }).then(response => {
                    if (response.data.success == 200) {
                        this.imgAdList = response.data.data.imgAdList
                        this.navigationIcoAd = response.data.data.navigationIcoAd
                        this.broadcastAd = response.data.data.broadcastAd
                        this.topBgColor = response.data.data.broadcastAd[0].BackgroundColor
                        this.expressNews = response.data.data.expressNews
                        this.products = response.data.data.products.products
                        this.productsAd = response.data.data.products.productsAd
                    }
                })
            },
            GoDownload() {
                var u = navigator.userAgent;
                if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                    window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hz.mall";
                }else if (u.indexOf('iPhone') > -1) {
                    window.open("https://itunes.apple.com/cn/app/%E5%A4%B4%E7%AD%B9%E8%B4%AD/id1440461607?mt=8");
                }
            }
        }
    }
</script>

<style lang="scss">
    .home {
        background: #fff;
        padding-bottom: 1rem;
        .top-poster {
            width: 100%;
            height: 1.04rem;
            font-size: 0;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .tab-bg {
            width: 100%;
            height: 0.84rem;
            z-index: 2000;
        }
        .yd-tab-nav-scoll .yd-tab-nav .yd-tab-nav-item {
            padding: 0 10px;
        }
        .yd-tab-nav:after {
            height: 0;
        }
        .yd-tab-active {
            font-weight: bold;
        }
        .yd-slider-pagination-item-active {
            background: #fff !important;
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
        .back-top-img {
            width: 0.8rem;
            height: 0.8rem;
            margin-bottom: 0.1rem;
        }
        .index-content {
            position: relative;
            .home-banner {
                border-radius: 0 0 4rem 4rem/0 0 0.8rem 0.8rem;
                width: 100%;
                height: 2.4rem;
                margin-bottom: 0.8rem;
                .swiper-wrap {
                    width: 100%;
                    height: 0;
                    padding-bottom: 41.4%;
                    .swiper-item-content {
                        margin: 0.12rem 0.2rem 0;
                        width: 7.1rem;
                        height: 2.97rem;
                        border-radius: 0.2rem;
                        overflow: hidden;
                        img {
                            width: 100%;
                        }
                    }
                }
            }
            .salable-product {
                padding: 0.16rem 0.52rem 0;
                margin-bottom: 0.2rem;
                img {
                    width: 100%;
                }
            }
            .winners-swiper {
                position: absolute;
                top: 0.4rem;
                left: 0.4rem;
                width: 3.4rem;
                padding-left: 0.2rem;
                background: rgba($color: #fff, $alpha: 0.7);
                border-radius: 0.4rem;
                z-index: 1000;
                .barItem {
                    display: flex;
                    align-items: center;
                    padding: 0.15rem 0;
                    .text {
                        font-size: 0.2rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #000;
                    }
                    span {
                        color: #FF273B;
                    }
                }
            }
            .LD {
                margin-top: 0.2rem;
                .LD-swiper {
                    font-size: 0;
                    .swiper0 {
                        margin-bottom: 0.2rem;
                        img {
                            width: 100%;
                        }
                    }
                    .swiper1 {
                        margin-bottom: 0.34rem;
                        .slide-img {
                            padding: 0 0.18rem;
                            img {
                                width: 100%;
                            }
                        }
                    }
                }
                .poster{
                    padding: 0.14rem 0.18rem 0.34rem 0.18rem;
                    img {
                        width: 100%;
                    }
                }
                .LDcontent {
                    padding-bottom: 0.2rem;
                    background: #F3F3F3;
                    width: 100%;
                    .title-and-more {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        padding: 0.3rem 0.22rem 0.22rem;
                        background: #F3F3F3;
                        .title {
                            width: 1.66rem;
                            img {
                                width: 100%;
                            }
                        }
                        .more {
                            display: flex;
                            align-items: center;
                            color: #FF1D26;
                            font-size: 0.26rem;
                            img {
                                width: 0.13rem;
                                margin-left: 0.16rem;
                            }
                        }
                    }
                    .swiper-wrap {
                        margin-left: 0.16rem;
                        .LDItem {
                            position: relative;
                            background: #fff;
                            margin-right: 0.22rem;
                            padding: 0.26rem 0.26rem 0.22rem 0.26rem;
                            border-radius: 0.1rem;
                            text-align: center;
                            .ItemImg {
                                margin-bottom: 0.06rem;
                                width: 100%;
                                height: 0;
                                padding-bottom: 100%;
                                overflow: hidden;
                                background: #eee;
                                img {
                                    width: 100%;
                                }
                            }
                            .item-title {
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                color: #333;
                                margin-bottom: 0.1rem;
                            }
                            .sale-price {
                                color: #FF1329;
                                font-weight: bold;
                            }
                            .badge {
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 0.88rem;
                                height: 0.36rem;
                                img {
                                    width: 100%;
                                }
                            }
                        }

                    }
                }
            }
            .home-waterfall-flow {
                .waterfall-flow-title {
                    width: 100%;
                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
        .list {
            overflow: hidden;
            .classify-banner {
                width: 100%;
                height: 0;
                padding-bottom: 34.27%;
                img {
                    width: 100%;
                    height: 2.57rem;
                }
            }
            .waterfall-flow-title {
                border-top: 0.16rem solid #F3F3F3;
                height: 1rem;
                padding-left: 0.4rem;
                img {
                    width: 1.74rem;
                    margin-top: 0.4rem;
                    transform: translateY(-50%);
                }
            }
        }
    }
</style>
