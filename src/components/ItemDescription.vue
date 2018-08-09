<template>
      <yd-layout class="ItemDescription">
        <yd-navbar slot="navbar" title="头筹商品详情">
            <router-link to="#" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-flexbox direction="vertical" class="swipe">
            <yd-flexbox-item>
                <mt-swipe :auto="4000">
            <mt-swipe-item><img :src="GoodsList.ProductImg" alt=""></mt-swipe-item>
            <mt-swipe-item><img :src="GoodsList.ProductImg" alt=""></mt-swipe-item>
            </mt-swipe>
            <div class="goodtitle">
                
            </div>
            </yd-flexbox-item>
            <yd-flexbox-item  class="theTopGood">
                 <span>头筹商品</span>{{GoodsList.ProductTitle}}
            </yd-flexbox-item>
            <yd-flexbox-item class="generalGoods">
                <p>普通商品(如下山沟任选其中一可夺筹；多购多机会))</p>
                <yd-grids-group :rows="2" >
                    <yd-grids-item v-for="(item,index) in GoodsList.LstProduct" :key="index">
                        <span slot="text">
                            <yd-flexbox>
                                <div class="generalGoodsImg" style="width:1rem;"><img :src="item.ProductImg" alt="" width="50"></div>
                                <yd-flexbox-item>
                                 <p class="ProductTitle"> {{item.ProductTitle}}</p>
                                 <p class="ProductTitle" style="color:#aaa;font-size:.2rem"> {{item.SubTitle}}</p>
                                 <strong>￥{{item.SalePrice}}</strong>
                                 <yd-button size="large" type="danger">购买夺筹</yd-button>
                                </yd-flexbox-item>
                            </yd-flexbox>
                           
                           
                            </span>
                    </yd-grids-item>
                </yd-grids-group>
            </yd-flexbox-item>
               <yd-flexbox direction="vertical" style="width:100%" class="d_progress">
                    <yd-flexbox-item class="d_progress_top"><span>期号:{{GoodsList.GroupId}}</span><span>免费包邮</span></yd-flexbox-item>
                    <yd-flexbox-item class="d_progress_center">
                        <div class="d_prog">{{GoodsList.RemainNum+'/'+GoodsList.TotalNum}}</div> 
                    <mt-progress class="progress" :value="GoodsList.TotalNum-GoodsList.RemainNum" :bar-height="15"> {{GoodsList.RemainNum+'/'+GoodsList.TotalNum}}</mt-progress>
                    </yd-flexbox-item >
                    <yd-flexbox-item class="d_progress_bom"><span>总需{{GoodsList.TotalNum}}人次</span>
                    <span >剩余<b class="c-red">{{GoodsList.RemainNum}}</b>次</span></yd-flexbox-item>
                </yd-flexbox>
          
               
            <yd-flexbox-item>
                  <!-- <p class="d_text">截止至<b class="c-red"></b> 08-05 10:37，若没有凑足<b class="c-red">{{GoodsList.TotalNum}}</b>  人次，系统会自动取 消订单并在24小时内退款。</p> -->
            </yd-flexbox-item>
            <yd-flexbox-item>
                 <yd-accordion>
                    <yd-accordion-item title="头筹商品详情">
                        <div style="width:100%">
                           <div v-html="GoodsHtml.ProductDesc" ></div>
                        </div>
                    </yd-accordion-item>
                
                </yd-accordion>
            </yd-flexbox-item>
            <yd-flexbox-item>
                 <p class="d_text">用户参与记录<span>本期于XXXXXXXX开始</span></p>
                   <yd-flexbox>
                        <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
                        <yd-flexbox-item>yd-flexbox-item</yd-flexbox-item>
                   </yd-flexbox>
            </yd-flexbox-item>
      
        </yd-flexbox>
       

        <yd-button-group>
            <yd-button size="large" @click.native="handleClick" type="danger">立即购买</yd-button>
        </yd-button-group>

    </yd-layout>
</template>
<script>
export default {
  data() {
    return {
      GoodsList: [],
      GoodsHtml: ""
    };
  },
  created() {
    this.$axios({
      method: "POST",
      data: {
        Groupid: 2
      },
      url: this.$server.serverUrl + "/index/getproductgroupdetail",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsList = response.data.object;
        console.log(this.GoodsList);
      }
    });
    this.$axios({
      method: "POST",
      data: {
        Groupid: 2
      },
      url: this.$server.serverUrl + "/index/getproductgroupdetaildesc",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsHtml = response.data.object;
        console.log(this.GoodsHtml);
      }
    });
  }
};
</script>

<style lang="scss">
.ItemDescription {
  .yd-scrollview {
    .swipe {
      .mint-swipe {
        height: 3rem;
        background: #ffffff;
        text-align: center;
        .mint-swipe-item {
          > img {
            height: 100%;
            width: auto;
          }
        }
      }
    }
  }
  .theTopGood {
    background: #ffffff;
    margin: 0.1rem 0;
    padding: 0.1rem;
    font-size: 0.3rem;
    color: #ff5f17;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    > span {
      background: #ff5f17;
      line-height: 0.6rem;
      color: #ffffff;
      margin-right: 0.1rem;
      border-radius: 10px;
      padding: 0.1rem 0.2rem;
    }
  }
  .generalGoods {
    .yd-grids-txt {
      text-align: left;
    }
    .yd-grids-2 {
      margin: 0.1rem;
    }
    .yd-btn-danger {
      background-color: #ff5f17;
      height: 0.4rem;
      border-radius: 5px;
      font-size: 0.26rem;
      width: 1.5rem;
      margin-left: 0.2rem;
    }
    .yd-grids-item:after {
      border-bottom: 0.1rem solid #f5f5f5;
    }
    .yd-grids-item:not(:nth-child(2n)):before {
      border-right: 0.1rem solid #f5f5f5;
    }
    > p {
      background: #ffffff;
      font-size: 0.3rem;
      text-align: center;
      margin: 0.1rem 0;
      padding: 0.1rem;
    }
    .generalGoodsImg {
      margin-right: 0.3rem;
    }
    .ProductTitle {
      overflow: hidden;
      width: 2rem;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .d_progress {
    background: #ffffff;
    padding: 0.2rem;
    .d_progress_top {
      display: flex;
      justify-content: space-between;
      align-items: left;
      font-size: 0.3rem;
    }
    .d_progress_bom {
      @extend .d_progress_top;
    }
    .d_progress_center {
      position: relative;
      .d_prog {
        position: absolute;
        top: 0.16rem;
        left: 3.2rem;
        z-index: 2;
      }
    }
  }
  .d_text {
    margin-top: 0.1rem;
    background: #ffffff;
    padding: 0.2rem;
  }
  .yd-button {
    padding: 0;
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    > button {
      background-color: #ff5f17;
      font-size: .3rem;
    }
  }
}
</style>

