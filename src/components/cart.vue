<template>
     <yd-layout>
       <yd-navbar title="购物车">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>

        <!-- <img slot="center" src="http://static.ydcss.com/www/img/logo.png"/> -->

        <router-link to="#" slot="right">
            <yd-navbar-next-icon>编辑</yd-navbar-next-icon>
        </router-link>
        </yd-navbar>
<!-- 购物车 val 设置商品ID {{isCheckAll}}-->
<div class="GroupId" v-for="item in CartList" :key="item.id">
    <div class="GroupIdTitle" >
        <yd-checkbox v-model="isCheckAll" shape="circle" :change="checkAll">{{item.GroupTitle!=''?item.GroupTitle:'普通商品'}}</yd-checkbox>
    </div>

  
    <yd-checklist v-model="checklist" ref="checklistDemo" :callback="change" :label="false">
    <yd-checklist-item :val="items.Id" v-for="items in item.LstProduct" :key="items.id">
         <!-- {{items.IsCheck==1? this.checklist.push(items.Id):''}} -->
        <yd-flexbox style="padding: 15px 0;" :change='IsCheck(items.IsCheck)'>
            <img :src="items.ProductImg" class="demo-checklist-img">
            <yd-flexbox-item align="top" >
                <p>{{items.ProductTitle}}</p>
                <p style="color:#F00;"><span>￥{{items.SalePrice}}</span> 选中值：{{checklist}} 
                    <yd-spinner :longpress="false" v-model="items.BuyNum"></yd-spinner>
                </p>
            </yd-flexbox-item>
        </yd-flexbox>
    </yd-checklist-item>
    </yd-checklist>
</div>
        

         
   
<!-- 底部栏 -->
    
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
      CartList: []
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
    IsCheck(e) {
      console.log(e);
    }
  },
  created() {
    this.$axios({
      method: "POST",
      data: {},
      url: this.$server.serverUrl + "/order/getshoppingcart",
      responseType: "json"
    }).then(response => {
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
    this.$axios({
      method: "POST",
      data: {
        productid: 1263
      },
      url: this.$server.serverUrl + "/order/checkshoppingcart",
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
