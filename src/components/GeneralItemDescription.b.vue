<template>
    <yd-layout class="GeneralItemDescription">
        <yd-navbar slot="navbar" height='.8rem' fixed>
            <router-link to="" @click.native="GoHistory" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

            <yd-flexbox slot="center" style="border:1px solid #A0A0A0;border-radius:5px">
                <yd-flexbox-item style="padding:.1rem .2rem;background:#A0A0A0;color:#fff">商品</yd-flexbox-item>
                <yd-flexbox-item @click.native='GoDecs' style="padding:.1rem .2rem">详情</yd-flexbox-item>
            </yd-flexbox>

        </yd-navbar>

        <yd-flexbox direction="vertical" class="swipe">
            <div style="width:100%;">
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in GoodsList.ProductImg" :key="item.id"><img :src="item.ImgUrl" alt=""></mt-swipe-item>
                </mt-swipe>
                <div class="goodtitle">

                </div>
            </div>

            <div class="theTopGoodA">
                <yd-flexbox class="theTopGood">
                    <div class="ProductTitle">
                        <strong>{{GoodsList.ProductTitle}}</strong>
                    </div>
                </yd-flexbox>
                <yd-flexbox class=" theTopGood ">
                    <yd-flexbox-item>
                        <p class="oranges">￥{{GoodsList.SalePrice}}
                            <span class="t_MarketPrice">市场价￥{{GoodsList.MarketPrice}}</span>
                        </p>
                    </yd-flexbox-item>

                    <yd-flexbox-item>
                        <p class="Integral">可获得积分：{{GoodsList.Integral}}</p>
                    </yd-flexbox-item>
                </yd-flexbox>
            </div>
            <!-- ==== -->
            <div class="wocaonima">
                <yd-accordion>
                    <yd-accordion-item title="商品详情" open>
                        
                        <div class="GoodsHtml" v-html="GoodsHtml.ProductDesc"></div>
                    </yd-accordion-item>
                </yd-accordion>
                <yd-accordion>
                    <yd-accordion-item title="宝贝评价" @click.native="GetCommentList(GoodsList.Id)" open>
                        <div style="width:100%" class="comment">
                            <yd-flexbox direction="vertical" v-for="items in GoodsList.LstComment" :key="items.id">
                                <yd-flexbox-item class="UserInfo">
                                    <img class="UserIcon" :src="items.UserIcon" alt="">
                                    <!-- <img class="UserIcon" src="../assets/Img/bkc.jpg" alt=""> -->
                                    <span class="NickName">{{ items.NickName }}</span>
                                </yd-flexbox-item>
                                <yd-flexbox-item class="CreateTime"> {{ items.CreateTime }}</yd-flexbox-item>
                                <yd-flexbox-item class="Comment"> {{ items.Comment }}</yd-flexbox-item>

                                <yd-flexbox-item>
                                    <yd-lightbox class="ImgShow">
                                        <yd-lightbox-img v-for="itemst in items.ImgShow" :key="itemst.id" :src="itemst.AttachPath"></yd-lightbox-img>
                                    </yd-lightbox>
                                </yd-flexbox-item>

                            </yd-flexbox>
                        </div>
                    </yd-accordion-item>

                </yd-accordion>
            </div>
            <!-- ==== -->
        </yd-flexbox>

        <keep-alive>
            <yd-tabbar fixed active-color="#ccc" class="yd-nav-button" fontsize=".26rem">

                <div class='iconfont_s'>
                    <yd-tabbar-item title="首页" link="/" active>
                        <yd-icon name="home" slot="icon" size="0.4rem" class="marginTop02"></yd-icon>
                    </yd-tabbar-item>
                    <yd-tabbar-item title="客服" link="/" active>
                        <!-- <span slot="icon" class="marginTop02 iconfont icon-icon2" style="font-size:.4rem"></span> -->
                        <span slot="icon" class="marginTop02 iconfont icon-54" style="font-size:.5rem; color:#ccc"></span>
                    </yd-tabbar-item>
                    <yd-tabbar-item title="购物车" link="/cart" active>
                        <yd-icon name="shopcart" slot="icon" size="0.4rem" class="marginTop02"></yd-icon>
                        <yd-badge slot="badge" type="danger">{{storeText?storeText:this.productNum}}</yd-badge>
                    </yd-tabbar-item>

                </div>

                <div class="yd-nav-right-button">
                    <button class="handleClick rightbtn" v-if="GoodsList.IsAllowAddCart" @click="addCart(GoodsList.Id,1)" type="button">加入购物车</button>
                </div>
                <div class="yd-nav-right-button">
                    <button class="handleClick leftbtn leftColor" @click="addCart(GoodsList.Id,2)" type="button">立即购买</button>
                </div>
            </yd-tabbar>
        </keep-alive>

        <yd-popup v-model="show" position="bottom" height="60%">
            <div>
                <yd-flexbox>
                    <div>
                        <img class="GoodsImg" width="100" :src="GoodsImg" alt="">
                    </div>
                        <yd-flexbox-item>
                            <p class="oranges">￥
                                <span>{{price}}</span>
                            </p>
                            <div>
                                <span>库存{{Stock}}件</span>
                            </div>
                            <p>已选："{{GoodAttrs}}"</p>
                        </yd-flexbox-item>
                </yd-flexbox>
            </div>
            <div class="GoodSuk">
                <div class="gotup" v-if="Gotup">
                    <h3>{{Gotup.AttName}}</h3>
                    <div class="gotupTab">
                        <span @click="TouchSku(itemt.AttValueId,Gotup.LstAttValue,110,itemt.AttValue,selectSKU[index])" :class="{isOrange:itemt.isTrue,'pointerEvents':elementSkuAttr[index]}" v-for="(itemt, index) in Gotup.LstAttValue" :key="index">
                            {{itemt.AttValue}}
                        </span>

                    </div>
                </div>
                <div class="gotup" v-if="GotupAttr">
                    <h3>{{GotupAttr.AttName}}</h3>
                    <div class="gotupTab">
                        <span @click="TouchSku(itemt.AttValueId,GotupAttr.LstAttValue,100,itemt.AttValue,selectSKU[index])" :class="{isOrange:itemt.isTrue,'pointerEvents':elementAttrSku[index]}" v-for="(itemt, index) in GotupAttr.LstAttValue" :key="index">
                            {{itemt.AttValue}}
                        </span>
                    </div>
                </div>
                <div class="gotup">
                    <yd-spinner :longpress="false" v-model="spinner"></yd-spinner>
                </div>
            </div>
            <yd-button type="warning" class="SetButton" size="large" style="margin-top: 30px;" @click.native="addCart(GoodsList.Id)">确定</yd-button>
        </yd-popup>
    </yd-layout>
</template>
<script>
import { getNum } from "../main.js";
export default {
    data() {
        return {
            productNum: 0,
            GoodsList: [],
            GoodsHtml: "",
            show: false,
            Gotup: [],
            GotupAttr: [],
            GotupLen: 0,
            selectSKU: [],
            GotupAttrSku: [],
            elementAttrSku: [],
            elementSkuAttr: [],
            GoodAttrs: [],
            GotupLength: 0,
            GoodsImg: "",
            buyName: "",
            buyID: "", //商品ID
            spinner: 0, //购买数量
            price: 0,
            Stock: 0 //存库
        };
    },
    created() {
        // console.log(location);
        sessionStorage.setItem("s", this.$route.params.Good_id);
        localStorage.setItem("s", this.$route.params.Good_id);
        // console.log(this.$route.params.Good_id);
        // 商品信息
        this.GetProductDetail();
        // 商品详情
        this.GetProductDetailDesc();
        //购物车数量
        this.GetShoppingCartNum();
    },
    computed: {
        storeText() {
            return this.$store.state.counts;
        }
    },
    methods: {
        GetShoppingCartNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getshoppingcartnum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.productNum = response.data.object.productNum;
                    // console.log(this.productNum);
                }
            });
        },
        GetCommentList(oid) {
            this.$router.push({
                name: "TheEvaluationList",
                params: { Good_id: oid }
            });
        },
        GoDecs() {
            this.$router.push({
                name: "Description",
                params: { ItemGood_id: this.$route.params.Good_id }
            });
        },
        GoHistory(sid) {
            this.$router.go(-1);
        },

        TouchSku(ValueId, element, vid, buyName, buyID) {
            if (this.GotupLength > 1) {
                // console.log("有多个属性");
            }
            switch (vid) {
                case 110:
                    if (this.GoodAttrs.length < 1) {
                        // console.log("还没添加1");
                        this.GoodAttrs.push(buyName);
                    } else {
                        this.GoodAttrs.splice(0, 1, buyName);
                    }
                    break;
                case 100:
                    // console.log("还没添加=" + this.GoodAttrs.length);
                    if (this.GoodAttrs.length < 1) {
                        this.GoodAttrs.push("");
                    }
                    if (this.GoodAttrs.length < 2) {
                        // console.log("还没添加2");
                        this.GoodAttrs.push(buyName);
                    } else {
                        this.GoodAttrs.splice(1, 1, buyName);
                    }
                    break;
                default:
                    break;
            }

            if (buyID) {
                // console.log("buyID:" + buyID);
                this.buyID = buyID.AttIds;
                this.Stock = buyID.Stock;
                this.price = buyID.SalePrice;
            }
            for (const [keys, elementSkus] of element.entries()) {
                if (ValueId == elementSkus.AttValueId) {
                    //点击的ID 和 JSON里面一样的 改变属性
                    this.$set(elementSkus, "isTrue", !elementSkus.isTrue);
                    //*************************判断第一个属性 有没有 第二属性*******************
                    if (vid == 110 && elementSkus.isTrue) {
                        this.elementAttrSku = [];
                        this.selectSKU = elementSkus.SKU;
                        for (const iteratorSku of elementSkus.SKU) {
                            this.buyID = iteratorSku.AttIds;
                            this.Stock = iteratorSku.Stock;
                            this.price = iteratorSku.SalePrice;
                            // console.log(this.buyID);
                            // console.log(this.Stock);
                            // console.log(this.price);

                            if (iteratorSku.Stock > 0) {
                                // console.log(iteratorSku.Stock);
                                this.elementAttrSku.push(false);
                            } else {
                                this.elementAttrSku.push(true);
                            }
                        }
                    } else if (vid == 110) {
                        this.elementAttrSku = []; //清空xy选择
                    }

                    //*************************判断第二个属性 有没有 第一个属性*******************
                    if (vid == 100 && elementSkus.isTrue) {
                        this.elementSkuAttr = [];
                        this.selectSKU = elementSkus.SKU;
                        for (const iteratorSku of elementSkus.SKU) {
                            if (iteratorSku.Stock > 0) {
                                // console.log(iteratorSku.Stock);
                                this.elementSkuAttr.push(false);
                            } else {
                                this.elementSkuAttr.push(true);
                            }
                        }
                    } else if (vid == 100) {
                        this.elementSkuAttr = []; //清空xy选择
                    }
                } else {
                    this.$set(elementSkus, "isTrue", false);
                }
            }
        },
        //用的是这个
        addCart(i, key) {
            // console.log(i);
            // console.log(key);
            // console.log(this.buyID);
            // console.log(this.spinner);
            // console.log(this.$route.params.Good_id);

            if (this.Gotup && !this.show) {
                this.show = true;
                this.key = key;
                return;
            }

            if (this.GoodAttrs.length == this.GotupLength) {
                console.log("长度一样");
            } else {
                this.$dialog.toast({
                    mes: "请选择商品属性",
                    timeout: 1500,
                    icon: "error"
                });
                return;
            }
            switch (this.key || key) {
                case 1:
                    //添加购物车
                    this.$axios({
                        method: "POST",
                        data: {
                            productid: this.$route.params.Good_id,
                            attids: this.buyID,
                            buynum: this.spinner
                        },
                        url: this.$server.serverUrl + "/order/addshoppingcart",
                        responseType: "json"
                    }).then(response => {
                        // this.GetMyId(response.data.success)
                        switch (response.data.success) {
                            case 200:
                                this.show = false;
                                this.$dialog.toast({
                                    mes: "加入购物车成功",
                                    timeout: 1500,
                                    icon: "success"
                                });
                                getNum();
                                break;
                            case 400:
                                this.$router.push({
                                    name: "SignIn",
                                    ReturnUrl: ""
                                });
                                break;
                            case 500:
                                this.$dialog.toast({
                                    mes: response.data.msg,
                                    timeout: 1500
                                });
                            default:
                                break;
                        }
                    });
                    break;
                case 2:
                    //立即购买
                    this.$axios({
                        method: "POST",
                        data: {
                            productid: this.$route.params.Good_id,
                            attids: this.buyID,
                            buynum: this.spinner
                        },
                        url: this.$server.serverUrl + "/order/buyitnow",
                        responseType: "json"
                    }).then(response => {
                        // this.GetMyId(response.data.success)
                        switch (response.data.success) {
                            case 200:
                                this.$router.push({ name: "cartOrder" });
                                break;
                            case 400:
                                this.$router.push({
                                    name: "SignIn",
                                    ReturnUrl: ""
                                });
                                break;
                            case 500:
                                this.$dialog.toast({
                                    mes: response.data.msg,
                                    timeout: 1500
                                });
                            default:
                                break;
                        }
                    });
                    break;
                default:
                    break;
            }
        },
        GetProductDetail() {
            this.$axios({
                method: "POST",
                data: {
                    productid: this.$route.params.Good_id
                        ? this.$route.params.Good_id
                        : localStorage.getItem("s")
                },
                url: this.$server.serverUrl + "/index/getproductdetail",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GoodsList = response.data.object; //整个
                    this.GotupLength = this.GoodsList.LstAtt.length;
                    this.Gotup = this.GoodsList.LstAtt[0];
                    this.GotupAttr = this.GoodsList.LstAtt[1];
                    this.GotupLen = this.GoodsList.LstAtt.length;
                    console.info(this.Gotup);
                    console.info(this.GotupAttr);
                    if (this.Gotup) {
                        for (const [
                            keys,
                            elementSkus
                        ] of this.Gotup.LstAttValue.entries()) {
                            // console.log(keys);
                            // console.log(elementSkus);
                            this.$set(elementSkus, "isTrue", false);
                        }
                    }
                    if (this.GotupAttr) {
                        for (const [
                            keys,
                            elementSkus
                        ] of this.GotupAttr.LstAttValue.entries()) {
                            // console.log(keys);
                            // console.log(elementSkus);
                            this.$set(elementSkus, "isTrue", false);
                        }
                    }

                    this.GoodsList.LstSKU.forEach((element, index) => {
                        this.Stock += element.Stock;
                        this.price = element.SalePrice;
                    });
                    this.GoodsImg = this.GoodsList.ProductImg[0].ImgUrl;
                }
            });
        },
        GetProductDetailDesc() {
            this.$axios({
                method: "POST",
                data: {
                    productid: this.$route.params.Good_id
                },
                url: this.$server.serverUrl + "/index/getproductdetaildesc",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GoodsHtml = response.data.object;
                    // console.log(this.GoodsHtml);
                }
            });
        }
    }
};
</script>

<style lang="scss">
.GoodsHtml {
    > p {
        > img {
            width: 100%;
        }
    }
}
.GeneralItemDescription {
    margin-top: 0.8rem !important;
    .SetButton {
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .theTopGoodA {
        width: 100%;
    }
    .iconfont_s {
        display: flex;
        // width: 2.8rem;
        > a {
            width: 1rem;
            text-align: center;
            height: 0.8rem;
            // line-height: 0.7rem;
            flex: 1;
            // padding: 0.1rem;
        }
    }
    .iconfont {
        display: inline;
        font-size: 0.6rem;
        color: #666;
    }
    .yd-scrollview {
        .swipe {
            margin-bottom: 6rem;
            .mint-swipe {
                height: 6rem;
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
        &:nth-child(1) {
            padding-bottom: 0;
        }
        &:nth-child(2) {
            border-bottom: 1px solid #f2f2f2;
        }
        background: #ffffff;
        // margin: 0.1rem 0;
        padding: 0.26rem;
        font-size: 0.2rem;
        .ProductTitle {
            padding-right: 0.2rem;
            font-size: 0.3rem;
        }

        .Integral {
            font-size: 0.2rem;
            color: #ccc;
            text-align: right;
        }

        .MarketPrice {
            display: flex;
            justify-content: space-between;
            > span {
                color: #ff5f17;
                font-size: 0.5rem;
            }
            > i {
                color: #ccc;
                font-size: 0.2rem;
            }
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
            font-size: 0.3rem;
            text-align: center;
            margin: 0.1rem 0;
            padding: 0.1rem;
        }
        .generalGoodsImg {
            margin-right: 0.3rem;
        }
    }
    .d_progress {
        background: #ffffff;
        padding: 0.2rem;
        .d_progress_top {
            display: flex;
            justify-content: space-between;
            align-items: left;
            font-size: 0.3rem;
        }
        .d_progress_bom {
            @extend .d_progress_top;
        }
        .d_progress_center {
            position: relative;
            .d_prog {
                position: absolute;
                // top: 0.26rem;
                left: 3.2rem;
                z-index: 2;
            }
        }
    }
    .d_text {
        margin-top: 0.1rem;
        background: #ffffff;
        padding: 0.2rem;
    }

    .obacity {
        opacity: 0;
    }
    // 用户评价区
    .comment {
        padding: 0.5rem;
        .yd-flexbox-vertical {
            border-bottom: #ccc 1px solid;
            margin: 0.5rem 0;
        }
        .UserInfo {
            .UserIcon {
                height: 1rem;
                width: 1rem;
                vertical-align: middle;
                border-radius: 50%;
            }
            .NickName {
                font-size: 0.3rem;
                margin-left: 0.3rem;
            }
        }
        .CreateTime {
            padding: 0.1rem;
            color: #888;
            font-size: 0.2rem;
        }
        .Comment {
            padding: 0.1rem;
            font-size: 0.3rem;
        }
        .ImgShow {
            width: 1rem;
            display: flex;
            margin-bottom: 0.5rem;
            > img {
                margin: 0.05rem;
                width: 100%;
                height: 100%;
            }
        }
    }
}
.GoodSuk {
    padding: 0.2rem 0.2rem 1rem;

    .gotup {
        border-bottom: 1px solid #dedcdc;
        padding: 0.2rem 0;
        font-size: 0.36rem;
        .gotupTab {
            font-size: 0.25rem;
            display: flex;
            flex-wrap: wrap;
            .isOrange {
                background: #ff5f17;
                border: 1px solid #ff5f17;
                color: #f2f2f2;
            }
            > span {
                border: 1px solid #dedcdc;
                padding: 0.05rem 0.2rem;
                border-radius: 5px;
                background: #dedcdc;
                margin: 0.2rem;
                cursor: pointer;
            }
            .pointerEvents {
                pointer-events: none;
                border: 1px dotted rgb(190, 190, 190);
                background: #dedcdc;
                color: rgb(190, 190, 190);
            }
        }
    }
}
.oranges {
    // background-color: #ff9717;
    color: #ff4d17;
    font-size: 0.4rem;
    .t_MarketPrice {
        text-align: center;
        font-size: 0.26rem;
        color: #888;
    }
}
.GoodsImg {
    border: 1px solid #ccc;
    margin: 0.36rem;
    width: 2rem;
    height: 2rem;
    display: block;
}
.yd-nav-button {
    background: #ffffff;
    border-top: 1px solid #ccc;
    padding: 0;
    z-index: 99;
    position: fixed;
    width: 100%;
    display: flex;
    left: 0;
    bottom: 0;
    .handleClick {
        // border-radius: 3rem;
        background-color: #ff5f17;
        font-size: 0.3rem;
        border: none;
        // margin: 0.1rem;
        outline: none;
        height: 0.8rem;
        width: 2.3rem;
        color: #ffffff;
    }
    // .rightbtn {
    //     border-top-right-radius: 50px;
    //     border-bottom-right-radius: 50px;
    // }
    // .leftbtn {
    //     border-top-left-radius: 50px;
    //     border-bottom-left-radius: 50px;
    // }
    .leftColor {
        background-color: #ffa617;
    }
    .yd-tabbar {
        padding: 0;
    }
    .marginTop02 {
        margin-top: 0.2rem;
    }
}
</style>

