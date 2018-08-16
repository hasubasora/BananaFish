<template>
     <yd-layout>
       <yd-navbar title="购物车">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>

        <!-- <img slot="center" src="http://static.ydcss.com/www/img/logo.png"/> -->

        <router-link to="#" slot="right" @click.native='isDelFn'>
            <yd-navbar-next-icon  v-show="isDel">编辑</yd-navbar-next-icon>
            <yd-navbar-next-icon  v-show="!isDel">完成</yd-navbar-next-icon>
        </router-link>
        </yd-navbar>
<!-- 购物车 val 设置商品ID {{isCheckAll}}-->
<div class="GroupId" v-for="item in CartList" :key="item.id">
    <div class="GroupIdTitle" >
        <yd-checkbox v-model="isCheckAll" shape="circle" :change="checkAll">{{item.GroupTitle!=''?item.GroupTitle:'普通商品'}}</yd-checkbox>
    </div>

    <yd-checklist v-model="checklist" ref="checklistDemo" :callback="change" :label="false">

    <div :val="items.Id" v-for="(items,index) in item.LstProduct" :key="index">
    <yd-flexbox>
          <div class="GoodList_top">
            <label class="yd-checklist-item-icon" >
              <input type="checkbox" v-model="items.IsCheck"  @click="IsCheck(items.Id,items.IsCheck)"> 
              <span class="yd-checklist-icon"><i></i></span></label>
          </div>

          <div class="GoodList_center"><img :src="items.ProductImg" class="demo-checklist-img"></div>

          <yd-flexbox-item class="GoodList_bom" v-show="isDel">
                <p>{{items.ProductTitle}}</p>
                <p class="c-red GoodList_Number"><span class="SalePrice">￥{{items.SalePrice}}</span> 
                  <span class="yd-spinner" style="height: 0.6rem; width: 2rem;"  >
                    <a href="javascript:;"  @click="reduce(items.Id,items.BuyNum-1)" ></a>
                    <input type="number" pattern="[1-9]*" v-model="items.BuyNum"  disabled  placeholder=""  class="yd-spinner-input"> 
                    <a href="javascript:;" @click="increase(items.Id,items.BuyNum+1)"></a>
                  </span>
               </p>
          </yd-flexbox-item>
          <yd-flexbox-item v-show="!isDel" class="GoodList_bom">
            <p>{{items.ProductTitle}}</p>
                <p class="c-red GoodList_Number"><span class="SalePrice">￥{{items.SalePrice}}</span> 
                  <span class="yd-spinner" style="height: 0.6rem; width: 2rem;border:0;text-align:right"  >
                  <div class="DelGood" @click='DelGood(items.Id)'>删除</div>
                  </span>
               </p>
               
          </yd-flexbox-item>
    </yd-flexbox>
    </div>
      
    </yd-checklist>
</div>
        
         
   
<!-- 底部栏 -->
      <yd-cell-item class="bomBtn">
         <!-- <yd-checkbox-group v-model="checklist" slot="left">
           <yd-checkbox val="all" shape="circle">全选</yd-checkbox>
         </yd-checkbox-group> -->
        <!-- <span slot="left" class="c-orange">应付123456</span> -->

        <button slot="right" type="button" :disabled='!isDel' @click="GoCartOrder">去结算</button>
      
    </yd-cell-item>
</yd-layout>
</template>
<style lang="scss">
.demo-checklist-img {
  width: 1.5rem;
  border: 1px solid #ccc;
  margin-right: 1rem;
}
.GroupId {
  .GroupIdTitle {
    padding: 0.2rem;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
}
.GoodList_top {
  // border: 1px solid;
  width: 1rem;
}
.GoodList_center {
  // border: 1px solid;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: Center;
  > img {
    height: 1.5rem;
    width: 1.5rem;
  }
  align-items: center;
}
.GoodList_bom {
  .DelGood {
    color: red;
  }
  > p {
    font-size: 0.26rem;
    padding-right: 0.2rem;
    color: #555;
  }
  .GoodList_Number {
    display: flex;
    justify-content: space-between;
    .SalePrice {
      font-size: 0.4rem;
      color: #ff5f17;
    }
  }
}
.bomBtn {
  border-top: 1px solid #cccccc;
  position: fixed;
  left: 0;
  bottom: 1rem;
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
</style>
<script>
export default {
  data() {
    return {
      checklist: [],
      isCheckAll: false,
      spinner: 2,
      GeneralList: [],
      ProductList: [],
      CartList: [],
      isDel: true
    };
  },
  methods: {
    change(value, isCheckAll) {
      this.isCheckAll = isCheckAll;
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.$refs.checklistDemo.$emit(
        "ydui.checklist.checkall",
        this.isCheckAll
      );
    },
    IsCheck(id, _IsCheck) {
      console.log(_IsCheck);
      this.$axios({
        method: "POST",
        data: {
          Id: id,
          Ischeck: !_IsCheck
        },
        url: this.$server.serverUrl + "/order/checkshoppingcart",
        responseType: "json"
      }).then(response => {
        if (response.data.success == 200) {
          console.log(response.data);
          this.GetShoppingCart();
        }
        if (response.data.success == 400) {
          this.$router.push({ name: "SignIn" });
        }
      });
    },
    increase(_index, num) {
      console.log(num);
      if (num > 999) {
        return;
      }
      this.SetCartNum(_index, num);
    },
    reduce(_index, num) {
      console.log(num);
      if (num < 1) {
        return;
      }
      this.SetCartNum(_index, num);
    },
    SetCartNum(_index, num) {
      this.$axios({
        method: "POST",
        data: {
          itemid: _index,
          num: num
        },
        url: this.$server.serverUrl + "/order/changeshoppingcart",
        responseType: "json"
      }).then(response => {
        if (response.data.success == 200) {
          console.log(response.data);
          this.GetShoppingCart();
        }
        if (response.data.success == 400) {
          this.$router.push({ name: "SignIn" });
        }
      });
    },
    GetShoppingCart() {
      this.$axios({
        method: "POST",
        data: {},
        url: this.$server.serverUrl + "/order/getshoppingcart",
        responseType: "json"
      }).then(response => {
        if (response.data.success == 400) {
          // this.$router.push({ name: "SignIn" });
        }
        if (response.data.success == 200) {
          this.CartList = response.data.rows;
          for (const iterator of this.CartList) {
            console.log(iterator.GroupId);
            if (iterator.GroupId < 0) {
            } else {
            }
          }
        }
      });
    },
    DelGood(_id) {
      this.$axios({
        method: "POST",
        data: {
          Id: _id
        },
        url: this.$server.serverUrl + "/order/delshoppingcart",
        responseType: "json"
      }).then(response => {
        if (response.data.success == 400) {
          this.$router.push({ name: "SignIn" });
        }
        if (response.data.success == 200) {
          console.log(response.data);
          this.GetShoppingCart();
        }
      });
    },
    isDelFn() {
      console.log(222);

      this.isDel = !this.isDel;
    },
    GoCartOrder() {
      this.$router.push({ name: "cartOrder" });
    }
  },
  created() {
    this.GetShoppingCart();
    // this.$axios({
    //   method: "POST",
    //   data: {
    //     productid: 1263
    //   },
    //   url: this.$server.serverUrl + "/order/checkshoppingcart",
    //   responseType: "json"
    // }).then(response => {
    //   if (response.data.success == 200) {
    //     this.GoodsHtml = response.data.object;
    //     console.log(this.GoodsHtml);
    //   }
    // });
  }
};
</script>
