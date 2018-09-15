<template>
    <div class="ShopGoodslist">
        <yd-navbar height='.8rem' color="#f2f2f2" bgcolor="#ff5f17" fixed>
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
            <yd-flexbox slot="center" style="border:1px solid #fff;">
                <yd-flexbox-item style="padding:.1rem .3rem;background:#fff;color:#555">普通订单</yd-flexbox-item>
                <yd-flexbox-item @click.native='GoTopGoodsList' style="padding:.1rem .3rem;color:#fff">头筹订单</yd-flexbox-item>
            </yd-flexbox>
        </yd-navbar>
        <yd-tab v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick" class="back">
            <yd-tab-panel v-for="item in items" :label="item.label" :key="item.id">
                <yd-preview :buttons="btns" v-for="itemt in item.content" :key="itemt.id" style="border-radius:5px;margin:.2rem">
                    <yd-preview-header @click.native="ToGeneralOrderDetails(itemt.OrderId)">
                        <div slot="left">订单编号:{{itemt.OrderId}}</div>
                        <div slot="right">{{itemt.OrderStatusStr}}</div>

                    </yd-preview-header>

                    <yd-preview-item v-for="GoodsInfo in itemt.LstProduct" :key="GoodsInfo.id">
                        <div slot="left">
                            <img class="ProductImgs" :src=" GoodsInfo.ProductImg" alt=""></div>
                        <div slot="right">
                            <yd-flexbox>
                                <yd-flexbox-item>
                                    <span class="IntegralProductTitle">{{GoodsInfo.ProductTitle}}</span>
                                    <p class="Integral">{{GoodsInfo.AttValueName}}&nbsp;</p>
                                    <p class="Integral">
                                        <span>积分奖励{{GoodsInfo.Integral}}分</span>
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
                        <div slot="right">共{{itemt.LstProduct.length}}件商品 合计¥{{itemt.OrderAmount}}+{{itemt.ExpressAmount}}(含运费￥{{itemt.ExpressAmount}})</div>
                    </yd-preview-item>
                    <yd-preview-item>
                        <div slot="left"></div>

                        <div slot="right">
                            <button class="orderBtn grayBtn" v-if="itemt.OrderStatus==2" type="button">物流信息</button>
                            <button class="orderBtn grayBtn" v-if="itemt.OrderStatus==0" type="button">取消订单</button>
                            <button class="orderBtn orangeBtn" v-if="itemt.OrderStatus==0" type="button">立即付款</button>
                            <button class="orderBtn orangeBtn" v-if="itemt.OrderStatus==3" type="button">评价</button>
                            <button class="orderBtn orangeBtn" v-if="itemt.OrderStatus==2" type="button">确认收货</button>
                        </div>
                    </yd-preview-item>
                </yd-preview>
            </yd-tab-panel>
        </yd-tab>
    </div>

</template>

<script>
export default {
    data() {
        return {
            tab2: 0,
            GoodsHtml: [],
            items: [
                { label: "全部", content: [] },
                { label: "待付款", content: [] },
                { label: "待发货", content: [] },
                { label: "已发货", content: [] },
                { label: "待评价", content: [] }
            ],
            btns: [
                // {
                //   text: "辅助操作",
                //   click: () => {
                //     alert("辅助操作");
                //   }
                // },
                // {
                //   color: "#F00",
                //   text: "跳转首页",
                //   link: { path: "/" }
                // }
            ]
        };
    },
    created() {
        let Qnum = this.$route.query.plan;
        this.GetGoodsList(Qnum);
        this.$dialog.loading.open("拼命加载中...>_<");
        setTimeout(params => {
            console.log(Qnum);
            this.items[Number(Qnum)].content = this.GoodsHtml;
            this.tab2 = Number(Qnum);
            this.$dialog.loading.close();
        }, 1000);
    },
    methods: {
        GoTopGoodsList() {
            this.$router.push({ name: "TopGoodsList", query: { plan: 0 } });
        },
        ToGeneralOrderDetails(id) {
            this.$router.push({
                name: "GeneralOrderDetails",
                query: { OrderId: id }
            });
        },
        GetGoodsList(sta) {
            console.log(sta != null);
            sta != null ? sta : (sta = 0);
            this.$axios({
                method: "POST",
                data: {
                    orderstatus: sta - 1, //0等待支付，1已付款，2已发货，3已完成，4已评价
                    pageindex: 1,
                    pagesize: 10
                },
                url: this.$server.serverUrl + "/account/getmyintegralorder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GoodsHtml = response.data.rows;

                    // console.log(sta);
                    // console.log(this.GoodsHtml);
                }
            });
        },

        fn(label, key) {
            console.log(label, key);
        },
        itemClick(key) {
            // console.log(key);
            // console.log("数据加载中");
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
.ShopGoodslist {
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
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: none;
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
}
</style>
