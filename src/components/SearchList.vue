<template>
    <div class="search">
        <yd-navbar fixed style="z-index:10" bgcolor='#f2f2f2'>
            <router-link to="/" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="" @click.native="SwitchAttr" slot="right">
                <yd-icon name="type"></yd-icon>
            </router-link>
        </yd-navbar>

        <div class="GroupSearch">
            <yd-search :result="result" fullpage v-model="value2" :item-click="itemClickHandler" :on-submit="submitHandler" class="searchInput"></yd-search>
            <keep-alive>
                <div class="GroupSearchGoods">
                    <span v-if="list.length==[]" style="text-align:center;display:block;margin-top:1rem;color:#ccc">—— 没有任何符合商品 ——</span>
                    <yd-list :theme=SwitchAttrNum>
                        <yd-list-item v-for="(item, key) in list" :key="key" @click.native="GoToGoodsDes(item.Id)">
                            <img slot="img" :src="item.ProductImg">
                            <span slot="title">{{item.ProductTitle}}</span>
                            <yd-list-other slot="other">
                                <div>
                                    <span class="demo-list-price">
                                        <em>¥</em>{{item.SalePrice}}</span>
                                    <!-- <span class="demo-list-del-price">¥{{item.w_price}}</span> -->
                                </div>
                                <div>
                                    <span class="demo-list-del-price">已售{{item.SaleCount}}件</span>
                                </div>
                            </yd-list-other>
                        </yd-list-item>
                    </yd-list>
                </div>
            </keep-alive>

        </div>

    </div>
</template>
<style lang="scss">
.GroupSearch {
    position: absolute;
    top: 0;
    left: 0;
    // border: 1px solid red;
    width: 100%;
    height: 100%;
}
.GroupSearchGoods {
    padding-top: 1rem;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    left: 0;
    -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
    overflow-y: scroll;
}
.searchInput {
    position: absolute;
    top: 0;
    width: 80%;
    z-index: 11;
    height: 1rem;
    left: 38px;
    .yd-search-input {
        &:before {
            border: none;
        }
        &:after {
            border: none;
        }
    }
    .yd-search-input {
        background: #f2f2f2;
    }
}
</style>

<script type="text/babel">
export default {
    data() {
        return {
            value2: "",
            result: [],
            SwitchAttrNum: 3,
            list: []
        };
    },
    created() {},
    methods: {
        SwitchAttr() {
            if (this.SwitchAttrNum > 4) {
                this.SwitchAttrNum = 1;
            } else {
                this.SwitchAttrNum++;
            }
            // console.log(this.SwitchAttrNum);
        },
        getResult(val) {
            if (!val) return [];
            return [
                "裙子",
                "茶叶",
                "汽车",
                "电气",
                "iPhone",
                "华为",
                "腰带",
                "女装",
                "秋裤",
                "娃娃",
                "手机",
                "笔记本",
                "电脑",
                "键盘",
                "鼠标",
                "猫粮"
            ].filter(value => new RegExp(val, "i").test(value));
        },
        itemClickHandler(item) {
            // this.$dialog.toast({ mes: `搜索 这是点击：${item}` });
            this.GetGoodsList(item);
        },
        submitHandler(value) {
            // this.$dialog.toast({ mes: `搜索 这是回车：${value}` });
            this.GetGoodsList(value);
        },
        GoToGoodsDes(id) {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: id }
            });
        },
        GetGoodsList(n) {
            this.$axios({
                method: "POST",
                data: {
                    pageindex: 1,
                    pagesize: 10,
                    categoryid: 0,
                    keyword: n
                },
                url: this.$server.serverUrl + "/index/getsearchproduct",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    console.log(res.data);
                    // this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.list = response.data.rows;
                    // console.log(response.data.rows);
                }
            });
        }
    },
    watch: {
        value2(val) {
            this.result = this.getResult(val);
        }
    }
};
</script>