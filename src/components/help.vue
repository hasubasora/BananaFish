<template>
    <div class="help">
        <yd-navbar title="帮助">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-accordion>
            <yd-accordion-item :title=item.title v-for="(item, index) in helpList" :key="index">
                <div style="padding: .24rem; line-height:.28rem" v-html="item.html">

                </div>
            </yd-accordion-item>
        </yd-accordion>

        <!-- <p class="Copyright">Copyright 2018&copy;广州格卓电子科技有限公司 版权所有</p> -->

    </div>
</template>
<style lang="scss">
.help {
    img {
        width: 100% !important;
    }
    .Copyright {
        width: 3rem;
        text-align: center;
        margin: 2rem auto;
        border: dashed red 3px;
        border-radius: 8px;
    }
}
</style>
<script>
export default {
    data() {
        return {
            helpList: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/index/getHelphtml",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.helpList = response.data.list;
            }
        });
    }
};
</script>
