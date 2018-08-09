<template>
<yd-layout class="ProductGroupList">
      <yd-flexbox direction="vertical">
        <yd-flexbox-item class="ProTop">
            <img class="haibao" src="../assets/Img/haibao.jpg" alt="">
            <div class="liucheng"> <img class="liuchengtu" src="../assets/Img/liucheng.png" alt=""></div>
            <img class="haibaohd" src="../assets/Img/hd.png" alt="">
            <img class="haibaowd" src="../assets/Img/wd.png" alt="">
            <div class="ProductNews">
            <img class="Productnew" src="../assets/Img/tt.png" alt="">
           <yd-rollnotice autoplay="2000">
              <yd-rollnotice-item><span style="color:#F00;"> 最新 </span>荣耀V9 3月超级钜惠！</yd-rollnotice-item>
              <yd-rollnotice-item><span style="color:#F00;"> 最新 </span>3.23京东超级品牌日格力盛典</yd-rollnotice-item>
              <yd-rollnotice-item><span style="color:#F00;"> 最新 </span>京东服饰 早春新品低至7折</yd-rollnotice-item>
           </yd-rollnotice>
           <span class="allText">|更多</span>
          </div>
         
        </yd-flexbox-item>
        <yd-flexbox-item>
        <yd-tab>
            <yd-tab-panel label="正在头筹">
            <div class="goodsList" v-for="item in GoodsList" :key="item.id">
                    <yd-flexbox class="backgoods">
                    <yd-flexbox-item >
                        <div class="goodsListOne">
                        <span class="GroupId">第TCG{{item.GroupId}}期</span>
                            <div class="goodsa">
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
                          <yd-grids-group :rows="2" >
                              <yd-grids-item v-for="itemt in item.LstProduct" :key="itemt.id">
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
            </yd-tab-panel>
            <yd-tab-panel label="正在揭晓">我需要三件东西：爱情友谊和图书。然而这三者之间何其相通！炽热的爱情可以充实图书的内容，图书又是人们最忠实的朋友。</yd-tab-panel>
            <yd-tab-panel label="拔得头筹">


        <yd-flexbox direction="vertical">
            <yd-flexbox-item>
              <span>第一期</span>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-flexbox>
                  <yd-flexbox-item>
                    <div class="gjtx">
                     <img src="../assets/Img/gjtx.png" alt="">
                     <img src="../assets/Img/gjtx.png" alt=""> 
                    </div>
                  </yd-flexbox-item>
                  <yd-flexbox-item>
                    <p><img src="../assets/Img/gj.png" alt="">头筹幸运号码</p>
                    <div>10086111111</div>
                    <div>拔得头筹</div>
                    <div>头筹用户</div>
                    <div>参与时间</div>
                    <div>计算规则</div>
                  </yd-flexbox-item>
               </yd-flexbox>
            </yd-flexbox-item>
            <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
        </yd-flexbox>





            </yd-tab-panel>
        </yd-tab>
        </yd-flexbox-item>
        <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
      </yd-flexbox>
      </yd-layout>
</template>
<style lang="scss">
.ProTop {
  position: relative;
  margin-bottom: 1rem;
  .liucheng {
    position: absolute;
    top: 4.5rem;
    left: 0;
    height: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    .liuchengtu {
      width: 5rem;
    }
  }
  .haibaohd {
    width: 1rem;
    position: absolute;
    top: 0;
    left: 0.5rem;
  }
  .haibaowd {
    position: absolute;
    width: 1rem;
    top: 0;
    right: 0.5rem;
  }
}
.ProductGroupList {
  margin-bottom: 1rem;
  background: url("../assets/Img/bg.jpg") center;
  background-size: 100%;
  .ProductNews {
    width: 6.5rem;
    position: absolute;
    top: 6.1rem;
    right: 0.5rem;
    background: #f9d86c;
    border-radius: 15px;
    margin: auto;
    display: flex;
    margin-bottom: 1rem;
    .Productnew {
      width: 1rem;
      height: 0.25rem;
      margin: 0.15rem 0.1rem;
    }
    .yd-rollnotice {
      background: #f9d86c;
    }
    .allText {
      height: 0.5rem;
      margin: 0 0.1rem;
      line-height: 0.5rem;
      width: 1rem;
    }
  }
}
.yd-flexbox-item {
  // padding: .1rem
}
.yd-tab-panel {
  background: transparent;
}
.goodsList {
  background: #fff8dc;
  margin: 0.2rem 0.1rem;
  padding: 0.1rem;
  .yd-grids-2 {
    width: 4.6rem;
  }
}
.goodsListOne {
  width: 2.4rem;
  .GroupId {
    position: absolute;
    top: 0;
    left: 0;
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
.yd-grids-txt {
  position: relative;
}
.goodsListTwo {
  .yd-grids-item {
    padding: 0.1rem;
  }
  .goodsLittle {
    display: flex;
    text-align: left;
    flex-direction: column;
    .ProductImgt {
      width: 1rem;
      height: 1rem;
      margin: auto;
    }
    .ProductTitlet {
      font-size: 0.3rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    > span {
      color: #999;
      font-size: 0.1rem;
    }
    .gwc {
      width: 0.6rem;
      position: absolute;
      bottom: 0rem;
      right: 0.2rem;
      height: 0.6rem;
    }
  }
}
.p_progress {
  padding: 0.2rem;
  position: relative;
  .p_prog {
    position: absolute;
    color: #fff;
    z-index: 2;
    top: 0.31rem;
    left: 3rem;
  }
  > p {
    color: #ff5f17;
    font-size: 0.3rem;
    display: flex;
    justify-content: space-around;
  }
}
</style>

<script>
export default {
  data() {
    return {
      GoodsList: [],
      TheTop: []
    };
  },
  created() {
    this.$axios({
      method: "POST",
      data: {},
      url: this.$server.serverUrl + "/index/getproductgrouplist",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsList = response.data.rows;
        console.log(this.GoodsList);
      }
    });

    this.$axios({
      method: "POST",
      data: {},
      url: this.$server.serverUrl + "/index/getwinnergrouporder",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.TheTop = response.data.rows;
        console.log(this.TheTop);
      }
    });
  }
};
</script>
