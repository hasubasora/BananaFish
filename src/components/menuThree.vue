<template>
<div>
    <yd-navbar title="购物精选" style="z-index:2">
        <router-link to="/productList" slot="left">
            <yd-navbar-back-icon></yd-navbar-back-icon>
        </router-link>
        <router-link to="#" slot="right">
        </router-link>
    </yd-navbar>
    <div class="layoutList">
        <yd-scrollnav>
        <yd-scrollnav-panel :label="item.CateName" v-for="(item, key) in GoodsList" :key="key">
            <!-- 内容 -->
            <!-- <p>{{item.CateName}}</p> -->
            <yd-list :theme="1">
                <yd-list-item v-for="(itemt,key) in item.LstProduct" :key="key" @click.native="GoItemDes(itemt.Id)">
                  <div slot="img" class="goodLists"> 
                    
                     <div class="goodsImg">  
                        <!-- <span class="ProductTitle">{{itemt.ProductTitle}}</span> -->
                       <img :src="itemt.ProductImg">
                     </div>
                     <div class="goodsTag"><span>优品购</span>精选优品包邮</div>
                     <h3>{{itemt.SubTitle}}</h3>
                     <span class="SaleCount">月销量{{itemt.SaleCount}}件</span>
                     <div class="SalePrice"><strong>￥{{itemt.SalePrice}}</strong><img src="../assets/Img/gwc.png" alt=""></div>
                     
                  </div>
                   
                </yd-list-item>
            </yd-list>
            <!-- 内容 -->

        </yd-scrollnav-panel>
    </yd-scrollnav>
    </div>
</div>
</template>
<script>
export default {
  name: "menuThree",
  data() {
    return {
      GoodsList: [
        // { label: "今日特惠" },
        // { label: "烟灶推荐" },
        // { label: "净水饮水推荐" },
        // { label: "洗碗机推荐" },
        // { label: "电热推荐" },
        // { label: "燃热推荐" },
        // { label: "消毒柜推荐" },
        // { label: "嵌入式推荐" },
        // { label: "商用电器" },
        // { label: "活动说明" }
      ]
    };
  },
  created() {
    console.log(this.$route.params.Group_id);
    
    this.$axios({
      method: "POST",
      data: {
        pageindex: 1,
        pagesize: 10,
        categoryid: this.$route.params.Group_id
      },
      url: this.$server.serverUrl + "/index/getcategoryproduct",
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
    GoItemDes(i) {
       console.log(i);
      this.$router.push({ name: "GeneralItemDescription", params: { Good_id: i } });
    }
  }
};
</script>
<style lang="scss">
.layoutList {
  //   position: relative;
  .yd-scrollnav {
    padding-top: 1rem;
    z-index: 1;
    .yd-list-img {
      height: 5.3rem;
      background: #fff;
      padding: 0.2rem;
      .goodLists {
        height: 5rem;
        .goodsImg {
          position: relative;
          text-align: center;
          > img {
            width: 3rem;
            height: 3rem;
            margin: 0;
            display: inline-block;
          }
          .ProductTitle {
            position: absolute;
            display: block;
            width: 100%;
            bottom: 0;
            left: 1px;
            text-align: center;
            padding: 0.1rem;
            background: #f5f5f5;
          }
        }
        .goodsTag {
          font-size: 0.3rem;
          color: #ff5f17;
          > span {
            background: #ff5f17;
            color: #fff;
            padding: 0.05rem 0.1rem;
            font-size: 0.3rem;
            border-radius: 5px;
            margin-right: 0.1rem;
          }
        }
        h3 {
          font-size: 0.3rem;
          overflow: hidden;
          white-space: nowrap;
          line-height: 0.6rem;
          text-overflow: ellipsis;
        }
        .SaleCount {
          color: #777;
          font-size: 0.3rem;
        }
        .SalePrice {
          display: flex;
          justify-content: space-between;
          strong {
            font-size: 0.4rem;
          }
          > img {
            width: 0.8rem;
            height: 0.8rem;
            margin-top: -0.3rem;
            margin-right: 0.1rem;
          }
        }
      }
    }
  }
}
.yd-scrollnav-tab-item > li.yd-scrollnav-current > i:before {
  content: "";
  border-bottom: 2px solid red;
  height: 30px;
}
</style>
