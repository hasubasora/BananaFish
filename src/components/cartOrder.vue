<template>
  <div>
    <yd-navbar slot="navbar" title="订单提交" height='.8rem'>
      <router-link to="" slot="left" @click.native="GoHistory">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>

    <yd-flexbox class="address" @click.native="GetAddress" v-show="address">
      <div class="address_left">
        <h3 class="font25">{{address.ShipTo}}</h3>
        <i class="moren">默认</i>
      </div>
      <yd-flexbox-item>
        <div class="address_right">
          <h3 class="font25">{{address.ShipPhone}}</h3>
          <p>{{address.Province}}{{address.CityName}}{{address.AreaName}}{{address.Address}}</p>
        </div>
      </yd-flexbox-item>
    </yd-flexbox>
    <yd-flexbox class="address" style="font-size:.3rem" @click.native="GetAddress" v-show="!address">
      请添加地址
    </yd-flexbox>

    <!-- <yd-cell-group>
        <yd-cell-item arrow>
            <span slot="left">优惠卷</span>
            <span slot="right">没有可用优惠卷</span>
        </yd-cell-item>
    </yd-cell-group> -->
    <div>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">商品金额</span>
          <span slot="right">￥{{GoodsList.Amount}}</span>
        </yd-cell-item>

        <!-- <yd-cell-item>
                <span slot="left">优惠活动</span>
                <span slot="right">右边内容二</span>
            </yd-cell-item> -->

        <yd-cell-item>
          <span slot="left">运费</span>
          <span slot="right">￥{{GoodsList.ExpressAmount}}</span>
        </yd-cell-item>

      </yd-cell-group>

    </div>

    <div v-for="(item,index) in GoodsList.rows" :key="index">
      <yd-flexbox class='goodsListOrder' v-for="(items,index) in item.LstProduct" :key="index">
        <img :src="items.ProductImg" alt="">
        <yd-flexbox-item>
          <p class="goodstitle">
            <span>{{items.ProductTitle}}</span>
            <span>&nbsp;x{{items.BuyNum}}</span>
          </p>
          <div class="goodstitle">&nbsp;</div>
          <span class="dough">￥{{items.SalePrice}}</span>
        </yd-flexbox-item>
      </yd-flexbox>
    </div>

    <yd-cell-item class="bomBtnOrder">
      <span slot="left" class="c-orange">应付:￥{{GoodsList.Amount}}</span>
      <button slot="right" class="BuyCart" type="button" @click="GoBuySometing">付款</button>
    </yd-cell-item>
  </div>
</template>
<script>
export default {
    data() {
        return {
            GoodsList: [],
            address: []
        };
    },
    created() {
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/order/getorderconfirm",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.GoodsList = response.data;
                console.log(response.data);
            }
        });
        this.$axios({
            method: "POST",
            data: {},
            url: this.$server.serverUrl + "/order/getaddress",
            responseType: "json"
        }).then(response => {
            if (response.data.success == 400) {
                this.$router.push({ name: "SignIn" });
            }
            if (response.data.success == 200) {
                this.address = response.data.object;
                console.log(response.data);
            }
        });
    },
    methods: {
        GoHistory(sid) {
            // console.log(sid);
            this.$router.go(-1);
        },
        GetAddress() {
            this.$router.push({ name: "setAddress" });
        },
        GoBuySometing() {
            this.$axios({
                method: "POST",
                data: { addressid: this.address.Id },
                url: this.$server.serverUrl + "/order/addorder",
                responseType: "json"
            }).then(response => {
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
                if (response.data.success == 200) {
                    this.$dialog.toast({
                        mes: "提交成功",
                        timeout: 1500,
                        icon: "success",
                        callback: () => {
                            this.$router.push({ name: "SuccessOrder" });
                        }
                    });
                }
                if (response.data.success == 300) {
                    this.$dialog.toast({
                        mes: "提交失败",
                        timeout: 1500,
                        icon: "error"
                    });
                }
                if (response.data.success == 400) {
                    this.$router.push({ name: "SignIn" });
                }
            });
        }
    }
};
</script>
<style lang="scss">
.bomBtnOrder {
    border-top: 1px solid #f2f2f2;
    position: fixed;
    display: flex;
    background: #fff;
    left: 0;
    bottom: 0rem;
    height: 1rem;
    width: 100%;
    align-self: center;
    justify-content: flex-end;
    .BuyCart {
        border-radius: 20px;
        background: #ff5f17;
        font-size: 0.26rem;
        color: #f2f2f2;
        border: #ff5f17 1px solid;
        width: 2rem;
        align-self: center;
        height: 0.8rem;
        text-align: center;
    }
}

.address {
    background: #fffced;
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    .address_left {
        width: 1rem;
        text-align: center;
        font-size: 0.26rem;
    }
    .address_right {
        padding: 0 0.5rem;
        font-size: 0.26rem;
    }
    .moren {
        border: 1px solid;
        color: #ff5f17;
        padding: 0.02rem 0.04rem;
    }
}

.font25 {
    font-size: 0.3rem;
}

.goodsListOrder {
    display: flex;
    border-bottom: 1px solid #cccc;
    padding: 0.3rem;
    background: #fff;
    > img {
        width: 1.5rem;
        height: 1.5rem;
    }
    .goodstitle {
        font-size: 0.25rem;
        display: flex;
        justify-content: space-between;
        padding: 0 0.3rem;
    }
    .dough {
        padding: 0 0.3rem;
        font-size: 0.4rem;
    }
}
</style>
