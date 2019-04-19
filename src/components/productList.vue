<template>
    <div class="productList">
        <yd-flexbox class="productList-header">
            <div class="header-icon" @click="goService">
                <img class="service-icon" :src="service">
            </div>
            <yd-flexbox-item>
                <div class="search" @click="goSearch">
                    <img src="../assets/Img/NewSearch.png">
                    <input type="text" placeholder="请输入商品名称" disabled>
                </div>
            </yd-flexbox-item>
            <router-link to="/MessageQueue" class="header-icon">
                <img class="message-icon" :src="message">
                <yd-badge class="badge" type="danger" v-if="MessageNum">{{MessageNum}}</yd-badge>
            </router-link>
        </yd-flexbox>
        <div class="scrolltab">
            <ul class="scrolltab-nav">
                <li
                    v-for="(NavItem, index) in NavList"
                    :key="index" @click="ChangeNav(NavItem.CategoryId, index)"
                    :class="{active: checkedItem === index}"
                >   
                    <div class="cate-name">{{NavItem.CateName}}</div>
                </li>
            </ul>
            <div class="scrolltab-content">
                <div class="top-img">
                    <img :src="category.AdPicture">
                </div>
                <div class="title" v-if="subCategory.length">
                    <span>{{category.CateName}}</span>
                    <span @click="GoMore(category.RecommendType, category.CategoryId)" class="more">更多 <img src="../assets/Img/right-arrows.png" alt=""></span>
                </div>
                <div class="grids-group" v-if="subCategory.length">
                    <div class="grids-item" v-for="(subCategoryItem,index) in subCategory" :key="index" @click="GoThreeList(subCategoryItem.CategoryId)">
                        <div class="item-img">
                            <img :src="subCategoryItem.CateIcon">
                        </div>
                        <span>{{subCategoryItem.CateName}}</span>
                    </div>
                </div>
                <div class="waterfall">
                    <div class="title">
                        <span>畅销新品</span>
                        <span @click="GoMore(category.RecommendType, category.CategoryId)" class="more">更多 <img src="../assets/Img/right-arrows.png" alt=""></span>
                    </div>
                    <div class="waterfall-item" v-for="(recommandProductsItem, index) in recommandProducts" :key="index" @click="GoItemDes(recommandProductsItem.Id)">
                        <div class="waterfall-left">
                            <img :src="recommandProductsItem.ProductImg">
                        </div>
                        <div class="waterfall-right">
                            <div class="describe-title">{{recommandProductsItem.ProductTitle}}</div>
                            <div class="describe-text">
                                <span class="price">￥ {{recommandProductsItem.SalePrice.toFixed(2)}}</span>
                                <span class="num">已销{{recommandProductsItem.SaleCount}}件</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: "productList",
    data() {
        return {
            NavList: [],
            checkedNavCategoryId: 0,
            checkedItem: 0,
            service: require("../assets/Img/service.png"),
            message: require("../assets/Img/message.png"),
            MessageNum: 0,
            customerServiceUrl: '',
            category: {},
            subCategory: [],
            recommandProducts: []
        };
    },
    //保存页面有position定位的滚动位置
    beforeRouteLeave (to, from, next) {
        this.scrollTop1 = document.querySelector('.scrolltab-nav').scrollTop
        this.scrollTop2 = document.querySelector('.scrolltab-content').scrollTop
        next()
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            document.querySelector('.scrolltab-nav').scrollTop = vm.scrollTop1
            document.querySelector('.scrolltab-content').scrollTop = vm.scrollTop2
        })
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/getindexcategory_v2",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.NavList = response.data.subCategory;
                this.checkedNavCategoryId = response.data.subCategory[0].CategoryId
                this.$axios({
                    method: "POST",
                    data: {
                        Parentid: this.checkedNavCategoryId
                    },
                    url: this.$server.serverUrl + "/index/getindexcategory_v2",
                    responseType: "json"
                }).then(response => {
                    console.log(response.data)
                    this.category = response.data.category
                    this.subCategory = response.data.subCategory
                    this.recommandProducts = response.data.recommandProducts
                })
            }
        })

        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/GetConfig",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.customerServiceUrl = response.data.data.customerServiceUrl;
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
    },
    methods: {
        ChangeNav(CategoryId, index) {
            this.checkedItem = index
            document.querySelector('.scrolltab-content').scrollTop = 0
            this.$axios({
                method: "POST",
                data: {
                    Parentid: CategoryId
                },
                url: this.$server.serverUrl + "/index/getindexcategory_v2",
                responseType: "json"
            }).then(response => {
                console.log(response.data)
                this.category = response.data.category
                this.subCategory = response.data.subCategory
                this.recommandProducts = response.data.recommandProducts
            })
        },
        goService() {
            window.location.href = this.customerServiceUrl
        },
        goSearch() {
            this.$router.push({path: "/SearchList"})
        },
        GoThreeList(i) {
            this.$router.push({ name: "menuThree", params: { Group_id: i } })
        },
        GoMore(RecommendType, CategoryId) {
            if(RecommendType > 0) {
                this.$router.push({ path: "/menuThree/0", query: { gg: RecommendType} })
            }else if(CategoryId > 0) {
                this.$router.push({path: "/menuThree/" + CategoryId})
            }
        },
        GoItemDes(i) {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: i }
            });
        },
    }
};
</script>

<style lang="scss">
    .productList {
        background: #fff;
        .productList-header {
            position: relative;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            border-bottom: 1px solid #f8f8f8;
            z-index: 2;
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
                font-size: 0.3rem;
                text-align: center;
                font-weight: bold;
                background: #eee;
                border-radius: 0.4rem;
                img {
                    width: 0.24rem;
                    vertical-align: middle;
                    margin-right: 0.1rem;
                    margin-top: -1px;
                }
                input {
                    border: none;
                    height: 0.6rem;
                    &::-webkit-input-placeholder {
                        color: #999;
                        font-size: 0.28rem;
                    }
                }
            }
        }
        .scrolltab {
            position: absolute;
            top: 1rem;
            left: 0;
            right: 0;
            bottom: 1rem;
            display: flex;
            padding-top: .2rem;
            background: #fff;
            .scrolltab-nav {
                height: 100%;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                border-right: 1px solid #f5f5f5;
                position: relative;
                z-index: 1;
                li {
                    height: 0.8rem;
                    // line-height: 0.8rem;
                    text-align: center;
                    width: 1.8rem;
                    font-size: 0.26rem;
                    color: #222;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    .cate-name {
                        width: 1.48rem;
                        margin: 0.16rem auto;
                        height: 0.46rem;
                        line-height: 0.52rem;
                    }
                }
                .active {
                    color: #E84325;
                    background: #fff;
                    .cate-name {
                        background: linear-gradient(to right, #F02B22, #FC2F5B);
                        color: #fff;
                        border-radius: 0.4rem;
                    }
                }
            }
            .scrolltab-content {
                height: 100%;
                background-color: #fff;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                flex: 1;
                position: relative;
                .top-img {
                    margin: 0 0.26rem 0.4rem;
                    width: 5.2rem;
                    height: 1.78rem;
                    img {
                        width: 100%;
                        height: 1.78rem;
                    }
                }
                >.title {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0.26rem;
                    font-size: #333;
                    font-weight: bold;
                    .more {
                        color: #FF1D26;
                        img {
                            width: 0.12rem;
                        }
                    }
                }
                .grids-group {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 0.26rem;
                    .grids-item {
                        display: flex;
                        flex-direction: column;
                        width: 33.3%;
                        height: 2.24rem;
                        .item-img {
                            width: 1rem;
                            height: 1rem;
                            overflow: hidden;
                            margin: 0.5rem auto 0;
                            img {
                                width: 1rem;
                            }
                        }
                        span {
                            text-align: center;
                            font-size: 0.28rem;
                            margin-top: 0.3rem;
                            color: #888888;
                        }
                    }
                }
                .waterfall {
                    padding: 0 0.26rem 0.26rem;
                    .title {
                        padding-bottom: 0.24rem;
                        border-bottom: 1px solid #EEEEEE;
                        display: flex;
                        justify-content: space-between;
                        font-size: #333;
                        font-weight: bold;
                        .more {
                            color: #FF1D26;
                            img {
                                width: 0.12rem;
                            }
                        }
                    }
                    .waterfall-item {
                        display: flex;
                        width: 100%;
                        padding: 0.3rem 0;
                        .waterfall-left {
                            width: 1.3rem;
                            margin-right: 0.2rem;
                            img {
                                width: 1.3rem;
                                display: block;
                            }
                        }
                        .waterfall-right {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .describe-title {
                                display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
                                text-overflow: ellipsis;
                                overflow: hidden;
                                color: #888888;
                                height: auto;
                                line-height: 0.4rem;
                                white-space: normal;
                                word-wrap: normal;
                                /*! autoprefixer: off */
                                -webkit-box-orient: vertical;
                                /* autoprefixer: on */
                                -webkit-line-clamp: 2; //这个属性不是css的规范属性，需要组合上面两个属性，表示显示的行数。
                            }
                            .describe-text {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                                .price {
                                    color: #FE0B1C;
                                    font-size: 0.3rem;
                                    font-weight: bold;
                                }
                                .num {
                                    color: #888888;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>