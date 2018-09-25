<template>
    <div class="help">
        <yd-navbar title="帮助">
            <router-link to="/" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-accordion>
            <yd-accordion-item :title=item.title v-for="(item, index) in helpList" :key="index">
                <div style="padding: .24rem;" v-html="item.html">

                </div>
            </yd-accordion-item>
        </yd-accordion>
    </div>
</template>
<style lang="scss">
.help {
    img {
        width: 100% !important;
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
