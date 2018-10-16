<template>
    <div class="MessageQueue">
        <yd-navbar slot="navbar" title="消息" height='.8rem' fixed>
            <router-link to="/" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item arrow type="link" href="" @click.native='ToMsg(item.Id)' v-for="(item, index) in arrow" :key="index">
                <span slot="left">
                    <div :class="['IsRead',{IsGary:item.IsRead}]"></div>
                </span>
                <span slot="left" class="title">{{item.Title}}</span>
                <span slot="right">查看全部</span>
            </yd-cell-item>
        </yd-cell-group>

    </div>
</template>
<script>
import { LOGIN_SUCCESS } from "../main.js";
export default {
    data() {
        return {
            arrow: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/Account/GetMyMessageLst",
            responseType: "json"
        }).then(response => {
            LOGIN_SUCCESS(response.data.success);
            if (response.data.success == 200) {
                this.arrow = response.data.list;
            }
        });
    },
    methods: {
        ToMsg(id) {
            this.$router.push({ name: "MessageText", params: { Text_id: id } });
        }
    }
};
</script>
<style lang="scss">
.MessageQueue {
    padding: 0.8rem 0;
    .IsRead {
        background: red;
        height: 0.2rem;
        width: 0.2rem;
        border-radius: 50px;
    }
    .title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 5rem;
    }
    .IsGary {
        background: #ccc;
    }
}
</style>
