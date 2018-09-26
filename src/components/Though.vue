<template>
    <div class="Though">
        <yd-accordion>
            <yd-navbar :title=title>
                <router-link to="/" slot="left">
                    <yd-navbar-back-icon></yd-navbar-back-icon>
                </router-link>
            </yd-navbar>
            <div style="padding: .24rem;" v-html="DescName">

            </div>
        </yd-accordion>
    </div>
</template>
<style lang="scss">
.Though {
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
            title: this.$route.query.Titles
        };
    },
    created() {
        /**
         * HtmlApp?Good_id=rhkssjiVIPtd
         */
        this.$axios({
            method: "POST",
            data: {
                DescName: this.$route.query.plan
            },
            url: this.$server.serverUrl + "/index/GetDescHtml",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.DescName = response.data.data.html;
            }
        });
    }
};
</script>
