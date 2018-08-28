<template>
  <div>
    <yd-navbar title="订单详情" height='.8rem' color="#f2f2f2" bgcolor="#ff5f17">
      <router-link to="" @click.native="GoHistory" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>

    </yd-navbar>
    <yd-tab v-model="tab2" :callback="fn" :prevent-default="false" :item-click="itemClick">
      <yd-tab-panel v-for="item in items" :label="item.label" :key="item.id">
        <yd-preview :buttons="btns" v-for="itemt in item.content" :key="itemt.id">
          <yd-preview-header>
            <div slot="left">下单时间:{{itemt.CreateTime}}</div>
            <div slot="right" v-if="itemt.OrderStatus==0">等待支付</div>
            <div slot="right" v-if="itemt.OrderStatus==1">已付款</div>
            <div slot="right" v-if="itemt.OrderStatus==2">已发货</div>
            <div slot="right" v-if="itemt.OrderStatus==3">已完成</div>
            <div slot="right" v-if="itemt.OrderStatus==4">已评价</div>
          </yd-preview-header>

          <yd-preview-item>
            <div slot="left" v-for="items in itemt.LstProduct" :key="items.id">
              <img class="ProductImgs" :src=" items.ProductImg" alt="" width="100"></div>
            <div slot="right">{{itemt.OrderTitle}}</div>
          </yd-preview-item>

          <yd-preview-item>
            <div slot="left">付款金额</div>
            <div slot="right">赠{{itemt.Integral}}积分</div>
            <div slot="right">¥{{itemt.OrderAmount}}</div>
          </yd-preview-item>
        </yd-preview>
      </yd-tab-panel>
    </yd-tab>
  </div>

</template>

<script>
export default {
    data() {
        return {
            tab2: 0,
            GoodsHtml: [],
            items: [
                { label: "待付款", content: [] },
                { label: "待发货", content: [] },
                { label: "已发货", content: [] },
                { label: "待评价", content: [] }
            ],
            btns: [
                // {
                //   text: "辅助操作",
                //   click: () => {
                //     alert("辅助操作");
                //   }
                // },
                // {
                //   color: "#F00",
                //   text: "跳转首页",
                //   link: { path: "/" }
                // }
            ]
        };
    },
    created() {
        this.GetGoodsList();
    },
    methods: {
        GoHistory(sid) {
            // console.log(sid);
            this.$router.go(-1);
        },
        GetGoodsList(sta) {
            this.$axios({
                method: "POST",
                data: {
                    orderstatus: sta
                },
                url: this.$server.serverUrl + "/account/getmyintegralorder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.GoodsHtml = response.data.rows;
                    console.log(this.GoodsHtml);
                }
            });
        },

        fn(label, key) {
            console.log(label, key);
        },
        itemClick(key) {
            this.GetGoodsList(key);
            this.$dialog.loading.open("数据加载中");
            setTimeout(() => {
                this.tab2 = key;
                this.$dialog.loading.close();
                this.items[key].content = this.GoodsHtml;
                //   "新内容【key:" + key + "】新内容_" + new Date().getTime();
            }, 1000);
        }
    }
};
</script>

<style lang="scss">
.ProductImgs {
    width: 2rem;
}
</style>
