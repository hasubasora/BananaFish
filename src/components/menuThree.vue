<template>
    <div>
        <yd-navbar title="购物精选" fixed style="z-index:2" height='.8rem' color="#f2f2f2" class="titleColor">
            <div @click="goBack" slot="left">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </div>
            <router-link to="#" slot="right">
            </router-link>
        </yd-navbar>
        <div class="menu">
            <yd-backtop></yd-backtop>
            <yd-tab class="ydTabNav" horizontal-scroll v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
                <yd-tab-panel v-for="item in items" :label="item.CateName" :key="item.CateName">
                </yd-tab-panel>
            </yd-tab>

            <!-- 商品列表 -->
            <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                <!-- <yd-list theme="3" slot="list">
                    <yd-list-item v-for="(item, key) in rows" :key="key" @click.native="GoItemDes(item.Id)">
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
                </yd-list> -->
                <div theme="3" slot="list" class="list">
                    <div class="list-item" v-for="(item, key) in rows" :key="key" @click="GoItemDes(item.Id)">
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
                </div>
                <span slot="doneTip">已经到底了(〃'▽'〃)~~</span>
                <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

            </yd-infinitescroll>
        </div>
    </div>
</template>
<script>
import Vue from "vue";
import { InfiniteScroll } from "vue-ydui/dist/lib.rem/infinitescroll";
/* 使用px：import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll'; */

Vue.component(InfiniteScroll.name, InfiniteScroll);
export default {
    inject: ['reload'],
    data() {
        return {
            tab2: 1,
            page: 1,
            pageSize: 10,
            items: [
                { CateName: "促销", content: " " },
                { CateName: "精选", content: " " }
            ],
            rows: [],
            Group_id: 0,
            RecommendType: this.$route.query.gg,
            isModal: false,
            modalText: {},
            totalcount: Number
        };
    },
    mounted() {
        let _w = parseInt(
            document.getElementsByClassName("yd-tab-nav")[0].style.width
        );

        console.log(
            (document.getElementsByClassName("yd-tab-nav")[0].style.width = 110)
        );
    },
    created() {
        console.log(this.$route.params.Group_id, this.$route.query);
        this.Group_id = this.$route.params.Group_id;
        localStorage.setItem("GoodsKey", this.$route.params.Group_id);
        this.getCategory();
        this.getCategoryProduct(this.$route.params.Group_id, this.$route.query.gg);
        console.log(this.$route.query, this.$route.params);
    },
    methods: {
        goBack() {
            if (window.history.length <= 1) {
                this.$router.push({path:'/'})
            } else {
                this.$router.go(-1)
            }
        },
        GoItemDes(i) {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: i }
            });
        },
        loadList() {
            this.page++;
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize,
                    categoryid: this.Group_id,
                    RecommendType: this.RecommendType,
                    SupplierId: this.$route.params.SupplierId
                },
                url: this.$server.serverUrl + "/index/getcategoryproduct"
            }).then(response => {
                console.log(response.data.rows);
                const _list = response.data.rows;
                this.rows = [...this.rows, ..._list];
                if (_list.length < this.pageSize) {
                    // console.log("所有数据加载完毕");
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                }
                // console.log("单次请求数据完毕", this.tab2);
                
                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit(
                    "ydui.infinitescroll.finishLoad"
                );

            });
        },
        fn(label, key) {
            console.log(label, key);
        },
        itemClick(key) {
            // 切换选项卡时初始化滚动加载
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            // console.log(key);
            // console.log(this.items[key]);
            // console.log(this.items[key].CategoryId);
            localStorage.setItem("GoodsKey", this.items[key].CategoryId);
            this.Group_id = this.items[key].CategoryId;
            this.RecommendType = this.items[key].RecommendType
            // console.log("---------------------------------");
            // console.log(this.items[key].CategoryId);
            // console.log(this.items[key].RecommendType);
            this.page = 1
            this.getCategoryProduct(
                this.items[key].CategoryId,
                this.items[key].RecommendType
            );
            this.tab2 = key;
            this.items[key].content = this.rows;
        },
        getCategoryProduct(Group_id, gType) {
            let _RecommendType = 0;
            if (gType != 0) {
                _RecommendType = gType;
            } else {
                _RecommendType = this.$route.query.gg;
            } 
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize,
                    categoryid: Group_id,
                    RecommendType: _RecommendType,
                    SupplierId: this.$route.params.SupplierId
                },
                url: this.$server.serverUrl + "/index/getcategoryproduct",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data)
                    this.rows = response.data.rows;
                    this.totalcount = response.data.totalcount
                }
            });
        },

        getCategory() {
            console.log(this.$route.query.gg)
            this.$axios({
                method: "POST",
                data: {
                    categoryid: this.$route.params.Group_id,
                    RecommendType: this.$route.query.gg ? this.$route.query.gg : 0,
                    SupplierId: this.$route.params.SupplierId
                },
                url: this.$server.serverUrl + "/index/getcategory",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.items = response.data.rows;
                    this.tab2 = 0;
                }
            });
        },
    }
};
</script>
<style lang="scss">
.hideTwo {
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
.demo-list-price {
    display: block;
    font-size: 0.3rem;
    color: rgb(238, 97, 32);
    font-weight: 600;
}
.menu {
    margin-top: 0.8rem;
    .yd-tab {
        padding-bottom: 1px;
    }
    .yd-tab-nav:after {
        border-bottom: none;
    }
    .list {
            overflow: hidden;
            // position: relative;
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
.yd-list-theme3 .yd-list-item .yd-list-title {
    overflow: visible;
    margin-bottom: 0.1rem;
}
</style>
