<template>
    <div class="appHtml">
        <yd-navbar :title="DescNameTitle" v-if="WeChat" >
            <div @click="goBack" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </div>
        </yd-navbar>
        <yd-accordion>
            <div style="padding: .24rem;" v-html="DescName">
            </div>
        </yd-accordion>
    </div>
</template>
<style lang="scss">
.appHtml {
    img {
        width: 100% !important;
    }
}
</style>
<script>
export default {
    data() {
        return {
            DescName: "",
            DescNameTitle: "",
            WeChat: true
        };
    },
    created() {
        /**
         * HtmlApp?Good_id=rhkssjiVIPtd
         */
        var ua = navigator.userAgent.toLowerCase();
        var isWeixin = ua.indexOf('micromessenger') != -1;
        if (isWeixin) {
            this.WeChat = true
        }else {
            this.WeChat = false
        }

        this.$axios({
            method: "POST",
            data: {
                DescName: this.$route.query.Good_id
            },
            url: this.$server.serverUrl + "/index/GetDescHtml",
            responseType: "json"
        }).then(response => {
            console.log(response.data);
            if (response.data.success == 200) {
                this.DescName = response.data.data.html;
                this.DescNameTitle = response.data.data.title;
            }
        });
    },
    methods: {
        goBack() {
            window.history.length > 1
            ? this.$router.go(-1)
            : this.$router.push('/')
        }
    }
};
</script>
