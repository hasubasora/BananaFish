<template>
    <div>
        <yd-navbar slot="navbar" title="物流信息" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory('Home')">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <p v-if="OrderLog" style="text-align:center;padding:1rem 0;font-size:.28rem;"> — 暂无物流信息 —</p>
        <yd-timeline v-if="!OrderLog">
            <yd-timeline-item v-for="(item, index) in OrderLog" :key="index">
                <p>{{item.content}}</p>
                <p style="margin-top: 10px;">{{item.createTime}}</p>
            </yd-timeline-item>
            <!-- <yd-timeline-item>
            <p>【南宁市】您的订单已到达【南宁安吉站】</p>
            <p style="margin-top: 10px;">2017-08-18 07:25:08</p>
        </yd-timeline-item>
        <yd-timeline-item>
            <p>【南宁市】您的订单在京东【南宁分拨中心】发货完成，准备送往京东【南宁安吉站】</p>
            <p style="margin-top: 10px;">2017-08-17 21:44:08</p>
        </yd-timeline-item> -->
            <!-- ...... -->
        </yd-timeline>
    </div>
</template>
<script>
export default {
    data() {
        return {
            OrderLog: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {
                orderId: this.$route.query.Good_id,
                type: 1
            },
            url: this.$server.serverUrl + "/UserCenter/OrderLogistics",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.OrderLog = response.data.actions;
                console.log(response.data);
            }
        });
    },
    methods: {
        GoHistory(sid) {
            this.$router.push({ name: "ShopGoodsList", query: { plan: 3 } });
            // this.$router.go(-1);
        },
        OrderLogistics(id) {
            this.$axios({
                method: "POST",
                data: {
                    orderId: 10005,
                    type: 1
                },
                url: this.$server.serverUrl + "/UserCenter/OrderLogistics",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    console.log(response.data);
                }
            });
        }
    }
};
</script>
