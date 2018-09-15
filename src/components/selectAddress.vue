<template>
    <div class="addressLists">
        <yd-navbar slot="navbar" fixed title="地址选择" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

            <router-link to="" @click.native="CompileAddress('new')" slot="right">
                新增地址
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
                <yd-preview-header>
                    <div slot="left">
                        <span @click="SetdefultAddress(item.AddressId)" class="iconfont icon-selected" v-if="item.IsDefault==1">
                            <i> 设为默认地址</i>
                        </span>
                        <span @click="SetdefultAddress(item.AddressId)" class="iconfont icon-selected gray" v-if="item.IsDefault!=1">
                            <i> 设为默认地址</i>
                        </span>
                    </div>

                    <div slot="right">
                        <div class="SetGet" @click="CompileAddress(item.AddressId)">删除</div>
                        <div class="SetGet" @click="CompileAddress(item.AddressId)">编辑</div>
                    </div>
                </yd-preview-header>
            </yd-preview>
            <div class="address">
                <button type="button">
                    <img src="../assets/Img/jia.png" alt=""> 新增地址</button>
            </div>
        </div>
    </div>
</template>

<script>
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
        GoHistory(sid) {
            // console.log(sid);
            this.$router.go(-1);
        },
        GetAddressList() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/order/getaddress",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
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
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GetAddressList();
                }
            });
        }
    }
};
</script>

<style lang="scss">
.addressListsGroup {
    // border: 1px solid;
    margin: 1rem 0;
    .address {
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
                width: 0.6rem;
            }
            padding: 0.1rem;
            vertical-align: middle;
        }
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

