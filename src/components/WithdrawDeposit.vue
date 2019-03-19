<template>
    <div class="WithdrawDeposit">
        <yd-navbar fixed slot="navbar" title="余额提现" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>
            <router-link to="/WithdrawalRecord" slot="right" class="goToRecord">提现记录</router-link>
        </yd-navbar>
        <div class="wd_back">
            <span class="wd_back_txt">提现金额</span>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left" style="font-size:0.8rem; margin-top: 0.2rem;">￥</span>
                    <yd-input slot="right" class="wd_input" v-model="input6" type="number" regex="^\d{1,12}$" @click.native="isBinding" required></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">
                        <p class="wd_back_price">可提现余额 ￥{{shabi}}</p>
                    </span>
                    <span slot="right" @click="GetAllPrice" class="c-red">全部提现</span>
                </yd-cell-item>
            </yd-cell-group>
        </div>
        <yd-cell-group title="提现方式">
            <yd-cell-item type="radio" v-for="(item, index) in PayList" :key="index" v-if="index === 0">
                <span slot="left" v-if="PayNumber[index]">{{item.name}}（{{PayNumber[index].DrawAccount}}）</span>
                <span slot="left" v-else>{{item.name}}</span>
                <input slot="right" type="radio" :value="item.type" v-model="picked" @click="GetCardInfo(index)" />
            </yd-cell-item>
        </yd-cell-group>

        <div class="wd_button">
            <button type="button" @click="ToCard">提现</button>
        </div>

        <div class="TheModal" v-if="DownModal" @touchmove.prevent>
            <div class="ModalContent">
                <img class="TheClose" @click="goToHome" src="../assets/Img/close.png"/>
                <div class="TheImg">
                    <p>恭喜成功提现红包</p>
                    <h2 class="TheRedpacket">{{input6}} <span>元</span></h2>
                    <img class="portrait" :src="UserIcon" alt="">
                    <div class="user">{{NickName}}</div>
                    <p class="downApp">下载APP再领一次红包</p>
                    <img class="withdrawBtn" @click="goToDown" src="../assets/Img/drawBtn.png" alt="">
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
                        <yd-input slot="right" type="number" v-model="ImgCode" max="6" placeholder="图片验证码"></yd-input>
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
<style lang="scss">
.WithdrawDeposit {
    padding-top: 1rem;
    .goToRecord {
        color: #fff;
    }
    .wd_back {
        background: #fff;
        height: 3.2rem;
        margin: 0 0.2rem 0.2rem;
        // text-align: center;
        border-radius: 5px;
        padding: 0.2rem;
        .wd_back_txt {
            font-size: 0.24rem;
            display: block;
        }
        .yd-cell:after {
            border: none;
        }
        .wd_input {
            margin-top: 0.2rem;
            > input {
                color: #000;
                font-size: 0.7rem;
                height: 1rem;
            }
        }
        .wd_back_price {
            // display: block;
            // font-weight: bold;
            font-size: 0.24rem;
            // color: #ff6143;
            // margin-bottom: 0.2rem;
        }
        .wd_back_btn {
            width: 4rem;
            font-size: 0.26rem;
            border: 1px solid #ff6143;
            border-radius: 60px;
            color: #ff6143;
            padding: 0.2rem;
        }
    }
    .wd_button {
        text-align: center;
        [type="button"] {
            width: 4rem;
            margin: 0 auto;
            color: #fff;
            font-size: 0.26rem;
            border: none;
            border-radius: 60px;
            display: block;
            background: linear-gradient(
                -90deg,
                rgba(234, 63, 50, 1),
                rgba(237, 121, 71, 1)
            );
            padding: 0.2rem;
        }
    }
    .TheClose {
        position: absolute;
        right: 0.4rem;
        top: 0.4rem;
        width: 0.6rem;
    }
    .TheModal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 1000;
        background-color: rgba(0,0,0,0.5);
        .ModalContent {
            position: absolute;
            background: url(../assets/Img/drawBg.png) no-repeat;
            background-size: contain;
            background-position: center top;
            top: 10%;
            bottom: 10%;
            left: 5%;
            right: 5%;
            .TheImg {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: absolute;
                margin-top: 28%;
                width: 100%;
                .portrait {
                    width: 1rem;
                    display: block;
                    border: 2px solid #fff;
                    border-radius: 50%;
                    margin-bottom: 0.1rem;
                }
                p {
                    text-align: center;
                    color: #D59951;
                    font-size: 0.4rem;
                    margin-bottom: 0.1rem;
                }
                .TheRedpacket {
                    font-size: 0.8rem;
                    margin-bottom: 0.1rem;
                    color: #D59951;
                    span {
                        font-size: 0.4rem;
                    }
                }
                .user {
                    color: #fff;
                    font-size: 0.28rem;
                    margin-bottom: 0.1rem;
                }
                .downApp {
                    color: #fff;
                    font-size: 0.36rem;
                }
                .withdrawBtn {
                    width: 60%;
                }
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
}
</style>
 
 <script>
 import { LOGIN_SUCCESS } from "../main.js";
export default {
    inject: ['reload'],
    data() {
        return {
            shabi: "",
            input6: "",
            picked: 0,
            CardID: "",
            CardNumber: "",
            PayNumber: [],
            PayList: [],
            pitchIndex: 0,
            DownModal: false,
            NickName: "",
            UserIcon: "",
            IsStorage: "",
            phoneNumber: false,
            codeImg: "",
            ImgCode: "",
            phone: "",
            password: "",
            start1: false,
            isSendable: true
        };
    },
    created() {
        this.IsStorage = window.localStorage.getItem("NEWDIE")
        this.codeImg = this.$server.serverUrl + "/index/GetImgCode/" + Math.random()
        this.GetCard();
        this.GetPrice();
        this.GetWithdrawType();
        this.$axios({
            method: "POST",
            data: {},
            url:
                this.$server.serverUrl + "/account/getmyaccount",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                console.log(response.data);
                this.NickName = response.data.object.NickName
                this.UserIcon = response.data.object.UserIcon
            }
        });
    },
    methods: {
        sendable() {
            this.isSendable = true
        },
        GetCardInfo(dataIndex) {
            this.pitchIndex = dataIndex
            switch (dataIndex) {
                case 0:
                    if(!this.PayNumber[0]) {
                        this.$router.push({ name: "TheCoupleWithdrawal" });
                    }
                    break;
                case 1:
                    if (this.PayNumber[dataIndex] == undefined) {
                        this.$router.push({ name: "BankCard" });
                    }
                    break;
                default:
                    break;
            }
        },
        GetCard() {
            this.$axios({
                method: "POST",
                data: {},
                url:
                    this.$server.serverUrl + "/UserCenter/GetMemberDrawAccount",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    console.log(response.data);
                    this.PayNumber = response.data.list;
                }
            });
        },
        GetWithdrawType() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/GetWithdrawType",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    console.log(response.data)
                    this.PayList = response.data.Draw;
                }
            });
        },
        GetPrice() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/GetBalance",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    this.shabi = Number(response.data.balance);
                }
            });
        },
        GetAllPrice() {
            this.input6 = this.shabi;
        },
        goToHome() {
            this.$router.push({path: "/"})
        },
        goToDown() {
            this.DownModal = false
            this.input6 = ""
            this.reload()
            var u = navigator.userAgent;
            if(u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.hz.mall"
            }else if (u.indexOf('iPhone') > -1) {
                window.open("https://itunes.apple.com/cn/app/%E5%A4%B4%E7%AD%B9%E8%B4%AD/id1440461607?mt=8")
            }
        },
        isBinding() {
            console.log("111")
            if(!this.PayNumber[0]) {
                this.$router.push({
                    path: "/TheCoupleWithdrawal"
                })
            }
        },
        GetImgCode() {
            this.codeImg = this.$server.serverUrl + "/index/GetImgCode/" + Math.random()
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
                    this.$dialog.alert({
                        mes: response.data.msg
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
                console.log(response.data)
                if (response.data.success == 200) {
                    this.phoneNumber = false
                    this.reload()
                }
                if (response.data.success != 200) {
                    this.$dialog.alert({
                        mes: response.data.msg
                    });
                    return;
                }
            });
        },
        closeModal() {
            this.phoneNumber = false
        },
        ToCard() {
            if (!this.input6) {
                this.$dialog.toast({
                    mes: "请输入提现金额",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            if (this.input6 <= 0) {
                this.$dialog.toast({
                    mes: "请输入提现金额",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            if (this.input6 > this.shabi) {
                this.$dialog.toast({
                    mes: "余额不足",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            if (!this.PayNumber[this.pitchIndex]) {
                this.$dialog.toast({
                    mes: "请绑定提现方式",
                    timeout: 1500
                })
                return
            }

            if (!this.picked && this.picked != 0) {
                this.$dialog.toast({
                    mes: "选择提现方式",
                    timeout: 1500,
                    icon: "error",
                    callback: () => {
                        return;
                    }
                });
                return;
            }
            this.$axios({
                method: "POST",
                data: {
                    DrawId: this.picked,
                    DrawAmount: this.input6
                },
                url: this.$server.serverUrl + "/UserCenter/Withdraw",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 200) {
                    if(window.localStorage.getItem("NEWBIE") == 1) {
                        window.localStorage.setItem("NEWBIE", 0)
                        this.DownModal = true
                    }else {
                        this.$dialog.alert({
                            mes: response.data.msg,
                            callback: ()=> {
                                this.input6 = ""
                                this.reload()
                            }
                        })
                    }                     
                }else if(response.data.success == 401) {
                    this.$dialog.confirm({
                        title: '',
                        mes: response.data.msg,
                        opts: () => {
                            this.phoneNumber = true
                        }
                    });
                }else {
                    this.$dialog.alert({
                        mes: response.data.msg
                    })
                }
            });
        }
    }
};
</script>
 