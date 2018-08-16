<template>
   <div>
    <div class="goodsList" v-for="item in GoodsList" :key="item.id">
                <yd-flexbox class="backgoods">
                <yd-flexbox-item >
                    <div class="goodsListOne">
                    <span class="GroupId">第TCG{{item.CurrentPeriod}}期</span>
                        <div class="goodsa"  @click="GoToItem(item.GroupId)" >
                            <span class="goodsatop">本期头筹奖品</span>
                            <img :src="item.ProductImg" alt="">
                            <p class="ProductTitle">{{item.ProductTitle}}</p>
                            <div class="SubTitle">{{item.SubTitle}}</div>
                            <div class="points">
                                市场价 <strong>￥{{item.MarketPrice}}</strong>
                            </div>
                        </div>
                    </div>
                </yd-flexbox-item >
                <yd-flexbox-item class="goodsListTwo">
                    <yd-grids-group :rows="2" item-height="2.5rem">
                        <yd-grids-item v-for="itemt in item.LstProduct" :key="itemt.id" @click.native="GoToItemGeneral(itemt.ProductId)">
                            <span slot="text" >
                                <div class="goodsLittle">
                                    <img class="ProductImgt" :src="itemt.ProductImg" alt="" width="100">
                                    <p class="ProductTitlet">{{itemt.ProductTitle}}</p>
                                    <span>月销{{itemt.SaleCount}}件</span>
                                    <strong>￥{{itemt.SalePrice}}</strong>
                                    <img class="gwc" src="../assets/Img/gwc.png" alt="">
                                </div>
                            </span>
                        </yd-grids-item>
                    </yd-grids-group>
                </yd-flexbox-item>
            </yd-flexbox>

        <yd-flexbox-item>
        <div class="p_progress">
        <div class="p_prog">{{item.RemainNum+'/'+item.TotalNum}}</div>
        <mt-progress class="progress" :value="item.TotalNum-item.RemainNum" :bar-height="20"> {{item.RemainNum+'/'+item.TotalNum}}</mt-progress>
        <p><span>已购{{item.TotalNum-item.RemainNum}}人次(满{{item.TotalNum}}人次揭晓答案)</span> <time>00:00:00</time></p>
        </div>
        </yd-flexbox-item>
     </div>
   </div>
</template>
<style lang="scss">
.goodsListOne {
  position: relative;
  top: 0;
  left: 0;
  width: 2.4rem;
  .GroupId {
    position: absolute;
    top: -0.6rem;
    left: -0.1rem;
    background: #ff5f17;
    color: #fff;
    width: 2.4rem;
    font-size: 0.25rem;
    text-align: center;
    line-height: 0.5rem;
    border-bottom-right-radius: 10px;
    display: inline-block;
  }
  .goodsa {
    width: 2.3rem;
    margin: 0.5rem 0 0 0;
    border-radius: 8px;
    background: #fff;
    .goodsatop {
      display: block;
      background: #ff5f17;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      color: #fff;
      height: 0.5rem;
      font-size: 0.2rem;
      line-height: 0.5rem;
      text-align: center;
    }
    .ProductTitle {
      font-size: 0.25rem;
      overflow: hidden;
      white-space: nowrap;
      padding: 0 0.1rem;
      text-overflow: ellipsis;
    }
    .SubTitle {
      font-size: 0.2rem;
      padding: 0.1rem 0;
      line-height: 0.4rem;
      overflow: hidden;
      color: #999;
      padding: 0 0.1rem;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .points {
      color: #999;
      strong {
        font-size: 0.4rem;
        color: #555;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      GoodsList: [],
      Grouporder: []
    };
  },
  created() {
    this.$axios({
      method: "POST",
      data: {},
      url: this.$server.serverUrl + "/index/getproductgrouplist",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 400) {
        this.$router.push({ name: "SignIn" });
      }
      if (response.data.success == 200) {
        this.GoodsList = response.data.rows;
        console.log(this.GoodsList);
      }
    });
  },
  methods: {
    GoToItem(id) {
      this.$router.push({
        name: "ItemDescription",
        params: { ItemGood_id: id }
      });
    },
    GoToItemGeneral(id) {
        console.log(id);
        
      this.$router.push({
        name: "GeneralItemDescription",
        params: { Good_id: id }
      });
    }
  }
};
</script>
