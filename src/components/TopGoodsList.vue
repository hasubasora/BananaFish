<template>
    <div class="TopGoodsList">
        <yd-navbar height='.8rem' color="#f2f2f2" class="titleColor" fixed>
            <router-link to="/" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
            <yd-flexbox slot="center" style="border:1px solid #fff;">
                <yd-flexbox-item @click.native='GoShopGoodslist' style="padding:.1rem .3rem;color:#fff">普通订单</yd-flexbox-item>
                <yd-flexbox-item style="padding:.1rem .3rem;background:#fff;color:#555">头筹订单</yd-flexbox-item>
            </yd-flexbox>
        </yd-navbar>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-tab slot="list" v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick" class="back">
                <yd-tab-panel v-for="item in items" :label="item.label" :key="item.id">
                    <yd-preview :buttons="btns" v-for="itemt in item.content" :key="itemt.id" style="border-radius:5px;margin:.2rem">
                        <yd-preview-header @click.native="ToTheTopOrderDetails(itemt.OrderId)">
                            <div slot="left">订单编号:{{itemt.OrderId}}</div>
                            <div slot="right">{{GetUnTime(itemt.EndTotalSeconds)}}{{itemt.OrderStatusStr}}</div>
                        </yd-preview-header>
                        <yd-preview-header class="GroupProduct">
                            <div slot="left" class="GroupProduct_text">
                                <div class="Product_text">头筹奖品</div>
                                <span>期号:{{itemt.GroupProduct?itemt.GroupProduct.CurrentPeriod:""}}</span>
                            </div>
                            <div slot="left" style="text-align: center;">
                                <img :src="itemt.GroupProduct?itemt.GroupProduct.ProductImg:''" class="GoodsPic" alt="" width="100">
                                <p class="ProductTitle">
                                    {{itemt.GroupProduct?itemt.GroupProduct.ProductTitle:""}}
                                </p>
                                <span class="red">价值￥{{itemt.GroupProduct?itemt.GroupProduct.SalePrice:""}} </span>
                            </div>
                        </yd-preview-header>
                        <yd-preview-item>
                            <div slot="left" class="shoppingGoods">选购产品</div>
                            <div slot="right"></div>
                        </yd-preview-item>
                        <!-- 商品列表 -->
                        <yd-preview-item v-for="(GoodsInfo,itemIndex) in itemt.LstProduct" :key="itemIndex">
                            <div slot="left">
                                <img class="ProductImgs" :src="GoodsInfo.ProductImg" alt=""></div>
                            <div slot="right">
                                <yd-flexbox>
                                    <yd-flexbox-item @click.native="GoToGoodsDes(GoodsInfo.ProductId)">
                                        <span class="IntegralProductTitle">{{GoodsInfo.ProductTitle}}</span>
                                        <p class="Integral">{{GoodsInfo.AttValueName}}&nbsp;</p>
                                        <p class="Integral">
                                            <!-- <span>抽奖号码 {{itemt.LuckerNumber.split(",")[itemIndex+1]}}</span> -->
                                        </p>

                                    </yd-flexbox-item>
                                    <div class="GoodsInfo">
                                        <span>¥{{GoodsInfo.BuyPrice}}</span>
                                        <span>x{{GoodsInfo.BuyNumber}}</span>
                                    </div>
                                </yd-flexbox>

                            </div>
                        </yd-preview-item>

                        <yd-preview-item>
                            <div slot="left"></div>
                            <div slot="right">共{{itemt.LstProduct.length}}件商品 合计
                                <span class="c-red">¥{{itemt.OrderAmount+itemt.ExpressAmount}}</span> (含运费￥{{itemt.ExpressAmount}})</div>
                        </yd-preview-item>
                        <yd-preview-item>
                            <div slot="left"></div>

                            <div slot="right">
                                <button class="orderBtn grayBtn" @click="OrderLogistics(itemt.OrderId)" v-if="itemt.OrderStatus==2" type="button">物流信息</button>
                                <button class="orderBtn grayBtn" @click="closeOrder(itemt.OrderId)" v-if="itemt.OrderStatus==0" type="button">取消订单</button>
                                <button class="orderBtn orangeBtn" @click="ShowWindow(itemt.OrderId)" v-if="itemt.OrderStatus==0" type="button">立即付款</button>
                                <button class="orderBtn orangeBtn" @click="GoToComment(itemt.OrderId)" v-if="itemt.OrderStatus==3" type="button">评价</button>
                                <button class="orderBtn orangeBtn" @click="receivedmyorder(itemt.OrderId)" v-if="itemt.OrderStatus==2" type="button">确认收货</button>
                            </div>
                        </yd-preview-item>
                    </yd-preview>
                </yd-tab-panel>
            </yd-tab>
            <!-- 数据全部加载完毕显示 -->
            <span slot="doneTip">已经到底啦~♪(^∇^*)~</span>

            <!-- 加载中提示，不指定，将显示默认加载中图标 -->
            <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

        </yd-infinitescroll>
        <yd-popup v-model="show1" position="center" width="90%">
            <div style="background-color:#fff;padding:.1rem">
                <!-- 支付方式 -->
                <yd-cell-group title="支付方式">
                    <yd-cell-item type="radio" v-for="(PayListitem, index) in PayList" :key="index" @click.native="GetType(PayListitem.isBrowser)">
                        <span slot="left">{{PayListitem.payName}}</span>
                        <input slot="right" type="radio" :value=PayListitem.payType v-model="picked" />
                    </yd-cell-item>
                    <yd-button size="large" @click.native="OrderPaying">确定</yd-button>
                </yd-cell-group>
            </div>
        </yd-popup>
    </div>

</template>

<script>
import { GoBuySometing, GetUnTime } from "../main.js";

export default {
    data() {
        return {
            tab2: 0,
            GoodsHtml: [],
            show1: false,
            picked: "",
            PayList: [],
            OrderID: "",
            items: [
                { label: "全部", content: [] },
                { label: "待付款", content: [] },
                { label: "待开奖", content: [] },
                { label: "已开奖", content: [] }
                // { label: "待评价", content: [] }
            ],
            btns: [],
            GetTypePay: "",
            dota: 0,
            totalcount: 0,
            page: 1,
            pageSize: 4
        };
    },
    created() {
        let Qnum = this.$route.query.plan;
        this.GetGoodsList(Qnum);
        this.$dialog.loading.open("拼命加载中...>_<");
        setTimeout(params => {
            this.dota = Number(Qnum);
            this.tab2 = Number(Qnum);
            this.items[Number(Qnum)].content = this.GoodsHtml;
            this.$dialog.loading.close();
        }, 1000);

        this.$axios({
            method: "POST",
            data: {
                Client: 0
            },
            url: this.$server.serverUrl + "/Paying/GetPayType",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.PayList = response.data.list;
            }
        });
    },
    methods: {
        GetType(e) {
            this.GetTypePay = e;
        },
        GetUnTime(d) {
            if (d > 0) {
                return GetUnTime(d, 1);
            }
        },
        GoToComment(id) {
            this.$router.push({
                name: "Comment",
                query: { OrderId: id }
            });
        },
        GoToGoodsDes(id) {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: id }
            });
        },
        //显示选择框
        ShowWindow(oid) {
            this.show1 = true;
            this.OrderID = oid;
        },
        GoShopGoodslist() {
            this.$router.push({ name: "ShopGoodsList", query: { plan: 0 } });
        },
        ToTheTopOrderDetails(id) {
            this.$router.push({
                name: "TheTopOrderDetails",
                query: { OrderId: id }
            });
        },
        GetGoodsList(sta) {
            sta != null ? sta : (sta = 0);
            this.$axios({
                method: "POST",
                data: {
                    orderstatus : sta,
                    pageindex: this.page,
                    pagesize: this.pageSize
                },
                url: this.$server.serverUrl + "/account/getmygrouporder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GoodsHtml = response.data.rows;
                    // console.log("请求数据成功");
                    let eTime = setInterval(e => {
                        for (const iterator of this.GoodsHtml) {
                            // console.log(iterator.EndTotalSeconds);
                            this.$set(
                                iterator,
                                "EndTotalSeconds",
                                iterator.EndTotalSeconds - 1
                            );
                            // console.log(iterator.EndTotalSeconds);
                        }
                    }, 1000);

                    // console.log(this.GoodsHtml);
                }
            });
        },
        loadList() {
            console.log(this.dota);
            console.log("----------");
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize,
                    orderstatus: this.dota - 1
                },
                url: this.$server.serverUrl + "/account/getmygrouporder"
            }).then(response => {
                const _list = response.data.rows;

                this.GoodsHtml = [...this.GoodsHtml, ..._list];
                // this.items[this.dota - 1].content = this.GoodsHtml;
                // this.tab2 = Number(this.dota);
                // console.log(this.items);
                this.$set(
                    this.items[Number(this.dota)],
                    "content",
                    this.GoodsHtml
                );

                if (this.GoodsHtml.length > this.totalcount) {
                    // console.log("所有数据加载完毕");
                    /* 所有数据加载完毕 */
                    this.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }
                // console.log("单次请求数据完毕");

                /* 单次请求数据完毕 */
                this.$refs.infinitescrollDemo.$emit(
                    "ydui.infinitescroll.finishLoad"
                );

                this.page++;
            });
        },
        //关闭订单
        closeOrder(id) {
            this.$axios({
                method: "POST",
                data: {
                    orderId: id
                },
                url: this.$server.serverUrl + "/account/closemygrouporder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.$dialog.toast({
                        mes: "取消成功",
                        timeout: 1500,
                        icon: "success",
                        callback: () => {
                            this.GetGoodsList(0);
                            this.dota = 0;
                            setTimeout(e => {
                                this.items[Number(0)].content = this.GoodsHtml;
                                this.tab2 = Number(0);
                            }, 1000);
                        }
                    });
                }
            });
        },
        //订单支付
        OrderPaying(id) {
            if (!this.picked) {
                this.$dialog.toast({
                    mes: "请选择支付方式",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        // this.$router.push({ name: "SuccessOrder" });
                    }
                });
                return;
            }
            GoBuySometing(this.OrderID, "", this.picked, this.GetTypePay);

            // window.location.href =
            //     this.$server.serverUrl +
            //     "/Paying/GoPay?Client=0&GroupOrderIdList=" +
            //     this.OrderID +
            //     "&OrderIdList=&payType=" +
            //     this.picked;
        },
        //确认收货
        receivedmyorder(id) {
            this.$axios({
                method: "POST",
                data: {
                    orderId: id
                },
                url: this.$server.serverUrl + "/account/receivedmygrouporder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GetGoodsList(0);
                    this.dota = 0;
                    setTimeout(e => {
                        this.items[Number(0)].content = this.GoodsHtml;
                        this.tab2 = Number(0);
                    }, 1000);
                }
            });
        },
        OrderLogistics(oid) {
            this.$router.push({
                name: "OrderLogistics",
                query: { Good_id: oid }
            });
            // this.$axios({
            //     method: "POST",
            //     data: {
            //         orderId: id,
            //         type: 1
            //     },
            //     url: this.$server.serverUrl + "/UserCenter/OrderLogistics",
            //     responseType: "json"
            // }).then(response => {
            //     if (response.data.success == 400) {
            //         this.$router.push({ name: "SignIn" });
            //     }
            //     if (response.data.success == 200) {
            //         console.log(response.data);
            //     }
            // });
        },

        fn(label, key) {
            // console.log(label, key);
        },
        itemClick(key) {
            // console.log(key);
            // console.log("数据加载中");
            this.page = 1;
            this.dota = key;
            this.GetGoodsList(key);
            this.$dialog.loading.open("数据加载中");
            setTimeout(() => {
                this.tab2 = key;
                this.$dialog.loading.close();
                this.items[key].content = this.GoodsHtml;
                //   "新内容【key:" + key + "】新内容_" + new Date().getTime();
            }, 1000);
        }
    }
};
</script>

<style lang="scss">
.TopGoodsList {
    margin-top: 0.8rem;
    .ProductImgs {
        width: 1.6rem;
    }
    .GoodsInfo {
        width: 1.2rem;
        > span {
            display: block;
            &:nth-child(1) {
                color: #ea3f32;
            }
            &:nth-child(2) {
                height: 1.2rem;
            }
        }
    }
    .IntegralProductTitle {
        height: 0.8rem;
        color: #111;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: none;
        text-align: left;
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
    }
    .Integral {
        text-align: left;
        margin-left: 0.2rem;
        > span {
            background: #ffe1df;
            color: #ea3f32;
            padding: 0.02rem 0.1rem;
            font-size: 0.2rem;
        }
    }
    .back {
        .yd-tab-panel {
            background: none;
        }
        .yd-preview {
            &:before {
                border: none;
            }
            &:after {
                border: none;
            }
        }
    }
    .orderBtn {
        height: 0.5rem;
        width: 1.4rem;
        border: none;
        border-radius: 5px;
        outline: none;
    }
    .orangeBtn {
        color: #fff;
        background: linear-gradient(
            -90deg,
            rgba(234, 63, 50, 1),
            rgba(237, 121, 71, 1)
        );
    }
    .grayBtn {
        background: #fff;
        border: 1px solid;
        color: #555;
    }
    .GroupProduct {
        height: 3.5rem;
        > img {
            width: 2rem;
        }
        .ProductTitle {
            font-size: 0.24rem;
            white-space: normal;
            word-wrap: normal;
            text-overflow: ellipsis;
            overflow: hidden;
        }
        .red {
            color: #ea3f32;
        }
        .GroupProduct_text {
            position: absolute;
            top: 0;
            left: 0;
            .Product_text {
                background: linear-gradient(
                    -90deg,
                    rgba(234, 63, 50, 1),
                    rgba(237, 121, 71, 1)
                );
                border-bottom-right-radius: 50px;
                border-top-right-radius: 50px;
                padding: 0 0.2rem;
                width: 1.5rem;
                color: #fff;
            }
        }
    }
    .shoppingGoods {
        background: linear-gradient(
            -90deg,
            rgba(64, 64, 64, 1),
            rgba(141, 141, 141, 1)
        );
        border-bottom-right-radius: 50px;
        border-top-right-radius: 50px;
        padding: 0 0.3rem;
        color: #fff;
    }
    .GoodsPic {
        width: 2.3rem;
    }
}
</style>
