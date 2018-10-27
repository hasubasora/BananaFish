<template>
    <div class="appHtml">
        <yd-navbar :title=DescNameTitle v-if="!this.$route.query.IsAPP">
            <router-link to="/MyInfo" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <!-- <yd-accordion>
                <yd-accordion-item :title=item.title v-for="(item, index) in helpList"  :key="index">
                    <div style="padding: .24rem;" v-html="item.html">

                    </div>
                </yd-accordion-item>
            </yd-accordion> -->
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
            DescNameTitle: ""
        };
    },
    created() {
        /**
         * HtmlApp?Good_id=rhkssjiVIPtd
         */
        this.$axios({
            method: "POST",
            data: {
                DescName: this.$route.query.Good_id
            },
            url: this.$server.serverUrl + "/index/GetDescHtml",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 200) {
                this.DescName = response.data.data.html;
                this.DescNameTitle = response.data.data.title;
            }
        });
    }
};
</script>
