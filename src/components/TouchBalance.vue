<template>
    <div class="TouchBalance">
        <yd-navbar fixed slot="navbar" title="余额明细" height='.8rem' color='#fff' class="titleColor">
            <router-link to="/RemainingSum" slot="left">
                <yd-navbar-back-icon color='#fff'></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item v-for="(item, index) in Tblist" :key="index">
                <span slot="left">
                    <strong class="Tb_list">{{item.Remark}}</strong>
                    <i class="Tb_list_m">{{item.CreateTime}}</i>
                </span>
                <span slot="right" v-if="item.Money>0" class="c-red">+{{item.Money}}</span>
                <span slot="right" v-if="item.Money<0" >{{item.Money}}</span>
            </yd-cell-item>

        </yd-cell-group>
    </div>
</template>
<script>
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
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
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
