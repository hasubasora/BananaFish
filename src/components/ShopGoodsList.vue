<template>
    <div class="ShopGoodslist" :class="{noScroll: orderSwipe}">
        <yd-navbar height='.8rem' color="#f2f2f2" class="titleColor" title="订单列表" fixed>
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
            <yd-tab slot="list" v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick" class="back">
                <yd-tab-panel v-for="item in items" :label="item.label" :key="item.id">

                    <yd-preview :buttons="btns" v-for="itemt in item.content" :key="itemt.id" style="border-radius:5px;margin:.2rem">
                        <yd-preview-header  @click.native="ToGeneralOrderDetails(itemt.OrderId, itemt.OrderType)">
                            <div slot="left"><span class="identification" v-if="itemt.OrderType === 3">双拼</span>订单编号:{{itemt.OrderId}}</div>
                            <div slot="right" class="OrderStatusStr" :class="{red:itemt.OrderType === 3}">{{itemt.OrderStatusStr}}</div>
                        </yd-preview-header>

                        <yd-preview-item v-for="GoodsInfo in itemt.LstProduct" :key="GoodsInfo.id" @click.native="ToGeneralOrderDetails(itemt.OrderId, itemt.OrderType)">
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
                            <div slot="left" v-if="itemt.TowGroup && itemt.TowGroup.list.length">
                                <div  class="preview-left" v-if="itemt.TowGroup.list.length == 1">
                                    <div class="preview-img">
                                        <img v-for="(TowGroupItem, index) in itemt.TowGroup.list" :key="index" :src="TowGroupItem.UserIcon" alt="">
                                        <img src="../assets/Img/question-icon.png" alt="">
                                    </div>
                                    <span>拼团中</span>
                                </div>
                                <div class="preview-left" v-else>
                                    <div class="preview-img" v-for="(TowGroupItem, index) in itemt.TowGroup.list" :key="index">
                                        <img :src="TowGroupItem.UserIcon">
                                        <img class="hg" v-if="TowGroupItem.WinStatus === 1" src="../assets/Img/hg.png" alt="">
                                    </div>
                                    <span>拼团成功</span>
                                </div>
                            </div>
                            <div slot="left" v-else></div>
                            <div slot="right" class="preview-right"><span v-if="itemt.OrderType !== 3">共{{itemt.LstProduct.length}}件商品</span> 合计¥{{itemt.OrderAmount}}(含运费￥{{itemt.ExpressAmount}})</div>
                        </yd-preview-item>
                        <yd-preview-item>
                            <div slot="left"></div>

                            <div slot="right">
                                <!-- <button class="orderBtn grayBtn" v-if="itemt.OrderStatus==5" @click="OrderLogistics(itemt.OrderId)" type="button">物流信息</button> -->
                                <!-- <button class="orderBtn grayBtn" v-if="itemt.OrderStatus==2" @click="SalesReturnApplyFor(itemt.OrderId)" type="button">申请退货</button> -->
                                <button class="orderBtn grayBtn" v-if="itemt.OrderStatus==2" @click="OrderLogistics(itemt.OrderId)" type="button">物流信息</button>
                                <button class="orderBtn grayBtn" @click="closeOrder(itemt.OrderId)" v-if="itemt.OrderStatus==0" type="button">取消订单</button>
                                <button class="orderBtn orangeBtn" @click="ShowWindow(itemt.OrderId, itemt.OrderType)" v-if="itemt.OrderStatus==0" type="button">立即付款</button>
                                <button class="orderBtn orangeBtn" @click="GoComment(itemt.OrderId,new Date())" v-if="itemt.OrderStatus==3" type="button">评价</button>
                                <button class="orderBtn orangeBtn" @click="receivedmyorder(itemt.OrderId)" v-if="itemt.OrderStatus==2" type="button">确认收货</button>
                                <!-- <router-link to='"/SalesReturnApplyFor"+itemt.OrderId'>退货退款</router-link> -->
                                <!-- <button class="orderBtn orangeBtn" v-if="itemt.OrderStatus==7" type="button">申请售后</button> -->
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
                        <input slot="right" type="radio" :value="PayListitem.payType" v-model="picked" />
                    </yd-cell-item>
                    <yd-button size="large" @click.native="OrderPaying">确定</yd-button>
                </yd-cell-group>
            </div>
        </yd-popup>

        <div class="orderSwipe" v-show="orderSwipe">
            <div class="orderContent">
                <yd-slider class="ydSlider">
                    <yd-slider-item v-for="(item, index) in OrderList" :key="index">
                        <div class="ItemDetails">
                            <div class="ItemTop">
                                <div class="ItemImg">
                                    <img :src="item.lsOrderItem[0].ProductImg" alt="">
                                </div>
                                <p>{{item.lsOrderItem[0].ProductTitle}}</p>
                            </div>
                            <p class="ItemBot">
                                快递公司：{{item.FShipmentName}}
                            </p>
                            <p class="ItemBot">
                                快递单号：{{item.FShipmentNumber}}
                            </p>
                        </div>
                        <div class="LogisticsDetails">
                            <yd-timeline v-if="item.data.length > 0">
                                <yd-timeline-item v-for="(oitem, oindex) in item.data" :key="oindex">
                                    <p>{{oitem.context}}</p>
                                    <p style="margin-top: 10px;">{{oitem.ftime}}</p>
                                </yd-timeline-item>
                            </yd-timeline>
                            <div v-else class="prompt">
                                暂时还没有物流信息
                            </div>
                        </div>
                    </yd-slider-item>
                </yd-slider>
            </div>
            <div class="closeBtn" @click="closeSwipe">
                <img src="../assets/Img/close.png" alt="">
            </div>
        </div>
    </div>

</template>

<script>
import { GoBuySometing, SalesReturnApplyFor, LOGIN_SUCCESS } from "../main.js";
export default {
    inject: ['reload'],
    data() {
        return {
            tab2: 0,
            show1: false,
            picked: "",
            PayList: [],
            OrderID: "",
            OrderType: 0,
            GoodsHtml: [],
            items: [
                { label: "全部", content: [] },
                { label: "待付款", content: [] },
                { label: "待发货", content: [] },
                { label: "待收货", content: [] },
                { label: "待评价", content: [] },
                { label: "售后", content: [] }
            ],
            btns: [],
            GetTypePay: "",
            page: 1,
            pageSize: 4,
            dota: 0,
            totalcount: 0,
            OrderList: [],
            orderSwipe: false,
            tabKey: ""
        };
    },
    created() {
        let Qnum = this.$route.query.plan;
        if (Qnum == 5) {
            this.GetGoodsList(8);
            this.dota = 8;
        } else {
            this.GetGoodsList(Qnum);
            this.dota = Qnum;
        }
        this.$dialog.loading.open("拼命加载中...>_<");
        setTimeout(params => {
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
            LOGIN_SUCCESS(response.data)
            if (response.data.success == 200) {
                this.PayList = response.data.list;
            }
        });  
    },
    methods: {
        GetType(e) {
            this.GetTypePay = e;
        },
        OrderLogistics(oid) {
            this.$axios({
                method: "POST",
                data: {
                    ordertype: 0,
                    orderid: oid
                },
                url: this.$server.serverUrl + "/order/GetExpressDelivery",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data)
                    this.OrderList = response.data.rows;
                }
            });
            var mo = function(e) {
                e.preventDefault()
            }
            document.body.style.overflow = 'hidden'
            document.body.style.height = '100%'
            this.orderSwipe = true
        },
        closeSwipe() {
            var mo=function(e){e.preventDefault()};
            document.body.style.overflow='';//出现滚动条
            this.orderSwipe = false
        },
        GoToGoodsDes(id, OrderType) {
            if(OrderType == 0) {
                this.$router.push({
                    name: "GeneralItemDescription",
                    query: { Good_id: id }
                })
            }else if(OrderType == 3) {
                this.$router.push({
                    name: "FreeDetail",
                    query: { Good_id: id }
                });
            }
        },
        //显示选择框
        ShowWindow(oid, OrderType) {
            this.show1 = true;
            this.OrderID = oid;
            this.OrderType = OrderType
        },
        GoComment(a, b) {
            this.$router.push({ name: "Comment", query: { plan: a, t: b } });
        },
        GoTopGoodsList() {
            this.$router.push({ name: "TopGoodsList", query: { plan: 0 } });
        },
        ToGeneralOrderDetails(id, OrderType) {
            if(OrderType === 3) {
                this.$router.push({
                    name: "LuckyOrderDetail",
                    query: { 
                        OrderId: id
                    }
                });
            }else {
                this.$router.push({
                    name: "GeneralOrderDetails",
                    query: { 
                        OrderId: id 
                    }
                });
            }
        },
        //关闭订单
        closeOrder(id) {
            this.$dialog.confirm({
                mes: "你确定取消该订单吗？",
                opts: () => {
                    this.$axios({
                        method: "POST",
                        data: {
                            orderId: id
                        },
                        url: this.$server.serverUrl + "/account/closemyorder",
                        responseType: "json"
                    }).then(response => {
                        if (response.data.success == 200) {
                            this.GetGoodsList(0);
                            setTimeout(e => {
                                this.items[Number(0)].content = this.GoodsHtml;
                                this.tab2 = Number(0);
                            }, 1000);
                        }
                    });
                }
            })
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
            if (this.OrderType == 3) {
                GoBuySometing("", this.OrderID, this.picked, this.GetTypePay, "LuckyDouble", this.OrderID);
            }else {
                GoBuySometing("", this.OrderID, this.picked, this.GetTypePay);
                this.reload()
            }
            // window.location.href =
            //     this.$server.serverUrl +
            //     "/Paying/GoPay?Client=0&GroupOrderIdList=&OrderIdList=" +
            //     this.OrderID +
            //     "&payType=" +
            //     this.picked;
        },
        //确认收货
        receivedmyorder(id) {
            this.$axios({
                method: "POST",
                data: {
                    orderId: id
                },
                url: this.$server.serverUrl + "/account/receivedmyorder",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.$dialog.toast({
                        mes: "确认成功",
                        timeout: 1500,
                        icon: "success"
                    });
                    this.GetGoodsList(0);
                    this.dota = 0;
                    setTimeout(e => {
                        this.items[Number(0)].content = this.GoodsHtml;
                        this.tab2 = Number(0);
                    }, 1500);
                }
            });
        },
        GetGoodsList(sta) {
            console.log(sta)
            sta != null ? sta : (sta = 0);
            //判断售后数据
            if (sta == 5) {
                sta = 8;
            }
            console.log(sta)
            this.$axios({
                method: "POST",
                data: {
                    orderstatus: sta - 1, //0等待支付，1已付款，2已发货，3已完成，4已评价
                    pageindex: this.page,
                    pagesize: this.pageSize
                },
                url: this.$server.serverUrl + "/account/getmyintegralorder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.GoodsHtml = response.data.rows;
                    this.totalcount = response.data.totalcount;
                } else {
                    this.$dialog.loading.close();
                }
            });
        },
        loadList() {
            this.page++;
            this.$axios({
                method: "POST",
                data: {
                    pageindex: this.page,
                    pagesize: this.pageSize,
                    orderstatus: this.dota - 1
                },
                url: this.$server.serverUrl + "/account/getmyintegralorder"
            }).then(response => {
                const _list = response.data.rows;

                this.GoodsHtml = [...this.GoodsHtml, ..._list];
                // this.items[this.dota - 1].content = this.GoodsHtml;
                // this.tab2 = Number(this.dota);
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

                
            });
        },
        fn(label, key) {
            // console.log(label, key);
        },
        itemClick(key) {
            this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.reInit');
            console.log("数据加载中");
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
        color: #111;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        text-align: none;
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
    }
    .Integral {
        text-align: left;
        // margin-left: 0.2rem;
        > span {
            background: #ffe1df;
            color: #ea3f32;
            padding: 0.02rem 0.1rem;
            font-size: 0.2rem;
        }
    }
    .back {
        // background: #f5f5f5;
        .yd-tab-panel {
            background: none;
        }
        .yd-preview-header{
            padding-right: 0;
            margin-right: 0.24rem;
            &:after {
            border-bottom: 1px solid #eee;
            }
        }
        .yd-preview {
            &:before {
                border: none;
            }
            &:after {
                border: none;
            }
        }
        .red {
            color: red;
        }
        .identification {
            display: inline-block;
            background: #FB2D56;
            color: #fff;
            border-radius: 0.2rem;
            padding: 0 0.1rem;
            margin-right: 0.1rem;
        }
        .OrderStatusStr {
            font-size: 0.26rem;
        }
        .preview-left {
            display: flex;
            align-items: center;
            color: #F02B22;
            .preview-img {
                position: relative;
                img {
                    width: 0.46rem;
                    margin-right: 0.1rem;
                    border-radius: 50%;
                }
                .hg {
                    position: absolute;
                    width: 0.3rem;
                    height: 0.3rem;
                    top: -0.1rem;
                    left: -0.1rem;
                }
            }
        }
        .preview-right {
            height: 0.46rem;
            line-height: 0.46rem;
        }
    }
    .orderBtn {
        height: 0.56rem;
        width: 1.74rem;
        border: none;
        border-radius: 0.4rem;
        outline: none;
        font-size: 0.24rem;
    }
    .orangeBtn {
        color: #fff;
        background: linear-gradient(to right, #F02B22, #FC2D59);
    }
    .grayBtn {
        background: #fff;
        border: 1px solid #888;
        color: #888;
    }
    .orderSwipe {
        position: fixed;
        top: -0.8rem;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        background: rgba($color: #000000, $alpha: 0.5);
        .orderContent {
            margin: 20% 5% 10%;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            .ydSlider {
                border-radius: 10px;
                .ItemDetails {
                    background: #f05145;
                    padding: 0.2rem;
                    color: #fff;
                    .ItemTop {
                        display: flex;
                        align-items: center;
                        .ItemImg {
                            border-radius: 0.5rem;
                            width: 1rem;
                            height: 1rem;
                            overflow: hidden;
                            margin-right: 0.2rem;
                            img {
                                width: 1rem;
                                height: 1rem;
                            }
                        }
                        p {
                            flex: 1
                        }
                    }
                    .ItemBot {
                        margin-top: 0.1rem;
                    }   
                }
                .LogisticsDetails {
                    height: 6rem;
                    overflow-y: auto;
                    -webkit-overflow-scrolling: touch;
                    .prompt {
                        text-align: center;
                        margin-top: 1rem;
                    }
                }
            }
        }
        .closeBtn {
            text-align: center;
            img {
                width: 0.8rem;
            }
        }
    }
}
</style>
