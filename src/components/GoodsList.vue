<template>
        <yd-grids-group :rows="3" >
        <yd-grids-item  v-for="item in GoodsList" :key="item.id" >
            <span slot="text">
            <router-link to="home" class="goods" ><img class="SalePriceImg" src="../assets/Img/gwc.png" alt="">
                 <img :src="item.ProductImg" class="ProductImg" alt="">
                <div class="goodsDian"><span class="goodsBack">分红购</span>{{item.Integral}}积分</div>
                <div class="goodsName">{{item.ProductTitle}}</div>
                <div class="specification"> {{item.SubTitle}}</div>
               <span class="ProductStock">月销{{item.ProductStock}}件</span>
                <div class="SalePrice">
                <strong>￥{{item.SalePrice}}</strong>
                </div>
            </router-link>
            </span>
        </yd-grids-item>
    </yd-grids-group>
</template>
<style lang="scss">
.goods {
  position: relative;
  text-align: justify;
  color: #111;
  text-decoration: none;
  background: #fff;
  .goodsDian {
    font-size: 0.1rem;
    text-align: justify;
    color: #ff5f17;
    .goodsBack {
      text-align: center;
      padding: 0.05rem 0.2rem;
      border-radius: 5px;
      background: #ff5f17;
      color: #fff;
    }
  }
  .ProductImg {
    width: 2rem;
    height: 2rem;
  }
  .goodsName {
    font-size: 0.25rem;
    overflow: hidden;
    white-space: nowrap;
    line-height: 0.5rem;
    text-overflow: ellipsis;
  }
  .specification {
    color: #999;
    font-size: 0.1rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 0.3rem;
  }
  .ProductStock {
    color: #999;
    font-size: 0.1rem;
    text-align: left;
    display: block;
  }
  .SalePrice {
    display: flex;
    justify-content: space-between;
  }
  .SalePriceImg {
    width: 0.6rem;
    position: absolute;
    right: 0.1rem;
    bottom: -1.75rem;
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

