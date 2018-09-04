<template>
    <div>
        <yd-navbar title="购物精选" style="z-index:2" height='.8rem' color="#f2f2f2" bgcolor="#ff5f17">
            <router-link to="/productList" slot="left">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </router-link>
            <router-link to="#" slot="right">
            </router-link>
        </yd-navbar>

        <yd-tab horizontal-scroll v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
            <yd-tab-panel v-for="item in items" :label="item.CateName" :key="item.CateName">
                <!-- 商品列表 -->
                <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
                    <yd-list theme="3" slot="list">
                        <yd-list-item v-for="(item, key) in rows" :key="key" @click.native="GoItemDes(item.Id)">
                            <img slot="img" :src="item.ProductImg">
                            <span slot="title">{{item.ProductTitle}}</span>
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
                    <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

                    <!-- 加载中提示，不指定，将显示默认加载中图标 -->
                    <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

                </yd-infinitescroll>
            </yd-tab-panel>
        </yd-tab>
    </div>
</template>
<script>
import Vue from 'vue';
import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
/* 使用px：import {InfiniteScroll} from 'vue-ydui/dist/lib.px/infinitescroll'; */

Vue.component(InfiniteScroll.name, InfiniteScroll);
export default {
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
            Group_id: 0
        };
    },
    created() {
        console.log(this.$route.params.Group_id);
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
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize,
                    categoryid: this.Group_id
                },
                url: this.$server.serverUrl + "/index/getcategoryproduct"
            }).then(response => {
                console.log(response.data.rows);
                const _list = response.data.rows;
                this.rows = [...this.rows, ..._list];
                if (_list.length < this.pageSize || this.page == 3) {
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    console.log(this.$refs.infinitescrollDemo);

                    return;
                }
                console.log(this.$refs.infinitescrollDemo);

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
                    categoryid: Group_id
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
.demo-list-price {
    font-size: 0.4rem;
    color: #555;
}
</style>
