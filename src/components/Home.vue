<template>
    <div class="home">
        <yd-flexbox class="home-header">
            <div class="header-icon" @click="goService">
                <img class="service-icon" src="../assets/Img/service.png" alt="">
            </div>
            <yd-flexbox-item>
                <div class="search" @click="goSearch">
                    <img src="../assets/Img/NewSearch.png" alt="">
                    <input type="text" placeholder="请输入商品名称" disabled>
                </div>
            </yd-flexbox-item>
            <router-link to="/MessageQueue" class="header-icon">
                <img class="message-icon" src="../assets/Img/message.png" alt="">
                <yd-badge class="badge" type="danger">{{MessageNum}}</yd-badge>
            </router-link>
        </yd-flexbox>
        <yd-tab horizontal-scroll v-model="tab1" :callback="fn" :prevent-default="false" :item-click="itemClick">
            <yd-tab-panel v-for="item in TitleList" :label="item.CateName" :key="item.CateName">
            </yd-tab-panel>
        </yd-tab>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <div class="index-content" slot="list" v-if="tab1 == 0">
                <swipe :broadcastAd = "broadcastAd"></swipe>
                <navbar :expressNews='expressNews' :navigationIcoAd="navigationIcoAd"></navbar>
                <div class="LD">
                    <div class="LDImg"  @click="goToNewbie(IndexProductLst)">
                        <img :src="productAd" alt="">
                    </div>
                    <div class="LDcontent" :style="{backgroundImage: 'url(' + productAdBg +')'}">
                        <div class="LDItem" v-for="(product, index) in products" :key="index" @click="GoItemDes(product.Id)">
                            <div class="ItemImg">
                                <img :src="product.ProductImg">
                            </div>
                            <div class="ItemText">
                                <div class="num">
                                    <p class="price">￥ {{product.SalePrice}}</p>
                                    <p class="integral">{{product.Integral}}积分</p>
                                </div>
                                <div class="loot">
                                    <span>抢</span><span class="arrows"></span>
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
            <yd-list theme="3" slot="list" v-if="tab1 > 0">
                <yd-list-item v-for="(item, key) in goodsTabDetail" :key="key" @click.native="GoItemDes(item.Id)">
                    <img slot="img" :src="item.ProductImg">
                    <p slot="title" class="hideTwo">{{item.ProductTitle}}</p>
                    <yd-list-other slot="other">
                        <div>
                            <span class="demo-list-price">
                                <em>¥</em>{{item.SalePrice}}</span>
                            <span class="demo-list-del-price">{{item.Integral}}积分</span>
                        </div>
                        <div>销量{{item.SaleCount}}件</div>
                    </yd-list-other>
                </yd-list-item>
            </yd-list>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">没有数据啦~~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
        </yd-infinitescroll>
    </div>
</template>

<script>
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
                goodsTabDetail: []
            }
        },
        components: {
            //路径变量问题
            swipe: swipe => require(["@/components/swipe"], swipe),
            navbar: navbar => require(["@/components/navbar"], navbar),
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

            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Account/GetMyMessageNum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.MessageNum = response.data.num;
                }
            })

            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/index/GetConfig",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.GetConfig = response.data.data;
                }
            })

        },
        methods: {
            goService() {
                window.location.href = this.GetConfig.customerServiceUrl
            },
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
                                this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
                                return;
                            }
                            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
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
        .home-header {
            position: relative;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            border-bottom: 1px solid #f8f8f8;
            .header-icon {
                padding: 0 0.3rem;
                .service-icon {
                    width: 0.5rem;
                }
                .message-icon {
                    width: 0.4rem;
                }
                .badge {
                    position: absolute;
                    top: 0.2rem;
                    right: 0.16rem;
                }
                .yd-badge {
                    padding: 2px 4px;
                }
            }
            .search {
                background: #f3f3f3;
                border-radius: 0.3rem;
                padding: 0.1rem 0.3rem;
                img {
                    width: 0.24rem;
                    vertical-align: middle;
                    margin-right: 0.1rem;
                    margin-top: -1px;
                }
                input {
                    border: none;
                    height: 0.4rem;
                    &::-webkit-input-placeholder {
                        color: #999
                    }
                }
            }
        }
        .yd-list-donetip {
            background: #f8f8f8;
            padding: 0.5rem 0;
        }
        .index-content {
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
                    padding: 0.4rem 0 0.4rem 0.2rem;
                    border-bottom: 0.2rem solid #F8F8F8;
                    .LDItem {
                        background: #fff;
                        width: 33%;
                        padding: 0.2rem 0;
                        margin-right: 0.2rem;
                        border-radius: 0.2rem;
                        box-shadow:1px 2px 5px rgb(156, 24, 40);
                        text-align: center;
                        .ItemImg {
                            margin-left: 15%;
                            margin-bottom: 0.1rem;
                            width: 70%;
                            border-radius: 50%;
                            overflow: hidden;
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
                                background: #F32C2E;
                                border-radius: 0.4rem;
                                padding: 0.04rem 0.16rem;
                                color: #fff;
                                .arrows {
                                    display: inline-block;
                                    border-top: 2px solid;
                                    border-right: 2px solid;
                                    width: 0.16rem;
                                    height: 0.16rem;
                                    border-color: #fff;
                                    transform: rotate(45deg);
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
                    padding: 0.4rem;
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
    }
</style>
