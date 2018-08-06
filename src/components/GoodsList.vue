<template>
    <div class="goodsBox">
         <router-link to="home"  class="goods"  v-for="item in GoodsList" :key="item.id" ><img class="SalePriceImg" src="../assets/Img/gwc.png" alt="">
            <img :src="item.ProductImg" alt="">
            <div class="goodsDian"><span class="goodsBack">分红购</span>{{item.Integral}}积分</div>
            <div class="goodsName">{{item.ProductTitle}}</div>
            <div class="specification"> {{item.SubTitle}}</div>
            <span class="ProductStock">月销{{item.ProductStock}}件</span>
            <div class="SalePrice">
            <strong>￥{{item.SalePrice}}</strong>
            </div>
           </router-link>
        
    </div>
</template>
<style lang="scss">
.goodsBox {
  display: flex;
  flex-wrap: wrap;
  .goods {
    position: relative;
    color: #111;
    text-decoration: none;
    background: #fff;
    padding: .5rem;
    margin: 1%;
    &:nth-of-type(1n) {
      margin-left: 0;
    }
    &:nth-of-type(3n) {
      margin-right: 0;
    }
    width: 28.3%;
    .goodsDian {
      font-size: 0.5rem;
      color: #ff5f17;
      .goodsBack {
        text-align: center;
        padding: 0.1rem 0.4rem;
        border-radius: 5px;
        background: #ff5f17;
        color: #fff;
        margin-right: 0.2rem;
      }
    }
    .goodsName {
      font-size: 0.9rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .specification {
      color: #999;
      font-size: 0.6rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .ProductStock {
      color: #999;
      font-size: 0.5rem;
    }
    .SalePrice {
      display: flex;
      justify-content: space-between;
    }
    .SalePriceImg {
      width: 2rem;
      position: absolute;
      right: .5rem;
      bottom: .5rem;
    }
  }
}
</style>
<script>
export default {
  data() {
    return {
      GoodsList: []
    };
  },
  created() {
    this.$axios({
      method: "POST",
      data: {
        pageindex: 1,
        pagesize: 10
      },
      url: "http://localhost:58326/index/getindexintegralproduct",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsList = response.data.rows;
        console.log(this.GoodsList);
      }
    });
  }
};
</script>

