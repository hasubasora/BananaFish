<template>
    <yd-layout class="GeneralItemDescription">
        <yd-navbar slot="navbar" title="商品详情" height='.8rem'>
            <router-link to="" @click.native="GoHistory" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-flexbox direction="vertical" class="swipe">
            <yd-flexbox-item>
                <mt-swipe :auto="4000">
                    <mt-swipe-item v-for="item in GoodsList.ProductImg" :key="item.id"><img :src="item.ImgUrl" alt=""></mt-swipe-item>
                </mt-swipe>
                <div class="goodtitle">

                </div>
            </yd-flexbox-item>

            <yd-flexbox-item>
                <yd-flexbox class="theTopGood">
                    <div class="ProductTitle">
                        <strong>{{GoodsList.ProductTitle}}</strong>
                    </div>
                    <yd-flexbox-item>
                        <div class="t_MarketPrice">市场价￥{{GoodsList.MarketPrice}}</div>
                    </yd-flexbox-item>
                </yd-flexbox>
                <yd-flexbox class=" theTopGood ">
                    <yd-flexbox-item>
                        <p class="oranges">￥{{GoodsList.SalePrice}}</p>
                    </yd-flexbox-item>

                    <yd-flexbox-item>
                        <p class="Integral">可获得积分：{{GoodsList.Integral}}</p>
                    </yd-flexbox-item>
                </yd-flexbox>
            </yd-flexbox-item>

            <yd-flexbox-item>
                <yd-accordion>
                    <yd-accordion-item title="商品详情" open>
                        <div style="width:100%">
                            <div v-html="GoodsHtml.ProductDesc"></div>
                        </div>
                    </yd-accordion-item>
                </yd-accordion>
                <yd-accordion>
                    <yd-accordion-item title="宝贝评价">
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
            </yd-flexbox-item>

        </yd-flexbox>

        <yd-flexbox class="yd-nav-button">
            <div class='iconfonts'>
                <router-link to="/">
                    <yd-icon name="home-outline" color='#6A6A6A' size='.5rem'></yd-icon>
                </router-link>
                <router-link to="/">
                    <div class="iconfont icon-54"></div>
                </router-link>
                <router-link to="/cart">
                    <yd-icon name="shopcart-outline" color='#6A6A6A' size='.5rem'></yd-icon>
                </router-link>
            </div>

            <div class="yd-nav-right-button">
                <button class="handleClick leftbtn leftColor" @click="BuyGood(GoodsList.Id)" type="button">一键购买</button>
                <button class="handleClick rightbtn" @click="addCart(GoodsList.Id)" type="button">加入购物车</button>
            </div>

            <yd-popup v-model="show" position="bottom" height="60%">
                <div class="GoodSuk">
                    <div class="gotup" v-for="(item, index) in gotup" :key="index">
                        <h3>{{item.AttName}}</h3>
                        <div class="gptupBox">
                            <span @click="TouchSku(itemt.AttValueId)" :class={isOrange:itemt.isTrue} v-for="(itemt, index) in item.LstAttValue" :key="index">{{itemt.AttValue}}</span>
                        </div>
                    </div>
                </div>
                <yd-button type="warning" style="margin: 30px;" @click.native="show = false">确定</yd-button>
            </yd-popup>

        </yd-flexbox>

    </yd-layout>
</template>
<script>
export default {
    data() {
        return {
            GoodsList: [],
            GoodsHtml: "",
            show: false,
            gotup: []
        };
    },
    created() {
        // console.log(location);

        sessionStorage.setItem("s", this.$route.params.Good_id);
        localStorage.setItem("s", this.$route.params.Good_id);
        console.log(this.$route.params.Good_id);
        // 商品信息
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
                this.GoodsList = response.data.object;
                this.gotup = this.GoodsList.LstAtt;

                this.gotup.forEach((element, index) => {
                    element.LstAttValue.forEach((elements, index) => {
                        Object.assign(elements, {
                            isTrue: false
                        });
                        console.log(elements);
                    });
                });
            }
        });
        // 商品详情
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
                console.log(this.GoodsHtml);
            }
        });
    },
    methods: {
        GoHistory(sid) {
            // console.log(sid);
            this.$router.go(-1);
        },
        BuyGood() {
            this.$axios({
                method: "POST",
                data: {
                    productid: this.$route.params.Good_id
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
                        this.$router.push({ name: "SignIn", ReturnUrl: "" });
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
        },
        TouchSku(ValueId) {
            console.log(ValueId);
            this.gotup.forEach((element, index) => {
                element.LstAttValue.forEach((elements, index) => {
                    if (ValueId == elements.AttValueId) {
                        Object.assign(elements, {
                            isTrue: true
                        });
                        console.log(elements);
                    }
                });
            });
        },
        addCart(i) {
            console.log(i);
            this.show = true;

            // this.$axios({
            //     method: "POST",
            //     data: {
            //         productid: this.$route.params.Good_id,
            //         groupid: 0
            //     },
            //     url: this.$server.serverUrl + "/order/addshoppingcart",
            //     responseType: "json"
            // }).then(response => {
            //     // this.GetMyId(response.data.success)
            //     switch (response.data.success) {
            //         case 200:
            //             this.$dialog.toast({
            //                 mes: "加入购物车成功",
            //                 timeout: 1500,
            //                 icon: "success"
            //             });
            //             break;
            //         case 400:
            //             this.$router.push({ name: "SignIn", ReturnUrl: "" });
            //             break;
            //         case 500:
            //             this.$dialog.toast({
            //                 mes: response.data.msg,
            //                 timeout: 1500
            //             });
            //         default:
            //             break;
            //     }
            // });
        }
    }
};
</script>

<style lang="scss">
.GeneralItemDescription {
    .iconfonts {
        display: flex;
        width: 2.8rem;
        > a {
            width: 1rem;
            text-align: center;
            height: 1rem;
            line-height: 0.8rem;
            flex: 1;
            padding: 0.1rem;
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
        padding: 0.2rem;
        font-size: 0.2rem;
        .ProductTitle {
            border-right: 1px solid #ccc;
            width: 5rem;
            padding-right: 0.2rem;
            font-size: 0.3rem;
        }
        .t_MarketPrice {
            text-align: center;
            @extend .oranges;
        }
        .oranges {
            // background-color: #ff9717;
            color: #ff9717;
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
                top: 0.16rem;
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
        .rightbtn {
            border-top-right-radius: 50px;
            border-bottom-right-radius: 50px;
        }
        .leftbtn {
            border-top-left-radius: 50px;
            border-bottom-left-radius: 50px;
        }
        .leftColor {
            background-color: #ffa617;
        }
    }

    .obacity {
        opacity: 0;
    }
    // 用户评论区
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
    padding: 0.2rem;
    .gotup {
        border-bottom: 1px solid #dedcdc;
        padding: 0.2rem 0;
        font-size: 0.36rem;
        .gptupBox {
            font-size: 0.25rem;
            display: flex;
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
        }
    }
}
</style>

