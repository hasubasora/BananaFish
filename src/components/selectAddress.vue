<template>
    <div class="addressLists">
        <yd-navbar slot="navbar" fixed title="地址选择" height='.8rem' class="titleColor" color='#fff'>
            <div @click="goBack" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </div>

            <router-link to="" @click.native="CompileAddress('new')" slot="right" >
                <span style="color:#fff"> 新增地址</span>
            </router-link>
        </yd-navbar>
        <div class="addressListsGroup">
            <yd-preview :buttons="btns" v-for="(item, index) in addressList" :key="index">
                <yd-preview-header>
                    <div slot="left">{{item.ShipTo}}</div>
                    <div slot="left">{{item.ShipPhone}}</div>
                    <div slot="right"></div>
                </yd-preview-header>

                <div @click.native="SelectToDef(item.AddressId)" style="padding:0 .3rem;">
                    <p>{{item.Province}}{{item.CityName}}{{item.AreaName}}{{item.Address}}</p>
                </div>
                <yd-preview-header @click.native="goAddress">
                    <div slot="left">
                        <span @click.stop="SetdefultAddress(item.AddressId)" class="iconfont icon-selected" :class="{gray: item.IsDefault != 1}">
                            <i> 设为默认地址</i>
                        </span>
                    </div>
                    <!-- <div slot="center">
                        <router-link :to="'/cartOrder/0'">
                            <span class="jump"></span>
                        </router-link> 
                    </div> -->
                         
                    <div slot="right">
                        <div class="SetGet" @click.stop="CompileAddress(item.AddressId)">删除</div>
                        <div class="SetGet" @click.stop="CompileAddress(item.AddressId)">编辑</div>
                    </div>
                </yd-preview-header>
            </yd-preview>
          
        </div>
    </div>
</template>

<script>
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            addressList: "",
            checkbox6: ["1"],
            radio1: 1,
            btns: []
        };
    },
    created() {
        this.GetAddressList();
    },
    methods: {
        //新增地址

        CompileAddress(uid) {
            this.$router.push({
                name: "setAddress",
                params: { address_id: uid }
            });
        },
        SelectToDef(num) {
            this.$router.push({
                name: "cartOrder",
                params: { address_GetId: num }
            });
        },
        GetAddressList() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getaddress",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.addressList = response.data.rows;
                    console.log(response.data);
                }
            });
        },
        SetdefultAddress(id) {
            //设置地址默认
            this.$axios({
                method: "POST",
                data: {
                    addressid: id,
                    isdefault: 1
                },
                url: this.$server.serverUrl + "/order/saveaddressdefault",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.GetAddressList();
                }
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        goAddress() {
            if(sessionStorage.getItem('AddressJumpPath') === 'FreeOfCharge') {
                this.$router.push({path: '/FreeCartOrder'})
                sessionStorage.removeItem('AddressJumpPath')
            }else {
                this.$router.push({path: "/cartOrder"})
            }
        }
    }
};
</script>

<style lang="scss">
.addressListsGroup {
    // border: 1px solid;
    margin: 1rem 0;
    .jump{
        display: inline-block;
        width: 3rem;
        height: 0.4rem;
    }
    .addressGroup {
        padding: 0.3rem;
        border-top: 1px solid #f2f2f2;
        background: #fff;
        .SetGet {
            display: inline-block;
            padding: 0 0.1rem;
            @extend .gray;
        }
    }
    .SetGet {
        display: inline-block;
        padding: 0 0.1rem;
        @extend .gray;
    }
}
.icon-selected {
    padding-right: 0.1rem;
    color: rgb(255, 92, 42);
    font-size: 0.3rem;
    > i {
        font-size: 0.26rem;
    }
}
.gray {
    color: #aaa;
}
</style>

