<template>
    <div>
        <yd-navbar title="购物精选" fixed style="z-index:2" height='.8rem' color="#f2f2f2" class="titleColor">
            <router-link to="/productList" slot="left">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </router-link>
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
                <yd-list theme="3" slot="list">
                    <yd-list-item v-for="(item, key) in rows" :key="key" @click.native="GoItemDes(item.Id)">
                        <img slot="img" :src="item.ProductImg">
                        <p slot="title" class="hideTwo">{{item.ProductTitle}}</p>
                        <yd-list-other slot="other">
                            <div>
                                <span class="demo-list-price">
                                    <em>¥</em>{{item.SalePrice}}</span>
                                <span class="demo-list-del-price">{{item.Integral}}积分</span>
                            </div>
                            <div>月销量{{item.SaleCount}}件</div>
                        </yd-list-other>
                    </yd-list-item>
                </yd-list>
                <!-- 商品列表 end-->
                <!-- 数据全部加载完毕显示 -->
                <span slot="doneTip">已经到底了(〃'▽'〃)~~</span>

                <!-- 加载中提示，不指定，将显示默认加载中图标 -->
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
    data() {
        return {
            tab2: 1,
            page: 2,
            pageSize: 10,
            items: [
                { CateName: "促销", content: " " },
                { CateName: "精选", content: " " }
            ],
            rows: [],
            Group_id: 0
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
        console.log(this.$route.params.Group_id);
        this.Group_id = this.$route.params.Group_id;
        localStorage.setItem("GoodsKey", this.$route.params.Group_id);
        this.getCategory();
        this.getCategoryProduct(this.$route.params.Group_id);
    },
    methods: {
        GoItemDes(i) {
            console.log(i);
            this.$router.push({
                name: "GeneralItemDescription",
                params: { Good_id: i }
            });
        },
        loadList() {
            console.log("id" + this.Group_id);

            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize,
                    categoryid: this.Group_id,
                    RecommendType: this.Group_id
                },
                url: this.$server.serverUrl + "/index/getcategoryproduct"
            }).then(response => {
                console.log(response.data.rows);
                const _list = response.data.rows;
                this.rows = [...this.rows, ..._list];
                if (_list.length < this.pageSize || this.page == 3) {
                    console.log("所有数据加载完毕");
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }
                console.log("单次请求数据完毕");

                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit(
                    "ydui.infinitescroll.finishLoad"
                );

                this.page++;
            });
        },
        fn(label, key) {
            console.log(label, key);
        },
        itemClick(key) {
            console.log(key);
            console.log(this.items[key]);
            console.log(this.items[key].CategoryId);
            localStorage.setItem("GoodsKey", this.items[key].CategoryId);
            this.Group_id = this.items[key].CategoryId;
            console.log(this.items[key].CategoryId);
            this.getCategoryProduct(this.items[key].CategoryId);

            this.$dialog.loading.open("数据加载中");
            setTimeout(() => {
                this.tab2 = key;
                this.$dialog.loading.close();
                this.items[key].content = this.rows;
            }, 1000);
        },
        getCategoryProduct(Group_id) {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: 1,
                    pagesize: 10,
                    categoryid: Group_id,
                    RecommendType: this.$route.query.gg?this.$route.query.gg:0
                },
                url: this.$server.serverUrl + "/index/getcategoryproduct",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.rows = response.data.rows;
                }
            });
        },

        getCategory() {
            this.$axios({
                method: "POST",
                data: {
                    categoryid: this.$route.params.Group_id
                },
                url: this.$server.serverUrl + "/index/getcategory",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.items = response.data.rows;
                    // console.log(this.items);
                    this.tab2 = 0;
                }
            });
        }
    }
};
</script>
<style lang="scss">
.hideTwo {
    display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
    text-overflow: ellipsis;
    overflow: hidden;
    // text-align: none;
    // height: 0.8rem;
    // line-height: 0.3rem;
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
    .yd-list-title {
        height: unset !important;
    }
}
</style>
