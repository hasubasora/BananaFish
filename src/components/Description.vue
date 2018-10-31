<template>
    <div class="GoodsHtml">
        <yd-navbar slot="navbar" height='.8rem' fixed>
            <router-link to="" @click.native="GoHistory" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>

            <yd-flexbox slot="center" style="border:1px solid #A0A0A0;border-radius:5px;overflow:hidden">
                <yd-flexbox-item @click.native='GoDecs' style="padding:.1rem .2rem">商品</yd-flexbox-item>
                <yd-flexbox-item style="padding:.1rem .2rem;background:#A0A0A0;color:#fff">详情</yd-flexbox-item>
            </yd-flexbox>

        </yd-navbar>

        <div class="GoodsHtml" v-html="GoodsHtml.ProductDesc"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            GoodsHtml: ""
        };
    },
    created() {
        this.GetProductDetailDesc();
    },
    methods: {
        GoHistory(sid) {
            // console.log(sid);
            this.$router.go(-1);
        },
        GoDecs() {
            this.$router.push({
                name: "GeneralItemDescription",
                query: { Good_id: this.$route.params.ItemGood_id }
            });
        },
        GetProductDetailDesc() {
            this.$axios({
                method: "POST",
                data: {
                    productid: this.$route.params.ItemGood_id
                },
                url: this.$server.serverUrl + "/index/getproductdetaildesc",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GoodsHtml = response.data.object;
                    // console.log(this.GoodsHtml);
                }
            });
        }
    }
};
</script>
<style lang="scss">
.GoodsHtml{
    margin-top: 1rem;
  >p{
      >img{
          width: 100%;
          display: block;
      }
  }
}
</style>
