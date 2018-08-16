<template>

  <div class="page-tabbar">
     
    <!-- <div class="page-wrap"> -->
      <!-- <div class="page-title">Tabbar</div> -->

      <!-- <div>
        <mt-cell class="page-part" title="当前选中" :value="selected" />
        每一个mt-tab-item有1个id，mt-tabbar的v-model绑定值等于id时即选中。设置你的selected默认值为第一个mt-tab-item的id
      </div> -->
 
        	<!-- tabcontainer -->
      <mt-tab-container class="page-tabbar-container" v-model="selected" >
        <mt-tab-container-item id="home">
          <!-- 轮播图 -->
            <div class="home">
              <div class="bannerTop">
                <div class="bannerCenter">
                <div class="classify">
                  <router-link to="productList"><img src="../assets/Img/classify.png" alt=""></router-link>
                  </div>
                <div class="search"> <label for="search" class="searchlabel"><img src="../assets/Img/search.png" alt=""><input type="search" id="search" placeholder="头筹商品...."></label></div>
                <div class="massage"><img src="../assets/Img/massage.png" alt=""></div>
                </div>
                <swipe></swipe>
            </div>
            <!-- 连接新闻 -->
           <div class="navbarcompont">
               <navbar></navbar> 
           </div>
           <!-- 分红等 -->
          <div class="participationInProfit">
              <participationInProfit></participationInProfit>
          </div>
           <!-- 商品列表 -->
           <div class="showtime">
             <showtime TimeSrc='1'></showtime>
               <!-- 广告 -->
              <div class="bannerPad">
                  <img src="../assets/Img/banner.png" alt="广告">
                  <GoodsList></GoodsList>
              </div>
              <showtime TimeSrc='2'></showtime>
               <!-- 广告 -->
              <div class="bannerPad">
                  <img src="../assets/Img/banner.png" alt="广告">
                  <GoodsList2></GoodsList2>
              </div>
               <showtime TimeSrc='3'></showtime>
               <!-- 广告 -->
              <div class="bannerPad">
                  <img src="../assets/Img/banner.png" alt="广告">
                  <GoodsList3></GoodsList3>
              </div>
           </div>
            </div>
          <!-- <mt-cell v-for="n in 10" :title="'餐厅 ' + n" /> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="ProductGroupList">
          <ProductGroupList></ProductGroupList>
          <!-- <mt-cell v-for="n in 5" :title="'ProductGroupList ' + n" /> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="cart">
          <!-- <mt-cell v-for="n in 7" :title="'cart ' + n" /> -->
          <cart></cart>
        </mt-tab-container-item>
        <mt-tab-container-item id="my">
          <div class="page-part">
		        <UserInfo></UserInfo>
          </div>

        </mt-tab-container-item>
      </mt-tab-container>
    <!-- </div> -->
 
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <span class="iconfont IconList icon-shouye-copy"></span>
       <p>首页</p> 
      </mt-tab-item>
      <mt-tab-item id="ProductGroupList">
        <span class="iconfont IconList icon-touchou-copy"></span>
         <p>头筹</p> 
      </mt-tab-item>
      <mt-tab-item id="cart" >
       <span class="iconfont IconList icon-gouwuche-copy"></span>
         <p> 购物车</p> 
      </mt-tab-item>
      <mt-tab-item id="my">
       <span class="iconfont IconList icon-wo"></span>
        <p>我的</p> 
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
 
<script>
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "home",
      timesrc: require("../assets/Img/fhyp.png")
    };
  },
  methods: {
    shale() {
      console.log(12313123);
    }
  },
  created() {
    // this.$axios({
    //   method: "POST",
    //   data: {},
    //   url: this.$server.serverUrl + "/index/getindexcategory",
    //   responseType: "json"
    // }).then(response => {
    //   this.GetMyId(response.data.success);
    //   if (response.data.code == 12000) {
    //     _this.msg = response.data.object.NoticeContent;
    //   }
    // });
  },
  components: {
    swipe: swipe => require(["@/components/swipe"], swipe),
    navbar: navbar => require(["@/components/navbar"], navbar),
    participationInProfit: participationInProfit =>
      require(["@/components/participationInProfit"], participationInProfit),
    showtime: showtime => require(["@/components/showtime"], showtime),
    GoodsList: GoodsList => require(["@/components/GoodsList"], GoodsList),
    GoodsList2: GoodsList2 => require(["@/components/GoodsList2"], GoodsList2),
    GoodsList3: GoodsList3 => require(["@/components/GoodsList3"], GoodsList3),
    UserInfo: UserInfo => require(["@/components/UserInfo"], UserInfo),
    cart: cart => require(["@/components/cart"], cart),
    ProductGroupList: ProductGroupList =>
      require(["@/components/ProductGroupList"], ProductGroupList)
  }
};
</script>
 
<style lang='scss'>
.IconList {
  font-size: 0.5rem;
  margin-bottom: 0.1rem;
  display: block;
}
.mint-tab-item {
  color: #888;
  // .mint-tab-item-label {
  //   color: #ff5f17;
  // }
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: #ff5f17;
}

.page-tabbar {
  height: 100vh;
  overflow: scroll;
}

.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 100px;
}
.bannerTop {
  position: relative;
  .bannerCenter {
    z-index: 2;
    display: flex;
    position: absolute;
    width: 100%;
    padding-top: 0.2rem;
    .classify {
      padding: 0.1rem;
      img {
        width: 0.8rem;
        height: auto;
      }
    }
    .search {
      flex: 1;
      text-align: center;
      .searchlabel {
        position: relative;
        img {
          position: absolute;
          left: 0.3rem;
          top: -0.07rem;
          height: 0.4rem;
          width: 0.4rem;
        }
      }
    }
    .massage {
      padding: 0.1rem;
      img {
        width: 0.8rem;
        height: auto;
      }
    }
  }
}
.home {
  background: #f2f2f2;
  margin-bottom: 3rem;
}
#search {
  border: none;
  outline: none;
  border-radius: 15rem;
  width: 5rem;
  height: 0.6rem;
  text-indent: 1rem;
  background-color: #fff;
}

//第二部分连接处
.navbarcompont {
  margin: 0 0.2rem 0.2rem;
}
//分红准备

.participationInProfit {
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 0 0 0.2rem;
}

//广告
.bannerPad {
  margin: 0.2rem;
  > img {
    width: 100%;
  }
}
</style>
