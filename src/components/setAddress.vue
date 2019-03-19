<template>
    <div class="setAddress">
        <yd-navbar slot="navbar" title="地址编辑" height='.8rem' color="#f2f2f2" class="titleColor">
            <router-link to="" slot="left" @click.native="returnGo">
                <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
            </router-link>
            <router-link to="" color="#f2f2f2" slot="right" @click.native="verify(AddressId)">
                <span style="color:#fff"> 保存</span>
            </router-link>
        </yd-navbar>

        <yd-cell-group v-if="hasList">
            <yd-cell-group>
                <yd-cell-item arrow>
                    <span slot="left">所在地区：</span>
                    <input slot="right" type="text" @click.stop="show2 = true" v-model="model2" readonly placeholder="请选择收货地址">
                </yd-cell-item>
            </yd-cell-group>

            <yd-cityselect v-model="show2" ref="cityselectDemo" :callback="result2" :items="district" provance="" city="" area=""></yd-cityselect>
            <yd-cell-item>
                <input slot="right" type="text" v-model="s_address" placeholder="门牌号">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">姓名：</span>
                <yd-input slot="right" required v-model="s_name" max="20" placeholder="请输入收货人姓名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号：</span>
                <input slot="right" type="tel" v-model="s_tel" placeholder="请输入手机号" maxlength="11">
            </yd-cell-item>
            <!-- <yd-cell-item>
                <span slot="left" @click="changeIsDefault(0)" class="iconfont icon-selected green" v-if="IsDefault==1">
                    <i> 设置默认</i>
                </span>
                <span slot="left" @click="changeIsDefault(1)" class="iconfont icon-selected gray" v-if="IsDefault!=1">
                    <i> 设置默认</i>
                </span>
            </yd-cell-item> -->
        </yd-cell-group>

        <yd-cell-group v-if="!hasList">
            <yd-cell-group>
                <yd-cell-item arrow>
                    <span slot="left">所在地区：</span>
                    <input slot="right" type="text" @click.stop="show2 = true" v-model="model2" readonly placeholder="请选择收货地址">
                </yd-cell-item>
            </yd-cell-group>

            <yd-cityselect v-model="show2" ref="cityselectDemo" :callback="result2" :items="district" provance="" city="" area=""></yd-cityselect>
            <yd-cell-item>
                <input slot="right" type="text" v-model="s_address" placeholder="门牌号">
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">姓名: </span>
                <yd-input slot="right" required v-model="s_name" max="20" placeholder="请输入收件人姓名"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">手机号：</span>
                <input slot="right" type="tel" v-model="s_tel" placeholder="请输入手机号" maxlength="11">
            </yd-cell-item>
            <!-- <yd-cell-item>
                <span slot="left" @click="changeIsDefault(0)" class="iconfont icon-selected green" v-if="IsDefault==1">
                    <i> 设置默认</i>
                </span>
                <span slot="left" @click="changeIsDefault(1)" class="iconfont icon-selected gray" v-if="IsDefault!=1">
                    <i> 设置默认</i>
                </span>
            </yd-cell-item> -->
            <yd-cell-item @click.native='delAddress()'>
                <span slot="left" style="color:red"> 删除收货地址</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="s_address">
            <button type="button" @click="verify(AddressId)">
                保存地址</button>
        </div>
    </div>
</template>
<script>
/* 前提是已经安装了 ydui-district */
import District from "ydui-district/dist/jd_province_city_area_id";
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            show2: false,
            model2: "",
            district: District,
            s_name: "",
            switch1: false,
            s_address: "",
            s_tel: "",
            IsDefault: 0,
            hasList: true,
            AddressId: "",
            Province: "",
            CityName: "",
            AreaName: ""
        };
    },
    created() {
        if (this.$route.params.address_id) {
            console.log(this.$route.params.address_id);

            this.AddressId = this.$route.params.address_id;
            localStorage.removeItem("dd");
            localStorage.setItem("dd", this.$route.params.address_id);
            this.getAddress();
        }
        if (localStorage.getItem("dd")) {
            console.log(this.$route.params.address_id);

            console.log(localStorage.dd);
            this.AddressId = localStorage.dd;
            this.getAddress();
        }
    },
    methods: {
        changeIsDefault(num) {
            console.log(num);
            this.IsDefault = num;
        },
        //获取地址
        getAddress() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getaddress",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    for (const iterator of response.data.rows) {
                        if (
                            this.$route.params.address_id ==
                                iterator.AddressId ||
                            localStorage.dd == iterator.AddressId
                        ) {
                            this.model2 = iterator.FullAreaName;
                            // this.Province = iterator.Province;
                            // this.CityName = iterator.CityName;
                            this.IsDefault = iterator.IsDefault;
                            this.s_address = iterator.Address;
                            this.s_name = iterator.ShipTo;
                            this.s_tel = iterator.ShipPhone;
                            this.IsDefault = iterator.IsDefault;
                            this.hasList = false;
                        }
                    }
                }
            });
        },
        //删除地址
        delAddress() {
            this.$axios({
                method: "POST",
                data: {
                    addressid: this.AddressId
                },
                url: this.$server.serverUrl + "/order/deleteaddress",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.$router.push({ name: "selectAddress" });
                }
            });
        },

        result2(ret) {
            this.model2 =
                ret.itemName1 + "-" + ret.itemName2 + "-" + ret.itemName3;
        },
        returnGo() {
            this.$router.go(-1);
        },
        verify() {
            if (!this.model2) {
                this.$dialog.toast({
                    mes: "你没填省市区啊！",
                    timeout: 1500
                });
                return;
            }
            if (!this.s_address) {
                this.$dialog.toast({
                    mes: "你门牌号没写！",
                    timeout: 1500
                });
                return;
            }
            if (!this.s_name) {
                this.$dialog.toast({
                    mes: "名字都没个叫你啥？",
                    timeout: 1500
                });
                return;
            }
            if (!this.s_tel) {
                this.$dialog.toast({
                    mes: "电话呢？兄die",
                    timeout: 1500
                });
                return;
            }
            if (this.s_tel.length < 11) {
                this.$dialog.toast({
                    mes: "电话长度不对~~",
                    timeout: 1500
                });
                return;
            }
            console.log(this.model2);
            if (this.AddressId == "new") {
                this.addaddress();
            }
            if (!isNaN(this.AddressId)) {
                this.saveAddress();
            }
        },
        saveAddress() {
            this.$axios({
                method: "POST",
                data: {
                    fullareaname: this.model2,
                    address: this.s_address,
                    shipto: this.s_name,
                    shipphone: this.s_tel,
                    addressid: this.AddressId,
                    isdefault: 1
                },
                url: this.$server.serverUrl + "/order/saveaddress",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.address = response.data.object;
                    this.$router.go(-1);
                }
            });
        },
        addaddress() {
            this.$axios({
                method: "POST",
                data: {
                    fullareaname: this.model2,
                    address: this.s_address,
                    shipto: this.s_name,
                    shipphone: this.s_tel,
                    isdefault: 1
                },
                url: this.$server.serverUrl + "/order/addaddress",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.address = response.data.object;
                    this.$router.go(-1);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.icon-selected {
    font-size: 0.3rem;
    > i {
        font-size: 0.26rem;
        color: #555;
    }
}
.setAddress {
    .s_address {
        text-align: center;
        > button {
            width: 4rem;
            color: #fff;
            font-size: 0.26rem;
            border: none;
            border-radius: 60px;
            background: linear-gradient(
                -90deg,
                rgba(234, 63, 50, 1),
                rgba(237, 121, 71, 1)
            );
            > img {
                width: 0.4rem;
                vertical-align: middle;
            }
            padding: 0.2rem;
        }
    }
}
</style>
