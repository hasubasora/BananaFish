<template>
    <div class="search">
        <yd-navbar fixed style="z-index:10" bgcolor='#f2f2f2'>
            <router-link to="/productList" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
            <router-link to="" @click.native="SwitchAttr()" slot="right">
                <input class="searchBtn" type="submit" value="搜索">
            </router-link>
        </yd-navbar>

        <div class="GroupSearch">
            <yd-search :result="result" v-model="value2" :item-click="itemClickHandler" :on-submit="submitHandler" class="searchInput" cancel-text=""></yd-search>
            <keep-alive>
                <div class="GroupSearchGoods">
                    <span class="keyword" v-if="!derail" v-for="(item, index) in arr" :key="index" @click="SwitchAttr(item)">{{item}} </span>
                    <span v-if="list.length==[] && derail" style="text-align:center;display:block;margin-top:1rem;color:#ccc">—— 没有任何符合商品 ——</span>
                    <yd-list :theme="SwitchAttrNum" v-if="list.length!=[] && derail">
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
.searchBtn {
    border: none;
    border-radius: 0.2rem;
    padding: 0.1rem;
}
.GroupSearch {
    position: absolute;
    top: 0;
    left: 0;
    // border: 1px solid red;
    width: 100%;
    height: 100%;
    .yd-search-input {
        padding-bottom: 0;
    }
    .yd-search-input > .cancel-text {
        padding-right: 0;
        padding-left: 0;
    }
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
    .keyword {
        display: inline-block;
        margin-left: 0.2rem;
        margin-top: 0.4rem;
        height: 0.5rem;
        padding: 0.1rem 0.2rem;
        background: #eee;
        border-radius: 0.1rem;
    }
}
.searchInput {
    position: absolute;
    top: 0;
    width: 78%;
    z-index: 11;
    height: 0.9rem;
    left: 38px;
    padding-right: 0.2rem;
    .yd-search-input {
        padding-bottom: 0.1rem;
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
            list: [],
            arr: [],
            derail: false
        };
    },
    created() {
        if (window.localStorage.getItem("SEARCH_KEY")) {
            this.arr = JSON.parse(window.localStorage.getItem("SEARCH_KEY"));
        }
    },
    updated() {
        if (this.value2 == "") {
            this.derail = false;
        }
    },
    methods: {
        SwitchAttr(txt) {
            console.log(txt);
            if (txt) {
                this.value2 = txt;
                this.keywords(txt);
                this.GetGoodsList(txt);
            } else {
                if (this.value2 != "") {
                    this.keywords(this.value2);
                    this.GetGoodsList(this.value2);
                }
            }
            // window.localStorage.setItem("key",this.value2)
            // if (this.SwitchAttrNum > 4) {
            //     this.SwitchAttrNum = 1;
            // } else {
            //     this.SwitchAttrNum++;
            // }
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
        keywords(text) {
            let inp = [];
            let lastinp = [];
            lastinp = JSON.parse(localStorage.getItem("SEARCH_KEY"));
            inp.push(text);
            inp.push.apply(inp, lastinp);
            inp = Array.from(new Set(inp));
            if (inp.length > 10) {
                inp.pop();
            }
            window.localStorage.setItem("SEARCH_KEY", JSON.stringify(inp));
        },
        itemClickHandler(item) {
            // this.$dialog.toast({ mes: `搜索 这是点击：${item}` });
            this.GetGoodsList(item);
        },
        submitHandler(value) {
            this.keywords(value);
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
                if (response.data.success == 200) {
                    this.list = response.data.rows;
                    this.derail = true;
                    console.log(response.data.rows);
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
