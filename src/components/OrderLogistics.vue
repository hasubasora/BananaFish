<template>
    <div>
        <yd-navbar slot="navbar" title="物流信息" height='.8rem'>
            <router-link to="" slot="left" @click.native="GoHistory('Home')">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <p v-if="OrderLog.length == 0" style="text-align:center;padding:1rem 0;font-size:.28rem;"> — 暂无物流信息 —</p>
        <yd-slider v-if="OrderLog.length > 0">
            <yd-slider-item v-for="(item, index) in OrderLog" :key="index" :dot="true">
                <yd-timeline>
                    <yd-timeline-item v-for="(oitem, oindex) in item.data" :key="oindex">
                        <p>{{oitem.context}}</p>
                        <p style="margin-top: 10px;">{{oitem.ftime}}</p>
                    </yd-timeline-item>
                </yd-timeline>
            </yd-slider-item>    
        </yd-slider>
    </div>
</template>
<script>
import { LOGIN_SUCCESS } from "../main.js";
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
                ordertype: 0,
                orderid: this.$route.query.Good_id
            },
            url: this.$server.serverUrl + "/order/GetExpressDelivery",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                console.log(response.data)
                this.OrderLog = response.data.rows;
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
                LOGIN_SUCCESS(response.data)
                if (response.data.success == 200) {
                    console.log(response.data);
                }
            });
        }
    }
};
</script>
