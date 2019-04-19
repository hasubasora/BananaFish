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
        <div class="addressListsGroup" v-if="addressList.length">
            <yd-preview :buttons="btns" v-for="(item, index) in addressList" :key="index">
                <yd-preview-header>
                    <div slot="left">{{item.ShipTo}}</div>
                    <div slot="left">{{item.ShipPhone}}</div>
                    <div slot="right"></div>
                </yd-preview-header>

                <div @click.native="SelectToDef(item.AddressId)" style="padding:0 .3rem;">
                    <p>{{item.Province}}{{item.CityName}}{{item.AreaName}}{{item.Address}}</p>
                </div>
                <yd-preview-header @click.native="goAddress(index, item.IsDefault, item.AddressId)">
                    <div slot="left">
                        <span @click.stop="SetdefultAddress(item.AddressId)" class="iconfont icon-selected" :class="{gray: item.IsDefault != 1}">
                            <i> 设为默认地址</i>
                        </span>
                    </div>      
                    <div slot="right">
                        <div class="SetGet" @click.stop="CompileAddress(item.AddressId)">删除</div>
                        <div class="SetGet" @click.stop="CompileAddress(item.AddressId)">编辑</div>
                    </div>
                </yd-preview-header>
            </yd-preview>
        </div>
        <div class="addBtn" @click="CompileAddress('new')" v-else>
            <div class="btnImg">
                <img src="../assets/Img/upload.png">
                <span>点击新增收货地址</span>
            </div>
        </div>
    </div>
</template>

<script>
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            addressList: [],
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
            this.$router.replace({
                name: "setAddress",
                query: { address_id: uid, compile: 'compile' }
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
            })
        },
        goBack() {
            this.$router.go(-1)
        },
        goAddress(index, IsDefault, AddressId) {
            if(this.$route.query.compile) {
                this.$router.replace({
                    name: "setAddress",
                    query: { address_id: AddressId, compile: "compile" }
                });
            }else {
                if(sessionStorage.getItem('AddressJumpPath') === 'FreeOfCharge') {
                    this.$router.replace({
                        path: '/FreeCartOrder',
                        query: {
                            index,
                            IsDefault
                        }
                    })
                    sessionStorage.removeItem('AddressJumpPath')
                }else {
                    this.$router.replace({path: "/cartOrder",
                        query: {
                            index,
                            IsDefault
                        }    
                    })
                }
            }
        }
    }
};
</script>

<style lang="scss">
.addressLists {
    .addressListsGroup {
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
    .addBtn {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        .btnImg {
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.8rem 0 0 -0.8rem;
            width: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            img {
                width: 1.6rem;
                margin-bottom: 0.2rem;
            }
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
}
</style>

