<template>

  <div class="page-tabbar">
     
    <!-- <div class="page-wrap"> -->
      <!-- <div class="page-title">Tabbar</div> -->

      <!-- <div>
        <mt-cell class="page-part" title="当前选中" :value="selected" />
        每一个mt-tab-item有1个id，mt-tabbar的v-model绑定值等于id时即选中。设置你的selected默认值为第一个mt-tab-item的id
      </div> -->
 
        	<!-- tabcontainer -->
      <mt-tab-container class="page-tabbar-container" v-model="selected" style='border:1px solid red'>
        <mt-tab-container-item id="home">
          <!-- 轮播图 -->
            <div class="bannerTop">
                <div class="bannerCenter">
                <div class="classify"><img src="../assets/Img/classify.png" alt=""></div>
                <label for="search" class="search"><img src="../assets/Img/search.png" alt=""><input type="search" id="search" placeholder="娘娘，娘娘，你好娘"></label>
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
           
          <!-- <mt-cell v-for="n in 10" :title="'餐厅 ' + n" /> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="订单">
          <!-- <mt-cell v-for="n in 5" :title="'订单 ' + n" /> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="发现">
          <!-- <mt-cell v-for="n in 7" :title="'发现 ' + n" /> -->
        </mt-tab-container-item>
        <mt-tab-container-item id="我的">
          <div class="page-part">
		   <!-- cell -->
            <!-- <mt-cell v-for="n in 12" :title="'我的 ' + n" /> -->
          </div>
          <router-link to="/">
		   <!-- button -->
            <mt-button type="danger" size="large">退出</mt-button>
          </router-link>
        </mt-tab-container-item>
      </mt-tab-container>
    <!-- </div> -->
 
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="home">
        <img slot="icon" src="../assets/Img/home.png">
        首页
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="../assets/logo.png">
        头筹
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="../assets/logo.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="../assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
 
<script>
export default {
  name: "page-tabbar",
  data() {
    return {
      selected: "home"
    };
  },
  components: {
    swipe: swipe => require(["@/components/swipe"], swipe),
    navbar: navbar => require(["@/components/navbar"], navbar),
    participationInProfit: participationInProfit =>
      require(["@/components/participationInProfit"], participationInProfit)
  }
};
</script>
 
<style lang='scss'>
.page-tabbar {
  overflow: hidden;
  height: 100vh;
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
    padding-top: 1rem;
    .classify {
      img {
        height: 2.5rem;
        width: 2.5rem;
        padding: 0 1rem;
      }
      flex: 1;
    }
    .search {
      flex: 5;
      position: relative;
      img {
        position: absolute;
        height: 1.5rem;
        width: 1.5rem;
        padding: 0.5rem;
      }
    }
    .massage {
      flex: 1;
      img {
        height: 2.5rem;
        width: 2.5rem;
        padding: 0 1rem;
      }
    }
  }
}
#search {
  border: none;
  outline: none;
  border-radius: 15rem;
  width: 100%;
  height: 2.5rem;
  text-indent: 2.5rem;
}

//第二部分连接处
.navbarcompont {
  margin: 0 1rem;
}
//分红准备

.participationInProfit {
  width: 100%;
  height: 10rem;
  display: flex;

}
</style>
