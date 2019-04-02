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
                <yd-badge class="badge" type="danger">{{MessageNum}}</yd-badge>
            </router-link>
        </yd-flexbox>
        <div class="scrolltab">
            <ul class="scrolltab-nav">
                <li
                    v-for="(NavItem, index) in NavList"
                    :key="index" @click="ChangeNav(NavItem.CategoryId, index)"
                    :class="{active: checkedItem === index}"
                >
                    <span>{{NavItem.CateName}}</span>
                </li>
            </ul>
            <div class="scrolltab-content">
                <div class="top-img">
                    <img :src="category.AdPicture">
                </div>
                <div class="title">
                    <span>{{category.CateName}}</span>
                    <span @click="GoMore(category.RecommendType, category.CategoryId)">更多</span>
                </div>
                <div class="grids-group">
                    <div class="grids-item" v-for="(subCategoryItem,index) in subCategory" :key="index" @click="GoThreeList(subCategoryItem.CategoryId)">
                        <div class="item-img">
                            <img :src="subCategoryItem.CateIcon">
                        </div>
                        <span>{{subCategoryItem.CateName}}</span>
                    </div>
                </div>
                <div class="waterfall">
                    <div class="waterfall-item" v-for="(recommandProductsItem, index) in recommandProducts" :key="index" @click="GoItemDes(recommandProductsItem.Id)">
                        <div class="waterfall-left">
                            <img :src="recommandProductsItem.ProductImg">
                        </div>
                        <div class="waterfall-right">
                            <div class="describe-title">{{recommandProductsItem.ProductTitle}}</div>
                            <div class="describe-text">
                                <span class="price">￥ {{recommandProductsItem.SalePrice}}</span>
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
    // @import '../stylesheet/main.scss';
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
                background-color: #f5f5f5;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                position: relative;
                z-index: 1;
                li {
                    padding: 0px 0.1rem 0 0;
                    height: 0.8rem;
                    line-height: 0.8rem;
                    text-align: center;
                    width: 2rem;
                    font-size: .3rem;
                    color: #666;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    span {
                        padding-left: 0.2rem;
                    }
                }
                .active {
                    color: #E84325;
                    background: #fff;
                    span {
                        position: relative;
                        &:before {
                            content: "";
                            width: 0.1rem;
                            height: 0.1rem;
                            background: #E84325;
                            border-radius: 50%; 
                            position: absolute;
                            top: 50%;
                            left: -0.04rem;
                            margin-top: -0.05rem;
                        }
                    }
                }
            }
            .scrolltab-content {
                height: 100%;
                background-color: #fff;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                flex: 1;
                padding: 0 .24rem;
                position: relative;
                .top-img {
                    width: 5.02rem;
                    height: 1.72rem;
                    background: #eee;
                    img {
                        width: 5.02rem;
                        height: 1.72rem;
                    }
                }
                .title {
                    display: flex;
                    justify-content: space-between;
                    padding: 0 0.1rem;
                    margin-top: 0.4rem;
                    font-size: 0.3rem;
                    font-weight: bold;
                }
                .grids-group {
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 0.6rem;
                    .grids-item {
                        display: flex;
                        flex-direction: column;
                        width: 33.3%;
                        margin-top: 0.3rem;
                        // margin: 0.3rem auto 0;
                        .item-img {
                            width: 1.4rem;
                            height: 1.4rem;
                            border: 1px solid #eee;
                            border-radius: 50%;
                            overflow: hidden;
                            margin: 0 auto;
                            img {
                                width: 1.4rem;
                            }
                        }
                        span {
                            text-align: center;
                            font-size: 0.28rem;
                            margin-top: 0.1rem;
                        }
                    }
                }
                .waterfall {
                    .waterfall-item {
                        display: flex;
                        width: 100%;
                        margin-bottom: 0.3rem;
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
                                // font-weight: bold;
                                display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
                                text-overflow: ellipsis;
                                overflow: hidden;
                                height: auto;
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
                                .price {
                                    color: #FE0B1C;
                                    font-size: 0.26rem;
                                    font-weight: bold;
                                }
                                .num {
                                    color: #888888;
                                    font-size: 0.26rem;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>