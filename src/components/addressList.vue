<template>
    <div class="addressLists">
        <yd-navbar slot="navbar" fixed title="地址选择" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

            <router-link to="" @click.native="SetAddress" slot="right">
               新增地址
            </router-link>
        </yd-navbar>
        <div class="addressListsGroup">
            <yd-flexbox direction="vertical" class="addressGroup" v-for="(item, index) in addressList" :key="index">
                <yd-flexbox-item>
                    <yd-flexbox>
                        <yd-flexbox-item>{{item.ShipTo}}</yd-flexbox-item>
                        <yd-flexbox-item class="gray">{{item.ShipPhone}}</yd-flexbox-item>
                    </yd-flexbox>
                </yd-flexbox-item>
                <yd-flexbox-item>
                    <yd-flexbox>
                        <yd-flexbox-item>{{item.Province}}{{item.CityName}}{{item.AreaName}}{{item.Address}}大富大贵发的是规范的各个辅导电饭锅和的风格都是国防大厦国防大厦国防大厦规范的费个</yd-flexbox-item>
                        <div class="SetGet" @click="CompileAddress(item.AddressId)">编辑</div>
                    </yd-flexbox>

                </yd-flexbox-item>
                <yd-flexbox-item>
                    <span @click="SetdefultAddress(item.AddressId)" class="iconfont icon-selected" v-if="item.IsDefault==1"> 设置默认</span>
                    <span @click="SetdefultAddress(item.AddressId)" class="iconfont icon-selected gray" v-if="item.IsDefault!=1"> 设置默认</span>
                </yd-flexbox-item>
            </yd-flexbox>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            addressList: "",
            checkbox6: ["1"],
            radio1: 1
        };
    },
    created() {
        this.GetAddressList();
    },
    methods: {
        SetAddress() {
            this.$router.push({ name: "setAddress" });
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
    .addressGroup {
        padding: 0.2rem;
        margin: 0.1rem;
        // border: 1px solid red;
        background: #fff;
        border-radius: 10px;
        .SetGet {
            padding: 0 0.1rem;
            @extend .gray;
        }
    }
}
.icon-selected {
    padding-right: 0.1rem;
    color: rgb(255, 92, 42);
    font-size: 0.26rem;
}
.gray {
    color: #aaa;
}
</style>

