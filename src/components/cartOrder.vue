<template>
<yd-layout class="bk">
    <yd-navbar slot="navbar" title="订单提交">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
    </yd-navbar>

    <yd-flexbox class="address">
        <div class="address_left">
            <h3 class="font25">kk</h3>
            <i class="moren">默认</i>
        </div>
        <yd-flexbox-item>
            <div class="address_right">
                <h3 class="font25">1333333333</h3>
                <p>广东省 广州市 天河区 珠江新城华强路1号广东省 广州市 天河区 珠江新城华强路1号</p>
            </div>
        </yd-flexbox-item>
    </yd-flexbox>
    <yd-cell-group>
            <yd-cell-item arrow>
                <span slot="left">优惠卷</span>
                <span slot="right">没有可用优惠卷</span>
            </yd-cell-item>
    </yd-cell-group>
    <div>
        <yd-cell-group>
            <yd-cell-item>
                <span slot="left">商品金额</span>
                <span slot="right">111</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">优惠活动</span>
                <span slot="right">右边内容二</span>
            </yd-cell-item>

            <yd-cell-item>
                <span slot="left">运费</span>
                <span slot="right">右边内容一</span>
            </yd-cell-item>

        </yd-cell-group>

      
    </div>

    <yd-cell-item class="bomBtn">
        <span slot="left" class="c-orange">应付123456</span>
        <button slot="right" type="button">去付款</button>
    </yd-cell-item>


    <yd-flexbox class='goodsList'>
        <img src="../assets/Img/bkc.jpg" alt="">
        <yd-flexbox-item>
            <p class="goodstitle"><span>标题你知道有多长吗我知道啊标题你知道有多长吗我知道啊</span><span>&nbsp;x1</span></p>
            <div class="goodstitle">&nbsp;</div>
            <span class="dough">￥22222</span>
        </yd-flexbox-item>
    </yd-flexbox>

</yd-layout>
</template>
<script>
export default {};
</script>
<style lang="scss">
.bomBtn {
  border-top: 1px solid #cccccc;
  position: fixed;
  bottom: 0;
  width: 100%;
  .c-orange {
    color: #ff5f17;
  }
  > .yd-cell-right {
    padding: 0;
    > button {
      color: #fff;
      font-size: 0.3rem;
      background-color: #ff5f17;
      height: 1rem;
      border: none;
      width: 2rem;
    }
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

.goodsList {
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
    padding: 0 0.3rem;
  }
  .dough {
    padding: 0 0.3rem;
    font-size: 0.4rem;
  }
}
.bk {
  background: #ccc;
}
</style>
