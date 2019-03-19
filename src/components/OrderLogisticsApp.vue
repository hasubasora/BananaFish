<template>
    <yd-timeline>
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
                orderId: 10005,
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
