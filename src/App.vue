<template>
    <div id="app">
        <router-view v-if="isRouterAlive"/>
        <!-- <yd-popup v-model="winModal" position="center" width="90%"> -->
        <div class="AppPopup" v-if="winModal">
            <div class="winModal">
                <div class="closeImg" v-if="TwoPersonChipObj.WinStatus === 0" @click="closeAppModal">
                    <img src="./assets/Img/close1.png" alt="">
                </div>
                <div class="winTop">
                    <img src="./assets/Img/LOGO.png" alt="">
                    <span>拼团成功</span>
                </div>
                <div class="pic">
                    <transition name="left" enter-active-class="animated bounceInLeft">    
                        <div v-if="winModal" class="leftPic">
                            <img :src="TwoPersonChipList[0].UserIcon">
                        </div>
                    </transition>
                    <transition name="right" enter-active-class="animated bounceInRight">
                        <div v-if="winModal" class="rightPic">
                            <img :src="TwoPersonChipList[1].UserIcon">
                        </div>
                    </transition>
                    <transition enter-active-class="animated fadeIn">
                        <div v-if="winModal" class="leftName">{{TwoPersonChipList[0].UserName}}</div>
                    </transition>
                    <transition enter-active-class="animated fadeIn">
                        <div v-if="winModal" class="rightName">{{TwoPersonChipList[1].UserName}}</div>
                    </transition>
                </div>
                <div class="winGoods">
                    <div class="goods-img">
                        <img :src="TwoPersonChipObj.ProductImg">
                    </div>
                    <div class="goods-right">
                        <p>{{TwoPersonChipObj.ProductTitle}}</p>
                        <span>￥{{TwoPersonChipObj.BuyPrice}}</span>
                    </div>
                </div>
                <div class="lotteryResults">开奖结果</div>
                <div class="hint">
                    <span v-if="TwoPersonChipObj.WinStatus ===1">恭喜您 0 元获得商品</span>
                    <span v-if="TwoPersonChipObj.WinStatus ===0">很遗憾，差点免单</span>
                </div>
                <div class="subHint" v-if="TwoPersonChipObj.WinStatus === 1">(请领取您的免单款<span>￥{{TwoPersonChipObj.BuyPrice}}</span>)</div>
                <div class="subHint" v-if="TwoPersonChipObj.WinStatus === 0">(幸运免单用户 <span v-for="(item, index) in TwoPersonChipList" :key="index" v-if="item.WinStatus === 1">{{item.UserName}}</span>)</div>
                <div class="winBtn" @click="GoRemainingSum" v-if="TwoPersonChipObj.WinStatus === 1">立即领取</div>
                <div class="winBtn" @click="GoFreeOfCharge" v-else>领取新的免单机会</div>
                <div class="NoviceGuideModal" v-if="NoviceGuideGlobalModal"  @click="CancelGlobalModal">
                    <div class="GuideModalTop">
                        <img src="./assets/Img/Novice-guide-map3.png">
                    </div>
                    <div class="GuideModalBottom">

                    </div>
                </div>
            </div>
        </div>
        <!-- </yd-popup> -->


        <!-- 新用户绑定手机号码 -->
        <div class="appPhoneNumber" v-if="appPhoneNumber">
            <div class="phoneContent">
                <div class="appTitle">验证手机号码</div>
                <yd-cell-group>
                    <yd-cell-item>
                        <span slot="left">手机号:&nbsp;&nbsp;&nbsp;</span>
                        <yd-input slot="right" v-model="AppPhone" placeholder="请输入手机号码"></yd-input>
                    </yd-cell-item>
                    <div class="DX">
                        <span>短信验证码：</span>
                        <input type="text" placeholder="请输入验证码" v-model="code">
                        <span v-if="isAppSendable" class="sendcode" @click.self="sendCode1">获取验证码</span>
                        <yd-countdown v-else :time="60" timetype="second" :callback="sendable" class="sendcode">
                            <span><i>倒计时</i>{%s}<i>秒</i></span>
                        </yd-countdown>
                    </div>
                </yd-cell-group>
                <button class="BBtn" @click="BBtn">绑定</button>
            </div>
        </div>
    </div>
</template>

<script>
import BanTouch from './module/BanTouch.js'
export default {
    name: "App",
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive:true,
            winModal: false,
            TwoPersonChipObj: {},
            TwoPersonChipList: [],
            NoviceGuideGlobalModal: false,
            timer: '',
            appPhoneNumber: false,
            isAppSendable: true,
            AppPhone: "",
            password: "",
            code: ""
        };
    },
    created() {
        this.timer = setInterval(()=>{
            setTimeout(this.GetOrderPush, 0)//避免页面卡死
        }, 5000)


        //新人绑定号码
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/UserCenter/IsBingPhone",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 402) {
                this.appPhoneNumber = true
            }
        });
    },
    destroyed() {
        clearInterval(this.timer)
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(function() {                                                                
                this.isRouterAlive = true
            })
        },
        GoRemainingSum() {
            this.winModal = false
            BanTouch.move()
            this.$router.push({
                path: "/RemainingSum"
            })
        },
        GetOrderPush() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/Order/GetOrderPush",
                responseType: "json"
            }).then(response => {
                if(response.data.success === 200) {
                    this.TwoPersonChipObj = response.data.data
                    this.TwoPersonChipList = response.data.data.list
                    this.winModal = true
                    // BanTouch.stop()
                    this.NoviceGuideGlobalModal = false
                    if((!localStorage.getItem('GlobalModal1')) && this.TwoPersonChipObj.WinStatus == 1) {
                        this.NoviceGuideGlobalModal = true
                        localStorage.setItem("GlobalModal1", true)
                    }
                }
            })
        },
        closeAppModal() {
            this.winModal = false
            BanTouch.move()
        },
        CancelGlobalModal() {
            this.NoviceGuideGlobalModal = false
            BanTouch.move()
        },
        GoFreeOfCharge() {
            this.winModal = false
            BanTouch.move()
            this.$router.push({
                name: 'FreeOfCharge'
            })
        },

        sendCode1() {
            if (!(/^1[345789]\d{9}$/.test(this.AppPhone))) {
                this.$dialog.toast({ mes: "手机号有误！" });
                return;
            }

            this.$axios({
                method: "POST",
                data: {
                    MobilePhone: this.AppPhone,
                    type: 100,
                },
                url: this.$server.serverUrl + "/index/GetCode",
                responseType: "json"
            }).then(response => {
                if(response.data.success == 200) {
                    this.isAppSendable = false
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
                    phone: this.AppPhone,
                    code: this.code,
                    type: 100
                },
                url: this.$server.serverUrl + "/WeiXin/LoginValidatePhone",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.appPhoneNumber = false
                    this.reload()
                }
            });
        },
        sendable() {
            this.isAppSendable = true
        }
    }
}
</script>

<style lang='scss'>
html,body,#app{
//   height: 100%;
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.appPhoneNumber {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1600;
    background-color: rgba(0,0,0,0.5);
    .phoneContent {
        position: absolute;
        left: 5%;
        right: 5%;
        top: 40%;
        margin-top: -2.5rem;
        background: #fff;
        padding-bottom: 0.6rem;
        .appTitle {
            text-align: center;
            padding: 0.3rem 0;
            font-size: 0.34rem;
            font-weight: bold;
        }
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
body {
    margin: 0;
}
.c-white {
    color: #fff !important;
}
.c-red {
    color: #ff6143 !important;
}
.gray {
    color: #ccc;
}
.green {
    color: #09bb07;
}

.mt-progress-runway {
    background-color: #8a8a8a;
}
.mt-progress-progress {
    background-color: #ff5f17;
}
.titleColor {
    background: linear-gradient(to left, #ea3f32, #ed7947);
}
.orderBtn {
    height: 0.5rem;
    width: 1.4rem;
    border: none;
    border-radius: 5px;
    outline: none;
    margin-top: 0.3rem;
}
.grayBtn {
    background: #fff;
    border: 1px solid;
    color: #555;
}

//幸运双拼长轮询弹窗
.AppPopup {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1550;
    background: rgba($color: #000000, $alpha: 0.3);
    .winModal {
        position: absolute;
        top: 50%;
        left: 5%;
        background: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 0.2rem;
        padding: 0.4rem 0.4rem 0.3rem;
        width: 90%;
        transform: translateY(-55%);
        overflow: hidden;
        .closeImg {
            position: absolute;
            top: 0.3rem;
            right: 0.4rem;
            width: 0.4rem;
            img {
                width: 100%;
            }
        }
        .winTop {
            display: flex;
            align-items: center;
            margin-bottom: 0.3rem;
            img {
                width: 1.1rem;
                margin-right: 0.2rem;
            }
            span {
                font-size: 0.48rem;
                font-weight: bold;
            }
        }
        .pic {
            position: relative;
            width: 100%;
            height: 1.6rem;
            .leftPic {
                position: absolute;
                top: 0;
                left: 50%;
                margin-left: -1.4rem;
                img {
                    border-radius: 50%;
                    overflow: hidden;
                    width: 1rem;
                    height: 1rem;
                }
            }
            .leftName {
                position: absolute;
                top: 1.2rem;
                left: 50%;
                margin-left: -1.6rem;
                padding: 0 0.1rem;
                width: 1.4rem;
                height: 0.32rem;
                text-align: center;
                background: #F3F3F3;
                border-radius: 0.04rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .rightPic {
                position: absolute;
                top: 0;
                right: 50%;
                margin-right: -1.4rem;
                img {
                    border-radius: 50%;
                    overflow: hidden;
                    width: 1rem;
                    height: 1rem;
                }
            }
            .rightName {
                position: absolute;
                top: 1.2rem;
                right: 50%;
                margin-right: -1.6rem;
                padding: 0 0.1rem;
                width: 1.4rem;
                height: 0.32rem;
                text-align: center;
                background: #F3F3F3;
                border-radius: 0.04rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .xing1 {
                position: absolute;
                width: 0.4rem;
                height: 0.4rem;
                top: -1rem;
                left: 0;
                opacity: 0;
            }
            .xing1-enter {
                opacity: 1;
            }
            .xing1-enter-active {
                animation: xing1 .4s ease;
                transition: opacity .4s ease;
            }
            .xing1-enter-to {
                opacity: 0;
            }
        }
        .winGoods {
            display: flex;
            justify-content: space-between;
            margin-top: 0.1rem;
            .goods-img {
                width: 1.1rem;
                height: 1.1rem;
                margin-right: 0.2rem;
                img {
                    width: 100%;
                }
            }
            .goods-right {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                font-size: 0.25rem;
                margin-bottom: 0.4rem;
                span {
                    color: #F02B22;
                }
            }
        }
        .lotteryResults {
            width: 2.45rem;
            background: #454545;
            color: #fff;
            text-align: center;
            height: 0.46rem;
            line-height: 0.46rem;
            border-radius: 0.1rem;
            margin-top: 0.2rem;
            margin-bottom: 0.3rem;
        }
        .hint{
            font-size: 0.4rem;
            color: #FF3450;
        }
        .subHint {
            color: #878787;
            margin-bottom: 0.4rem;
            span {
                color: #F02B22;
                font-weight: bold;
            }
        }
        .winBtn {
            width: 90%;
            height: 0.73rem;
            line-height: 0.73rem;
            color: #fff;
            background: linear-gradient(to right, #F02B22, #FC2D59);
            text-align: center;
            border-radius: 0.6rem;
        }
        .NoviceGuideModal {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            .GuideModalTop {
                position: absolute;
                top: 0;
                right: 0;
                left: 0;
                bottom: 1.2rem;
                background: rgba($color: #000000, $alpha: 0.7);
                img {
                    width: 100%;
                }
            }
            .GuideModalBottom {
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                height: 1.2rem;
            }
        }
    }
}
</style>
