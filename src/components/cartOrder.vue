<template>
    <div class="orderList">
        <yd-navbar slot="navbar" fixed title="订单提交" height='.8rem'>
            <div slot="left" @click="goBack">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>

        <yd-flexbox class="address" @click.native="GetAddress" v-if="address!=''">
            <div class="address_left">
                <h3 class="font25">{{address.ShipTo}}</h3>
                <i class="moren" v-if="this.$route.query.IsDefault == undefined || this.$route.query.IsDefault === 1">默认</i>
            </div>
            <yd-flexbox-item>
                <div class="address_right">
                    <h3 class="font25">{{address.ShipPhone}}</h3>
                    <p>{{address.Province}}{{address.CityName}}{{address.AreaName}}{{address.Address}}</p>
                </div>
            </yd-flexbox-item>
        </yd-flexbox>
        <yd-flexbox class="address" :class="{empty: empty}" style="font-size:.3rem" @click.native="GetAddress" v-if="address==''">
            请添加地址
        </yd-flexbox>

        <div>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">商品金额</span>
                    <span slot="right">￥{{TotalsAmount}}</span>
                </yd-cell-item>
                <yd-cell-item v-if="IsAgent">
                    <span slot="left">会员折扣</span>
                    <span slot="right">{{DiscountAmount}}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">运费</span>
                    <span slot="right">￥{{GoodsList.ExpressAmount}}</span>
                </yd-cell-item>
            </yd-cell-group>
            <!-- 支付方式 -->
            <yd-cell-group title="支付方式">
                <yd-cell-item type="radio" v-for="(PayListitem, index) in PayList" :key="index" @click.native="GetType(PayListitem.isBrowser)">
                    <span slot="left">{{PayListitem.payName}}</span>
                    <input slot="right" type="radio" :value="PayListitem.payType" v-model="picked" />
                </yd-cell-item>
            </yd-cell-group>
        </div>

        <div class="balancePayment">
            <div class="balance">余额金额 <span>￥{{balance}}</span></div>
            <div class="isSelect">
                <span>优先使用余额支付</span>
                <yd-checkbox color="#ff5f17" size="16" shape="circle" v-model="checkbox1">&nbsp;</yd-checkbox>
            </div>
        </div>

        <div v-for="(item,index) in GoodsList.rows" :key="index">
            <yd-flexbox>
                <yd-flexbox-item class="GroupTitle">{{item.GroupId?item.GroupTitle:'普通商品'}}</yd-flexbox-item>
            </yd-flexbox>
            <yd-flexbox class='goodsListOrder' v-for="(items,index) in item.LstProduct" :key="index">
                <img :src="items.ProductImg" alt="">
                <yd-flexbox-item>
                    <p class="goodstitle">
                        <span>{{items.ProductTitle}}</span>   
                    </p>
                    <div v-if="items.AttValueName" class="size">{{items.AttValueName}}</div>
                    <div v-else class="size">&nbsp;</div>
                    <div class="goodsBottom">
                        <span class="dough">￥{{items.SalePrice}}</span>
                        <span class="goodsIntegral">获赠积分 {{items.Integral}}</span>
                        <span class="goodsNum">x {{items.BuyNum}}</span>
                    </div>
                </yd-flexbox-item>
            </yd-flexbox>
        </div>


        <yd-cell-item class="bomBtnOrder">
            <span slot="left">实付:
                <i class="c-red">￥{{totalPrice}}</i>
            </span>
            <button slot="right" class="BuyCart" type="button" @click="GoBuySomething">提交订单</button>
        </yd-cell-item>

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

        <!-- 老用户绑定手机号码 -->
        <div class="phoneNumber" v-if="phoneNumber">
            <div class="phoneContent">
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">手机号:</span>
                        <yd-input slot="right" v-model="phone" placeholder="请输入手机号码"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">验证码：</span>
                        <yd-input slot="right" type="number" v-model="ImgCode" max="6" placeholder="图片验证码"> </yd-input>
                        <img slot="right" @click="GetImgCode" :src="codeImg" alt="">
                    </yd-cell-item>
                    <div class="DX">
                        <span>短信验证码：</span>
                        <input type="text" placeholder="请输入验证码" v-model="password">
                        <span v-if="isSendable" class="sendcode" @click.self="sendCode1">获取验证码</span>
                        <yd-countdown v-else :time="60" timetype="second" :callback="sendable" class="sendcode">
                            <span><i>倒计时</i>{%s}<i>秒</i></span>
                        </yd-countdown>
                    </div>
                </yd-cell-group>
                <button class="BBtn" @click="BBtn">绑定</button>
                <button class="BBtn gray" @click="closeModal">取消</button>
            </div>
        </div>
    </div>
</template>
<script>
import { GoBuySometing, LOGIN_SUCCESS, GetWeixinPay } from "../main.js"
export default {
    inject: ['reload'],
    data() {
        return {
            GoodsList: [],
            address: [],
            picked: "",
            PayList: [],
            totalPrice: 0,
            Amount: 0,
            TotalsAmount: 0,
            GetTypePay: false,
            GroupOrderIdList: "",
            OrderIdList: "",
            isModal: false,
            modalText: {},
            phoneNumber: false,
            codeImg: "",
            ImgCode: "",
            phone: "",
            password: "",
            start1: false,
            isSendable: true,
            balance: 0,
            checkbox1: true,
            EnoughBalance: '',
            useBalance: 0,
            IsNewTwoPersonChipNo: 0,
            DiscountAmount: 0,
            IsAgent: false,
            empty: false
        };
    },
    created() {
        console.log(this.$route.query.IsDefault)
        this.codeImg = this.$server.serverUrl + "/index/GetImgCode/" + Math.random()
        if(this.$route.query.sid !== undefined) {
            sessionStorage.setItem('sid', this.$route.query.sid)
            sessionStorage.setItem('LuckyProductType', this.$route.query.LuckyProductType)
            sessionStorage.setItem('GroupNo', this.$route.query.GroupNo)
        }
        this.$axios({
            method: "POST",
            data: { 
                orderType: this.$route.query.sid || sessionStorage.getItem('sid')
            },
            url: this.$server.serverUrl + "/order/getorderconfirm",
            responseType: "json"
        }).then(response => {
            if(response.data.success == 100) {
                window.location.href = this.$server.serverUrl  + "/weixin/payOAuth?retUrl=" + escape(this.$server.serverUrl + "/index.html#/cartOrder")
                return
            }
            if (response.data.success == 200) {
                this.GoodsList = response.data
                this.DiscountAmount = response.data.DiscountAmount
                this.IsAgent = response.data.IsAgent
                this.Amount = Number(response.data.Amount.toFixed(2))
                this.TotalsAmount = response.data.TotalsAmount
                this.totalPrice = Number((this.GoodsList.Amount + this.GoodsList.ExpressAmount).toFixed(2))
                this.balance = Number(response.data.balance.toFixed(2))
                if(this.balance >= this.totalPrice) {
                    this.useBalance = this.totalPrice
                }else {
                    this.useBalance = this.balance
                }
            }
        });
        //获取支付地址
        this.$axios({
            method: "POST",
            data: {
                Client: 0
            },
            url: this.$server.serverUrl + "/Paying/GetPayType",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.PayList = response.data.list
                this.picked = response.data.list[0].payType
                this.GetTypePay = response.data.list[0].isBrowser
            }
        });

        //获取收获地址
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/order/getaddress",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                if(this.$route.query.IsDefault === 0 || this.$route.query.IsDefault === 1) {
                    this.address = response.data.rows[this.$route.query.index]
                }else {
                    for (const iterator of response.data.rows) {
                        if (this.$route.params.address_GetId) {
                            if (
                                iterator.AddressId == this.$route.params.address_GetId
                            ) {
                                this.address = iterator;
                                return;
                            }
                        }
                        iterator.IsDefault == 1 ? (this.address = iterator) : "";
                        iterator.IsDefault == 1
                            ? (this.AddressId = iterator.AddressId)
                            : "";
                    }

                }
            }
        })
    },
    watch: {
        checkbox1() {
            if(this.checkbox1 == true) {
                if(this.balance >= this.totalPrice) {
                    this.useBalance = this.totalPrice
                }else {
                    this.useBalance = this.balance
                }
            }else {
                this.useBalance = 0
            }
        }
    },
    methods: {
        sendable() {
            this.isSendable = true
        },
        goBack() {
            this.$router.go(-1);
        },
        GetAddress() {
            this.$router.push({ name: "selectAddress" });
        },
        GetType(e) {
            this.GetTypePay = e;
        },
        GetImgCode() {
            this.codeImg = this.$server.serverUrl + "/index/GetImgCode/" + Math.random()
        },
        isChange() {
            
        },
        sendCode1() {
            if (!(/^1[345789]\d{9}$/.test(this.phone))) {
                this.$dialog.toast({ mes: "手机号有误！" });
                return;
            }
            if (!this.ImgCode) {
                this.$dialog.toast({ mes: "请输入图片验证码！" });
                return;
            }

            this.$axios({
                method: "POST",
                data: {
                    MobilePhone: this.phone,
                    ImgCode: this.ImgCode,
                    type: 0,
                },
                url: this.$server.serverUrl + "/index/GetCode",
                responseType: "json"
            }).then(response => {
                if(response.data.success == 200) {
                    this.isSendable = false
                }else{
                    this.$dialog.toast({
                        mes: response.data.msg,
                        timeout: 1500
                    })
                }
            })
        },
        BBtn() {
            this.$axios({
                method: "POST",
                data: {
                    phone: this.phone,
                    oldPhone: "",
                    code: this.password,
                    type: 0
                },
                url: this.$server.serverUrl + "/account/UpdatePhone",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.phoneNumber = false
                }
                if (response.data.success != 200) {
                    this.$dialog.toast({
                        mes: response.data.msg,
                        timeout: 1500
                    })    
                }
                if( !this.phoneNumber ) {
                    this.reload()
                }
            });
        },
        closeModal() {
            this.phoneNumber = false
            this.reload()
        },
        GoBuySomething() {
            if (!this.picked) {
                this.$dialog.toast({
                    mes: "请选择支付方式",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                    }
                });
                return;
            }
            if (this.GoodsList.rows.length < 1) {
                this.$dialog.toast({
                    mes: "订单超时",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        this.$dialog.alert({ mes: "请重新选择商品！" })
                    }
                });
                return;
            }
            console.log("1:"+this.GroupOrderIdList,"2:"+this.OrderIdList,"3:"+this.picked,"4:"+this.GetTypePay)
            if (this.GroupOrderIdList != 0 || this.OrderIdList != 0) {
                GoBuySometing(
                    this.GroupOrderIdList,
                    this.OrderIdList,
                    this.picked,
                    this.GetTypePay
                );
            } else { 
                this.$axios({
                    method: "POST",
                    data: {
                        addressid: this.address.AddressId,
                        orderType: this.$route.query.sid,
                        useBalance: this.useBalance,
                        TwoPersonChipNo: sessionStorage.getItem("GroupNo")
                    },
                    url: this.$server.serverUrl + "/order/addorder",
                    responseType: "json"
                }).then(response => {
                    //401没绑定手机号码
                    if(response.data.success == 401) {
                        this.phoneNumber = true
                        return
                    }
                    if (response.data.success == 200) {
                        console.log(response.data)
                        this.EnoughBalance = response.data.pay
                        this.GroupOrderIdList = response.data.GroupOrderIdList
                        this.OrderIdList = response.data.OrderIdList
                        this.IsNewTwoPersonChipNo = response.data.IsNewTwoPersonChipNo
                        if(this.IsNewTwoPersonChipNo === 1) {
                            this.$dialog.toast({
                                mes: response.data.msg,
                                timeout: 1500
                            })
                        }
                        if(this.EnoughBalance) {
                            if(this.$route.query.LuckyProductType == 3 || sessionStorage.getItem('LuckyProductType') == 3 && !sessionStorage.getItem('GroupNo')) {
                                this.$router.push({
                                    name: "LuckyShareConfirm",
                                    query: {OrderIdList: this.OrderIdList}
                                })
                            }else {
                                this.$router.push({
                                    name: "ShopGoodsList",
                                    query: {
                                        plan: 2
                                    }
                                })
                            } 
                        }else {    
                            GoBuySometing(
                                this.GroupOrderIdList,
                                this.OrderIdList,
                                this.picked,
                                this.GetTypePay,
                                'LuckyDouble',
                                this.OrderIdList
                            );
                        }
                        return
                    }
                    this.empty = true
                    setTimeout(()=>{
                        this.empty = false
                    }, 2000)
                    this.$dialog.toast({
                        mes: response.data.msg,
                        timeout: "1500",
                        icon: "error"
                    })
                })

            }
        },
        
        conceal() {
            this.isModal = false;
        }
    }
};
</script>
<style lang="scss">
.GroupTitle {
    color: #cccccc;
    padding: 0rem 0.3rem 0.1rem;
    font-size: 0.3rem;
    color: #888;
}
.orderList {
    margin: 1rem 0;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .balancePayment {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 0.2rem;
        background: #fff;
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        padding-top: 0.2rem;
        padding-bottom: 0.2rem;
        .balance {
            font-size: 0.3rem;
            span {
                color: #ff5f17;
                font-weight: bold;
            }
        }
        .isSelect {
            color: #AEAEAE;
            >span {
                margin-right: 0.1rem;
            }
        }
    }
}
.bomBtnOrder {
    border-top: 1px solid #f2f2f2;
    position: fixed !important;
    display: flex;
    background: #fff;
    left: 0;
    bottom: 0rem;
    height: 1rem;
    width: 100%;
    align-self: center;
    justify-content: flex-end;
    .BuyCart {
        border-radius: 20px;
        background: #ff5f17;
        font-size: 0.26rem;
        color: #f2f2f2;
        border: #ff5f17 1px solid;
        width: 2rem;
        align-self: center;
        height: 0.8rem;
        text-align: center;
    }
}

.address {
    background: #fffced;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    .address_left {
        width: 1rem;
        text-align: center;
        font-size: 0.26rem;
    }
    .address_right {
        padding: 0 0.5rem;
        font-size: 0.26rem;
    }
    .moren {
        border: 1px solid;
        color: #ff5f17;
        padding: 0.02rem 0.04rem;
    }
}
.empty {
    background: #ff5f17;
}
.font25 {
    font-size: 0.3rem;
}

.goodsListOrder {
    display: flex;
    padding: 0.3rem;
    background: #fff;
    > img {
        width: 1.5rem;
        height: 1.5rem;
    }
    .goodstitle {
        font-size: 0.25rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
    }
    .size {
        font-size: 0.24rem;
        display: flex;
        justify-content: space-between;
        padding: 0.06rem 0.3rem;
        color: #999;
    }
    .goodsBottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .dough {
            padding-left: 0 0.3rem;
            margin-right: 0.2rem;
            font-size: 0.26rem;
            color: #ff5f17;
        }
        .goodsIntegral {
            color: #ff5f17;
        }
        .goodsNum {
            flex: 1;
            text-align: right;
            padding-right: 0.3rem;
            font-size: 0.26rem;
            font-weight: bold;
        }
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
.phoneNumber {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 101;
    background-color: rgba(0,0,0,0.5);
    .phoneContent {
        position: absolute;
        left: 5%;
        right: 5%;
        top: 40%;
        margin-top: -2.5rem;
        background: #fff;
        padding-bottom: 0.6rem;
        .BBtn {
            border: none;
            width: 80%;
            margin-left: 10%;
            margin-top: 0.4rem;
            background: rgb(2, 189, 2);
            border-radius: 0.1rem;
            padding: 0.2rem 0;
            color: #fff;
            font-size: 0.3rem;
        }
        .gray {
            background: #ccc;
        }
        .DX {
            padding-left: 0.3rem;
            font-size: 0.28rem;
            input {
                border: none;
                width: 40%; 
                height: 1rem; 
            }
            .sendcode {
                display: inline-block;
                padding-left: 0.2rem;
                border-left: 1px solid red;
                color: red;
            }
        }
    }
}
</style>
