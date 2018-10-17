<template>
    <div class="www">
        <yd-navbar slot="navbar" height='.8rem' fixed>
            <router-link to="" @click.native="GoHistory" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

            <yd-flexbox slot="center" style="border:1px solid #A0A0A0;border-radius:5px">
                <yd-flexbox-item :class="['flexboxNav',{'flexbox':!flexNav}]">商品</yd-flexbox-item>
                <yd-flexbox-item :class="['flexboxNav',{'flexbox':flexNav}]">详情</yd-flexbox-item>

            </yd-flexbox>

        </yd-navbar>

        <div class="swipe" ref="GroupGood">
            <yd-scrollnav height='.6rem' :callback='NavCallback'>
                <yd-scrollnav-panel :label="item.label" v-for="(item, key) in list" :key="key">
                    <!-- 内容 -->
                    <div class="GroupSwipe" v-if="key==0">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="item in GoodsList.ProductImg" :key="item.id">
                                <yd-lightbox>
                                    <yd-lightbox-img :src="item.ImgUrl" style="width:100%"></yd-lightbox-img>
                                </yd-lightbox>
                            </mt-swipe-item>
                        </mt-swipe>
                        <p class="goodtitle">
                            {{GoodsList.ProductTitle}}
                        </p>
                        <div class="theTopGood">
                            <p class="c-red t_Price">￥{{GoodsList.SalePrice}}
                                <span class="t_MarketPrice">市场价￥{{GoodsList.MarketPrice}}</span>
                            </p>
                            <div class="Integral">可获得积分：{{GoodsList.Integral}}
                                <div>已销售：{{GoodsList.SaleCount}}</div>
                                <!-- <div>存库：{{GoodsList.ProductStock}}</div> -->
                            </div>
                        </div>
                        <!-- <yd-cell-group style="border-top:.2rem solid #f2f2f2">
                            <yd-cell-item arrow>
                                <span slot="left">
                                    <i class="gray">规格&nbsp;</i>
                                </span>
                                <span slot="left">选择 颜色分类</span>
                            </yd-cell-item>
                            <yd-cell-item arrow>
                                <span slot="left">
                                    <i class="gray">参数&nbsp;</i>
                                </span>
                                <span slot="left">品牌 颜色分类...</span>
                            </yd-cell-item>
                        </yd-cell-group> -->
                    </div>
                    <p v-if="key>0" class="gray" style="text-align:center;padding:.2rem 0">———— {{item.label}} ————</p>

                    <!-- 详细 -->

                    <div v-if="key==1" class="GoodsHtml" v-html="GoodsHtml.ProductDesc"></div>
                    <yd-backtop></yd-backtop>
                    <!-- 详细 -->

                    <!-- 评价 -->
                    <yd-cell-group v-if="key==2">
                        <yd-cell-item arrow @click.native="GetCommentList(GoodsList.Id)">
                            <span slot="left">
                                <i>宝贝评价(0)</i>
                            </span>
                            <span slot="right">
                                查看全部
                            </span>
                        </yd-cell-item>
                        <div v-for="items in GoodsList.LstComment" :key="items.id">
                            <div class="CommentList">
                                <div class="UserInfo">
                                    <img class="UserIcon" :src="items.UserIcon" alt="">
                                    <!-- <img class="UserIcon" src="../assets/Img/bkc.jpg" alt=""> -->
                                    <div class="UserInfoText">
                                        <span class="NickName">{{ items.NickName }}</span>
                                        <span class="NickName">规格</span>
                                    </div>
                                </div>
                                <div class="CreateTime">{{ items.CreateTime }}</div>
                                <div class="Comment">
                                    {{ items.Comment }}
                                </div>
                                <yd-lightbox class="ImgShow">
                                    <yd-lightbox-img v-for="itemst in items.ImgShow" :key="itemst.id" :src="itemst.AttachPath"></yd-lightbox-img>
                                </yd-lightbox>

                            </div>
                        </div>
                    </yd-cell-group>
                    <!-- 评价 -->

                </yd-scrollnav-panel>
            </yd-scrollnav>
        </div>
        <!-- 底部导航 -->
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
        <!-- 底部导航 -->

        <yd-popup v-model="show" position="bottom" height="60%" class="Popup">
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
                <yd-flexbox-item>
                    <yd-spinner :longpress="false" v-model="spinner"></yd-spinner>
                </yd-flexbox-item>

            </yd-flexbox>
            <div class="GoodSuk">
                <div class="gotup" v-if="Gotup">
                    <h3>{{Gotup.AttName}}</h3>
                    <div class="gotupTab">
                        <span @click="TouchSku(itemt.AttValueId,Gotup.LstAttValue,110,itemt.AttValue,selectSKUTwo[index],index)" :class="{isOrange:itemt.isTrue,'pointerEvents':elementSkuAttr[index]}" v-for="(itemt, index) in Gotup.LstAttValue" :key="index">
                            {{itemt.AttValue}}
                        </span>

                    </div>
                </div>
                <div class="gotup" v-if="GotupAttr">
                    <h3>{{GotupAttr.AttName}}</h3>
                    <div class="gotupTab">
                        <span @click="TouchSku(itemt.AttValueId,GotupAttr.LstAttValue,100,itemt.AttValue,selectSKUOne[index],index)" :class="{isOrange:itemt.isTrue,'pointerEvents':elementAttrSku[index]}" v-for="(itemt, index) in GotupAttr.LstAttValue" :key="index">
                            {{itemt.AttValue}}
                        </span>
                    </div>
                </div>
                <!-- <div class="gotup">
                   
                </div> -->
            </div>
            <yd-button type="warning" class="SetButton" size="large" @click.native="addCart(GoodsList.Id)">确定</yd-button>
        </yd-popup>

    </div>
</template>
<style lang="scss">
.www {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // border: 1px solid red;
    .flexboxNav {
        padding: 0.1rem 0.2rem;
    }
    .flexbox {
        padding: 0.1rem 0.2rem;
        background: #a0a0a0;
        color: #fff;
    }
    .swipe {
        position: relative;
        top: 0.75rem;
        left: 0;
        width: 100%;
        height: 90%;
        -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
        overflow-y: scroll;
        // border: 1px solid blue;
        background: #f2f2f2;
        padding: 0.7rem 0 1rem;
        .GroupSwipe {
            width: 100%;
            // height: 5rem;
            background: #ffffff;
            // margin-bottom: 6rem;
            .mint-swipe {
                height: 7.5rem;
                background: #ffffff;
                text-align: center;
                .mint-swipe-item {
                    border: 1xp solid;
                    img {
                        height: 100%;
                        width: auto;
                    }
                }
            }
            .goodtitle {
                padding: 0.2rem;
                font-size: 0.3rem;
                font-weight: 600;
            }
            .theTopGood {
                display: flex;
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
                    align-self: right;
                    font-size: 0.2rem;
                    color: #ccc;
                    align-self: flex-end;
                    flex: 1;
                    text-align: right;
                }
                .t_Price {
                    font-size: 0.3rem;
                    font-weight: 600;
                    flex: 1;
                    align-self: flex-start;
                }
                .t_MarketPrice {
                    display: flex;
                    justify-content: space-between;
                    color: #ccc;
                    font-size: 0.2rem;
                    font-weight: 500;
                    text-decoration: line-through;
                }
            }
        }
        .CommentList {
            width: 100%;
            height: auto;
            .UserInfo {
                display: flex;
                padding: 0.2rem 0.5rem;
                .UserInfoText {
                    display: flex;
                    flex-direction: column;
                    padding: 0.1rem 0.3rem;
                    font-size: 0.26rem;
                }
                img {
                    width: 1.2rem;
                    height: 1.2rem;
                    border-radius: 50px;
                }
            }
            .CreateTime {
                padding: 0 0.5rem;
                color: #888;
                font-size: 0.2rem;
            }
            .Comment {
                padding: 0.1rem 0.5rem 0.3rem;
                color: #555;
                font-size: 0.26rem;
            }
            .ImgShow {
                width: 1rem;
                display: flex;
                margin-bottom: 0.5rem;
                img {
                    margin: 0.05rem;
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
    .Popup {
        .yd-popup-content {
        }
        .SetButton {
            position: absolute;
            bottom: 0;
            left: 0;
            z-index: 19980321;
        }
    }
    .yd-scrollnav {
        .yd-scrollnav-tab {
            // position: absolute;
            z-index: 999;
            width: 2.5rem;
            top: 0.1rem;
            left: 2.2rem;
            // opacity: 0;
            // top: -0.6rem;
            .yd-scrollnav-toggle {
                display: none;
            }
            .yd-scrollnav-tab-item {
                display: flex;
                margin-left: 0.5rem;
                overflow: hidden;
                li {
                    flex: 1;
                }
            }
        }
    }
    .GoodsHtml {
        > img {
            width: 100%;
        }
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
        .yd-nav-right-button {
            width: 100%;
        }
        .handleClick {
            // border-radius: 3rem;
            background-color: #ff5f17;
            font-size: 0.3rem;
            border: none;
            // margin: 0.1rem;
            outline: none;
            height: 0.8rem;
            width: 100%;
            // width: 2.3rem;
            color: #ffffff;
        }

        .leftColor {
            background-color: #ffa617;
        }
        .yd-tabbar {
            padding: 0;
        }
        .marginTop02 {
            margin-top: 0.2rem;
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
    }

    .GoodSuk {
        padding: 0.2rem 0.2rem;
        height: 4rem;
        // border: 1px solid;
        overflow-y: auto;
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
    .GoodsImg {
        border: 1px solid #ccc;
        margin: 0.36rem;
        width: 2rem;
        height: 2rem;
        display: block;
    }
    .oranges {
        color: #ff4d17;
        font-size: 0.4rem;
        .t_MarketPrice {
            text-align: center;
            font-size: 0.26rem;
            color: #888;
        }
    }
}
</style>

<script>
import { getNum, LOGIN_SUCCESS } from "../main.js";

export default {
    data() {
        return {
            productNum: 0,
            list: [
                { label: "宝贝" },
                { label: "详情" },
                { label: "评价" }
                // { label: "推荐" }
            ],
            GoodsList: [],
            GoodsHtml: "",
            show: false,
            flexNav: false,
            Gotup: [],
            GotupAttr: [],
            GotupLen: 0,
            selectSKUOne: [],
            selectSKUTwo: [],
            GotupAttrSku: [],
            elementAttrSku: [],
            elementSkuAttr: [],
            GoodAttrs: [],
            GotupLength: 0,
            GoodsImg: "",
            buyName: "",
            buyID: "", //商品ID
            ProductType: 0,
            spinner: 0, //购买数量
            price: 0,
            Stock: 0 //存库
        };
    },
    mounted() {
        console.log(this.$refs.GroupGood);

        this.scroll = this.$refs.GroupGood; //获取dom
        this.$refs.GroupGood.addEventListener(
            "scroll",
            () => {
                console.log(this.$refs.GroupGood.scrollTop);
            },
            false
        );
    },
    created() {
        // console.log(location);
        sessionStorage.setItem("s", this.$route.params.Good_id);
        localStorage.setItem("s", this.$route.params.Good_id);
        console.log(this.$route.params.Good_id);
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
        NavCallback() {
            this.flexNav = !this.flexNav;
        },
        GetShoppingCartNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getshoppingcartnum",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data.success);
                if (response.data.success == 200) {
                    this.productNum = response.data.object.productNum;
                    console.log(this.productNum);
                }
            });
        },
        GetCommentList(oid) {
            this.$router.push({
                name: "TheEvaluationList",
                params: { Good_id: oid }
            });
        },

        GoHistory(sid) {
            this.$router.go(-1);
        },

        TouchSku(ValueId, element, vid, buyName, buySku, _index) {
            // console.log(_index);

            if (this.GotupLength > 1) {
                // console.log("有多个属性");
            }
            switch (vid) {
                case 110:
                    if (this.GoodAttrs.length < 1) {
                        // console.log("还没添加1");
                        this.GoodAttrs.push(buyName);
                    } else {
                        if (this.GoodAttrs[0] == buyName) {
                            this.GoodAttrs.splice(0, 1, "");
                        } else {
                            this.GoodAttrs.splice(0, 1, buyName);
                        }
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
                        if (this.GoodAttrs[1] == buyName) {
                            this.GoodAttrs.splice(1, 1, "");
                        } else {
                            this.GoodAttrs.splice(1, 1, buyName);
                        }
                    }
                    break;
                default:
                    break;
            }
            // console.log(ValueId); //他自己的ID
            // console.log(element); //设置没存库的变化
            // console.log(vid); //1是上 2是下
            // console.log(buyName); //自己的名字
            // console.log(buySku);
            // console.log(_index); //下标

            for (const [keys, elementSkus] of element.entries()) {
                if (ValueId == elementSkus.AttValueId) {
                    //点击的ID 和 JSON里面一样的 改变属性
                    this.$set(elementSkus, "isTrue", !elementSkus.isTrue);
                    //*************************判断第一个属性 有没有 第二属性*******************
                    if (vid == 110 && elementSkus.isTrue) {
                        //存库存有没有的判断
                        this.elementAttrSku = [];
                        //保存属性下的SKU
                        this.selectSKUOne = elementSkus.SKU;
                        // console.log(this.selectSKUOne);

                        //判断点击每一个的存库的
                        for (const iteratorSku of elementSkus.SKU) {
                            if (iteratorSku.Stock > 0) {
                                // console.log(iteratorSku.Stock);
                                this.elementAttrSku.push(false);
                            } else {
                                this.elementAttrSku.push(true);
                            }
                        }

                        console.log("_index");
                        console.log(_index);
                        console.log(this.selectSKUOne);

                        //规格数量
                        switch (this.GotupLen) {
                            case 1:
                                this.Stock =
                                    elementSkus.SKU[this.GotupLen - 1].Stock;
                                this.price =
                                    elementSkus.SKU[
                                        this.GotupLen - 1
                                    ].SalePrice;
                                this.buyID =
                                    elementSkus.SKU[this.GotupLen - 1].AttIds;
                                break;
                            case 2:
                                if (buySku) {
                                    console.log("buySku");
                                    console.log(buySku);
                                    this.Stock = buySku.Stock;
                                    this.price = buySku.SalePrice;
                                    this.buyID = buySku.AttIds;
                                    console.log("点上面的ID");
                                    console.log(buySku.AttIds);
                                    console.log(buySku.AttValueName);
                                }

                                //121:641|122:490
                                //121:642|122:653
                                break;
                            default:
                                break;
                        }

                        console.log("库存" + this.Stock);
                        console.log("价格" + this.price);
                        console.log(this.buyID);
                        console.log(
                            "***************************************************"
                        );
                        // }
                    } else if (vid == 110) {
                        this.elementAttrSku = []; //清空xy选择
                    }

                    //*************************判断第二个属性 有没有 第一个属性*******************
                    if (vid == 100 && elementSkus.isTrue) {
                        this.elementSkuAttr = [];
                        this.selectSKUTwo = elementSkus.SKU;
                        for (const iteratorSku of elementSkus.SKU) {
                            //没有库存的禁止
                            if (iteratorSku.Stock > 0) {
                                // console.log(iteratorSku.Stock);
                                this.elementSkuAttr.push(false);
                            } else {
                                this.elementSkuAttr.push(true);
                            }
                        }

                        if (this.selectSKUOne[_index].Stock > 0) {
                            this.Stock = this.selectSKUOne[_index].Stock;
                            this.price = this.selectSKUOne[_index].SalePrice;
                        }
                        this.buyID = this.selectSKUOne[_index].AttIds;
                        console.log("点下面的ID");
                        console.log(this.buyID);

                        // console.log(this.selectSKU[_index].AttIds);
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
            // console.log(i);console.log(key);console.log(this.buyID); console.log(this.spinner);console.log(this.$route.params.Good_id);
            if (this.Gotup && !this.show) {
                this.show = true;
                this.key = key;
                return;
            }
            //判断是不是取消了选择
            if (this.GoodAttrs.length == this.GotupLength) {
                for (const iterator of this.GoodAttrs) {
                    if (iterator == "") {
                        this.$dialog.toast({
                            mes: "请选择商品属性",
                            timeout: 1500,
                            icon: "error"
                        });
                        return;
                    }
                }
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
                        LOGIN_SUCCESS(response.data.success);
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
                        LOGIN_SUCCESS(response.data.success);
                        switch (response.data.success) {
                            case 200:
                                this.$router.push({
                                    name: "cartOrder",
                                    params: { sid: this.ProductType }
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
                    this.Gotup = this.GoodsList.LstAtt[0]; //第一个属性
                    this.GotupAttr = this.GoodsList.LstAtt[1]; //第二个属性
                    this.GotupLen = this.GoodsList.LstAtt.length;
                    this.price = this.GoodsList.SalePrice;
                    this.ProductType = this.GoodsList.ProductType;
                    // this.Stock = this.GoodsList.ProductStock;
                    // console.info(this.Gotup);
                    // console.info(this.GotupAttr);
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
                    //设置存库
                    this.GoodsList.LstSKU.forEach((element, index) => {
                        this.Stock += element.Stock;
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
