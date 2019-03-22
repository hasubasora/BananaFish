<template>
    <div class="www">
        <yd-navbar slot="navbar" height='.8rem' fixed>
            <div @click="GoHistory" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>

            <yd-flexbox slot="center" style="border:1px solid #A0A0A0;border-radius:5px">
                <yd-flexbox-item :class="['flexboxNav',{'flexbox':flexNav}]">商品</yd-flexbox-item>
                <yd-flexbox-item :class="['flexboxNav',{'flexbox':!flexNav}]">详情</yd-flexbox-item>
            </yd-flexbox>
        </yd-navbar>

        <div class="swipe" ref="GroupGood">
            <yd-scrollnav :callback='NavCallback'>
                <yd-scrollnav-panel v-for="(item, key) in list" :key="key">
                    <!-- 内容 -->
                    <div class="GroupSwipe" v-if="key==0">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="item in GoodsList.ProductImg" :key="item.id">
                                <yd-lightbox>
                                    <yd-lightbox-img :src="item.ImgUrl" style="width:100%"></yd-lightbox-img>
                                </yd-lightbox>
                            </mt-swipe-item>
                        </mt-swipe>
                        <div class="lucky_price">
                            <div class="price">
                                <span>￥{{GoodsList.SalePrice}}</span>
                                <div class="market_price"><del>市场价 ￥ {{GoodsList.MarketPrice}}</del></div>
                            </div>
                            <div class="sales">
                                <div class="sale_num">月销 {{GoodsList.SaleCount}}</div>
                                <div class="integral">可获得积分：{{GoodsList.Integral}}</div>
                            </div>
                        </div>
                        <p class="goodtitle">
                            {{GoodsList.ProductTitle}}
                        </p>
                        <div class="AngelMembers">
                            <div class="AngelLeft">
                                <img src="../assets/Img/angelIcon.png" alt="">
                                <div class="save">
                                    天使会员预计可省 <span> ￥ {{savePrice}}元</span>
                                </div>
                            </div>
                            <router-link to="/AngelActivity" class="AngelRight" v-if="!IsAngel">
                                <div>成为</div>
                                <div>天使会员</div>
                            </router-link>
                        </div>
                        <div @click="showSelect(2)">
                            <yd-cell-group>
                                <yd-cell-item arrow>
                                    <span slot="left">
                                        <i class="gray">规格&nbsp;</i>
                                    </span>
                                    <span slot="left">选择 颜色分类</span>
                                </yd-cell-item>
                            </yd-cell-group>
                        </div>
                    </div>

                    <!-- 评价 -->
                    <yd-cell-group v-if="key==1">
                        <yd-cell-item arrow @click.native="GetCommentList(GoodsList.Id)">
                            <span slot="left">
                                <i>宝贝评价</i>
                            </span>
                            <span slot="right">
                                查看全部
                            </span>
                        </yd-cell-item>
                        <div class="CommentWrap" v-for="items in LstComment" :key="items.id" v-if="LstComment.length">
                            <div class="CommentList">
                                <div class="Comment-left">
                                    <div class="UserInfo">
                                        <img class="UserIcon" :src="items.UserIcon" alt="">
                                        <span class="NickName">{{ items.NickName }}</span>
                                    </div>
                                    <div class="Comment">
                                        {{items.Comment}}
                                    </div>
                                </div>
                                <div class="Comment-right" v-if="items.ImgShow == [] && items.ImgShow !== null">
                                    <img :src="items.ImgShow[0].AttachPath" alt="">
                                </div>
                            </div>
                        </div>
                        <div class="blank" v-if="!LstComment.length">
                            该商品暂未评价
                        </div>
                    </yd-cell-group>
                    <!-- 评价 -->

                    <!-- 详细 -->

                    <div v-if="key==2">
                        <div class="details">
                            <div class="GoodsDirectly">
                                <div class="DirectlyLeft">
                                    <img :src="Supplier.SupplierIcoImg" alt="">
                                    <div class="ShopInfo">
                                        <div class="Shopname">{{Supplier.SupplierName}}</div>
                                        <div class="ProductNum">商品数量 {{Supplier.ProductCount}}</div>
                                    </div>
                                </div>
                                <div class="Directlyright" @click="GoPath(Supplier.SupplierId)">
                                    <span>进店逛逛</span>
                                </div>
                            </div>
                            <div class="spxq">商品详情</div>
                        </div>
                        <div class="GoodsHtml" v-html="GoodsHtml.ProductDesc"></div>
                    </div>
                    <yd-backtop></yd-backtop>
                    <!-- 详细 -->

                </yd-scrollnav-panel>
            </yd-scrollnav>
        </div>
        <!-- 底部导航 -->
            <yd-tabbar fixed active-color="#ccc" class="yd-nav-button" fontsize=".26rem">
                <div class='iconfont_s'>
                    <yd-tabbar-item title="首页" link="/" active>
                        <yd-icon name="home" slot="icon" size="0.4rem" class="marginTop02"></yd-icon>
                    </yd-tabbar-item>
                    <yd-tabbar-item title="客服" link=" " @click.native="ToKefo" active>
                        <span slot="icon" class="marginTop02 iconfont icon-54" style="font-size:.5rem; color:#ccc"></span>
                    </yd-tabbar-item>
                    <yd-tabbar-item title="购物车" link="/cart" active>
                        <yd-icon name="shopcart" slot="icon" size="0.4rem" class="marginTop02"></yd-icon>
                        <yd-badge slot="badge" type="danger">{{storeText?storeText:this.productNum}}</yd-badge>
                    </yd-tabbar-item>
                </div>

                <div class="yd-nav-right-button">
                    <button class="handleClick rightbtn" v-if="GoodsList.IsAllowAddCart" @click="showSelect(1)" type="button">加入购物车</button>
                </div>
                <div class="yd-nav-right-button">
                    <button class="handleClick leftbtn leftColor" v-if="this.$route.query.text!='over' " @click="showSelect(2)" type="button">立即购买</button>
                </div>
            </yd-tabbar>
        <!-- 底部导航 -->

        <yd-popup v-model="show" position="bottom" class="Popup">
            <yd-flexbox>
                <div>
                    <img class="ImgUrl" width="100" :src="ImgUrl" alt="">
                </div>
                <yd-flexbox-item>
                    <p class="oranges">￥
                        <span>{{price}}</span>
                    </p>
                    <div>
                        <span>库存{{Stock}}件</span>
                    </div>
                    <p v-if="Gotup">已选：{{GoodAttrs}}</p>
                </yd-flexbox-item>
                <!-- <yd-flexbox-item>
                    <yd-spinner :longpress="false" v-model="spinner"></yd-spinner>
                </yd-flexbox-item> -->

            </yd-flexbox>
            <div class="GoodSuk">
                <div class="gotup border" v-if="Gotup">
                    <h3>{{Gotup.AttName}}</h3>
                    <div class="gotupTab">
                        <span @click="TouchSku(itemt.AttValueId,Gotup.LstAttValue,110,itemt.AttValue,selectSKUTwo[index],index)" :class="{isOrange:itemt.isTrue,pointerEvents:elementSkuAttr[index]}" v-for="(itemt, index) in Gotup.LstAttValue" :key="index">
                            {{itemt.AttValue}}
                        </span>
                    </div>
                </div>
                <div class="gotup border" v-if="GotupAttr">
                    <h3>{{GotupAttr.AttName}}</h3>
                    <div class="gotupTab">
                        <span @click="TouchSku(itemt.AttValueId,GotupAttr.LstAttValue,100,itemt.AttValue,selectSKUOne[index],index)" :class="{isOrange:itemt.isTrue,pointerEvents:elementAttrSku[index]}" v-for="(itemt, index) in GotupAttr.LstAttValue" :key="index">
                            {{itemt.AttValue}}
                        </span>
                    </div>
                </div>
                <div class="spinner">
                    <span>购买数量</span>
                    <yd-spinner :longpress="false" v-model="spinner"></yd-spinner>
                </div>
            </div>
            <!-- <yd-button type="warning" class="SetButton" size="large" @click.native="addCart(GoodsList.Id, type)">确定</yd-button> -->
            <div class="SetButton" @click="addCart(GoodsList.Id, type)">确定</div>
        </yd-popup>

        <!-- 新人活动弹出框 -->
        <div class="modal" v-if="isModal" @touchmove.prevent>
            <div class="modalContent">
                <div class="modalTitle">{{modalText.msg}}</div>
                <div class="modalText">
                    <p>{{modalText.desc}}</p>
                    <img @click="conceal" src="../assets/Img/confirm.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.www {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
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
        background: #f2f2f2;
        padding: 0.7rem 0 1rem;
        .yd-cell:after {
            border-bottom: none;
        }
        .yd-cell-box {
            margin-bottom: 0.2rem;
        }
        .GroupSwipe {
            width: 100%;
            background: #ffffff;
            .mint-swipe {
                height: 7.5rem;
                background: #ffffff;
                text-align: center;
                .mint-swipe-item {
                    border: 1px solid;
                    img {
                        height: 100%;
                        width: auto;
                    }
                }
            }
            .lucky_price {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: 1rem;
                padding: 0.1rem 0.4rem 0.1rem 0.2rem;
                background: linear-gradient(to right, #F02B22, #FC2D59);
                color: #fff;
                .price {
                    span {
                        font-size: 0.3rem;
                    }
                    .market_price {
                        background: rgba($color: #000000, $alpha: 0.3);
                        padding: 0.02rem 0.08rem;
                        border-radius: 0.2rem;
                    }
                }
                .sales {
                    .sale_num {
                        text-align: right;
                    }
                    .have_group {
                        font-size: 0.26rem;
                    }
                }
            }
            .goodtitle {
                padding: 0.2rem 0.3rem;
                font-size: 0.3rem;
                font-weight: 600;
            }
            .AngelMembers {
                display: flex;
                justify-content: space-between;
                height: 1.2rem;
                padding-left: 0.3rem;
                background: #F3F3F3;
                .AngelLeft {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 0.15rem 0;
                    img {
                        width: 1.6rem;
                        height: 0.42rem;
                    }
                    span {
                        color: #F02B24;
                        font-weight: bold;
                    }
                }
                .AngelRight {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 1.6rem;
                    height: 1.2rem;
                    padding-top: 0.22rem;
                    font-size: 0.28rem;
                    background: url('../assets/Img/AC.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .CommentWrap {
            padding-bottom: 0.2rem;
            .CommentList {
                display: flex;
                height: 2.4rem;
                margin: 0 0.24rem;
                padding: 0.2rem;
                border: 1px solid #F3F3F3;
                border-radius: 0.1rem;
                .Comment-left {
                    width: 80%;
                    .UserInfo {
                        display: flex;
                        align-items: center;
                        margin-bottom: 0.1rem;
                        .UserIcon {
                            width: 0.6rem;
                            height: 0.6rem;
                            border-radius: 50%;
                            margin-right: 0.2rem;
                        }
                    }
                    .Comment {
                        padding-right: 0.2rem;
                        line-height: 0.4rem;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                }
                .Comment-right {
                    width: 2rem;
                    height: 1.8rem;
                    display: flex;
                    flex-direction: column-reverse;
                    img {
                        width: 100%;
                    }
                }
            }
        }
        .blank {
            height: 3rem;
            line-height: 3rem;
            width: 100%;
            text-align: center;
            font-size: 0.3rem;
            color: #888888;
        }
        .yd-cell-item:not(:last-child):after {
            border-bottom: none;
        }
        .details {
            background: #fff;
            .GoodsDirectly {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.3rem;
                .DirectlyLeft {
                    display: flex;
                    img {
                        width: 1rem;
                        height: 1rem;
                        margin-right: 0.2rem;
                    }
                    .ShopInfo {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .Shopname {
                            width: 3rem;
                            font-size: 0.3rem;
                            font-weight: bold;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .ProductNum {
                            color: #888888;
                        }
                    }
                }
                .Directlyright {
                    display: flex;
                    align-items: center;
                    span {
                        font-size: 0.3rem;
                        font-weight: bold;
                        color: #F02B24;
                    }
                    &:after {
                        margin-left: .05rem;
                        margin-right: -.08rem;
                        font-family: YDUI-INLAY;
                        font-size: .3rem;
                        color: #c9c9c9;
                        content: "\E608";
                    }
                }
            }
            .spxq {
                padding: 0.2rem 0.3rem;
                font-size: 0.3rem;
                font-weight: bold;
                border-top: 0.2rem solid #eee; 
            }
        }
    }
    .Popup {
        .SetButton {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 1rem;
            line-height: 1rem;
            background: #ffb400;
            color: #fff;
            font-size: .36rem;
            z-index: 1998;
            text-align: center;
            border-radius: 3px;
        }
    }
    .share {
        padding: 0.2rem 0;
        float: left;
        width: 50%;
        text-align: center;
        img {
            width: 0.8rem;
        }
        p {
            font-size: 0.3rem;
        }
    }
    .yd-scrollnav {
        .yd-scrollnav-tab {
            .yd-scrollnav-toggle {
                display: none;
            }
            .yd-scrollnav-tab-item {
                height: 0 !important;
            }
        }
    }
    .GoodsHtml {
        margin-bottom: 0.6rem;
        img {
            width: 100%; display: block;
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
            background-color: #ff5f17;
            font-size: 0.3rem;
            border: none;
            outline: none;
            height: 0.8rem;
            width: 100%;
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
            > a {
                width: 1rem;
                text-align: center;
                height: 0.8rem;
                flex: 1;
            }
        }
    }

    .GoodSuk {
        padding: 0.2rem 0.2rem 1rem 0.2rem;
        max-height: 6rem;
        overflow-y: auto;
        .gotup {
            border-bottom: 1px solid #eee;
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
        .spinner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.2rem;
        }
    }
    .ImgUrl {
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
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        background: rgba(0,0,0,0.1);
        .modalTitle {
            position: absolute;
            top: 1.6rem;
            width: 100%;
            font-size: 0.46rem;
            text-align: center;
        }
        .modalContent {
            position: absolute;
            background: url(../assets/Img/modal.png) no-repeat ;
            background-size:cover;
            top: 50%;
            margin-top: -3rem;
            width: 90%;
            height: 6rem;
            margin-left: 5%;
            .modalText {
                position: absolute;
                bottom: 0.4rem;
                width: 60%;
                margin-left: 20%;
            }
            p {
                font-size: 0.34rem;
                text-align: center;
            }
            img {
                margin-top: 0.4rem;
                width: 100%;
            }
        }
    }
}
</style>

<script>
import { getNum } from "../main.js";
export default {
    inject: ['reload'],
    data() {
        return {
            productNum: 0,
            list: [
                { label: "宝贝" },
                { label: "详情" },
                { label: "评价" }
                // { label: "推荐" }
            ],
            Bom: [
                {
                    icon: require("../assets/Img/b1.png"),
                    title: "微信朋友圈"
                },
                {
                    icon: require("../assets/Img/b2.png"),
                    title: "微信好友"
                }
            ],
            GetConfig: "",
            GoodsList: {},
            LstComment: [],
            GoodsHtml: "",
            show: false,
            type: 1,
            show1: false,
            flexNav: true,
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
            ImgUrl: "",
            buyName: "",
            buyID: "", //商品ID
            ProductType: 0,
            spinner: 0, //购买数量
            price: 0,
            Stock: 0, //存库
            isModal: false,
            modalText: "",
            Share: "",
            IsAngel: false,
            Supplier: {}
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
        // sessionStorage.setItem("s", this.$route.query.Good_id);
        // localStorage.setItem("s", this.$route.query.Good_id);
        console.log(this.$route.query.Good_id);
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
        },
        savePrice() {
            return (this.GoodsList.SalePrice - this.GoodsList.MemberPrice).toFixed(2)
        }
    },
    methods: {
        showSelect(index) {
            this.show = true;
            this.type = index;
        },
        showSelect1() {
            this.show1 = true;
        },
        conceal() {
            this.isModal = false;
        },
        ToKefo() {
            window.location.href = this.GetConfig
        },
        NavCallback(index) {
            if(index) {
                this.flexNav = false
            }else {
                this.flexNav = true
            }
        },
        GoPath(SupplierId) {
            this.$router.push({
                name: 'menuThree',
                params: {Group_id: 0, SupplierId: SupplierId}
            })
        },
        GetShoppingCartNum() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getshoppingcartnum",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.productNum = response.data.object.productNum;
                    console.log(this.productNum);
                }
            });
        },
        GetCommentList(oid) {
            this.$router.replace({
                name: "TheEvaluationList",
                params: { Good_id: oid }
            });
        },

        GoHistory() {
            window.history.length <= 1 ? this.$router.push('/') : this.$router.go(-1)
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
                    console.log(elementSkus, elementSkus.isTrue)
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

                        // console.log("_index");
                        // console.log(_index);
                        // console.log(this.selectSKUOne);

                        //规格数量
                        switch (this.GotupLen) {
                            case 1:
                                this.Stock = elementSkus.SKU[this.GotupLen - 1].Stock;
                                this.ImgUrl = elementSkus.SKU[this.GotupLen - 1].ImgUrl;
                                this.price = elementSkus.SKU[this.GotupLen - 1].SalePrice;
                                this.buyID = elementSkus.SKU[this.GotupLen - 1].AttIds;
                                console.log(this.Stock, this.ImgUrl)
                                break;
                            case 2:
                                if (buySku) {
                                    console.log(buySku);
                                    this.Stock = buySku.Stock;
                                    this.ImgUrl = buySku.ImgUrl
                                    this.price = buySku.SalePrice;
                                    this.buyID = buySku.AttIds;
                                    // console.log("点上面的ID");
                                    // console.log(buySku.AttIds);
                                    // console.log(buySku.AttValueName);
                                }

                                //121:641|122:490
                                //121:642|122:653
                                break;
                            default:
                                break;
                        }

                        // console.log("库存" + this.Stock);
                        // console.log("价格" + this.price);
                        // console.log(this.buyID);
                        // console.log(
                        //     "***************************************************"
                        // );
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
                        console.log(this.selectSKUOne[_index].Stock)
                        if (this.selectSKUOne[_index].Stock > 0) {
                            console.log(this.Stock)
                            this.Stock = this.selectSKUOne[_index].Stock;
                            this.ImgUrl = this.selectSKUOne[_index].ImgUrl;
                            this.price = this.selectSKUOne[_index].SalePrice;
                        }
                        this.buyID = this.selectSKUOne[_index].AttIds;
                        console.log("点下面的ID",this.buyID);

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
            console.log(i, key)
            // console.log(key);console.log(this.buyID); console.log(this.spinner);console.log(this.$route.query.Good_id);
            if (this.Gotup && !this.show) {
                this.show = false;
                this.key = key;
                return;
            }
            console.log(key);
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
                            productid: this.$route.query.Good_id,
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
                                // getNum();
                                this.reload()
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
                    console.log(this.$route.query.Good_id,this.buyID,this.spinner)
                    this.$axios({
                        method: "POST",
                        data: {
                            productid: this.$route.query.Good_id,
                            attids: this.buyID,
                            buynum: this.spinner
                        },
                        url: this.$server.serverUrl + "/order/buyitnow",
                        responseType: "json"
                    }).then(response => {
                        if(response.data.success == 200) {
                            this.$router.push({
                                name: "cartOrder",
                                params: { sid: this.ProductType }
                            });
                        }else {
                            this.$dialog.toast({
                                mes: response.data.msg,
                                timeout: 1500
                            });
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
                    productid: this.$route.query.Good_id
                        ? this.$route.query.Good_id
                        : localStorage.getItem("s")
                },
                url: this.$server.serverUrl + "/index/getproductdetail",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data)
                    this.GoodsList = response.data.object; //整个
                    this.LstComment = response.data.object.LstComment
                    console.log(this.LstComment)
                    this.GotupLength = this.GoodsList.LstAtt.length;
                    this.Gotup = this.GoodsList.LstAtt[0]; //第一个属性
                    this.GotupAttr = this.GoodsList.LstAtt[1]; //第二个属性
                    this.GotupLen = this.GoodsList.LstAtt.length;
                    this.Stock = this.GoodsList.ProductStock;
                    this.price = this.GoodsList.SalePrice;
                    this.ProductType = this.GoodsList.ProductType;
                    this.Supplier = response.data.object.Supplier
                    this.GetConfig = response.data.object.CustomerServiceUrl
                    this.IsAngel = response.data.object.IsAngel
                    this.Share = response.data.object.Share
                    if(this.ProductType == 2 || this.ProductType == 3) {
                        this.$router.replace({
                            name: 'FreeDetail',
                            query: {
                                Good_id: this.$route.query.Good_id
                            }
                        })
                    }

                            // 微信分享
                    let shareurl = location.href; //获取锚点之前的链接
                    this.$axios({
                        method: "POST",
                        data: {
                            url: shareurl
                        },
                        url: this.$server.serverUrl + "/WeiXin/GetShareConfig",
                        responseType: "json"
                    }).then(response => {
                            console.log(response.data)
                        if (response.data.success == 200) {
                            let res = response.data.data;
                            console.log(res)
                            var that = this;
                            wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: res.appId, // 必填，公众号的唯一标识
                                timestamp: res.timestamp, // 必填，生成签名的时间戳
                                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                                signature: res.signature, // 必填，签名
                                jsApiList: [
                                    "onMenuShareAppMessage",
                                    "onMenuShareTimeline"
                                ] // 必填，需要使用的JS接口列表
                            });
                            wx.ready(() => {
                                wx.onMenuShareAppMessage({
                                    title: that.Share.Title, // 分享标题
                                    desc: that.Share.Describe, // 分享描述
                                    link: that.Share.Link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: that.Share.Icon, // 分享图标
                                    type: '', // 分享类型,music、video或link，不填默认为link
                                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                                    success: function () {
                                    // 用户点击了分享后执行的回调函数
                                        console.log("分享给朋友成功")
                                        that.$axios({
                                            method: "POST",
                                            data: {
                                                taskCode: "ShareGoods"
                                            },
                                            url: that.$server.serverUrl + "/UserCenter/DoTask",
                                            responseType: "json"
                                        }).then(response => {
                                            if(response.data.success == 200) {
                                                that.modalText = response.data
                                                that.isModal = true
                                            }
                                        });
                                    }
                                });
                                wx.onMenuShareTimeline({
                                    title: that.Share.Title, // 分享标题
                                    link: that.Share.Link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                    imgUrl: that.Share.Icon, // 分享图标
                                    success: function () {
                                    // 用户点击了分享后执行的回调函数
                                        console.log("分享朋友圈成功")
                                        that.$axios({
                                            method: "POST",
                                            data: {
                                                taskCode: "ShareGoods"
                                            },
                                            url: that.$server.serverUrl + "/UserCenter/DoTask",
                                            responseType: "json"
                                        }).then(response => {
                                            if(response.data.success == 200) {
                                                that.modalText = response.data
                                                that.isModal = true
                                            }
                                        });
                                    },    
                                })
                            })
                        }
                    })
                    if (this.Gotup) {
                        for (const [keys,elementSkus] of this.Gotup.LstAttValue.entries()) {
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
                    this.ImgUrl = this.GoodsList.ProductImg[0].ImgUrl;
                }
            });
        },
        GetProductDetailDesc() {
            this.$axios({
                method: "POST",
                data: {
                    productid: this.$route.query.Good_id
                },
                url: this.$server.serverUrl + "/index/getproductdetaildesc",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.GoodsHtml = response.data.object;
                    console.log(response.data);
                }
            });
        },
    }
};
</script>
