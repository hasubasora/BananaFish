<template>
     <yd-layout>
       <yd-navbar title="购物车" color="#f2f2f2" bgcolor="#ff5f17" height='.8rem'>
        <router-link to="#" slot="left" >
            <yd-navbar-back-icon color="#f2f2f2"></yd-navbar-back-icon>
        </router-link>

        <!-- <img slot="center" src="http://static.ydcss.com/www/img/logo.png"/> -->

        <router-link to="#" slot="right" @click.native='isDelFn' color="#f2f2f2">
          <yd-icon name="feedback" size=".4rem" color="#f2f2f2" v-show="isDel"></yd-icon>
          <yd-icon name="checkoff" size=".4rem"  color="#f2f2f2"  v-show="!isDel"></yd-icon>
        </router-link>
        </yd-navbar>
<!-- 购物车 val 设置商品ID {{isCheckAll}}-->
<div class="GroupId" v-for="item in CartList" :key="item.id">
    <div class="GroupIdTitle" >
        <yd-checkbox v-model="isCheckAll" shape="circle" :change="checkAll">{{item.GroupTitle!=''?'头筹购：'+item.GroupTitle:'积分购'}}</yd-checkbox>
    </div>

    <yd-checklist v-model="checklist" ref="checklistDemo" :callback="change" :label="false" color="#FF5F17">

    <div :val="items.Id" v-for="(items,index) in item.LstProduct" :key="index" class="LstProduct">
    <yd-flexbox>
          <div class="GoodList_top">
            <label class="yd-checklist-item-icon" @change="IsCheck(items.Id,items.IsCheck)">
              <input type="checkbox" v-model="items.IsCheck" > 
              <span class="yd-checklist-icon"><i></i></span></label>
          </div>

          <div class="GoodList_center"><img :src="items.ProductImg" class="demo-checklist-img"></div>

          <yd-flexbox-item class="GoodList_bom" v-show="isDel">
                <p>{{items.ProductTitle}}</p>
                <p class="c-red GoodList_Number"><span class="SalePrice">￥{{items.SalePrice}}&nbsp;&nbsp;{{item.GroupTitle?'':'赠'+items.Integral+'积分'}}</span> 
                  <span class="yd-spinner" style="height: 0.5rem; width: 1.5rem;"  >
                    <a href="javascript:;"  @click="reduce(items.Id,items.BuyNum-1)" ></a>
                    <input type="number" pattern="[1-9]*" v-model="items.BuyNum"  disabled  placeholder=""  class="yd-spinner-input"> 
                    <a href="javascript:;" @click="increase(items.Id,items.BuyNum+1)"></a>
                  </span>
               </p>
          </yd-flexbox-item>
          <yd-flexbox-item v-show="!isDel" class="GoodList_bom">
            <p>{{items.ProductTitle}}</p>
                <p class="c-red GoodList_Number"><span class="SalePrice">￥{{items.SalePrice}}</span> 
                  <span class="yd-spinner" style="height: 0.5rem; width: 1.5rem;border:0;text-align:right" @click='DelGood(items.Id)' >
                  <yd-icon name="delete" size=".5rem"  class="DelGood" ></yd-icon>
                  </span>
               </p>
               
          </yd-flexbox-item>
    </yd-flexbox>
    </div>
      
    </yd-checklist>
</div>
        
         
   
<!-- 底部栏 -->
      <div class="bomBtn">
        <button class='BuyCart' type="button" :disabled='!isDel' @click="GoCartOrder">结算</button>
      </div>
      <!-- <yd-cell-item class="bomBtn">
     
        <button slot="right" type="button" :disabled='!isDel' @click="GoCartOrder">去结算</button>
      
    </yd-cell-item> -->
</yd-layout>
</template>
<style lang="scss">
.demo-checklist-img {
  width: 1.5rem;
  border: 1px solid #f2f2f2;
  margin-right: 0.5rem;
}
.GroupId {
  background: #fff;
  border-radius: 15px;
  margin: 0.2rem;
  .GroupIdTitle {
    padding: 0.26rem 0.3rem;
    border-bottom: 1px solid #f2f2f2;
    .yd-checkbox-text {
      font-size: 0.25rem;
      line-height: 0.4rem;
    }
  }
  .yd-checklist {
    background: transparent;
    &:after {
      border: none;
    }
  }
}

.GoodList_top {
  // border: 1px solid;
  width: 1rem;
  .yd-checklist-item-icon {
    margin-left: 0;
  }
}
.GoodList_center {
  // border: 1px solid;
  width: 1.8rem;
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
    cursor: pointer;
  }
  > p {
    font-size: 0.26rem;
    padding-right: 0.2rem;
    color: #555;
  }
  .GoodList_Number {
    padding-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    .SalePrice {
      font-size: 0.26rem;
      color: #ff5f17;
      line-height: 0.5rem;
    }
  }
}

.bomBtn {
  border-top: 1px solid #f2f2f2;
  position: fixed;
  z-index: 1;
  display: flex;
  background: #fff;
  left: 0;
  bottom: 1.1rem;
  height: 1rem;
  width: 100%;
  align-self: center;
  justify-content: flex-end;
  padding: 0.1rem;
  .BuyCart {
    border-radius: 20px;
    background: #ff5f17;
    font-size: 0.26rem;
    color: #f2f2f2;
    border: #ff5f17 1px solid;
    width: 2rem;
    align-self: center;
    height: 0.8rem;
    text-align: center;
  }
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
          console.log(123);
          // this.GetShoppingCart();
        }
        if (response.data.success == 400) {
          this.$router.push({ name: "SignIn" });
        }
      });
    },
    increase(_index, num) {
      console.log('增加');
      
      console.log(num);
      if (num > 999) {
        return;
      }
      this.SetCartNum(_index, num);
    },
    reduce(_index, num) {
      console.log('增加2');
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
            // console.log(iterator.GroupId);
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
  }
};
</script>
