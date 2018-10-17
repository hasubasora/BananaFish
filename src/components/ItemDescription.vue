<template>
    <yd-layout class="ItemDescription">
        <yd-navbar slot="navbar" fixed color="#f2f2f2" bgcolor="rgba(0,0,0,0)" height='.8rem' class="ItemDescription_top">
            <router-link to="" @click.native='GoHistory' slot="left">
                <yd-navbar-back-icon color="#111"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-flexbox direction="vertical" class="swipe">
            <yd-flexbox-item>
                <mt-swipe :auto="4000">
                    <mt-swipe-item><img :src="GoodsList.ProductImg" alt=""></mt-swipe-item>
                    <mt-swipe-item><img :src="GoodsList.ProductImg" alt=""></mt-swipe-item>
                </mt-swipe>
                <div class="goodtitle">

                </div>
            </yd-flexbox-item>

            <div class="theTopGood">
                <yd-flexbox>
                    <div>
                        <span class="spans">头筹奖品</span>
                    </div>
                    <yd-flexbox-item>
                        <span class="spanstitle"> {{GoodsList.ProductTitle}}</span>
                    </yd-flexbox-item>
                </yd-flexbox>
                <yd-flexbox>
                    <yd-flexbox-item>
                        <span class="spansPrice">市场价:{{GoodsList.MarketPrice}} </span>
                    </yd-flexbox-item>
                    <yd-flexbox-item>
                        <span class="spanstitle"> {{OrangeGetUnTime(GoodsList.EndTotalSeconds)}}</span>
                    </yd-flexbox-item>
                </yd-flexbox>
            </div>

            <yd-flexbox-item class="generalGoods">
                <p>头筹商品(如下选购任选其中一可夺筹，多购多机会)</p>
                <yd-grids-group :rows="2">
                    <yd-grids-item v-for="(item,index) in GoodsList.LstProduct" :key="index" @click.native="GoToItem(item.ProductId)" href>
                        <span slot="text">
                            <yd-flexbox>
                                <div class="generalGoodsImg" style="width:1rem;"><img :src="item.ProductImg" alt="" width="50"></div>
                                <yd-flexbox-item>
                                    <p class="ProductTitle"> {{item.ProductTitle}}</p>
                                    <strong>￥{{item.SalePrice}}</strong>
                                    <yd-button size="large" type="danger">购买夺筹</yd-button>
                                </yd-flexbox-item>
                            </yd-flexbox>
                        </span>
                    </yd-grids-item>
                </yd-grids-group>
            </yd-flexbox-item>
            <div class="d_progress">
                <div class="d_progress_top">
                    <span>期号:{{GoodsList.GroupId}}</span>
                    <span>免费包邮</span>
                </div>
                <div class="d_progress_center">
                    <div class="d_prog">{{GoodsList.RemainNum+'/'+GoodsList.TotalNum}}</div>

                    <yd-progressbar type="line" class="progress" v-if="GoodsList" :progress='1-GoodsList.RemainNum/GoodsList.TotalNum' trail-width="4" trail-color="#FE5D51"></yd-progressbar>
                </div>
                <div class="d_progress_bom">
                    <span>总需{{GoodsList.TotalNum}}人次</span>
                    <span>剩余
                        <b class="c-red">{{GoodsList.RemainNum}}</b>次</span>
                </div>
            </div>

            <yd-flexbox-item>
                <!-- <p class="d_text">截止至<b class="c-red"></b> 08-05 10:37，若没有凑足<b class="c-red">{{GoodsList.TotalNum}}</b>  人次，系统会自动取 消订单并在24小时内退款。</p> -->
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-accordion>
                    <yd-accordion-item title="头筹商品详情">
                        <div style="width:100%">
                            <div v-html="GoodsHtml.ProductDesc"></div>
                        </div>
                    </yd-accordion-item>

                </yd-accordion>
            </yd-flexbox-item>

            <yd-flexbox-item>
                <p class="d_text">参与用户<span>&nbsp;本期于{{GoodsList.SId}}开始</span></p>
                <yd-flexbox v-for="(item, index) in LstOrder" :key="index" style="padding:.2rem;background:#fff;border-bottom:1px solid #f2f2f2">
                    <img :src="item.UserIcon" alt="" style="border-radius:500px;width:1rem;height:1rem;margin-right:.2rem">
                    <!-- <yd-flexbox-item>{{item.UserIcon}}</yd-flexbox-item> -->
                    <yd-flexbox-item>
                        <div>{{item.NickName}}</div>
                        <div>{{item.CreateTime}}</div>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>

        </yd-flexbox>

        <!-- <yd-button-group>
            <yd-button size="large" @click.native="handleClick" type="danger">立即购买</yd-button>
        </yd-button-group> -->

    </yd-layout>
</template>
<script>
import { GetUnTime } from "../main.js";

export default {
    data() {
        return {
            GoodsList: "",
            GoodsHtml: "",
            progress4: 1,
            show: false,
            LstOrder: []
        };
    },

    // watch: {
    //   // 如果路由有变化，会再次执行该方法
    //   $route: "handleClick"
    // },
    created() {
        this.$axios({
            method: "POST",
            data: {
                Groupid: this.$route.params.ItemGood_id
            },
            url: this.$server.serverUrl + "/index/getproductgroupdetail",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.GoodsList = response.data.object;
                this.LstOrder = response.data.object.LstOrder;
                console.log(this.GoodsList);
                 let eTime = setInterval(e => {
                        this.$set(
                            this.GoodsList,
                            "EndTotalSeconds",
                            this.GoodsList.EndTotalSeconds - 1
                        );
                        // console.log(this.GoodsList.EndTotalSeconds);
                }, 1000);
            }
        });
        this.$axios({
            method: "POST",
            data: {
                Groupid: this.$route.params.ItemGood_id
            },
            url: this.$server.serverUrl + "/index/getproductgroupdetaildesc",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.GoodsHtml = response.data.object;
                console.log(this.GoodsHtml);
            }
        });
    },
    methods: {
        OrangeGetUnTime(d) {
            return GetUnTime(d);
        },
        GoHistory(sid) {
            // console.log(sid);
            this.$router.go(-1);
        },
        GoToItem(id) {
            console.log(id);
            this.$router.push({
                name: "GeneralItemDescription",
                params: { Good_id: id }
            });
            return;
        },
        handleClick() {
            this.$axios({
                method: "POST",
                data: {
                    productid: this.$route.params.tid,
                    groupid: this.$route.params.ItemGood_id
                },
                url: this.$server.serverUrl + "/order/addshoppingcart",
                responseType: "json"
            }).then(response => {
                switch (response.data.success) {
                    case 200:
                        this.$dialog.toast({
                            mes: "加入购物车成功",
                            timeout: 1500,
                            icon: "success"
                        });
                        break;
                    case 400:
                        this.$router.push({ name: "SignIn", ReturnUrl: "" });
                        break;
                    default:
                        break;
                }
            });
        }
    }
};
</script>

<style lang="scss">
.ItemDescription {
    // margin-top: 1rem;
    .ItemDescription_top {
        &:after {
            border-bottom: none;
        }
    }
    .yd-scrollview {
        .swipe {
            .mint-swipe {
                height: 4rem;
                background: #ffffff;
                text-align: center;
                .mint-swipe-item {
                    > img {
                        height: 100%;
                        width: auto;
                    }
                }
            }
        }
    }
    .theTopGood {
        width: 100%;
        background: #ffffff;
        margin: 0.1rem 0;
        padding: 0.1rem;
        font-size: 0.26rem;
        color: #ff5f17;
        // overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        .spans {
            background: #ff5f17;
            line-height: 0.6rem;

            color: #ffffff;
            margin-right: 0.1rem;
            border-radius: 10px;
            padding: 0.05rem 0.2rem;
        }
        .spanstitle {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            width: 3.5rem;
            display: inline-block;
        }
        .spansPrice {
            display: inline-block;
        }
    }
    .generalGoods {
        .yd-grids-txt {
            text-align: left;
        }
        .yd-grids-2 {
            margin: 0.1rem;
        }
        .yd-btn-danger {
            background-color: #ff5f17;
            height: 0.4rem;
            border-radius: 5px;
            font-size: 0.26rem;
            width: 1.5rem;
            margin-left: 0.2rem;
        }
        .yd-grids-item:after {
            border-bottom: 0.1rem solid #f5f5f5;
        }
        .yd-grids-item:not(:nth-child(2n)):before {
            border-right: 0.1rem solid #f5f5f5;
        }
        > p {
            background: #ffffff;
            font-size: 0.26rem;
            text-align: center;
            margin: 0.1rem 0;
            padding: 0.1rem;
        }
        .generalGoodsImg {
            margin-right: 0.3rem;
        }
        .ProductTitle {
            overflow: hidden;
            width: 2rem;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
    .d_progress {
        background: #ffffff;
        padding: 0.2rem;
        width: 100%;
        height: 2rem;
        .d_progress_top {
            display: flex;
            justify-content: space-between;
            align-items: left;
            height: 0.5rem;
            font-size: 0.26rem;
        }
        .d_progress_bom {
            @extend .d_progress_top;
        }
        .d_progress_center {
            .progress {
                svg {
                    border-radius: 50px;
                }
            }
            position: relative;
            .d_prog {
                position: absolute;
                top: 0rem;
                left: 3.2rem;
                z-index: 2;
                color: #f5f5f5;
            }
        }
    }
    .d_text {
        margin-top: 0.1rem;
        background: #ffffff;
        padding: 0.2rem;
    }
    .yd-button {
        padding: 0;
        position: fixed;
        width: 100%;
        left: 0;
        bottom: 0;
        > button {
            background-color: #ff5f17;
            font-size: 0.26rem;
        }
    }
}
</style>

