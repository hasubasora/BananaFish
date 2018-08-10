<template>
      <yd-layout class="GeneralItemDescription">
        <yd-navbar slot="navbar" title="商品详情">
            <router-link to="" @click.native="GoHistory" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

        <yd-flexbox direction="vertical" class="swipe">
            <yd-flexbox-item>
                <mt-swipe :auto="4000" >
                  <mt-swipe-item  v-for="item in GoodsList.ProductImg" :key="item.id"><img :src="item.ImgUrl" alt=""></mt-swipe-item>
               </mt-swipe>
            <div class="goodtitle">
                
            </div>
            </yd-flexbox-item>
           
            <yd-flexbox-item  class="theTopGood">
              <strong>{{GoodsList.ProductTitle}}</strong>
              <p>{{GoodsList.SubTitle}}</p>
              <div class="MarketPrice"><span>￥{{GoodsList.MarketPrice}}</span> <i>存库{{GoodsList.ProductStock}}件</i></div>
            </yd-flexbox-item>
       
            <yd-flexbox-item>
                  <!-- <p class="d_text">截止至<b class="c-red"></b> 08-05 10:37，若没有凑足<b class="c-red">{{GoodsList.TotalNum}}</b>  人次，系统会自动取 消订单并在24小时内退款。</p> -->
            </yd-flexbox-item>
            <yd-flexbox-item>
                 <yd-accordion>
                    <yd-accordion-item title="商品详情">
                        <div style="width:100%">
                           <div v-html="GoodsHtml.ProductDesc" ></div>
                        </div>
                    </yd-accordion-item>
                </yd-accordion>
                      <yd-accordion>
                    <yd-accordion-item title="宝贝评价">
                        <div style="width:100%" class="comment">
                             <yd-flexbox direction="vertical" v-for="items in GoodsList.LstComment" :key="items.id">
                                <yd-flexbox-item class="UserInfo">
                                    <img class="UserIcon" :src="items.UserIcon" alt="" >
                                    <!-- <img class="UserIcon" src="../assets/Img/bkc.jpg" alt=""> -->
                                    <span class="NickName">{{ items.NickName }}</span>
                                </yd-flexbox-item>
                                <yd-flexbox-item class="CreateTime"> {{ items.CreateTime }}</yd-flexbox-item>
                                <yd-flexbox-item class="Comment"> {{ items.Comment }}</yd-flexbox-item>
                  
                                <yd-flexbox-item >
                                    <yd-lightbox class="ImgShow">
                                        <yd-lightbox-img  v-for="itemst in items.ImgShow" :key="itemst.id" :src="itemst.AttachPath"></yd-lightbox-img>
                                    </yd-lightbox>
                                </yd-flexbox-item>
                          
                            </yd-flexbox>

                  

                    
                        </div>
                    </yd-accordion-item>
                
                </yd-accordion>
            </yd-flexbox-item>
          
      
        </yd-flexbox>
       
        <yd-flexbox class="yd-nav-button ">
            <div class="iconfont icon-erji"></div>
            <div class="iconfont icon-gouwuche-copy-copy"></div>
            <div class="iconfont icon-shoucang"></div>

            <yd-flexbox-item>  
                  <button  class="handleClick orange"  @click.native="handleClick" type="button">立即购买</button>
            </yd-flexbox-item>  

            <yd-flexbox-item>  
                   <button  class="handleClick"  @click="addCart(GoodsList.Id)" type="button">加入购物车</button>
            </yd-flexbox-item>  
         
        </yd-flexbox>

      

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
    console.log(location);
    
    sessionStorage.setItem("s", this.$route.params.Good_id);
    localStorage.setItem("s", this.$route.params.Good_id);
    console.log(this.$route.params.Good_id);
    // 商品信息
    this.$axios({
      method: "POST",
      data: {
        productid: this.$route.params.Good_id
          ? this.$route.params.Good_id
          : localStorage.getItem("s")
      },
      url: this.$server.serverUrl + "/index/getproductdetail",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsList = response.data.object;
        console.log(this.GoodsList);
      }
    });
    // 商品详情
    this.$axios({
      method: "POST",
      data: {
        productid: this.$route.params.Good_id
      },
      url: this.$server.serverUrl + "/index/getproductdetaildesc",
      responseType: "json"
    }).then(response => {
      if (response.data.success == 200) {
        this.GoodsHtml = response.data.object;
        console.log(this.GoodsHtml);
      }
    });
  },
  methods: {
    GoHistory(sid) {
      // console.log(sid);
      this.$router.go(-1);
    },
    addCart(i) {
      console.log(i);
      this.$axios({
        method: "POST",
        data: {
          productid: this.$route.params.Good_id,
          groupid: 0
        },
        url: this.$server.serverUrl + "/order/addshoppingcart",
        responseType: "json"
      }).then(response => {
        switch (response.data.success) {
          case 200:
            break;
          case 400:
            this.$router.push({ name: "SignIn", ReturnUrl: "" });
            break;
          default:
            break;
        }
      });
    }
  }
};
</script>

<style lang="scss">
.GeneralItemDescription {
  .iconfont {
    width: 30%;
    font-size: 0.6rem;
    text-align: center;
    color: #666;
  }
  .yd-scrollview {
    .swipe {
      .mint-swipe {
        height: 5rem;
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
    padding: 0.2rem;
    font-size: 0.3rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    > p {
      font-size: 0.2rem;
      color: #888;
    }
    .MarketPrice {
      display: flex;
      justify-content: space-between;
      > span {
        color: #ff5f17;
        font-size: 0.5rem;
      }
      > i {
        color: #ccc;
        font-size: 0.2rem;
      }
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
  .yd-nav-button {
    background: #ffffff;
    border-top: 1px solid #ccc;
    padding: 0;
    position: fixed;
    width: 100%;
    display: flex;
    left: 0;
    bottom: 0;
    .handleClick {
      background-color: #ff5f17;
      font-size: 0.3rem;
      border: none;
      outline: none;
      height: 1rem;
      width: 2.3rem;
      color: #ffffff;
    }
    .orange {
      background-color: #ff9717;
    }
  }
  // 用户评论区
  .comment {
    padding: 0.5rem;
    .yd-flexbox-vertical {
      border-bottom: #ccc 1px solid;
      margin: 0.5rem 0;
    }
    .UserInfo {
      .UserIcon {
        height: 1rem;
        width: 1rem;
        vertical-align: middle;
        border-radius: 50%;
      }
      .NickName {
        font-size: 0.3rem;
        margin-left: 0.3rem;
      }
    }
    .CreateTime {
      padding: 0.1rem;
      color: #888;
      font-size: 0.2rem;
    }
    .Comment {
      padding: 0.1rem;
      font-size: 0.3rem;
    }
    .ImgShow {
      width: 1rem;
      display: flex;
      margin-bottom: 0.5rem;
      > img {
        margin: 0.05rem;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

