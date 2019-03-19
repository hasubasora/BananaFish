<template>
    <div class="TouchBalance">
        <yd-navbar fixed slot="navbar" title="余额明细" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/RemainingSum" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group v-if="Tblist.length!=0">
            <yd-cell-item v-for="(item, index) in Tblist" :key="index">
                <span slot="left">
                    <strong class="Tb_list">{{item.Remark}}</strong>
                    <i class="Tb_list_m">{{item.CreateTime}}</i>
                </span>
                <span slot="right" v-if="item.Money>0" class="c-red">+{{item.Money}}</span>
                <span slot="right" v-if="item.Money<0">{{item.Money}}</span>
            </yd-cell-item>
        </yd-cell-group>
        <p v-if="Tblist.length==0" style="text-align:center;font-size:.3 rem">暂无明细</p>
    </div>
</template>
<script>
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            Tblist: []
        };
    },
    created() {
        this.GetPrice();
    },
    methods: {
        GoBankCard(url) {
            this.$router.push({ name: url });
        },
        GetPrice() {
            this.$axios({
                method: "POST",
                data: {},
                url: this.$server.serverUrl + "/UserCenter/GetBalanceLog",
                responseType: "json"
            }).then(response => {
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    this.Tblist = response.data.list;
                }
            });
        }
    }
};
</script>
<style lang="scss">
.TouchBalance {
    padding-top: 1rem;
    .Tb_list {
        display: block;
        font-size: 0.28rem;
    }
    .Tb_list_m {
        display: block;
        font-size: 0.26rem;
        color: #ccc;
    }
}
</style>
