<template>
    <div class="cart">
        <yd-navbar title="购物车" fixed color="#f2f2f2" class="titleColor" height='.8rem'>
            <div @click="GoBack" slot="left" v-if="this.$route.query.isShowBack">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </div>

            <div slot="right" @click='isDelFn' color="#f2f2f2">
                <yd-icon name="feedback" size=".4rem" color="#f2f2f2" v-show="isDel || !CartList.length"></yd-icon>
                <yd-icon name="checkoff" size=".4rem" color="#f2f2f2" v-show="!isDel && CartList.length"></yd-icon>
            </div>
        </yd-navbar>
        <!-- 购物车 val 设置商品ID {{isCheckAll}}-->
        <div class="GroupBox">
            <div v-if="CartList.length">
                <div class="GroupId_cart" v-for="item in CartList" :key="item.id">
                    <div class="GroupIdTitle">
                        {{item.GroupTitle!=''?item.GroupTitle:'积分购'}}
                    </div>

                    <yd-checklist v-model="checklist" ref="checklistDemo" :callback="change" :label="false" color="#FF5F17">

                        <div :val="items.Id" v-for="(items,index) in item.LstProduct" :key="index" class="LstProduct red" :style="items.Stock==0?'background:#f0f0f0':''">
                            <yd-flexbox>
                                <div class="GoodList_top">
                                    <!-- {{items.Stock}} -->
                                    <!-- 失效控制 -->
                                    <label v-if="items.Stock==0" style="text-align: center;display: block;color:#ccc">失效</label>
                                    <label v-if="items.ProductStatus==0" style="text-align: center;display: block;color:#ccc">失效</label>

                                    <label v-if="items.Stock!=0&&items.ProductStatus!=0" class="yd-checklist-item-icon" @change="IsCheck(items.Id,items.IsCheck)">
                                        <input type="checkbox" v-model="items.IsCheck">
                                        <span class="yd-checklist-icon">
                                            <i></i>
                                        </span>
                                    </label>
                                </div>

                                <div class="GoodList_center" @click="GoToGoodsDes(items.ProductId)"><img :src="items.ProductImg" class="demo-checklist-img"></div>

                                <yd-flexbox-item class="GoodList_bom" v-if="isDel">
                                    <p @click="GoToGoodsDes(items.ProductId)">{{items.ProductTitle}}</p>
                                    <p class="AttValueName">{{items.AttValueName}}&nbsp;</p>
                                    <p class="GoodList_Number">
                                        <span class="SalePrice">￥{{items.SalePrice.toFixed(2)}}&nbsp;&nbsp;{{item.GroupTitle?'赠'+items.Integral+'积分':''}}</span>
                                        <span class="yd-spinner" style="height: 0.5rem; width: 1.5rem;" v-if="items.Stock!=0&&items.ProductStatus!=0">
                                            <a href="javascript:;" @click="reduce(items.Id,items.BuyNum-1)"></a>
                                            <input type="number" pattern="[1-9]*" v-model="items.BuyNum" disabled placeholder="" class="yd-spinner-input">
                                            <a href="javascript:;" @click="increase(items.Id,items.BuyNum+1)"></a>
                                        </span>
                                        <!-- <yd-spinner :longpress="false" v-model="spinner6"></yd-spinner> -->
                                    </p>
                                </yd-flexbox-item>
                                <yd-flexbox-item class="GoodList_bom" v-if="!isDel">
                                    <p>{{items.ProductTitle}}</p>
                                    <p class="GoodList_Number">
                                        <span class="SalePrice">￥{{items.SalePrice.toFixed(2)}}</span>
                                        <span @click='DelGood(items.Id)'>
                                            <yd-icon name="delete" size=".36rem" class="DelGood"></yd-icon>
                                        </span>
                                    </p>
                                </yd-flexbox-item>
                            </yd-flexbox>
                        </div>

                    </yd-checklist>
                </div>
            </div>
            <div class="empty-shopping-cart" v-else>
                <img class="empty-cart-img" src="../assets/Img/cart-img.png" alt="">
                <div class="empty-cart-text">购物车空空如也，快来挑好货呗！</div>
                <div @click="GoAllClassify" class="empty-cart-btn">去逛逛</div>
            </div>
        </div>

        <!-- 底部栏 -->
        <div class="bomBtn" v-if="CartList.length">
            <div class="AllSalePrice" >
                <div class="text1" v-if="isDel">合计:<span>￥{{MemberPrice.toFixed(2)}}</span></div>
                <!-- <div class="text2" v-if="Discount > 0 && isDel">总额:<span>￥{{AllSalePrice.toFixed(2)}}</span>  折扣:<span>￥{{Discount.toFixed(2)}}</span></div> -->
            </div>
            <button :class="[{'BuyCartt':!isDel},hasGoods?'BuyCart':'BuyCartt']" type="button" :disabled='!isDel||!hasGoods' @click="GoCartOrder">结算</button>
        </div>
        <!-- <yd-cell-item class="bomBtn">
     
        <button slot="right" type="button" :disabled='!isDel' @click="GoCartOrder">去结算</button>
      
    </yd-cell-item> -->
    </div>
</template>

<script>
import { getNum, LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            checklist: [],
            noStock: false,
            isCheckAll: false,
            spinner: 2,
            GeneralList: [],
            ProductList: [],
            CartList: [],
            AllSalePrice: 0, 
            isDel: true,
            isDef: false,
            hasGoods: true,
            Discount: 0,
            MemberPrice: 0
        };
    },
    beforeRouteLeave (to, from, next) {
        this.scrollTop = document.querySelector('.GroupBox').scrollTop
        next()
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
        document.querySelector('.GroupBox').scrollTop = vm.scrollTop
        })
    },
    methods: {
        GoToGoodsDes(id) {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: id }
            });
        },
        change(value, isCheckAll) {
            this.isCheckAll = isCheckAll;
        },
        GoBack() {
            this.$router.go(-1)
        },
        checkAll() {
            this.isCheckAll = !this.isCheckAll;
            this.$refs.checklistDemo.$emit(
                "ydui.checklist.checkall",
                this.isCheckAll
            );
        },
        //选中商品
        IsCheck(id, _IsCheck) {
            //选
            console.log(_IsCheck);
            this.$axios({
                method: "POST",
                data: {
                    Id: id,
                    Ischeck: _IsCheck
                },
                url: this.$server.serverUrl + "/order/checkshoppingcart",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.GetShoppingCart();
                }
            });
        },
        increase(_index, num) {
            if (num > 999) {
                return;
            }
            this.SetCartNum(_index, num);
        },
        reduce(_index, num) {
            if (num < 1) {
                return;
            }
            this.SetCartNum(_index, num);
        },
        SetCartNum(_index, num) {
            this.$axios({
                method: "POST",
                data: {
                    itemid: _index,
                    num: num
                },
                url: this.$server.serverUrl + "/order/changeshoppingcart",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    console.log(response.data);
                    getNum();
                    this.GetShoppingCart();
                    this.$emit('changeCartNum')
                }
            });
        },
        GoAllClassify() {
            this.$router.push({
                name: 'menuThree',
                params: {Group_id: 0}
            })
        },
        //获取购物车商品
        GetShoppingCart() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getshoppingcart",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.CartList = response.data.rows;
                    console.log(response.data);
                    // console.log(this.CartList.length == []);
                    if (this.CartList.length == []) {
                        this.hasGoods = false;
                    }
                    this.AllSalePrice = 0;
                    this.Discount = 0
                    this.MemberPrice = 0
                    //计算价格
                    for (const iterator of this.CartList) {
                        for (const iterators of iterator.LstProduct) {
                            if (iterators.IsCheck) {
                                this.AllSalePrice += iterators.SalePrice*iterators.BuyNum;
                                this.Discount += (iterators.SalePrice - iterators.MemberPrice)*iterators.BuyNum
                                this.MemberPrice += iterators.MemberPrice*iterators.BuyNum
                            }
                        }
                    }
                    //设置选中
                    for (const iterator of this.CartList) {
                        for (const iterators of iterator.LstProduct) {
                            if (iterators.IsCheck) {
                                this.hasGoods = true;
                                return;
                            } else {
                                this.hasGoods = false;
                            }
                        }
                    }
                    return;
                }
            });
        },
// 删除商品
        DelGood(_id) {
            // this.$emit("changeNum")
            this.$axios({
                method: "POST",
                data: {
                    Id: _id
                },
                url: this.$server.serverUrl + "/order/delshoppingcart",
                responseType: "json"
            }).then(response => {
                console.log(response.data);
                if (response.data.success == 200) {
                    this.GetShoppingCart();
                    this.$emit('changeCartNum')                   
                }
            });

        },
        isDelFn() {
            //切换删除
            this.isDel = !this.isDel;
            this.isDef = !this.isDef;
        },
        GoCartOrder() {
            this.$router.push({ name: "cartOrder" });
        }
    },
    created() {
        this.GetShoppingCart();
    }
};
</script>

<style lang="scss">
.cart {
    height: 100%;
    // border: 1px solid;
    position: absolute;
    width: 100%;
}
.demo-checklist-img {
    width: 1.5rem;
    border: 1px solid #f2f2f2;
    margin-right: 0.5rem;
}
.GroupBox {
    margin: 0.8rem 0 1rem;
    padding-bottom: 1rem;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    -webkit-overflow-scrolling: touch; /*这句是为了滑动更顺畅*/
    overflow-y: scroll;
    background: #f9f9f9;
    .empty-shopping-cart {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        .empty-cart-img {
            width: 1.28rem;
        }
        .empty-cart-text {
            margin-top: 0.3rem;
            margin-bottom: 0.6rem;
        }
        .empty-cart-btn {
            width: 5.14rem;
            height: 0.88rem;
            background: linear-gradient(to right, #F02B22, #FC2D59);
            border-radius: 1rem;
            text-align: center;
            line-height: 0.94rem;
            color: #fff;
            font-size: 0.26rem;
        }
    }
}
.GroupId_cart {
    background: #fff;
    border-radius: 10px;
    margin: 0.2rem;

    .GroupIdTitle {
        padding: 0.26rem 0.3rem;
        border-bottom: 1px solid #f2f2f2;
        .yd-checkbox-text {
            font-size: 0.25rem;
            line-height: 0.4rem;
        }
    }
    .yd-checklist {
        background: transparent;
        &:after {
            border: none;
        }
    }
}

.GoodList_top {
    // border: 1px solid;
    width: 1rem;
    .yd-checklist-item-icon {
        margin-left: 0;
    }
}
.GoodList_center {
    width: 1.8rem;
    height: 2rem;
    display: flex;
    align-items: Center;
    > img {
        width: 1.5rem;
    }
    align-items: center;
}
.GoodList_bom {
    .AttValueName {
        font-size: 0.2rem;
        color: #c4c4c4;
    }
    .DelGood {
        color: #FF1D26;
        cursor: pointer;
    }
    > p {
        font-size: 0.26rem;
        padding-right: 0.2rem;
        color: #555;
    }
    .yd-spinner>a:first-child:after {
        content: "\E60B";
    }
    .yd-spinner>a:last-child:after {
        content: "\E602";
    }
    .yd-spinner {
        border: 1px solid #eae8e8;
        border-radius: 1px;
        display: inline-block;
        overflow: hidden;
        >a {
            float: left;
            width: 25%;
            height: inherit;
            text-align: center;
            font-weight: 700;
            color: #666;
            letter-spacing: 0;
            position: relative;
            background-color: #f8f8f8;
            overflow: hidden;
            &:after {
                font-family: YDUI-INLAY;
                color: #777;
                font-size: .18rem;
                position: absolute;
                top: 50%;
                left: 50%;
                -webkit-transform: translate(-50%,-50%);
                transform: translate(-50%,-50%);
            }
        }
        input {
            letter-spacing: 0;
            float: left;
            width: 50%;
            height: inherit;
            text-align: center;
            color: #666;
            border: none;
            font-size: .26rem;
            background-color: #fff;
        }
    }
    .yd-spinner-input {
        color: rgb(0, 0, 0) !important;
    }
    .GoodList_Number {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .SalePrice {
            font-size: 0.26rem;
            color: #FF1D26;
        }
    }
}
#scrollView {
    // border: 1px solid;
    height: 100%;
    position: absolute;
}
.bomBtn {
    border-top: 1px solid #f2f2f2;
    position: absolute;
    z-index: 999;
    display: flex;
    background: #fff;
    left: 0;
    bottom: 1.1rem;
    height: 1rem;
    width: 100%;
    align-self: center;
    justify-content: space-between;
    padding: 0.1rem;
    .AllSalePrice {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 4rem;
        font-size: 0.3rem;
        margin-left: 0.4rem;
        .text1 {
            font-size: 0.3rem;
            color: #333;
            span {
                font-weight: bold;
            }
        }
        .text2 {
            font-size: 0.24rem;
            span {
                font-weight: bold;
            }
        }
    }
    .BuyCart {
        background: #FC2D59;
        font-size: 0.26rem;
        color: #f2f2f2;
        border: #ff5f17 1px solid;
        width: 2rem;
        align-self: center;
        height: 0.8rem;
        text-align: center;
    }
    .BuyCartt {
        background: #c4c4c4;
        font-size: 0.26rem;
        color: #f2f2f2;
        border: #c4c4c4 1px solid;
        width: 2rem;
        align-self: center;
        height: 0.8rem;
        text-align: center;
    }
    .c-orange {
        color: #ff5f17;
    }
    > .yd-cell-right {
        padding: 0;
        > button {
            color: #fff;
            font-size: 0.3rem;
            background-color: #ff5f17;
            height: 1rem;
            border: none;
            width: 2rem;
        }
    }
}
</style>